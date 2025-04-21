import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";

type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, department: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // إرسال طلب POST إلى المسار /login في الخادم
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      // التحقق من حالة الاستجابة
      if (response.ok) {
        const data = await response.json();
  
        // تحقق من أن البيانات تحتوي على المستخدم (user) بشكل صحيح
        if (data && data.user) {
          const user = {
            id: data.user.id,
            name: data.user.username, // التأكد من أن 'username' موجود
            email: data.user.email,
            department: data.user.department,
            role: data.user.role,
            activeRentals: 0, 
            token : data.token, // إذا كان لديك توكن
          };
  
          // تخزين المستخدم في localStorage وتحديث الحالة
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);
  
          return user;  // إرجاع بيانات المستخدم أو الأدمن
        } else {
          console.error("خطأ: بيانات المستخدم غير موجودة");
          return null;
        }
      } else {
        // التعامل مع الأخطاء
        const errorData = await response.json();
        console.error("خطأ في تسجيل الدخول:", errorData.message);
        return null;
      }
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    department: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: name, email, password, department })
      });
  
      if (!response.ok) {
        throw new Error("فشل التسجيل");
      }
  
      const data = await response.json();
      
      // قم بتخزين بيانات المستخدم في localStorage إذا كنت بحاجة لذلك
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setCurrentUser(data.user); // هنا إذا أردت تخزين بيانات المستخدم في الواجهة الأمامية
  
      return true;
    } catch (error) {
      console.error("خطأ في التسجيل:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  


  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

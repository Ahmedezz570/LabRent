
export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  specifications: string[];
  imageUrl: string;
  status: ToolStatus;
  location: string;
  calibrationDate?: string;
  maintenanceDate?: string;
}

export type ToolCategory = 
  | "Measurement" 
  | "Pneumatic" 
  | "Electric" 
  | "Hand Tool" 
  | "Diagnostic"
  | "Calibration"
  | "Safety";

export type ToolStatus = "Available" | "In Use" | "Maintenance" | "Calibration";

export interface Rental {
  id: string;
  toolId: string;
  userId: string;
  checkoutDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: RentalStatus;
  purpose: string;
}

export type RentalStatus = "Pending" | "Approved" | "Checked Out" | "Returned" | "Overdue";

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  activeRentals: number;
}

export type UserRole = "Engineer" | "Technician" | "Manager" | "Admin";

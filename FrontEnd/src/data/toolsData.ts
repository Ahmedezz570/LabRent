
import { Tool, Rental, User } from "@/types";

export const tools: Tool[] = [
  {
    id: "t001",
    name: "Digital Oscilloscope",
    category: "Measurement",
    description: "High-precision digital oscilloscope for signal analysis",
    specifications: [
      "Bandwidth: 100MHz",
      "Channels: 4",
      "Sample Rate: 1 GSa/s",
      "Display: 7-inch TFT LCD"
    ],
    imageUrl: "/placeholder.svg",
    status: "Available",
    location: "Lab Room A-101"
  },
  {
    id: "t002",
    name: "Air Flow Calibrator",
    category: "Calibration",
    description: "Precision air flow measurement and calibration device",
    specifications: [
      "Range: 0-100 L/min",
      "Accuracy: ±1.5%",
      "Display: Digital LCD",
      "Battery Life: 8 hours"
    ],
    imageUrl: "/placeholder.svg",
    status: "In Use",
    location: "Calibration Room B-202",
    calibrationDate: "2024-12-15"
  },
  {
    id: "t003",
    name: "Pneumatic Pressure Tester",
    category: "Pneumatic",
    description: "Tests pneumatic systems for leaks and pressure integrity",
    specifications: [
      "Pressure Range: 0-150 PSI",
      "Resolution: 0.1 PSI",
      "Connection: 1/4\" NPT",
      "Includes digital logging"
    ],
    imageUrl: "/placeholder.svg",
    status: "Available",
    location: "Tool Crib C-105",
    maintenanceDate: "2024-09-30"
  },
  {
    id: "t004",
    name: "Torque Wrench",
    category: "Hand Tool",
    description: "Digital torque wrench for precise fastening applications",
    specifications: [
      "Range: 5-100 Nm",
      "Accuracy: ±2%",
      "Digital Display",
      "Audible Alert at Target Torque"
    ],
    imageUrl: "/placeholder.svg",
    status: "Maintenance",
    location: "Tool Crib C-105",
    maintenanceDate: "2024-04-28"
  },
  {
    id: "t005",
    name: "Air Quality Monitor",
    category: "Safety",
    description: "Monitors air quality parameters in work environments",
    specifications: [
      "Measures CO, CO2, VOCs",
      "Temperature and Humidity",
      "Particle Detection: PM2.5, PM10",
      "Data Logging Capability"
    ],
    imageUrl: "/placeholder.svg",
    status: "Available",
    location: "Safety Office D-111",
    calibrationDate: "2024-08-18"
  },
  {
    id: "t006",
    name: "Electrical Circuit Analyzer",
    category: "Electric",
    description: "Comprehensive testing of electrical circuits and components",
    specifications: [
      "Voltage Range: 0-600V AC/DC",
      "Resistance: 0-40MΩ",
      "Current: 0-20A",
      "CAT III 600V Safety Rating"
    ],
    imageUrl: "/placeholder.svg",
    status: "Available",
    location: "Electrical Lab A-103"
  },
  {
    id: "t007",
    name: "Ultrasonic Leak Detector",
    category: "Diagnostic",
    description: "Identifies air and gas leaks through ultrasonic technology",
    specifications: [
      "Frequency Response: 35-45 kHz",
      "Detection Range: Up to 50 feet",
      "Includes Headphones and Focusing Tube",
      "Battery Operated"
    ],
    imageUrl: "/placeholder.svg",
    status: "In Use",
    location: "Field Kit Storage E-107"
  },
  {
    id: "t008",
    name: "Infrared Thermometer",
    category: "Measurement",
    description: "Non-contact temperature measurement device",
    specifications: [
      "Range: -50°C to 550°C",
      "Accuracy: ±2% or ±2°C",
      "Distance to Spot Ratio: 12:1",
      "Adjustable Emissivity"
    ],
    imageUrl: "/placeholder.svg",
    status: "Available",
    location: "Lab Room A-101"
  }
];

export const rentals: Rental[] = [
  {
    id: "r001",
    toolId: "t002",
    userId: "u001",
    checkoutDate: "2024-04-10",
    expectedReturnDate: "2024-04-17",
    status: "Checked Out",
    purpose: "Fan performance testing in engine prototype"
  },
  {
    id: "r002",
    toolId: "t007",
    userId: "u002",
    checkoutDate: "2024-04-15",
    expectedReturnDate: "2024-04-18",
    status: "Checked Out",
    purpose: "Cabin pressurization leak inspection"
  },
  {
    id: "r003",
    toolId: "t004",
    userId: "u003",
    checkoutDate: "2024-04-12",
    expectedReturnDate: "2024-04-14",
    actualReturnDate: "2024-04-14",
    status: "Returned",
    purpose: "Engine mount assembly"
  }
];

export const users: User[] = [
  {
    id: "u001",
    name: "Alex Johnson",
    email: "alex.johnson@airdept.com",
    department: "Propulsion Systems",
    role: "Engineer",
    activeRentals: 1
  },
  {
    id: "u002",
    name: "Samantha Williams",
    email: "samantha.w@airdept.com",
    department: "Cabin Systems",
    role: "Technician",
    activeRentals: 1
  },
  {
    id: "u003",
    name: "Michael Chen",
    email: "michael.chen@airdept.com",
    department: "Assembly",
    role: "Engineer",
    activeRentals: 0
  },
  {
    id: "u004",
    name: "Taylor Rodriguez",
    email: "taylor.r@airdept.com",
    department: "Quality Control",
    role: "Manager",
    activeRentals: 0
  }
];

// Helper functions to work with data
export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getToolsByStatus = (status: string): Tool[] => {
  return tools.filter(tool => tool.status === status);
};

export const getRentalsByUser = (userId: string): Rental[] => {
  return rentals.filter(rental => rental.userId === userId);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// For demo purposes, we'll use this to simulate a logged-in user
export const currentUser = users[0];

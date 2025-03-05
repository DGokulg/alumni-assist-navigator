
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Types for our users
export type UserRole = "student" | "admin";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface StudentData extends UserData {
  registerNumber: string;
  rollNumber: string;
  year: string;
  branch: string;
  semester: string;
  batch: string;
  department: string;
  phoneNumber: string;
  hasArrear: boolean;
  isApproved: boolean;
  isPlaced: boolean;
}

export interface AdminData extends UserData {
  // Admin specific data can go here
}

// Context type definition
interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<StudentData>, password: string) => Promise<boolean>;
  getStudents: () => StudentData[];
  approveStudent: (id: string) => void;
  rejectStudent: (id: string) => void;
  markAsPlaced: (id: string) => void;
  addStudent: (student: Partial<StudentData>, password: string) => void;
  removeStudent: (id: string) => void;
  updateStudent: (id: string, data: Partial<StudentData>) => void;
  messageStudents: (ids: string[], message: string, link?: string) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample data for demonstration
const sampleStudents: StudentData[] = [
  {
    id: "s1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    registerNumber: "REG001",
    rollNumber: "CS001",
    year: "3",
    branch: "Computer Science",
    semester: "6",
    batch: "2020-2024",
    department: "CSE",
    phoneNumber: "1234567890",
    hasArrear: false,
    isApproved: true,
    isPlaced: false
  },
  {
    id: "s2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "student",
    registerNumber: "REG002",
    rollNumber: "CS002",
    year: "3",
    branch: "Computer Science",
    semester: "6",
    batch: "2020-2024",
    department: "CSE",
    phoneNumber: "9876543210",
    hasArrear: true,
    isApproved: true,
    isPlaced: true
  },
  {
    id: "s3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "student",
    registerNumber: "REG003",
    rollNumber: "EE001",
    year: "2",
    branch: "Electrical Engineering",
    semester: "4",
    batch: "2021-2025",
    department: "EEE",
    phoneNumber: "5554443333",
    hasArrear: false,
    isApproved: false,
    isPlaced: false
  },
  {
    id: "s4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "student",
    registerNumber: "REG004",
    rollNumber: "ME001",
    year: "4",
    branch: "Mechanical Engineering",
    semester: "8",
    batch: "2019-2023",
    department: "MECH",
    phoneNumber: "1112223333",
    hasArrear: false,
    isApproved: true,
    isPlaced: true
  },
  {
    id: "s5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "student",
    registerNumber: "REG005",
    rollNumber: "CE001",
    year: "3",
    branch: "Civil Engineering",
    semester: "6",
    batch: "2020-2024",
    department: "CIVIL",
    phoneNumber: "9998887777",
    hasArrear: true,
    isApproved: true,
    isPlaced: false
  }
];

const sampleAdmin: AdminData = {
  id: "a1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin"
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<StudentData[]>(sampleStudents);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let foundUser = null;
      
      if (role === "admin" && email === "admin@example.com" && password === "admin123") {
        foundUser = sampleAdmin;
      } else if (role === "student") {
        foundUser = students.find(s => s.email === email && s.isApproved);
        
        // In a real app, we'd verify the password here
        if (foundUser && password !== "student123") {
          foundUser = null;
        }
      }
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or your account is not approved yet.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };

  // Register function
  const register = async (userData: Partial<StudentData>, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (students.some(s => s.email === userData.email)) {
        toast({
          title: "Registration Failed",
          description: "Email already in use.",
          variant: "destructive",
        });
        return false;
      }
      
      const newStudent: StudentData = {
        id: `s${students.length + 1}`,
        name: userData.name || "",
        email: userData.email || "",
        role: "student",
        registerNumber: userData.registerNumber || "",
        rollNumber: userData.rollNumber || "",
        year: userData.year || "",
        branch: userData.branch || "",
        semester: userData.semester || "",
        batch: userData.batch || "",
        department: userData.department || "",
        phoneNumber: userData.phoneNumber || "",
        hasArrear: userData.hasArrear || false,
        isApproved: false,
        isPlaced: false
      };
      
      setStudents(prev => [...prev, newStudent]);
      
      toast({
        title: "Registration Successful",
        description: "Your account is pending approval from an administrator.",
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get all students
  const getStudents = () => {
    return students;
  };

  // Approve a student
  const approveStudent = (id: string) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id 
          ? { ...student, isApproved: true } 
          : student
      )
    );
    
    toast({
      title: "Student Approved",
      description: "The student has been approved and can now log in.",
    });
  };

  // Reject a student
  const rejectStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    
    toast({
      title: "Student Rejected",
      description: "The student registration has been rejected.",
    });
  };

  // Mark a student as placed
  const markAsPlaced = (id: string) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id 
          ? { ...student, isPlaced: true } 
          : student
      )
    );
    
    toast({
      title: "Student Marked as Placed",
      description: "The student has been marked as placed.",
    });
  };

  // Add a student manually
  const addStudent = (studentData: Partial<StudentData>, password: string) => {
    const newStudent: StudentData = {
      id: `s${students.length + 1}`,
      name: studentData.name || "",
      email: studentData.email || "",
      role: "student",
      registerNumber: studentData.registerNumber || "",
      rollNumber: studentData.rollNumber || "",
      year: studentData.year || "",
      branch: studentData.branch || "",
      semester: studentData.semester || "",
      batch: studentData.batch || "",
      department: studentData.department || "",
      phoneNumber: studentData.phoneNumber || "",
      hasArrear: studentData.hasArrear || false,
      isApproved: true, // Auto-approved since admin is adding
      isPlaced: studentData.isPlaced || false
    };
    
    setStudents(prev => [...prev, newStudent]);
    
    toast({
      title: "Student Added",
      description: `${newStudent.name} has been added successfully.`,
    });
  };

  // Remove a student
  const removeStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    
    toast({
      title: "Student Removed",
      description: "The student has been removed from the system.",
    });
  };

  // Update student data
  const updateStudent = (id: string, data: Partial<StudentData>) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id 
          ? { ...student, ...data } 
          : student
      )
    );
    
    toast({
      title: "Student Updated",
      description: "Student information has been updated.",
    });
  };

  // Message students
  const messageStudents = (ids: string[], message: string, link?: string) => {
    // In a real app, this would send emails or notifications
    toast({
      title: "Messages Sent",
      description: `Message sent to ${ids.length} student(s).`,
    });
    
    console.log("Message sent to:", ids);
    console.log("Message:", message);
    console.log("Link:", link);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    getStudents,
    approveStudent,
    rejectStudent,
    markAsPlaced,
    addStudent,
    removeStudent,
    updateStudent,
    messageStudents
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

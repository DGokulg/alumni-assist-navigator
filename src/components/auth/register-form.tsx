
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ArrowLeft } from "lucide-react";

// Sample data for dropdowns
const branches = [
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
];

const departments = [
  "CSE", "IT", "EEE", "ECE", "MECH", "CIVIL"
];

const batches = [
  "2019-2023", "2020-2024", "2021-2025", "2022-2026"
];

const years = ["1", "2", "3", "4"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    registerNumber: "",
    rollNumber: "",
    year: "",
    branch: "",
    semester: "",
    batch: "",
    department: "",
    phoneNumber: "",
    hasArrear: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Register number
    if (!formData.registerNumber.trim()) {
      newErrors.registerNumber = "Register number is required";
    }
    
    // Roll number
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }
    
    // Year
    if (!formData.year) {
      newErrors.year = "Year is required";
    }
    
    // Branch
    if (!formData.branch) {
      newErrors.branch = "Branch is required";
    }
    
    // Semester
    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }
    
    // Batch
    if (!formData.batch) {
      newErrors.batch = "Batch is required";
    }
    
    // Department
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    
    // Phone number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const { confirmPassword, ...registrationData } = formData;
    const success = await register(registrationData, formData.password);
    
    if (success) {
      navigate("/register-success");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto glass-card animate-scale-in">
      <CardHeader>
        <div className="flex items-center mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2 p-0 h-8 w-8"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-semibold">Student Registration</CardTitle>
        </div>
        <CardDescription>
          Create your account to apply for placement assistance
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password <span className="text-destructive">*</span></Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number <span className="text-destructive">*</span></Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber}</p>}
              </div>
            </div>
          </div>
          
          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Academic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registerNumber">Register Number <span className="text-destructive">*</span></Label>
                <Input
                  id="registerNumber"
                  name="registerNumber"
                  placeholder="Enter register number"
                  value={formData.registerNumber}
                  onChange={handleChange}
                />
                {errors.registerNumber && <p className="text-destructive text-xs">{errors.registerNumber}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number <span className="text-destructive">*</span></Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="Enter roll number"
                  value={formData.rollNumber}
                  onChange={handleChange}
                />
                {errors.rollNumber && <p className="text-destructive text-xs">{errors.rollNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch <span className="text-destructive">*</span></Label>
                <Select 
                  value={formData.branch} 
                  onValueChange={(value) => handleSelectChange("branch", value)}
                >
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.branch && <p className="text-destructive text-xs">{errors.branch}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department <span className="text-destructive">*</span></Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-destructive text-xs">{errors.department}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year <span className="text-destructive">*</span></Label>
                <Select 
                  value={formData.year} 
                  onValueChange={(value) => handleSelectChange("year", value)}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.year && <p className="text-destructive text-xs">{errors.year}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">Semester <span className="text-destructive">*</span></Label>
                <Select 
                  value={formData.semester} 
                  onValueChange={(value) => handleSelectChange("semester", value)}
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.semester && <p className="text-destructive text-xs">{errors.semester}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="batch">Batch <span className="text-destructive">*</span></Label>
                <Select 
                  value={formData.batch} 
                  onValueChange={(value) => handleSelectChange("batch", value)}
                >
                  <SelectTrigger id="batch">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.batch && <p className="text-destructive text-xs">{errors.batch}</p>}
              </div>
              
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="hasArrear"
                  name="hasArrear"
                  checked={formData.hasArrear}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, hasArrear: checked }))
                  }
                />
                <Label htmlFor="hasArrear">I have arrears</Label>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : "Submit Registration"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;

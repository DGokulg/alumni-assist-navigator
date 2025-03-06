
import { useState } from "react";
import { useAuth, StudentData } from "@/contexts/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Search, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const StudentManagement = () => {
  const { getStudents, markAsPlaced, updateStudent, removeStudent, addStudent } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registerNumber: "",
    rollNumber: "",
    department: "",
    batch: "",
    phoneNumber: "",
    semester: "",
    year: "",
    branch: "",
    hasArrear: false,
    isPlaced: false,
  });

  const students = getStudents();
  
  const filteredStudents = students.filter(student => 
    student.isApproved && 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.registerNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addStudent(formData, "student123"); // Using a default password
    setDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      registerNumber: "",
      rollNumber: "",
      department: "",
      batch: "",
      phoneNumber: "",
      semester: "",
      year: "",
      branch: "",
      hasArrear: false,
      isPlaced: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Student Management</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registerNumber">Register Number*</Label>
                      <Input
                        id="registerNumber"
                        name="registerNumber"
                        value={formData.registerNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch</Label>
                      <Input
                        id="batch"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Input 
                        type="checkbox" 
                        name="isPlaced"
                        checked={formData.isPlaced}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span>Already Placed</span>
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Student</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard 
              key={student.id} 
              student={student}
              onMarkAsPlaced={markAsPlaced}
              onRemove={removeStudent}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-muted-foreground">No students found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

type StudentCardProps = {
  student: StudentData;
  onMarkAsPlaced: (id: string) => void;
  onRemove: (id: string) => void;
};

const StudentCard = ({ student, onMarkAsPlaced, onRemove }: StudentCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{student.name}</CardTitle>
          <div className="flex items-center space-x-1">
            {student.isPlaced ? (
              <span className="flex items-center text-xs font-medium text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Placed
              </span>
            ) : (
              <span className="flex items-center text-xs font-medium text-amber-600">
                <XCircle className="w-3 h-3 mr-1" />
                Not Placed
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span>{student.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Register #:</span>
            <span>{student.registerNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Department:</span>
            <span>{student.department}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Batch:</span>
            <span>{student.batch}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-2">
        {!student.isPlaced && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMarkAsPlaced(student.id)}
          >
            Mark as Placed
          </Button>
        )}
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onRemove(student.id)}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentManagement;

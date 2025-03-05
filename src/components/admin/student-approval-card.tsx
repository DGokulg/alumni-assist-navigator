
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StudentData, useAuth } from "@/contexts/AuthContext";
import { CheckCircle, XCircle } from "lucide-react";

interface StudentApprovalCardProps {
  student: StudentData;
}

const StudentApprovalCard: React.FC<StudentApprovalCardProps> = ({ student }) => {
  const { approveStudent, rejectStudent } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleApprove = () => {
    approveStudent(student.id);
  };

  const handleReject = () => {
    rejectStudent(student.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md glass-card animate-scale-in">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-medium">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-muted-foreground">Register No:</span>
            <p>{student.registerNumber}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Roll No:</span>
            <p>{student.rollNumber}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Department:</span>
            <p>{student.department}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Branch:</span>
            <p>{student.branch}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Year/Semester:</span>
            <p>{student.year}/{student.semester}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Batch:</span>
            <p>{student.batch}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Phone:</span>
            <p>{student.phoneNumber}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Has Arrears:</span>
            <p>{student.hasArrear ? "Yes" : "No"}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
          onClick={handleReject}
        >
          <XCircle className="h-4 w-4 mr-1" />
          Reject
        </Button>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleApprove}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentApprovalCard;

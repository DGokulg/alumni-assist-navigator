
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StudentData } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: StudentData;
  onClick?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden hover:shadow-md transition-all duration-300 glass-card",
        onClick ? "cursor-pointer hover:-translate-y-1" : ""
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-background">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-medium text-base">{student.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {student.isPlaced && (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">Placed</Badge>
                )}
                {student.hasArrear && (
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-100">Arrear</Badge>
                )}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-1">
              <div>
                <span className="font-medium text-xs text-foreground/70">Reg #:</span> {student.registerNumber}
              </div>
              <div>
                <span className="font-medium text-xs text-foreground/70">Roll #:</span> {student.rollNumber}
              </div>
              <div>
                <span className="font-medium text-xs text-foreground/70">Branch:</span> {student.branch}
              </div>
              <div>
                <span className="font-medium text-xs text-foreground/70">Year:</span> {student.year}
              </div>
              <div>
                <span className="font-medium text-xs text-foreground/70">Department:</span> {student.department}
              </div>
              <div>
                <span className="font-medium text-xs text-foreground/70">Semester:</span> {student.semester}
              </div>
            </div>
            
            <div className="pt-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{student.email}</span>
              <span className="text-muted-foreground">{student.phoneNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;

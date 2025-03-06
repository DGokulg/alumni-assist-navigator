
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileDigit, FilePlus2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ReportsDashboard = () => {
  const { getStudents } = useAuth();
  const students = getStudents().filter(student => student.isApproved);
  
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.isPlaced).length;
  const placementRate = totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0;
  
  // Department-wise statistics
  const departments = students.reduce((acc, student) => {
    const dept = student.department;
    if (!acc[dept]) {
      acc[dept] = { total: 0, placed: 0 };
    }
    acc[dept].total += 1;
    if (student.isPlaced) {
      acc[dept].placed += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; placed: number }>);

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Download Started",
      description: `Generating ${reportType} report...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${reportType} report has been generated and downloaded.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reports Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Overview</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{placementRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Overall placement rate
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDownloadReport("Placement Overview")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Analysis</CardTitle>
            <FilePlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{Object.keys(departments).length}</div>
                <p className="text-xs text-muted-foreground">
                  Departments analyzed
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDownloadReport("Department Analysis")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Statistics</CardTitle>
            <FileDigit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  Total approved students
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDownloadReport("Student Statistics")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Comprehensive Placement Report</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">Complete analysis of placement statistics across all departments and batches</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport("Comprehensive Placement Report")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Department-wise Analysis</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">Detailed breakdown of placement statistics by department</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport("Department-wise Analysis")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Batch Comparison Report</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">Compare placement statistics across different batches</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport("Batch Comparison Report")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Student Performance Analysis</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">Analysis of student performance and placement correlation</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport("Student Performance Analysis")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsDashboard;

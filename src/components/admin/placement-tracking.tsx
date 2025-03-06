
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Download, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PlacementTracking = () => {
  const { getStudents, markAsPlaced } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlaced, setFilterPlaced] = useState<boolean | null>(null);
  
  const allStudents = getStudents().filter(student => student.isApproved);
  
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPlaced === null || student.isPlaced === filterPlaced;
    
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    // In a real application, this would generate a CSV file
    toast({
      title: "Export Started",
      description: "Exporting placement data as CSV...",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Placement data has been exported successfully.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Placement Tracking</h2>
        <div className="flex gap-2 flex-wrap">
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
          <div className="flex space-x-2">
            <Button 
              variant={filterPlaced === true ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterPlaced(filterPlaced === true ? null : true)}
              className="whitespace-nowrap"
            >
              <Filter className="mr-2 h-4 w-4" />
              Placed
            </Button>
            <Button 
              variant={filterPlaced === false ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterPlaced(filterPlaced === false ? null : false)}
              className="whitespace-nowrap"
            >
              <Filter className="mr-2 h-4 w-4" />
              Not Placed
            </Button>
            <Button onClick={handleExport} variant="outline" size="sm" className="whitespace-nowrap">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Placement Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Register Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500 md:hidden">{student.registerNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500">{student.registerNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500">{student.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.isPlaced 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {student.isPlaced ? "Placed" : "Not Placed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {!student.isPlaced ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => markAsPlaced(student.id)}
                            >
                              Mark as Placed
                            </Button>
                          ) : (
                            <span className="text-gray-400">Already Placed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlacementTracking;

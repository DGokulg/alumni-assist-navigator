
import { useState, useMemo } from "react";
import { useAuth, StudentData } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Send, 
  Filter, 
  Check, 
  GraduationCap, 
  BookOpen, 
  Briefcase 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MessagingDashboard = () => {
  const { getStudents, messageStudents } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [messageText, setMessageText] = useState("");
  const [messageLink, setMessageLink] = useState("");
  
  // New filter states
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [batchFilter, setBatchFilter] = useState<string>("");
  const [placementFilter, setPlacementFilter] = useState<string>("");

  const students = getStudents().filter(student => student.isApproved);
  
  // Extract unique departments and batches for filter dropdowns
  const departments = useMemo(() => 
    Array.from(new Set(students.map(student => student.department))),
    [students]
  );
  
  const batches = useMemo(() => 
    Array.from(new Set(students.map(student => student.batch))),
    [students]
  );

  // Apply all filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Search filter
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.batch.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Department filter
      const matchesDepartment = !departmentFilter || student.department === departmentFilter;
      
      // Batch filter
      const matchesBatch = !batchFilter || student.batch === batchFilter;
      
      // Placement status filter
      const matchesPlacement = 
        !placementFilter || 
        (placementFilter === "placed" && student.isPlaced) ||
        (placementFilter === "not-placed" && !student.isPlaced);
      
      return matchesSearch && matchesDepartment && matchesBatch && matchesPlacement;
    });
  }, [students, searchTerm, departmentFilter, batchFilter, placementFilter]);

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendMessage = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one student",
        variant: "destructive",
      });
      return;
    }

    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    messageStudents(selectedStudents, messageText, messageLink);
    setMessageText("");
    setMessageLink("");
    toast({
      title: "Success",
      description: `Message sent to ${selectedStudents.length} student(s)`,
    });
  };

  const clearFilters = () => {
    setDepartmentFilter("");
    setBatchFilter("");
    setPlacementFilter("");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Messaging Dashboard</h2>

      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  placeholder="Enter your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="link">Link (Optional)</Label>
                <Input
                  id="link"
                  placeholder="https://example.com"
                  value={messageLink}
                  onChange={(e) => setMessageLink(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={selectedStudents.length === 0 || !messageText.trim()}
                className="w-full md:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message ({selectedStudents.length} recipient{selectedStudents.length !== 1 ? "s" : ""})
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <CardTitle>Recipients</CardTitle>
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
                <Button 
                  variant="outline" 
                  onClick={handleSelectAll}
                  className="whitespace-nowrap"
                >
                  {selectedStudents.length === filteredStudents.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 border rounded-md bg-muted/40">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                <div className="w-full md:w-auto">
                  <Label htmlFor="department-filter" className="text-sm mb-1 block">
                    <GraduationCap className="h-4 w-4 inline mr-1" />
                    Department
                  </Label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger id="department-filter" className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-departments">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-auto">
                  <Label htmlFor="batch-filter" className="text-sm mb-1 block">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    Batch
                  </Label>
                  <Select value={batchFilter} onValueChange={setBatchFilter}>
                    <SelectTrigger id="batch-filter" className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Batches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-batches">All Batches</SelectItem>
                      {batches.map(batch => (
                        <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-auto">
                  <Label htmlFor="placement-filter" className="text-sm mb-1 block">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Placement Status
                  </Label>
                  <Select value={placementFilter} onValueChange={setPlacementFilter}>
                    <SelectTrigger id="placement-filter" className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-students">All Students</SelectItem>
                      <SelectItem value="placed">Placed</SelectItem>
                      <SelectItem value="not-placed">Not Placed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearFilters}
                  className="w-full md:w-auto mt-2 md:mt-0"
                >
                  <Filter className="h-4 w-4 mr-2" /> Clear Filters
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Batch
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="md:hidden text-xs text-gray-500">
                            {student.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500">{student.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-gray-500">{student.batch}</div>
                          {student.isPlaced && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Check className="h-3 w-3 mr-1" /> Placed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found matching your search.
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

export default MessagingDashboard;

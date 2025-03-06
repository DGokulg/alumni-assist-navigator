
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, StudentData } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardShell from "@/components/layouts/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, ClipboardList, MessageSquare, BriefcaseBusiness } from "lucide-react";
import StudentManagement from "@/components/admin/student-management";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";
import MessagingDashboard from "@/components/admin/messaging-dashboard";
import PlacementTracking from "@/components/admin/placement-tracking";
import ReportsDashboard from "@/components/admin/reports-dashboard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Type guard function to check if user is a student
  const isStudentUser = (user: any): user is StudentData => {
    return user?.role === "student" && 'registerNumber' in user;
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  return (
    <DashboardShell>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {user.role === "admin" && (
              <>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="messaging">Messaging</TabsTrigger>
                <TabsTrigger value="placement">Placement</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}</h2>
              <p className="text-muted-foreground">
                {user.role === "admin" 
                  ? "Manage students, view analytics, and oversee the placement process."
                  : "Track your placement status and connect with opportunities."}
              </p>
              
              {user.role === "admin" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Students
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">150</div>
                      <p className="text-xs text-muted-foreground">
                        +15 from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Placement Rate
                      </CardTitle>
                      <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78%</div>
                      <p className="text-xs text-muted-foreground">
                        +5% from last semester
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Approvals
                      </CardTitle>
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        New student registrations
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="animate-fade-in">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Role:</span>
                      <span className="font-medium capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>
                {isStudentUser(user) && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Academic Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Register Number:</span>
                        <span className="font-medium">{user.registerNumber}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Department:</span>
                        <span className="font-medium">{user.department}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Batch:</span>
                        <span className="font-medium">{user.batch}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Placement Status:</span>
                        <span className={`font-medium ${user.isPlaced ? "text-green-500" : "text-amber-500"}`}>
                          {user.isPlaced ? "Placed" : "Not Placed"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {user.role === "admin" && (
            <>
              <TabsContent value="students" className="animate-fade-in">
                <StudentManagement />
              </TabsContent>
              
              <TabsContent value="approvals" className="animate-fade-in">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Pending Approvals</h2>
                  <div className="space-y-4">
                    {/* This will be populated with the student approval components */}
                    <PendingApprovals />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="animate-fade-in">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="messaging" className="animate-fade-in">
                <MessagingDashboard />
              </TabsContent>

              <TabsContent value="placement" className="animate-fade-in">
                <PlacementTracking />
              </TabsContent>

              <TabsContent value="reports" className="animate-fade-in">
                <ReportsDashboard />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardShell>
  );
};

// Component for pending approvals
const PendingApprovals = () => {
  const { getStudents, approveStudent, rejectStudent } = useAuth();
  const students = getStudents();
  const pendingStudents = students.filter(student => !student.isApproved);

  if (pendingStudents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No pending approvals at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingStudents.map(student => (
        <Card key={student.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {student.department}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {student.batch}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 w-full md:w-auto">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full md:w-auto"
                  onClick={() => approveStudent(student.id)}
                >
                  Approve
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="w-full md:w-auto"
                  onClick={() => rejectStudent(student.id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;


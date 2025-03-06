
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // Type guard function to check if user is a student
  const isStudentUser = (user: any): user is StudentData => {
    return user?.role === "student" && 'registerNumber' in user;
  };

  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Admin routes
    if (path === "/admin") setActiveTab("overview");
    else if (path === "/admin/students") setActiveTab("students");
    else if (path === "/admin/analytics") setActiveTab("analytics");
    else if (path === "/admin/messaging") setActiveTab("messaging");
    else if (path === "/admin/placement-tracking") setActiveTab("placement");
    else if (path === "/admin/reports") setActiveTab("reports");
    
    // Student routes
    else if (path === "/dashboard") setActiveTab("overview");
    else if (path === "/profile") setActiveTab("profile");
    else if (path === "/students") setActiveTab("students");
    else if (path === "/messages") setActiveTab("messaging");
  }, [location.pathname]);

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
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Dashboard
          </h1>
          <Button 
            variant="outline" 
            onClick={logout}
            className="bg-white hover:bg-gray-100 border border-gray-200 shadow-sm"
          >
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-white/70 backdrop-blur-md p-1 border border-gray-200 shadow-sm rounded-xl">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            {user.role === "admin" && (
              <>
                <TabsTrigger 
                  value="students"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Students
                </TabsTrigger>
                <TabsTrigger 
                  value="approvals"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Approvals
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="messaging"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Messaging
                </TabsTrigger>
                <TabsTrigger 
                  value="placement"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Placement
                </TabsTrigger>
                <TabsTrigger 
                  value="reports"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Reports
                </TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="glass-card p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4">
                Welcome, {user.name}
              </h2>
              <p className="text-muted-foreground">
                {user.role === "admin" 
                  ? "Manage students, view analytics, and oversee the placement process."
                  : "Track your placement status and connect with opportunities."}
              </p>
              
              {user.role === "admin" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-blue-800">
                        Total Students
                      </CardTitle>
                      <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">150</div>
                      <p className="text-xs text-blue-600">
                        +15 from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-green-800">
                        Placement Rate
                      </CardTitle>
                      <BriefcaseBusiness className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-700">78%</div>
                      <p className="text-xs text-green-600">
                        +5% from last semester
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-amber-800">
                        Pending Approvals
                      </CardTitle>
                      <ClipboardList className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-700">3</div>
                      <p className="text-xs text-amber-600">
                        New student registrations
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="animate-fade-in">
            <div className="glass-card p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4">Your Profile</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-2 text-indigo-700">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-indigo-100 pb-2">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-indigo-100 pb-2">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-indigo-100 pb-2">
                      <span className="text-muted-foreground">Role:</span>
                      <span className="font-medium capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>
                {isStudentUser(user) && (
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2 text-violet-700">Academic Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-violet-100 pb-2">
                        <span className="text-muted-foreground">Register Number:</span>
                        <span className="font-medium">{user.registerNumber}</span>
                      </div>
                      <div className="flex justify-between border-b border-violet-100 pb-2">
                        <span className="text-muted-foreground">Department:</span>
                        <span className="font-medium">{user.department}</span>
                      </div>
                      <div className="flex justify-between border-b border-violet-100 pb-2">
                        <span className="text-muted-foreground">Batch:</span>
                        <span className="font-medium">{user.batch}</span>
                      </div>
                      <div className="flex justify-between border-b border-violet-100 pb-2">
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
                <div className="glass-card p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4">Pending Approvals</h2>
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
        <Card key={student.id} className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-semibold text-amber-900">{student.name}</h3>
                <p className="text-sm text-amber-700">{student.email}</p>
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
                  className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={() => approveStudent(student.id)}
                >
                  Approve
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="w-full md:w-auto bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
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

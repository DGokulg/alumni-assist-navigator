
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardShell from "@/components/layouts/dashboard-shell";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          </div>
        </TabsContent>
        
        <TabsContent value="profile" className="animate-fade-in">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <p className="text-muted-foreground mb-4">Profile content will be implemented here.</p>
          </div>
        </TabsContent>

        {user.role === "admin" && (
          <>
            <TabsContent value="students" className="animate-fade-in">
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Student Management</h2>
                <p className="text-muted-foreground mb-4">Student list and management will be implemented here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="approvals" className="animate-fade-in">
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Pending Approvals</h2>
                <p className="text-muted-foreground mb-4">Student registration approvals will be implemented here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="animate-fade-in">
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
                <p className="text-muted-foreground mb-4">Charts and analytics will be implemented here.</p>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </DashboardShell>
  );
};

export default Dashboard;

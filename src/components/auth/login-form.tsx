
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole, useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");

  const handleTabChange = (value: string) => {
    setRole(value as UserRole);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password, role);
    if (success) {
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="student" onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 w-full">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-email">Email</Label>
                <Input 
                  id="student-email" 
                  type="email" 
                  placeholder="student@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="student-password">Password</Label>
                  <Button variant="link" size="sm" className="px-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="student-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In as Student"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleRegisterClick}
                disabled={isLoading}
              >
                Register as Student
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="admin">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input 
                  id="admin-email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password">Password</Label>
                  <Button variant="link" size="sm" className="px-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="admin-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In as Admin"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
      
      <div className="px-8 pb-8 text-xs text-center text-muted-foreground">
        <div className="mt-4">
          Use <span className="font-semibold">admin@example.com</span> and password <span className="font-semibold">admin123</span> for admin login.
        </div>
        <div className="mt-2">
          For student demo, use <span className="font-semibold">john@example.com</span> and password <span className="font-semibold">student123</span>.
        </div>
      </div>
    </Card>
  );
};

export default LoginForm;

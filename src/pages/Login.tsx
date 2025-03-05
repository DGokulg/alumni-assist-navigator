
import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/login-form";
import AnimatedGradientBg from "@/components/animated-gradient-bg";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return (
    <AnimatedGradientBg className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">PlaceAssist</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </AnimatedGradientBg>
  );
};

export default Login;

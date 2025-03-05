
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RegisterForm from "@/components/auth/register-form";
import AnimatedGradientBg from "@/components/animated-gradient-bg";

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedGradientBg>
        <div className="container mx-auto px-4 py-6">
          <header className="flex justify-between items-center mb-8">
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              AlumniAssist
            </Link>
            <Link to="/login" className="text-sm text-primary hover:underline">
              Already have an account? Login
            </Link>
          </header>
          
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8 rounded-lg shadow-lg animate-fade-in">
              <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </AnimatedGradientBg>
    </div>
  );
};

export default Register;

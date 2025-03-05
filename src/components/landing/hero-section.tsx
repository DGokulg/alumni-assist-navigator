
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  GraduationCap,
  Users,
  LineChart,
  Briefcase,
} from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container px-4 pt-16 md:pt-24 lg:pt-32 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary">
                  <span className="font-medium">Placement Assistance Portal</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Accelerate Your Career <span className="text-primary">Success</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
                Your all-in-one platform for campus placements. Register, get approved, and connect with opportunities that match your profile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="h-12 px-6 font-medium transition-all"
                onClick={() => navigate("/register")}
              >
                Register Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-6 font-medium transition-all"
                onClick={() => navigate("/login")}
              >
                Login to Account
              </Button>
            </div>
          </div>

          {/* Feature cards grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-0">
            {/* Card 1 */}
            <div className="group glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Student Profiles</h3>
                <p className="text-sm text-muted-foreground">
                  Create comprehensive profiles that showcase your academic achievements and skills.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Admin Approval</h3>
                <p className="text-sm text-muted-foreground">
                  Streamlined approval process to ensure only qualified students participate.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LineChart className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed insights and visualizations to track placement progress and metrics.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Placement Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track placement status and receive updates directly through the platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

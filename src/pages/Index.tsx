
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedGradientBg from "@/components/animated-gradient-bg";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedGradientBg />
      
      <div className="relative z-10">
        {/* Navigation */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                AlumniAssist
              </span>
            </div>
            <div className="flex items-center gap-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              )}
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Placement Assistance Navigator
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Connect students with career opportunities and streamline the placement process
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {!user ? (
                <>
                  <Link to="/register">
                    <Button size="lg" className="px-8">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard">
                  <Button size="lg" className="px-8">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Student Profiles",
                description: "Complete student profiles with academic details and placement status"
              },
              {
                title: "Admin Dashboard",
                description: "Comprehensive analytics and student management tools"
              },
              {
                title: "Application Tracking",
                description: "Monitor placement applications and interview processes"
              },
              {
                title: "Targeted Communication",
                description: "Send personalized messages to filtered student groups"
              },
              {
                title: "Report Generation",
                description: "Export and download detailed placement reports"
              },
              {
                title: "Smart Filtering",
                description: "Find students based on multiple criteria and parameters"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg glass-card hover:shadow-lg transition-all-300 hover-scale"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AlumniAssist Navigator
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;


import React, { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  User,
  Users,
  BookOpen,
  BarChart3,
  MessageSquare,
  FileText,
  BriefcaseBusiness,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardShellProps {
  children: ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isStudent = user?.role === "student";
  const isAdmin = user?.role === "admin";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const studentMenuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: User,
      label: "My Profile",
      href: "/profile",
    },
    {
      icon: Users,
      label: "Students",
      href: "/students",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/messages",
    },
  ];

  const adminMenuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: Users,
      label: "Student Management",
      href: "/admin/students",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/admin/analytics",
    },
    {
      icon: MessageSquare,
      label: "Messaging",
      href: "/admin/messaging",
    },
    {
      icon: BriefcaseBusiness,
      label: "Placement Tracking",
      href: "/admin/placement-tracking",
    },
    {
      icon: FileText,
      label: "Reports",
      href: "/admin/reports",
    },
  ];

  const menuItems = isStudent ? studentMenuItems : adminMenuItems;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="h-full flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
            <div className="flex h-14 items-center px-4 py-6">
              <Link
                to={isStudent ? "/dashboard" : "/admin"}
                className="flex items-center gap-2 font-semibold"
              >
                <BookOpen className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">PlaceAssist</span>
              </Link>
            </div>
            <Separator className="bg-indigo-700" />

            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-indigo-100 transition-all hover:text-white",
                      location.pathname === item.href 
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white" 
                        : "hover:bg-indigo-800/50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-indigo-300 text-indigo-900">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-indigo-200">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="ml-auto text-indigo-200 hover:text-white hover:bg-indigo-800"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex h-screen flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-all duration-300",
          collapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        <div className={cn(
          "flex h-14 items-center px-4 py-6",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link
              to={isStudent ? "/dashboard" : "/admin"}
              className="flex items-center gap-2 font-semibold"
            >
              <BookOpen className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">PlaceAssist</span>
            </Link>
          )}
          {collapsed && (
            <BookOpen className="h-6 w-6 text-white" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto h-8 w-8 text-indigo-200 hover:text-white hover:bg-indigo-800"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Separator className="bg-indigo-700" />

        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-indigo-100 transition-all hover:text-white",
                  location.pathname === item.href 
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white" 
                    : "hover:bg-indigo-800/50",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-indigo-700">
          <div className={cn(
            "flex items-center", 
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9 bg-indigo-300 text-indigo-900">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-indigo-200">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="ml-auto text-indigo-200 hover:text-white hover:bg-indigo-800"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-indigo-200 hover:text-white hover:bg-indigo-800"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 to-purple-50">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;

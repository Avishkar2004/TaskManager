"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, CheckSquare2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async (retryCount = 0) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store", // Ensure we don't get cached responses
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        // User not authenticated
        setUser(null);
        setIsLoading(false);
      }
    };

    // Initial check
    checkAuth();

    // Listen for auth state changes (e.g., after login)
    const handleAuthChange = () => {
      // Add a small delay to ensure cookie is set
      setTimeout(() => {
        checkAuth();
      }, 100);
    };

    // Listen for custom event when auth state changes
    window.addEventListener("auth-state-changed", handleAuthChange);
    
    // Also check when pathname changes to dashboard
    if (pathname === "/dashboard") {
      // Add a small delay when navigating to dashboard to ensure cookie is set
      const timeoutId = setTimeout(() => {
        checkAuth();
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("auth-state-changed", handleAuthChange);
      };
    }

    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, [pathname]);

  // Only show navbar on dashboard
  if (pathname !== "/dashboard" || isLoading || !user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckSquare2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Task Manager
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Organize your life
              </span>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

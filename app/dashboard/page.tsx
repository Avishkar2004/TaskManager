"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskList from "@/components/tasks/TaskList";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Dashboard page - Main page after login
 * Shows user's tasks and allows CRUD operations
 */
export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication and get user info
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Not authenticated, redirect to home
          router.push("/");
        }
      } catch (error) {
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-5xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h1>
          </div>
          <p className="text-muted-foreground text-base">
            Manage your tasks and stay organized
          </p>
        </div>

        {/* Tasks Section */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="pb-5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-bold mb-1">
                  My Tasks
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Organize and track your daily activities
                </p>
              </div>
              <CreateTaskDialog>
              <Button
                  size="lg"
                  className="flex items-center gap-2 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Task</span>
                </Button>
              </CreateTaskDialog>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <TaskList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


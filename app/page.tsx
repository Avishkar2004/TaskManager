"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Home page - Shows login/register forms
 * This is the entry point of the application
 */
export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          // User is logged in, redirect to dashboard
          router.push("/dashboard");
        }
      } catch (error) {
        // User is not logged in, stay on this page
        console.log("Not authenticated");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-md relative z-10 hover:shadow-3xl transition-shadow duration-300">
        <CardHeader className="text-center space-y-3 pb-6 pt-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <span className="text-4xl text-white drop-shadow-sm">✓</span>
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Task Manager
          </CardTitle>
          <CardDescription className="text-base mt-2 text-muted-foreground">
            {isLogin
              ? "Sign in to manage your tasks efficiently"
              : "Create an account and start organizing your life"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

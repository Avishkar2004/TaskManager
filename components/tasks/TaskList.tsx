"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Task list component
 * Displays all tasks and handles fetching/refreshing
 */
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        toast({
          title: "Error",
          description: "Failed to load tasks",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Listen for task list refresh events
  useEffect(() => {
    const handleRefresh = () => {
      fetchTasks();
    };

    window.addEventListener("task-list-refresh", handleRefresh);

    return () => {
      window.removeEventListener("task-list-refresh", handleRefresh);
    };
  }, []);

  // Handle task deletion
  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
        // Refresh task list
        fetchTasks();
        // Also dispatch event for consistency
        window.dispatchEvent(new Event("task-list-refresh"));
      } else {
        toast({
          title: "Error",
          description: "Failed to delete task",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Handle task update
  const handleUpdate = () => {
    // Refresh task list after update
    fetchTasks();
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <span className="text-5xl">📝</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          No tasks yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Get started by creating your first task! Click the{" "}
          <span className="font-semibold text-blue-600">"Add Task"</span> button above to begin organizing your life.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}


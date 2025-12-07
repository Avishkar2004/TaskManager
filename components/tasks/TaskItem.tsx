"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditTaskDialog from "./EditTaskDialog";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: () => void;
}

/**
 * Task item component
 * Displays a single task with options to edit, delete, and toggle completion
 */
export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  // Handle toggle completion
  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Task marked as ${!task.completed ? "completed" : "incomplete"}`,
        });
        // Dispatch event to notify TaskList to refresh
        window.dispatchEvent(new Event("task-list-refresh"));
        onUpdate();
      } else {
        toast({
          title: "Error",
          description: "Failed to update task",
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
      setIsUpdating(false);
    }
  };

  return (
    <Card className={`group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
      task.completed 
        ? "opacity-70 bg-gradient-to-r from-gray-50 to-gray-100/50 border-gray-200" 
        : "bg-white border-gray-200 hover:border-blue-200 shadow-sm"
    }`}>
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Completion toggle button */}
          <button
            onClick={handleToggleComplete}
            disabled={isUpdating}
            className="mt-0.5 flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50"
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <div className="relative">
                <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-green-500 drop-shadow-sm" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse" />
              </div>
            ) : (
              <Circle className="h-7 w-7 sm:h-8 sm:w-8 text-gray-300 hover:text-blue-500 transition-colors duration-200" />
            )}
          </button>

          {/* Task content */}
          <div className="flex-1 min-w-0 space-y-2">
            <h3
              className={`font-semibold text-base sm:text-lg leading-tight transition-all ${
                task.completed 
                  ? "line-through text-muted-foreground" 
                  : "text-gray-900 group-hover:text-gray-950"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-sm leading-relaxed transition-all ${
                  task.completed 
                    ? "line-through text-muted-foreground/70" 
                    : "text-muted-foreground"
                }`}
              >
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2 pt-1">
              <p className="text-xs text-muted-foreground font-medium">
                Created {new Date(task.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
              {task.completed && (
                <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <EditTaskDialog task={task} onUpdate={onUpdate}>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 hover:scale-105"
              >
                <span className="hidden sm:inline">Edit</span>
                <span className="sm:hidden">✏️</span>
              </Button>
            </EditTaskDialog>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="hover:bg-red-600 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-1.5">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


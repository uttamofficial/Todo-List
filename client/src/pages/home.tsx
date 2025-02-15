import { useState } from "react";
import { TaskList } from "@/components/tasks/task-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/task-form";
import { Task } from "@shared/schema";
import { ThemeSwitcher } from "@/components/theme-switcher";

type FilterType = "all" | "completed" | "priority";
type PriorityFilter = 1 | 2 | 3;

export default function Home() {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>(1);

  const filterTabs = [
    { label: "All", value: "all" as const },
    { label: "Low", value: "priority" as const, priority: 1 },
    { label: "Medium", value: "priority" as const, priority: 2 },
    { label: "High", value: "priority" as const, priority: 3 },
    { label: "Completed", value: "completed" as const },
  ];

  const filterTask = (task: Task) => {
    if (filterType === "all") return true;
    if (filterType === "completed") return task.completed;
    if (filterType === "priority") return task.priority === priorityFilter && !task.completed;
    return true;
  };

  const handleTabClick = (tab: typeof filterTabs[0]) => {
    setFilterType(tab.value);
    if (tab.value === "priority" && "priority" in tab) {
      setPriorityFilter(tab.priority as PriorityFilter);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">Tasks</h1>
          <div className="flex items-center">
            <ThemeSwitcher />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600">
                  <Plus className="h-5 w-5 mr-1" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <TaskForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-1 mb-6 flex gap-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                filterType === tab.value &&
                (tab.value !== "priority" || tab.priority === priorityFilter)
                  ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                  : "hover:bg-white/50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <TaskList filterFn={filterTask} />
      </div>
    </div>
  );
}
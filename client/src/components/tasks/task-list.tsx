import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { TaskCard } from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  filterFn?: (task: Task) => boolean;
}

export function TaskList({ filterFn = () => true }: TaskListProps) {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No tasks yet. Click "Add Task" to create your first task!
      </div>
    );
  }

  const filteredTasks = tasks.filter(filterFn).sort((a, b) => {
    // Sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by priority (high to low)
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  if (!filteredTasks.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No tasks found for the selected priority level.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
import { Badge } from "@/components/ui/badge";
import { priorityMap } from "@shared/schema";

interface PriorityBadgeProps {
  priority: number;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, color } = priorityMap[priority as keyof typeof priorityMap];
  
  return (
    <Badge className={`${color} text-white`}>
      {label}
    </Badge>
  );
}

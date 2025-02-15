import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  priority: integer("priority").notNull(), // 1: Low, 2: Medium, 3: High
  completed: boolean("completed").notNull().default(false),
});

export const insertTaskSchema = createInsertSchema(tasks)
  .omit({ id: true, completed: true })
  .extend({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().optional(),
    priority: z.number().min(1).max(3),
    dueDate: z.coerce.date(),
  });

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export const priorityMap = {
  1: { label: "Low", color: "bg-blue-500" },
  2: { label: "Medium", color: "bg-amber-500" },
  3: { label: "High", color: "bg-orange-500" },
} as const;
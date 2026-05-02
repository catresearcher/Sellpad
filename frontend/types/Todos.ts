export const priority = {
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
} as const;

export const difficulty = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  expert: "expert",
} as const;

export const priorityLabel = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
} as const;

export const difficultyLabel = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  expert: "Expert",
} as const;

export type Todo = {
  id: number;
  title: string;
  description: string;
  priority: keyof typeof priority;
  difficulty: keyof typeof difficulty;
  date: string;
};

export interface TodoProps {
  Todos: Todo[];
}

export const difficultyStyles = {
  easy: "bg-green-600/10 text-green-400",
  medium: "bg-yellow-600/10 text-yellow-400",
  hard: "bg-red-600/10 text-red-400",
  expert: "bg-purple-600/10 text-purple-400",
};

export const priorityStyles = {
  low: "bg-green-600/10 text-green-400",
  medium: "bg-yellow-600/10 text-yellow-400",
  high: "bg-red-600/10 text-red-400",
  urgent: "bg-pink-600/10 text-pink-400",
};

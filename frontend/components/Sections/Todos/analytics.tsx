import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TodoProps } from "@/types/Todos";

export default function TodoAnalytics({ Todos }: TodoProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Easy Todos</CardTitle>
          <CardDescription className="text-xs">
            All of your easy todos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">
            {Todos.filter((t) => t.difficulty === "easy").length}
          </h1>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Medium Todos</CardTitle>
          <CardDescription className="text-xs">
            All of your easy todos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">
            {Todos.filter((t) => t.difficulty === "medium").length}
          </h1>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Hard Todos</CardTitle>
          <CardDescription className="text-xs">
            All of your easy todos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">
            {Todos.filter((t) => t.difficulty === "hard").length}
          </h1>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Expert Todos</CardTitle>
          <CardDescription className="text-xs">
            All of your easy todos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">
            {Todos.filter((t) => t.difficulty === "expert").length}
          </h1>
        </CardContent>
      </Card>
    </div>
  );
}

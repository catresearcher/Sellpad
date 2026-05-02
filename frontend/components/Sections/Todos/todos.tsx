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

export default function AllTodos({ Todos }: TodoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Todos</CardTitle>
        <CardDescription className="text-xs">All of your todos</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

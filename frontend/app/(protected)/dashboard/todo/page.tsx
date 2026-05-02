import TodoAnalytics from "@/components/Sections/Todos/analytics";
import TodoChart from "@/components/Sections/Todos/chart";
import RecentTodos from "@/components/Sections/Todos/recent";
import AllTodos from "@/components/Sections/Todos/todos";
import { Todos } from "./layout";

export default function Todo() {
  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:h-[50vh]">
        <TodoChart Todos={Todos} />
        <RecentTodos Todos={Todos} />
      </div>
      <AllTodos Todos={Todos} />
    </>
  );
}

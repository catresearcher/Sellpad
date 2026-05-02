"use client";
import { difficultyStyles, priorityStyles, TodoProps } from "@/types/Products";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecentTodos({ Todos }: TodoProps) {
  const router = useRouter();
  const getBadgeClass = <T extends string>(map: Record<T, string>, key: T) =>
    map[key];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">Most Recently Added</CardTitle>
        <CardDescription className="text-xs">
          All of your most recently added todos
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Title</TableHead>
              <TableHead className="text-center">Difficulty</TableHead>
              <TableHead className="text-right">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Todos]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .slice(0, 5)
              .map((t) => (
                <TableRow
                  key={t.id}
                  onClick={() => router.push(`/dashboard/todo/${t.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium flex flex-col">
                    <h1>{t.title}</h1>
                    <p className="text-xs text-muted-foreground">
                      {t.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={getBadgeClass(difficultyStyles, t.difficulty)}
                    >
                      {t.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={getBadgeClass(priorityStyles, t.priority)}
                    >
                      {t.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="">
        <Link
          className="text-muted-foreground text-lg flex items-center gap-2"
          href={`/dashboard/todo/all`}
        >
          <span className="icon-[solar--alt-arrow-left-line-duotone]"></span>
          <p>View All</p>
        </Link>
      </CardFooter>
    </Card>
  );
}

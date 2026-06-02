import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TipTapEditor } from "@/components/Product/TipTapEditor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useWatch } from "react-hook-form";

export default function GeneralTab({ form, isPending }: any) {
  const name = useWatch({
    control: form.control,
    name: "name",
  });
  return (
    <div className="rounded-md bg-card p-6 shadow-sm flex flex-col gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter product name"
                className="h-10 text-base!"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="url_path"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Url Path
              <span className="text-muted-foreground text-xs">(optional)</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={name || "Url Path"}
                className="h-10 text-base!"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="visibility"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Visibility</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending}
              >
                <SelectTrigger className="w-full h-10! text-base!">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Unlisted">Unlisted</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <TipTapEditor
                value={field.value ?? ""}
                onChange={field.onChange}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

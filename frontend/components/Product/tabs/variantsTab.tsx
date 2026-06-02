import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, XIcon } from "@/components/assets/svgs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useFieldArray, useWatch } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../ui/button";
import { TipTapEditor } from "../TipTapEditor";

export function VariantTab({ form, isPending }: any) {
  const [openVariants, setOpenVariants] = useState<Record<string, boolean>>({});
  const watchedVariants = useWatch({
    control: form.control,
    name: "variants",
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  return (
    <div className="rounded-md border dark:border-0 bg-card p-6 shadow-sm flex flex-col gap-6">
      {fields.map((fieldItem, index) => {
        const raw = form.watch(`variants.${index}.deliverables`);

        const deliverables = typeof raw === "string" ? raw : "";

        const count = deliverables
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean).length;
        return (
          <Collapsible
            key={fieldItem.id}
            className="border rounded-md overflow-hidden"
            open={openVariants[fieldItem.id] ?? true}
            onOpenChange={(open) =>
              setOpenVariants((prev) => ({
                ...prev,
                [fieldItem.id]: open,
              }))
            }
          >
            <CollapsibleTrigger asChild>
              <div className="flex justify-between items-center p-4 cursor-pointer bg-accent dark:bg-input/30">
                <div className="flex items-center gap-2">
                  {(openVariants[fieldItem.id] ?? true) ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                  <h4 className="font-semibold">
                    {watchedVariants[index]?.name || `Variant ${index + 1}`}
                  </h4>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    disabled={isPending}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 flex flex-col gap-4">
              <FormField
                control={form.control}
                name={`variants.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Variant Name"
                        className="h-10 text-base!"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          value={field.value}
                          disabled={isPending}
                          className="h-10 text-base!"
                          onChange={(e) => {
                            let val = e.target.value.replace(/,/g, ".");
                            if (/^\d*\.?\d{0,2}$/.test(val))
                              field.onChange(val);
                          }}
                          onBlur={(e) => {
                            let val = e.target.value.replace(/,/g, ".");
                            if (val && !isNaN(parseFloat(val)))
                              field.onChange(parseFloat(val).toFixed(2));
                          }}
                          inputMode="decimal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.slashed_price`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Slashed Price{" "}
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9.99"
                          value={field.value}
                          disabled={isPending}
                          className={`h-10 ${field.value === "" && "line-through"} text-base!`}
                          onChange={(e) => {
                            let val = e.target.value.replace(/,/g, ".");
                            if (/^\d*\.?\d{0,2}$/.test(val))
                              field.onChange(val);
                          }}
                          onBlur={(e) => {
                            let val = e.target.value.replace(/,/g, ".");
                            if (val && !isNaN(parseFloat(val)))
                              field.onChange(parseFloat(val).toFixed(2));
                          }}
                          inputMode="decimal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name={`variants.${index}.min_quantity`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Min Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          value={field.value ?? 1}
                          disabled={isPending}
                          className="h-10 text-base!"
                          inputMode="numeric"
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^\d]/g, "");
                            field.onChange(val === "" ? "" : Number(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.max_quantity`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Max Quantity
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10"
                          value={field.value}
                          disabled={isPending}
                          className="h-10 text-base!"
                          inputMode="numeric"
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^\d]/g, "");
                            field.onChange(val === "" ? "" : Number(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`variants.${index}.deliverables`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deliverables</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter one deliverable per line"
                        {...field}
                        disabled={isPending}
                        className="h-32 resize-y text-base!"
                      />
                    </FormControl>
                    <div className="flex items-center text-sm gap-1 text-muted-foreground font-light">
                      <span className="icon-[ic--outline-layers] size-4"></span>
                      <p>{count} items entered</p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`variants.${index}.description`}
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
            </CollapsibleContent>
          </Collapsible>
        );
      })}
      <Button
        type="button"
        variant="outline"
        className="h-10 text-base"
        onClick={() => append({ name: "", price: "", deliverables: "" })}
        disabled={isPending}
      >
        Add Variant
      </Button>
      {fields.length === 0 && (
        <FormMessage>
          {form.formState.errors.variants?.root?.message}
        </FormMessage>
      )}
    </div>
  );
}

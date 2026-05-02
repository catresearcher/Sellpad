import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

interface FormProps {
  form: any;
  action: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: {
    type?: string;
    label?: string;
    input: {
      name: string;
      icon?: string;
      placeHolder: string;
      className?: string;
    };
  }[];
  error?: string;
  button: {
    text: string;
    disabled: any;
    className?: string;
  };
}

export default function Form({
  form,
  action,
  fields,
  error,
  button,
}: FormProps) {
  return (
    <form onSubmit={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {fields.map((f, idx) => (
          <form.Field
            key={`${f.input.placeHolder + idx}`}
            name={f.input.name}
            children={(field: any) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  {f.label && (
                    <label className="font-medium text-accent-foreground">
                      {f.label}
                    </label>
                  )}

                  {f.input.icon ? (
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={f.type && f.type}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder={f.input.placeHolder}
                      autoComplete="off"
                      icon={f.input.icon}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      name={field.name}
                      type={f.type && f.type}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder={f.input.placeHolder}
                      autoComplete="off"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={f.input.className ? f.input.className : ""}
                    />
                  )}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        ))}
        {error && <p className="text-destructive">{error}</p>}
      </div>
      <Button
        type="submit"
        disabled={button.disabled}
        className={`${button.className} ${
          button.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        {button.disabled ? <Spinner size="6" /> : `${button.text}`}
      </Button>
    </form>
  );
}

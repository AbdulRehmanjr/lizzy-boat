import { cn } from "~/lib/utils";

export const Label = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <label className={cn("text-5xl hover:cursor-pointer md:text-6xl", className)}>
    {text}
  </label>
);

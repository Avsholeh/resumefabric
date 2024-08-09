import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  name: string | null;
};

export default function RenameForm({ name }: Props) {
  return (
    <Button variant="link" className="px-0">
      <Pencil className="mr-2 h-4 w-4" />
      <span>{name}</span>
    </Button>
  );
}

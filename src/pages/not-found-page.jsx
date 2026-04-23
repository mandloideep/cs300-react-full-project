import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="grid place-items-center rounded-xl border bg-card p-8 text-center">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          The requested route does not exist.
        </p>
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}

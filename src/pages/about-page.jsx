import { useLoaderData } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutPage() {
  const data = useLoaderData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>About this starter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Using react-router data API with route loader support.</p>
        <p>Loader timestamp: {data.generatedAt}</p>
      </CardContent>
    </Card>
  );
}

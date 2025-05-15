
import { Button } from "@/components/ui/button";

export const ArticlesHeader = () => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
        Technical Articles & Insights
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Stay updated with the latest trends, best practices, and technical insights in IBM Maximo asset management and enterprise solutions.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="font-medium">
          All Articles
        </Button>
        <Button variant="outline" className="font-medium">
          Asset Management
        </Button>
        <Button variant="outline" className="font-medium">
          Development
        </Button>
      </div>
    </div>
  );
};


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Article as ArticleComponent } from "@/components/Article";
import { ArticlesHeader } from "@/components/ArticlesHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticles } from "@/services/articleService";

const Articles = () => {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <ArticlesHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {articles.map((article) => (
            <ArticleComponent
              key={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              readTime={article.readTime}
              category={article.category}
              image={article.image}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;

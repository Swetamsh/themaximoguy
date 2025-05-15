
import { Article } from "@/types/article";

export const articles: Article[] = [
  {
    id: "1",
    title: "Maximizing Asset Performance with IBM Maximo",
    description: "Learn how to leverage IBM Maximo's powerful features to optimize your asset management strategy.",
    date: "2025-04-15",
    readTime: "5 min read",
    category: "Asset Management",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Integration Best Practices",
    description: "Best practices for integrating IBM Maximo with other enterprise systems.",
    date: "2025-04-10",
    readTime: "8 min read",
    category: "Integration",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Custom Development Guide",
    description: "A comprehensive guide to custom development in IBM Maximo.",
    date: "2025-04-05",
    readTime: "10 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80"
  },
  {
    id: "4",
    title: "Predictive Maintenance Strategies",
    description: "Implementing effective predictive maintenance strategies using IBM Maximo.",
    date: "2025-04-01",
    readTime: "7 min read",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
  },
  {
    id: "5",
    title: "Mobile Solutions for Field Service",
    description: "Leveraging mobile solutions to enhance field service operations with IBM Maximo.",
    date: "2025-03-28",
    readTime: "6 min read",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
  }
];

export const getArticles = () => {
  return articles;
};

export const getArticlesByCategory = (category: string) => {
  return articles.filter(article => article.category.toLowerCase() === category.toLowerCase());
};

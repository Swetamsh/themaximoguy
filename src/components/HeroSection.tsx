
import { Button } from "@/components/ui/button";
import { Layers, Grid2x2, Hexagon, Code, BrainCircuit } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingGraphic = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute top-1/2 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    <div className="absolute -bottom-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
    
    {/* Mesh-like elements */}
    <div className="absolute top-20 right-40">
      <Grid2x2 className="w-12 h-12 text-primary/20 animate-pulse" />
    </div>
    <div className="absolute bottom-32 left-20">
      <Layers className="w-16 h-16 text-secondary/20 animate-bounce-gentle" />
    </div>
    <div className="absolute top-40 left-1/4">
      <Hexagon className="w-10 h-10 text-accent/20 animate-pulse" />
    </div>
    <div className="absolute bottom-40 right-1/4">
      <Code className="w-14 h-14 text-primary/20 animate-bounce-gentle" />
    </div>
  </div>
);

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 overflow-hidden">
      <FloatingGraphic />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-medium text-primary">AI-Powered Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary">
              Maximize Your <span className="text-secondary">Maximo</span> Investment
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Reduce your development efforts, enhance productivity, and maximize cost-effectiveness in asset management deployments with our AI-enhanced solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium bg-primary hover:bg-primary/90 transition-all duration-300">
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="font-medium hover:bg-secondary/10 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="bg-primary/10 rounded-3xl p-2 overflow-hidden">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`IBM Maximo Dashboard ${index + 1}`}
                    className={`rounded-2xl shadow-lg w-full transition-opacity duration-1000 absolute ${
                      currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ height: '330px', objectFit: 'cover' }}
                  />
                ))}
                <div style={{ height: '330px' }}></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary/10 rounded-full p-4 hidden md:block animate-bounce-gentle">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d="M12 5.67l-6 3.33v6l6 3.33L18 15v-6z" />
                    <path d="M12 5.67v6" />
                    <path d="M18 9l-6 3.33" />
                    <path d="M6 9l6 3.33" />
                    <path d="M12 18v-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* IBM Maximo-inspired Design Element with Mesh Background */}
      <div className="container mx-auto mt-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg" />
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-muted relative gap-4 md:gap-0">
          <div className="flex items-center gap-6">
            <div className="h-12 w-1 bg-primary rounded-full" />
            <p className="text-foreground font-medium">IBM Certified Maximo Partner</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-12 w-1 bg-secondary rounded-full" />
            <p className="text-foreground font-medium">Enterprise Asset Management Experts</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-12 w-1 bg-accent rounded-full" />
            <p className="text-foreground font-medium">15+ Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

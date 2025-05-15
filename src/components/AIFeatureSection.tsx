
import { useState } from "react";
import { Brain, Bot, ArrowRight, BarChart3, Zap, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIFeatureSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "Anticipate asset failures before they occur with our machine learning algorithms that analyze historical and real-time data to predict maintenance needs.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI Assistant",
      description: "Get instant answers to your Maximo questions with our intelligent virtual assistant trained on thousands of asset management scenarios.",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Anomaly Detection",
      description: "Automatically identify unusual patterns in your asset performance data that may indicate emerging problems or opportunities.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-full mb-4">
            <Brain className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Next-Gen Solutions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI-Powered Maximo <span className="text-primary">Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Harness the power of artificial intelligence to transform your asset management strategy and drive unprecedented efficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedFeature === idx 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-card hover:bg-primary/5"
                }`}
                onClick={() => setSelectedFeature(idx)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${selectedFeature === idx ? "bg-white/20" : "bg-primary/10"}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className={selectedFeature === idx ? "text-white/80" : "text-muted-foreground"}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] group">
              <img 
                src={features[selectedFeature].image}
                alt={features[selectedFeature].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-3">{features[selectedFeature].title}</h3>
                <p className="text-white/80 mb-6 max-w-lg">
                  {features[selectedFeature].description}
                </p>
                <Button className="bg-white text-primary hover:bg-white/90 w-fit">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 text-center">
            <div className="bg-white/70 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cpu className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Automation</h3>
            <p className="text-muted-foreground">
              Automate routine tasks and workflows with intelligent processes that learn and adapt over time.
            </p>
          </div>
          <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-8 text-center">
            <div className="bg-white/70 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 1 0-20z"></path>
                <path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Natural Language Processing</h3>
            <p className="text-muted-foreground">
              Interact with your Maximo system using natural language queries and commands.
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-8 text-center">
            <div className="bg-white/70 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M14 12a4 4 0 0 0 0-8H6v8"></path>
                <path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Computer Vision</h3>
            <p className="text-muted-foreground">
              Identify equipment issues using image recognition technology that detects anomalies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatureSection;


import { CheckCircle2, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DecorativePattern = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="w-24 h-24 bg-primary/5 rounded-full absolute -top-12 -left-12 blur-2xl" />
      <div className="w-32 h-32 bg-secondary/5 rounded-full absolute top-1/4 right-0 blur-2xl" />
      <div className="w-40 h-40 bg-accent/5 rounded-full absolute bottom-0 left-1/3 blur-2xl" />
    </div>
  </div>
);

const ValueSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const benefits = [
    {
      title: "Asset Optimization",
      description: "Increase asset utilization by up to 20% with AI-powered insights",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
    },
    {
      title: "Cost Reduction",
      description: "Reduce maintenance costs by 15-25% through predictive analytics",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
    },
    {
      title: "Extended Asset Life",
      description: "Extend asset lifecycle by up to 30% with smart management",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    }
  ];

  const metrics = [
    "Increase asset utilization by up to 20%",
    "Reduce maintenance costs by 15-25%",
    "Extend asset lifecycle by up to 30%",
    "Improve workforce productivity by 15-20%",
    "Decrease unplanned downtime by up to 40%",
    "Enhance regulatory compliance"
  ];

  return (
    <section id="solutions" className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden font-apple">
      <DecorativePattern />
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-full mb-4">
            <BrainCircuit className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">AI-Enhanced Value</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our AI-Powered Maximo Services?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our solutions combine 15+ years of IBM Maximo expertise with cutting-edge AI to transform asset management and maximize ROI.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="bg-card p-6 rounded-3xl shadow-lg border border-muted">
              <div className="flex gap-4 mb-6">
                {benefits.map((benefit, idx) => (
                  <Button
                    key={idx}
                    variant={selectedTab === idx ? "default" : "outline"}
                    onClick={() => setSelectedTab(idx)}
                    className={`flex-1 ${selectedTab === idx ? "bg-primary text-white" : ""}`}
                  >
                    {benefit.title}
                  </Button>
                ))}
              </div>
              
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src={benefits[selectedTab].image}
                  alt={benefits[selectedTab].title}
                  className="w-full h-64 object-cover rounded-2xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary/30 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center max-w-md px-6 backdrop-blur-sm bg-black/20 rounded-xl p-4">
                    <h3 className="text-2xl font-bold mb-2">{benefits[selectedTab].title}</h3>
                    <p>{benefits[selectedTab].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="space-y-4">
              {metrics.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/60 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                  <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h3 className="text-xl font-semibold mb-3">AI + Human Expertise</h3>
              <p className="text-muted-foreground mb-4">
                Our unique approach combines artificial intelligence with seasoned Maximo consultants to deliver smarter, faster, and more cost-effective solutions.
              </p>
              <Button className="w-full">Explore Our Approach</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

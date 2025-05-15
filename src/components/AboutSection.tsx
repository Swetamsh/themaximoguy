import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Robert Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    bio: "20+ years of IBM Maximo implementation experience across 5 continents"
  },
  {
    name: "Elena Garcia",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    bio: "IBM Certified Maximo Architect with expertise in complex integrations"
  },
  {
    name: "David Chen",
    role: "Solutions Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    bio: "Specialist in customizing Maximo for manufacturing and utilities"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About themaximoguy</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A team of dedicated IBM Maximo experts with a passion for driving operational excellence
            through world-class asset management solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-card rounded-xl overflow-hidden shadow-sm border border-muted hover:shadow-md transition-shadow duration-300">
              <div className="aspect-square overflow-hidden bg-muted">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="md:w-2/3 mb-6 md:mb-0 md:mr-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to transform your asset management?</h3>
            <p className="text-white/90 text-lg">
              Our team of IBM Maximo experts is ready to help you implement, optimize, or upgrade your asset management solution.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:text-primary shadow-md">
              Contact Us Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

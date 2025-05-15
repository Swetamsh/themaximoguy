
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "The MaximoTech Consulting team delivered a complex implementation on time and on budget. Their expertise helped us reduce downtime by 35% in the first year.",
    author: "John Anderson",
    position: "Maintenance Director",
    company: "Global Manufacturing Inc."
  },
  {
    quote: "Their deep knowledge of Maximo and industry best practices transformed our asset management approach. We've seen a 22% reduction in maintenance costs.",
    author: "Sarah Martinez",
    position: "CIO",
    company: "Energy Systems Ltd."
  },
  {
    quote: "The mobile solution they implemented has increased our field team productivity by 40%. Their support through the transition was exceptional.",
    author: "Michael Chen",
    position: "Operations Manager",
    company: "City Utilities"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've helped organizations across industries transform their asset management with IBM Maximo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-primary/5 border-muted hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <svg width="45" height="36" className="text-primary/20" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 18H9C9 12.4772 13.4772 8 19 8V12C15.6863 12 13 14.6863 13 18V18.5C13 19.3284 13.6716 20 14.5 20H18.5C19.3284 20 20 20.6716 20 21.5V30.5C20 31.3284 19.3284 32 18.5 32H14.5C13.6716 32 13 31.3284 13 30.5V18.5C13 18.3343 13.0152 18.1734 13.0435 18.0177L13.5 18ZM35.5 18H31C31 12.4772 35.4772 8 41 8V12C37.6863 12 35 14.6863 35 18V18.5C35 19.3284 35.6716 20 36.5 20H40.5C41.3284 20 42 20.6716 42 21.5V30.5C42 31.3284 41.3284 32 40.5 32H36.5C35.6716 32 35 31.3284 35 30.5V18.5C35 18.3343 35.0152 18.1734 35.0435 18.0177L35.5 18Z"></path>
                  </svg>
                </div>
                <p className="text-foreground mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to maximize your Maximo investment? Contact us today for a consultation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-muted">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your Maximo needs or challenges" 
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">Send Message</Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-primary text-white p-8 rounded-xl shadow-sm h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Building className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Our Office</p>
                    <p className="mt-1 opacity-85">
                      123 Tech Center Drive<br />
                      Suite 400<br />
                      Boston, MA 02110
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="mt-1 opacity-85">+1 (617) 555-0123</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="mt-1 opacity-85">info@maximotechconsulting.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <p className="font-medium mb-3">Working Hours</p>
                <p className="opacity-85">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p className="opacity-85">Weekend: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

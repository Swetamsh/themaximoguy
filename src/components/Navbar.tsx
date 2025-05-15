import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      toast.success("Successfully signed out!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-sm w-full fixed top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">themaximoguy</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-foreground hover:text-secondary font-medium">Services</a>
            <a href="#solutions" className="text-foreground hover:text-secondary font-medium">Solutions</a>
            <a href="#about" className="text-foreground hover:text-secondary font-medium">About Us</a>
            <a href="/articles" className="text-foreground hover:text-secondary font-medium">Articles</a>
            <a href="/chatbot" className="text-foreground hover:text-secondary font-medium">AI Assistant</a>
            <a href="#testimonials" className="text-foreground hover:text-secondary font-medium">Testimonials</a>
            <a href="#contact" className="text-foreground hover:text-secondary font-medium">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="text-primary hover:text-primary/90"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="text-primary hover:text-primary/90"
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => navigate("/signup")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        )}>
          <div className="flex flex-col space-y-3 pb-4">
            <a href="#services" className="text-foreground hover:text-secondary font-medium">Services</a>
            <a href="#solutions" className="text-foreground hover:text-secondary font-medium">Solutions</a>
            <a href="#about" className="text-foreground hover:text-secondary font-medium">About Us</a>
            <a href="/articles" className="text-foreground hover:text-secondary font-medium">Articles</a>
            <a href="/chatbot" className="text-foreground hover:text-secondary font-medium">AI Assistant</a>
            <a href="#testimonials" className="text-foreground hover:text-secondary font-medium">Testimonials</a>
            <a href="#contact" className="text-foreground hover:text-secondary font-medium">Contact</a>
            
            {user ? (
              <>
                <span className="text-sm text-muted-foreground py-2">
                  {user.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="text-primary hover:text-primary/90"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="text-primary hover:text-primary/90"
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => navigate("/signup")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

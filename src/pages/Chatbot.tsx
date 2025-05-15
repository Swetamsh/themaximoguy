import Navbar from "@/components/Navbar";
import ChatbotPage from "@/components/ChatbotPage";
import Footer from "@/components/Footer";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ChatbotPage />
      </main>
      <Footer />
    </div>
  );
};

export default Chatbot; 
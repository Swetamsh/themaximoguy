import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Bot, User, AlertCircle, Brain, Briefcase, Settings, Code, ClipboardCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
  status?: 'sending' | 'sent' | 'error' | 'context-info';
}

const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// --- Cookie Helper Functions ---
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};
// --- End Cookie Helper Functions ---

const predefinedPrompts = [
  { role: "Business Analyst", prompt: "How do I effectively gather requirements for a new software feature?", icon: Briefcase },
  { role: "Functional Analyst", prompt: "Explain the steps to configure user roles and permissions in Maximo.", icon: Settings },
  { role: "Technical Developer", prompt: "Provide code examples for interacting with the Maximo JSON API.", icon: Code },
  { role: "Test Lead", prompt: "How do I create a comprehensive test plan for a Maximo upgrade?", icon: ClipboardCheck },
];

const ChatbotPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(generateSessionId());

  // Initialize session ID using cookies
  useEffect(() => {
    const storedSessionId = getCookie('chatSessionId');
    if (!storedSessionId) {
      const newSessionId = generateSessionId();
      sessionIdRef.current = newSessionId;
      setCookie('chatSessionId', newSessionId, 1); // Store for 1 day
    } else {
      sessionIdRef.current = storedSessionId;
      // Refresh cookie expiration on activity
      setCookie('chatSessionId', storedSessionId, 1);
    }
  }, []);

  // Initialize chat history from cookies or default
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const storedHistory = getCookie('chatHistory');
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        // Basic validation
        if (Array.isArray(parsedHistory) && parsedHistory.every(msg => msg.role && msg.content && msg.timestamp)) {
            // Refresh cookie expiration on load
            setCookie('chatHistory', storedHistory, 1);
            return parsedHistory;
        }
      } catch (e) {
        console.error("Failed to parse chat history from cookie:", e);
        // Clear corrupted cookie
        setCookie('chatHistory', '', -1);
      }
    }
    // Default history if not found or invalid
    return [
      {
        role: 'bot',
        content: `👋 Hello! I'm your Maximo AI Assistant. I can help you with:\n\n• IBM Maximo implementation and configuration\n• Asset management solutions and best practices\n• Technical support and troubleshooting\n• Workflow automation and optimization\n• Integration with other systems\n\nSession ID: ${sessionIdRef.current}\n\nHow can I assist you today?`,
        timestamp: Date.now()
      }
    ];
  });

  // --- BEGIN DEBUG LOGS ---
  console.log(
    "ChatbotPage Re-render | States:",
    {
      message,
      isLoading,
      isTyping,
      chatHistoryLength: chatHistory.length
    }
  );

  useEffect(() => {
    if (chatHistory.length > 0) {
      console.log("DEBUG: chatHistory changed, last message:", chatHistory[chatHistory.length - 1]);
    }
  }, [chatHistory]);
  // --- END DEBUG LOGS ---

  // Save chat history to cookies whenever it changes
  useEffect(() => {
    if (chatHistory.length > 1 || chatHistory[0]?.role !== 'bot') { // Avoid saving just the initial bot message repeatedly
        try {
            const historyString = JSON.stringify(chatHistory);
            setCookie('chatHistory', historyString, 1); // Store for 1 day
        } catch (e) {
            console.error("Failed to save chat history to cookie:", e);
        }
    }
  }, [chatHistory]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleTestSupabaseConnection = async () => {
    if (!supabase) {
      console.error("Supabase client is not initialized. Check your .env file or environment variables.");
      setChatHistory(prev => [...prev, {
        role: 'bot',
        content: "Supabase client is not configured. Please check environment variables and .env file.",
        timestamp: Date.now(),
        status: 'error'
      }]);
      return;
    }
    setChatHistory(prev => [...prev, {
      role: 'bot',
      content: "Testing Supabase connection...",
      timestamp: Date.now(),
      status: 'context-info' 
    }]);
    setIsLoading(true);
    try {
      // Attempt to count rows in maximo_prompts table as a simple test query
      const { count, error } = await supabase
        .from('maximo_prompts')
        .select('* ', { count: 'exact', head: true }); // Fetch only the count

      if (error) {
        console.error("Supabase connection test error:", error);
        setChatHistory(prev => [...prev, {
          role: 'bot',
          content: `Supabase connection test FAILED: ${error.message}`,
          timestamp: Date.now(),
          status: 'error'
        }]);
      } else {
        console.log("Supabase connection test successful. Count:", count);
        setChatHistory(prev => [...prev, {
          role: 'bot',
          content: `Supabase connection test SUCCESSFUL. Found ${count === null ? 'N/A' : count} entries in 'maximo_prompts'.`,
          timestamp: Date.now(),
          status: 'context-info' // Or a new 'success' status if you prefer different styling
        }]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error("Unexpected error during Supabase connection test:", err);
      setChatHistory(prev => [...prev, {
        role: 'bot',
        content: `Supabase connection test FAILED with unexpected error: ${errorMessage}`,
        timestamp: Date.now(),
        status: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRolePromptFromSupabase = async (roleName: string): Promise<string | null> => {
    if (!supabase) {
      console.error("Supabase client is not initialized. Check your .env file or environment variables.");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('maximo_prompts')
        .select('prompt')
        .eq('role', roleName)
        .single();

      if (error) {
        console.error("Error fetching prompt from Supabase for role", roleName, ":", error);
        return null;
      }

      if (data && data.prompt) {
        console.log(`Prompt fetched for ${roleName}:`, data.prompt);
        return data.prompt;
      } else {
        console.warn(`No prompt found for role "${roleName}".`);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error("Unexpected error fetching prompt for role", roleName, ":", errorMessage);
      return null;
    }
  };

  // New centralized function for sending messages to AI
  const sendMessageToAI = async (textToSend: string, initiatedByRole: boolean = false, displayTextForUserMessage?: string) => {
    const messageForChat = (initiatedByRole && displayTextForUserMessage) ? displayTextForUserMessage : textToSend;

    if (!messageForChat.trim() && !textToSend.trim()) { // Ensure there's something to show or send
      console.warn("sendMessageToAI called with effectively empty text for both display and sending.");
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageForChat.trim(), // This is what appears in chat
      timestamp: Date.now(),
      status: 'sending'
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    
    if (!initiatedByRole) {
      setMessage(""); // Clear input field only if user typed it
    }

    const actualPayloadToSend = textToSend.trim(); // This is always what goes to N8N
    const maxRetries = 2;
    let retryCount = 0;

    const attemptRequest = async (): Promise<any> => {
      try {
        console.log(`Attempt ${retryCount + 1} to connect to N8N webhook for: ${actualPayloadToSend.substring(0, 50)}...`);
        //const response = await fetch('http://localhost:5678/webhook/18c82591-ae3d-42cd-ade4-18165af95317/chat', {
        const response = await fetch('https://sailoop001.app.n8n.cloud/webhook/18c82591-ae3d-42cd-ade4-18165af95317/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          credentials: 'omit',
          body: JSON.stringify({
            message: actualPayloadToSend, // <-- MODIFIED: Ensure actual payload is sent
            timestamp: userMessage.timestamp,
            sessionId: sessionIdRef.current,
            agentType: 'langchain',
            workflowId: 'f79de9c2-bacc-4ed1-82bc-d48b97e57236'
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          // (Error handling logic from original handleSendMessage can be reused here)
          if (response.status === 500) { /* ... */ } 
          else if (response.status === 404) { /* ... */ }
          // For brevity, assuming full error handling logic is copied here.
          throw new Error(`Server error (${response.status}): ${errorText}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Request error in sendMessageToAI:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 2000));
          return attemptRequest();
        }
        throw error; // Rethrow after retries exhausted
      }
    };

    try {
      const data = await attemptRequest();
      setChatHistory(prev => prev.map(msg =>
        msg.timestamp === userMessage.timestamp ? { ...msg, status: 'sent' as 'sent' } : msg
      ));
      
      setTimeout(() => {
        setIsTyping(false); // Stop typing indicator before showing message
        const formattedResponse = formatLangChainResponse(data);
        const newBotMessage: ChatMessage = {
          role: 'bot',
          content: formattedResponse || 'I received a response but could not process it.',
          timestamp: Date.now(),
          status: 'sent'
        };
        setChatHistory(prev => [...prev, newBotMessage]);
      }, 500); // Slight delay for simulated typing

    } catch (error) {
      console.error('Failed to send message or process response in sendMessageToAI:', error);
      setIsTyping(false); // Stop typing on error
      setChatHistory(prev => prev.map(msg =>
        msg.timestamp === userMessage.timestamp ? { ...msg, status: 'error' as 'error' } : msg
      ));
      
      // Fixed error handling for TypeScript to handle unknown error type
      const errorMessage = error instanceof Error ? error.message : 'Could not connect to AI.';
      setChatHistory(prev => [...prev, {
        role: 'bot',
        content: `Error: ${errorMessage}`,
        timestamp: Date.now(),
        status: 'error'
      }]);
    } finally {
      // Ensure isLoading is set to false if this function was the sole reason for it
      // This might need careful handling if multiple async operations can set isLoading true
      // For now, assuming sendMessageToAI controls its own isLoading cycle related to sending a message.
      setIsLoading(false);
    }
  };

  // MODIFIED handleSendMessage to use the new sendMessageToAI function
  const handleSendMessage = async () => {
    if (isLoading || !message.trim()) return; 
    await sendMessageToAI(message, false); 
  };

  const handleRoleSelection = async (roleName: string) => {
    setMessage(""); // Clear any typed user input
    setIsLoading(true);

    const promptText = await fetchRolePromptFromSupabase(roleName);

    if (promptText) {
      await sendMessageToAI(promptText, true, roleName); // Send actual prompt, display roleName
    } else {
      let errorMsg = `Could not retrieve prompt for role "${roleName}". Please try another role or type your query directly.`;
      if(!supabase) errorMsg = "Database client not configured. Cannot fetch role prompts.";
      
      setChatHistory(prev => [...prev, {
        role: 'bot',
        content: errorMsg,
        timestamp: Date.now(),
        status: 'error'
      }]);
      setIsLoading(false); // Ensure loading is false if we error out here before sendMessageToAI is called
    }
  };

  const formatLangChainResponse = (response: any): string => {
    try {
      console.log('Raw response:', response);
      
      // If response is a string, try to parse it as JSON
      if (typeof response === 'string') {
        try {
          response = JSON.parse(response);
        } catch (e) {
          // If parsing fails, return the string as is
          return response;
        }
      }

      // Handle different response formats
      if (response && typeof response === 'object') {
        // Check for LangChain specific response formats
        if (response.output) {
          return response.output;
        }
        if (response.text) {
          return response.text;
        }
        if (response.message) {
          return response.message;
        }
        if (response.content) {
          return response.content;
        }
        if (response.result) {
          return response.result;
        }
        if (response.response) {
          return response.response;
        }
        if (response.answer) {
          return response.answer;
        }
        
        // If we have an array of messages
        if (Array.isArray(response)) {
          return response.map(msg => msg.content || msg.text || msg.message).join('\n\n');
        }

        // If we have a nested response object
        if (response.data) {
          return formatLangChainResponse(response.data);
        }

        // If all else fails, stringify the response
        return JSON.stringify(response, null, 2);
      }

      return 'I received a response but was unable to process it properly.';
    } catch (e) {
      console.error('Error formatting response:', e);
      return 'I encountered an error processing the response.';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/3 p-4 border border-border rounded-lg bg-muted/40 lg:sticky lg:top-24 self-start">
          <h3 className="text-lg font-semibold mb-4">Quick Start Roles</h3>
          <div className="space-y-2">
            {predefinedPrompts.map((item) => (
              <Button
                key={item.role}
                variant="ghost"
                className="w-full justify-start text-left h-auto px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                onClick={() => handleRoleSelection(item.role)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span className="font-medium">{item.role}</span>
              </Button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-secondary rounded-md text-sm text-secondary-foreground">
            Click a role name to add it to your message.
          </div>
          <div className="mt-4">
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleTestSupabaseConnection}
              disabled={isLoading}
            >
              Test DB Connection
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-2/3 h-[70vh] bg-background border border-border rounded-lg overflow-hidden">
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto p-6 space-y-4"
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  chat.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {chat.role === 'bot' && (
                  <div className="p-2 bg-primary rounded-full text-primary-foreground">
                    <Bot size={20} />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    chat.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{chat.content}</p>
                  <div className={`text-xs mt-1 ${chat.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'} flex items-center gap-1 ${chat.role === 'user' ? 'justify-end' : ''}`}>
                    <span>{formatTimestamp(chat.timestamp)}</span>
                    {chat.role === 'user' && chat.status === 'sending' && <Loader2 size={12} className="animate-spin" />}
                    {chat.role === 'user' && chat.status === 'error' && <AlertCircle size={12} className="text-destructive" />}
                  </div>
                </div>
                {chat.role === 'user' && (
                  <div className="p-2 bg-secondary rounded-full text-secondary-foreground">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3 p-3">
                <div className="p-2 bg-primary rounded-full text-primary-foreground flex-shrink-0">
                  <Bot size={20} />
                </div>
                <div className="rounded-lg p-3 bg-muted">
                  <Loader2 className="animate-spin h-5 w-5 text-primary" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-4 bg-background mt-auto">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Maximo Assist AI <Brain size={12} className="inline ml-1" /> Session ID: {sessionIdRef.current}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 
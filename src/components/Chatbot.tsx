"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  X,
  Bot,
  User,
  Sparkles,
  Zap,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];
}

interface ConversationContext {
  lastTopic?: string;
  questionCount: number;
  userIntent: "general" | "skills" | "projects" | "experience" | "contact";
}

const quickReplyQuestions = [
  "What are your main skills?",
  "Tell me about your projects",
  "What's your experience?",
  "How can I contact you?",
  "What certifications do you have?"
];

const contextualResponses = {
  greetings: [
    "👋 Hey there! I'm your personal guide to Srachet's cybersecurity portfolio. What sparks your interest today?",
    "🚀 Welcome! I can help you explore Srachet's expertise in cybersecurity, cloud security, and DevSecOps. What would you like to discover?",
    "🔐 Hi! Ready to dive into Srachet's security-focused portfolio? I'm here to help you find exactly what you need!"
  ],
  skills: [
    "🛡️ Srachet's cybersecurity arsenal includes:\n\n**Core Skills:**\n• Penetration Testing & Vulnerability Assessment\n• Cloud Security (AWS, Azure, GCP)\n• DevSecOps & Security Automation\n• Security Architecture & Design\n• Incident Response & Threat Detection\n\n**Specializations:**\n• Network Security & Firewall Management\n• Compliance Frameworks (ISO 27001, NIST, SOC 2)\n• Secure Coding Practices\n• Risk Assessment & Management\n\nWant to dive deeper into any of these areas?",
    "⚡ Srachet brings expertise across the full security spectrum:\n\n**Technical Skills:**\n• Security Tool Development\n• SIEM Implementation\n• Threat Hunting\n• Security Monitoring\n\n**Leadership Skills:**\n• Security Team Management\n• Security Strategy Development\n• Vendor Assessment\n• Security Training\n\nWhich area interests you most?"
  ],
  projects: [
    "🚀 Srachet's project portfolio showcases real-world security solutions:\n\n**Recent Highlights:**\n• Cloud Security Automation Platform\n• Vulnerability Management System\n• Security Incident Response Framework\n• Penetration Testing Tools\n• Compliance Automation Solutions\n\nEach project demonstrates practical application of security principles. Would you like details about specific implementations or technologies used?",
    "💡 From concept to deployment, Srachet's projects include:\n\n**Security Tools:**\n• Custom SIEM dashboards\n• Automated security scanning\n• Threat intelligence platforms\n\n**Infrastructure Projects:**\n• Secure cloud migrations\n• Network security overhauls\n• Zero-trust implementations\n\nWhat type of project interests you most?"
  ],
  experience: [
    "📈 Srachet's professional journey spans key security domains:\n\n**Leadership Roles:**\n• Security Architecture & Strategy\n• Security Operations Management\n• Incident Response Leadership\n• Security Team Building\n\n**Hands-on Expertise:**\n• Penetration Testing Lead\n• Security Consultant\n• Compliance Auditor\n• Security Trainer\n\nThe experience combines technical depth with strategic vision. Which aspect would you like to explore?"
  ],
  contact: [
    "📬 Connect with Srachet through multiple channels:\n\n**Direct Communication:**\n• Email: {email}\n• Professional inquiries preferred\n\n**Professional Network:**\n• LinkedIn: {linkedin}\n• GitHub: {github}\n\n**For specific requests:}\n• Project collaborations via email\n• Security consultations through LinkedIn\n• Open source contributions on GitHub\n\nHow can I help you get in touch?"
  ],
  certifications: [
    "🏆 Srachet's commitment to continuous learning is reflected in:\n\n**Security Certifications:**\n• Various cybersecurity certifications\n• Cloud security credentials\n• Compliance framework certifications\n\n**Professional Development:**\n• Regular security training\n• Industry conference participation\n• Continuous skill updates\n\nCertifications validate expertise across multiple security domains. Which area interests you?"
  ]
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: contextualResponses.greetings[0],
      sender: "bot",
      timestamp: new Date(),
      quickReplies: quickReplyQuestions
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectIntent = (input: string): ConversationContext['userIntent'] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('skill') || lowerInput.includes('expertise') || lowerInput.includes('technology')) {
      return "skills";
    }
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return "projects";
    }
    if (lowerInput.includes('experience') || lowerInput.includes('background') || lowerInput.includes('career')) {
      return "experience";
    }
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return "contact";
    }
    if (lowerInput.includes('certification') || lowerInput.includes('cert') || lowerInput.includes('qualified')) {
      return "contact";
    }
    return "general";
  };

  const generateBotResponse = (userInput: string): { content: string; quickReplies?: string[] } => {
    const intent = detectIntent(userInput);
    
    let response: string;
    let quickReplies: string[] = [];
    
    if (userInput.toLowerCase().match(/^(hi|hello|hey|greetings)/)) {
      response = contextualResponses.greetings[Math.floor(Math.random() * contextualResponses.greetings.length)];
      quickReplies = quickReplyQuestions;
    } else if (intent === "skills") {
      response = contextualResponses.skills[Math.floor(Math.random() * contextualResponses.skills.length)];
      quickReplies = ["Tell me more about penetration testing", "What about cloud security?", "DevSecOps experience?"];
    } else if (intent === "projects") {
      response = contextualResponses.projects[Math.floor(Math.random() * contextualResponses.projects.length)];
      quickReplies = ["Show me recent projects", "Technical details?", "Project outcomes?"];
    } else if (intent === "experience") {
      response = contextualResponses.experience[Math.floor(Math.random() * contextualResponses.experience.length)];
      quickReplies = ["Leadership experience?", "Technical background?", "Career progression?"];
    } else if (intent === "contact") {
      response = contextualResponses.contact[0]
        .replace('{email}', portfolioData.contact.email)
        .replace('{linkedin}', portfolioData.contact.linkedin)
        .replace('{github}', portfolioData.contact.github);
      quickReplies = ["Send an email", "Connect on LinkedIn", "View GitHub"];
    } else if (userInput.toLowerCase().includes('certification')) {
      response = contextualResponses.certifications[0];
      quickReplies = ["Security certifications", "Cloud certifications", "Compliance training"];
    } else {
      const responses = [
        "🤔 Interesting question! Let me help you explore Srachet's portfolio. What specific area interests you most - skills, projects, or experience?",
        "💭 I'd be happy to help! Srachet's portfolio covers cybersecurity, cloud security, and DevSecOps. What would you like to focus on?",
        "🎯 Great question! To give you the most relevant information, are you interested in technical skills, specific projects, or professional experience?"
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
      quickReplies = quickReplyQuestions;
    }
    

    
    return { content: response, quickReplies };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setPulseAnimation(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setPulseAnimation(false);
    }, 1200 + Math.random() * 800);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-2xl",
          "bg-gradient-to-r from-primary via-primary/90 to-primary/80",
          "text-white border-0 hover:scale-110 transition-all duration-300",
          "hover:shadow-primary/25 hover:shadow-3xl",
          pulseAnimation && "animate-pulse",
          "relative overflow-hidden group"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
        <MessageCircle className="h-7 w-7 relative z-10" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-background" />
        <span className="sr-only">Open chat</span>
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 z-50 shadow-2xl border-0 overflow-hidden",
        "bg-gradient-to-br from-background via-background/98 to-background/95",
        "backdrop-blur-xl backdrop-saturate-150",
        isMinimized ? "w-80 h-14" : "w-[420px] h-[680px] max-h-[85vh]",
        "transition-all duration-500 ease-out",
        "ring-1 ring-primary/10 shadow-primary/5"
      )}
    >
      {/* Header with gradient */}
      <div className={cn(
        "relative p-4 border-b border-border/30",
        "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:skew-x-12"
      )}>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-foreground">Security Assistant</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Online • Ready to help</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 hover:bg-primary/10 transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-destructive/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container with enhanced styling */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-10rem)] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[90%] animate-in slide-in-from-bottom-2 fade-in-0",
                  "duration-300 ease-out",
                  message.sender === "user" ? "ml-auto" : "mr-auto",
                  index === messages.length - 1 && "animate-pulse-once"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                  message.sender === "bot" 
                    ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20" 
                    : "bg-gradient-to-br from-primary to-primary/80 border-0"
                )}>
                  {message.sender === "bot" ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                      "transition-all duration-200 hover:shadow-md",
                      message.sender === "user"
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white"
                        : "bg-muted/50 text-foreground border border-border/20 backdrop-blur-sm"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.quickReplies && (
                    <div className="flex flex-wrap gap-2 ml-1">
                      {message.quickReplies.slice(0, 3).map((reply, replyIndex) => (
                        <Button
                          key={replyIndex}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className={cn(
                            "text-xs h-7 px-3 rounded-full",
                            "border-primary/20 hover:border-primary/40 hover:bg-primary/5",
                            "transition-all duration-200 hover:scale-105",
                            "animate-in slide-in-from-left-2 fade-in-0",
                            "duration-300 delay-100"
                          )}
                          style={{ animationDelay: `${(index * 50) + (replyIndex * 100) + 200}ms` }}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[90%] mr-auto animate-in slide-in-from-bottom-2 fade-in-0 duration-300">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Bot className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div className="bg-muted/50 text-foreground border border-border/20 rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-4 border-t border-border/30 bg-gradient-to-b from-transparent to-background/80">
            <div className="space-y-3">
              {/* Suggested questions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2 fade-in-0 duration-500">
                  {quickReplyQuestions.slice(0, 4).map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuickReply(question)}
                      className={cn(
                        "text-xs h-8 px-3 rounded-full",
                        "bg-muted/50 hover:bg-muted/70 border border-border/30",
                        "transition-all duration-200 hover:scale-105 hover:shadow-sm",
                        "animate-in slide-in-from-top-2 fade-in-0"
                      )}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-primary/60" />
                      {question}
                    </Button>
                  ))}
                </div>
              )}
              
              {/* Input field with enhanced styling */}
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isTyping ? "Security assistant is thinking..." : "Ask about cybersecurity, projects, or expertise..."}
                    className={cn(
                      "w-full px-4 py-3 pr-12 text-sm bg-background/80",
                      "border border-border/40 rounded-2xl",
                      "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
                      "transition-all duration-200 placeholder:text-muted-foreground/60",
                      "backdrop-blur-sm",
                      isTyping && "opacity-70"
                    )}
                    disabled={isTyping}
                  />
                  {inputValue && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-2xl shadow-lg",
                    "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                    "border-0 transition-all duration-200",
                    "hover:scale-105 hover:shadow-primary/25 hover:shadow-xl",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    "relative overflow-hidden group"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-500" />
                  <Send className="h-5 w-5 relative z-10" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  <span>Secure assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-primary/60" />
                  <span>Powered by cybersecurity expertise</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
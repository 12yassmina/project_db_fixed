import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your World Cup 2030 assistant. How can I help you today?", // <-- double quotes
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: Record<string, string> = {
    'hello': 'Hello! Welcome to Morocco World Cup 2030. How can I assist you?',
    'hi': 'Hi there! Im here to help with any questions about the World Cup 2030.',
    'tickets': 'For tickets, visit our official ticketing page. Prices start from $50 for group stage matches.',
    'hotels': 'We have partnerships with over 500 hotels across Morocco. Check our accommodation section for the best deals.',
    'transport': 'Free shuttle buses will connect all stadiums. High-speed trains operate between major cities.',
    'stadiums': 'Morocco will host matches in 6 modern stadiums, including the worlds largest - Grand Stade Hassan II.',
    'cities': 'The tournament will be held in Casablanca, Rabat, Marrakech, Tangier, Fez, and Agadir.',
    'food': 'Experience authentic Moroccan cuisine! Try tagine, couscous, and mint tea at local restaurants.',
    'weather': 'June-July weather in Morocco: 25-35°C, mostly sunny. Perfect for football!',
    'languages': 'Official languages: Arabic, Berber, French. English is widely spoken in tourist areas.',
    'visa': 'Many countries have visa-free access to Morocco. Check with your embassy for specific requirements.',
    'emergency': 'Emergency services: Police 19, Medical 15, Fire 15. All available 24/7.',
    'currency': 'Official currency is Moroccan Dirham (MAD). ATMs and card payments widely accepted.',
    'default': 'Thank you for your question! For detailed information, please check our dedicated pages or contact our support team.'
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-morocco transition-all duration-300',
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-gradient-morocco hover:shadow-lg'
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className={cn(
          'fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-card border shadow-elegant transition-all duration-300',
          'flex flex-col'
        )}>
          {/* Header */}
          <div className="p-4 border-b bg-gradient-morocco text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">World Cup 2030 Assistant</h3>
                <p className="text-xs opacity-90">Always ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start space-x-2',
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                )}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className={cn(
                  'max-w-[280px] p-3 rounded-lg text-sm',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-card text-card-foreground border'
                )}>
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-card text-card-foreground border p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-card">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about World Cup 2030..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-gradient-morocco hover:shadow-lg"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
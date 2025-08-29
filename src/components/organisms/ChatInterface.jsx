import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import MessageInput from "@/components/molecules/MessageInput";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { conversationService } from "@/services/api/conversationService";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const ChatInterface = ({ 
  conversationId, 
  currentMode,
  onModeChange,
  onTitleUpdate,
  className = "" 
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const loadConversation = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const conversation = await conversationService.getById(conversationId);
      if (conversation) {
        setMessages(conversation.messages || []);
      }
    } catch (err) {
      setError("Не удалось загрузить диалог");
      toast.error("Ошибка загрузки диалога");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversation();
  }, [conversationId]);

  const generateAIResponse = async (userMessage) => {
    const responses = {
      general: [
        "Отличный вопрос! Позвольте мне подумать над этим...",
        "Это интересная тема. Вот что я думаю по этому поводу...",
        "Спасибо за вопрос! Я рад помочь с этим.",
        "Хороший момент для размышлений. Позвольте поделиться своими мыслями...",
      ],
      coding: [
        "```python\n# Вот пример кода, который поможет:\ndef example_function():\n    return 'Hello, World!'\n```\n\nЭтот код демонстрирует базовый подход к решению задачи.",
        "Для решения этой задачи рекомендую использовать следующий подход:\n\n1. Сначала определите требования\n2. Выберите подходящие инструменты\n3. Напишите чистый, читаемый код",
        "```javascript\n// Пример на JavaScript:\nconst solution = (input) => {\n    return input.map(item => item * 2);\n};\n```",
      ],
      creative: [
        "Какая замечательная идея для творчества! Позвольте мне развить эту тему дальше...",
        "Творчество - это удивительная способность человека. Вот несколько идей по вашему запросу...",
        "Мне нравится ваш творческий подход! Давайте создадим что-то особенное...",
      ],
      analysis: [
        "Проанализировав предоставленную информацию, я вижу следующие ключевые моменты:\n\n📊 **Основные выводы:**\n• Данные показывают четкую тенденцию\n• Необходимо учесть несколько факторов\n• Рекомендуется дополнительное исследование",
        "Базируясь на анализе, могу сделать следующие выводы:\n\n🔍 **Анализ показывает:**\n• Положительная динамика\n• Есть области для улучшения\n• Стратегические рекомендации",
      ]
    };

    const modeResponses = responses[currentMode] || responses.general;
    const randomResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)];
    
    return randomResponse;
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
      mode: currentMode
    };

    // Если это новый диалог, создаем его
    if (!conversationId) {
      try {
        const newConversation = await conversationService.create({
          title: content.length > 50 ? content.substring(0, 50) + "..." : content,
          messages: [userMessage],
          mode: currentMode
        });
        
        onTitleUpdate?.(newConversation.Id, newConversation.title);
        setMessages([userMessage]);
        
        // Генерируем ответ AI
        setIsTyping(true);
        setTimeout(async () => {
          const aiResponse = await generateAIResponse(content);
          const assistantMessage = {
            role: "assistant",
            content: aiResponse,
            timestamp: new Date().toISOString(),
            mode: currentMode
          };
          
          await conversationService.addMessage(newConversation.Id, assistantMessage);
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 1500);
        
      } catch (err) {
        toast.error("Не удалось создать диалог");
        setIsTyping(false);
      }
    } else {
      // Добавляем сообщение в существующий диалог
      try {
        await conversationService.addMessage(conversationId, userMessage);
        setMessages(prev => [...prev, userMessage]);
        
        // Генерируем ответ AI
        setIsTyping(true);
        setTimeout(async () => {
          const aiResponse = await generateAIResponse(content);
          const assistantMessage = {
            role: "assistant",
            content: aiResponse,
            timestamp: new Date().toISOString(),
            mode: currentMode
          };
          
          await conversationService.addMessage(conversationId, assistantMessage);
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 1500);
        
      } catch (err) {
        toast.error("Не удалось отправить сообщение");
        setIsTyping(false);
      }
    }
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Сообщение скопировано");
  };

  const formatMessageContent = (content) => {
    // Простая обработка markdown для кода
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    
    let formattedContent = content;
    
    // Обработка блоков кода
    formattedContent = formattedContent.replace(codeBlockRegex, (match, language, code) => {
      return `<div class="code-block my-4"><pre><code>${code.trim()}</code></pre></div>`;
    });
    
    // Обработка inline кода
    formattedContent = formattedContent.replace(inlineCodeRegex, '<code class="px-1 py-0.5 bg-gray-100 rounded text-sm">$1</code>');
    
    // Обработка bold текста
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Обработка списков
    formattedContent = formattedContent.replace(/^• (.*$)/gim, '<li class="ml-4">• $1</li>');
    
    return formattedContent;
  };

  if (loading) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <div className="flex-1 p-6">
          <Loading type="conversation" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <div className="flex-1 flex items-center justify-center">
          <Error message={error} onRetry={loadConversation} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <Empty
            title="Начните диалог"
            description="Задайте вопрос или выберите шаблон для начала общения с AI"
            icon="MessageSquare"
            className="h-full"
          />
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar type="assistant" size="md" />
                  )}
                  
                  <div className={`max-w-3xl ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div className={`
                      p-4 rounded-2xl shadow-sm
                      ${message.role === 'user' 
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white ml-12' 
                        : 'bg-white border border-gray-200'
                      }
                    `}>
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: formatMessageContent(message.content) 
                        }}
                        className={`prose prose-sm max-w-none ${
                          message.role === 'user' ? 'prose-invert' : ''
                        }`}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>
                        {format(new Date(message.timestamp), 'HH:mm', { locale: ru })}
                      </span>
                      
                      {message.role === 'assistant' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCopyMessage(message.content)}
                          className="p-1 hover:text-gray-700 transition-colors"
                          title="Копировать"
                        >
                          <ApperIcon name="Copy" size={14} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar type="user" size="md" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <Avatar type="assistant" size="md" />
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <Loading type="message" />
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
        placeholder={`Напишите сообщение в режиме "${currentMode === 'general' ? 'Общий чат' : currentMode === 'coding' ? 'Программирование' : currentMode === 'creative' ? 'Творчество' : 'Анализ'}"...`}
      />
    </div>
  );
};

export default ChatInterface;
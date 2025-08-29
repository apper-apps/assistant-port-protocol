import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { conversationService } from "@/services/api/conversationService";
import { cn } from "@/utils/cn";

const ConversationList = ({ 
  selectedConversationId, 
  onConversationSelect, 
  onNewConversation,
  className = "" 
}) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await conversationService.getAll();
      setConversations(data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch (err) {
      setError("Не удалось загрузить диалоги");
      toast.error("Ошибка загрузки диалогов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const handleDeleteConversation = async (id, e) => {
    e.stopPropagation();
    try {
      await conversationService.delete(id);
      setConversations(prev => prev.filter(conv => conv.Id !== id));
      toast.success("Диалог удален");
      
      if (selectedConversationId === id) {
        onNewConversation();
      }
    } catch (err) {
      toast.error("Не удалось удалить диалог");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) return "Сегодня";
    if (isYesterday(date)) return "Вчера";
    return format(date, "d MMM", { locale: ru });
  };

  const getModeIcon = (mode) => {
    const modeIcons = {
      general: "MessageCircle",
      coding: "Code2",
      creative: "Palette",
      analysis: "BarChart3"
    };
    return modeIcons[mode] || "MessageCircle";
  };

  const getModeColor = (mode) => {
    const modeColors = {
      general: "from-blue-500 to-blue-600",
      coding: "from-green-500 to-green-600",
      creative: "from-purple-500 to-purple-600",
      analysis: "from-orange-500 to-orange-600"
    };
    return modeColors[mode] || "from-gray-500 to-gray-600";
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className={className}>
        <div className="p-4 border-b border-gray-200">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <Loading type="sidebar" className="p-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Error 
          message={error} 
          onRetry={loadConversations}
          className="p-4" 
        />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="p-4 border-b border-gray-200">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Поиск диалогов..."
          className="mb-4"
        />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewConversation}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
        >
          <ApperIcon name="Plus" size={20} />
          Новый диалог
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <Empty
            title="Нет диалогов"
            description={searchQuery ? "Ничего не найдено" : "Создайте первый диалог"}
            actionText="Начать диалог"
            onAction={onNewConversation}
            icon="MessageSquare"
            className="py-8"
          />
        ) : (
          <AnimatePresence>
            {filteredConversations.map((conversation, index) => (
              <motion.div
                key={conversation.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "group cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-all duration-200",
                  selectedConversationId === conversation.Id && "bg-primary/5 border-primary/20"
                )}
                onClick={() => onConversationSelect(conversation.Id)}
              >
                <div className="p-4 flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center flex-shrink-0",
                    getModeColor(conversation.mode)
                  )}>
                    <ApperIcon 
                      name={getModeIcon(conversation.mode)} 
                      size={18} 
                      className="text-white" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {conversation.title}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleDeleteConversation(conversation.Id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 truncate">
                        {conversation.messages.length > 0 ? 
                          conversation.messages[conversation.messages.length - 1].content.substring(0, 40) + "..." :
                          "Нет сообщений"
                        }
                      </p>
                      <span className="text-xs text-gray-400 ml-2">
                        {formatDate(conversation.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
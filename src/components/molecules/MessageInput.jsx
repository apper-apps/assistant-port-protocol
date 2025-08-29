import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const MessageInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Введите ваше сообщение...",
  className = "" 
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && onSendMessage) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={cn(
        "flex items-end gap-3 p-4 bg-white border-t border-gray-200",
        className
      )}
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full px-4 py-3 pr-20 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 placeholder-gray-400"
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            title="Шаблоны"
          >
            <ApperIcon name="FileText" size={18} />
          </motion.button>
          
          <Button
            type="submit"
            size="sm"
            disabled={disabled || !message.trim()}
            className="px-3 py-1.5"
          >
            <ApperIcon name="Send" size={16} />
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 pb-2">
        Ctrl+Enter для отправки
      </div>
    </motion.form>
  );
};

export default MessageInput;
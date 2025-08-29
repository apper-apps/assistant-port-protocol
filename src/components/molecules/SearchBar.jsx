import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Введите название товара для поиска поставщиков...", 
  className = "",
  autoFocus = false,
  loading = false 
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
<motion.form 
      onSubmit={handleSubmit}
      className={cn("relative max-w-2xl mx-auto", className)}
    >
      <div className={cn(
        "relative flex items-center bg-white border rounded-xl shadow-lg transition-all duration-300",
        isFocused ? "border-primary ring-4 ring-primary/20 shadow-xl" : "border-gray-200 shadow-md",
        loading && "opacity-75"
      )}>
        <ApperIcon 
          name="Search" 
          size={20} 
          className={cn(
            "absolute left-4 transition-colors",
            isFocused ? "text-primary" : "text-gray-400"
          )} 
        />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={loading}
          className="w-full pl-12 pr-16 py-4 text-base bg-transparent border-0 focus:outline-none placeholder-gray-400 disabled:cursor-not-allowed"
        />
        
        <div className="absolute right-4 flex items-center gap-2">
          {loading && (
            <motion.div
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          
          {query && !loading && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleClear}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ApperIcon name="X" size={16} />
            </motion.button>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {["Электроника", "Одежда", "Дом и сад", "Авто", "Спорт"].map((suggestion) => (
          <motion.button
            key={suggestion}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQuery(suggestion);
              onSearch?.(suggestion);
            }}
            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.form>
  );
};

export default SearchBar;
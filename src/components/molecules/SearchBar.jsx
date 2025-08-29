import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Поиск...", 
  className = "",
  autoFocus = false 
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
      className={cn("relative", className)}
    >
      <div className={cn(
        "relative flex items-center bg-white border rounded-lg transition-all duration-200",
        isFocused ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
      )}>
        <ApperIcon 
          name="Search" 
          size={18} 
          className="absolute left-3 text-gray-400" 
        />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent border-0 focus:outline-none placeholder-gray-400"
        />
        
        {query && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" size={16} />
          </motion.button>
        )}
      </div>
    </motion.form>
  );
};

export default SearchBar;
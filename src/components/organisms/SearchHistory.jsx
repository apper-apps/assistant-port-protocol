import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const SearchHistory = ({ 
  searchHistory = [], 
  onSearch, 
  currentQuery = "",
  className = "" 
}) => {
  const [localQuery, setLocalQuery] = useState(currentQuery);

  const handleHistoryClick = (query) => {
    setLocalQuery(query);
    onSearch(query);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('supplyScan_searchHistory');
    // Note: In a real app, this would trigger a parent state update
  };

  const popularSearches = [
    "Bluetooth наушники",
    "Смартфон",
    "Одежда",
    "Электроника",
    "Товары для дома",
    "Спортивные товары"
  ];

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="p-4 border-b border-gray-200">
        <SearchBar
          onSearch={(query) => {
            setLocalQuery(query);
            onSearch(query);
          }}
          placeholder="Поиск товаров..."
          className="mb-4"
        />
        
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Быстрый поиск
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.slice(0, 4).map((search) => (
            <motion.button
              key={search}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleHistoryClick(search)}
              className="px-2 py-1 text-xs text-gray-600 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all duration-200"
            >
              {search}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {searchHistory.length === 0 ? (
          <Empty
            title="История пуста"
            description="Выполните поиск, чтобы увидеть историю"
            icon="History"
            className="py-8"
          />
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Недавние поиски
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearHistory}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors"
              >
                Очистить
              </motion.button>
            </div>
            
            <AnimatePresence>
              {searchHistory.map((query, index) => (
                <motion.div
                  key={`${query}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200",
                    currentQuery === query && "bg-primary/5 border border-primary/20"
                  )}
                  onClick={() => handleHistoryClick(query)}
                >
                  <ApperIcon 
                    name="History" 
                    size={16} 
                    className={cn(
                      "text-gray-400 flex-shrink-0",
                      currentQuery === query && "text-primary"
                    )} 
                  />
                  <span className={cn(
                    "text-sm text-gray-700 flex-1 truncate",
                    currentQuery === query && "text-primary font-medium"
                  )}>
                    {query}
                  </span>
                  <ApperIcon 
                    name="Search" 
                    size={14} 
                    className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <ApperIcon name="Search" size={12} className="inline-block mr-1" />
          SupplyScan - поиск поставщиков
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
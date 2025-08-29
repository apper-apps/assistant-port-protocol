import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import ModeSelector from "@/components/molecules/ModeSelector";

const Header = ({ 
  searchQuery,
  onSearch,
  onClearSearch,
  onToggleSidebar,
  className = "" 
}) => {
const getModeInfo = (mode) => {
    // Remove mode-related logic as this is now a search app
    return {};
  };

  return (
    <div className={cn(
      "bg-white border-b border-gray-200 px-6 py-4",
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={20} />
          </motion.button>

{/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Package" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text hidden sm:block">
              SupplyScan
            </h1>
          </div>

          {/* Search Status */}
          {searchQuery && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <ApperIcon name="Search" size={14} className="text-primary" />
              <span className="text-sm font-medium text-gray-700">
                Поиск: "{searchQuery.length > 20 ? searchQuery.substring(0, 20) + "..." : searchQuery}"
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <ApperIcon name="X" size={12} />
              </motion.button>
            </div>
          )}
        </div>

{/* Right Section - Quick Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSearch("")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ApperIcon name="RotateCcw" size={16} />
            <span>Очистить</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            title="Помощь"
          >
            <ApperIcon name="HelpCircle" size={20} />
          </motion.button>
        </div>

        {/* Mobile Search Status */}
        {searchQuery && (
          <div className="sm:hidden flex items-center gap-2">
            <ApperIcon name="Search" size={16} className="text-primary" />
          </div>
        )}
      </div>

{/* Mobile Mode Selector - Removed for search app */}
    </div>
  );
};

export default Header;
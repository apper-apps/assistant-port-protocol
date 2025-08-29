import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ type = "default", className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  if (type === "search") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <motion.div
          className="relative"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
            <ApperIcon name="Search" size={24} className="text-white" />
          </div>
        </motion.div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Поиск товаров...</p>
          <p className="text-sm text-gray-500">Ищем лучшие предложения от поставщиков</p>
        </div>
      </div>
    );
  }

  if (type === "spinner") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <motion.div
          className={cn("border-2 border-primary border-t-transparent rounded-full", sizeClasses[size])}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

if (type === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary rounded-full", sizeClasses[size])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "sidebar") {
    return (
      <div className={`space-y-3 ${className}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="animate-pulse flex items-center gap-3 p-3"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "message") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">AI печатает...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <motion.div
        className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Что-то пошло не так", 
  onRetry = null, 
  className = "" 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
      >
        <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Упс! Произошла ошибка
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 glow-on-hover"
        >
          <ApperIcon name="RotateCcw" size={18} />
          Попробовать снова
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Пусто здесь", 
  description = "Пока нет данных для отображения", 
  actionText = "Начать",
  onAction = null,
  icon = "Inbox",
  className = "" 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} size={36} className="text-gray-400" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 glow-on-hover"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;
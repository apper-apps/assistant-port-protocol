import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const modes = [
  {
    id: "general",
    name: "Общий чат",
    description: "Вопросы и общение",
    icon: "MessageCircle",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "coding",
    name: "Программирование",
    description: "Код и разработка",
    icon: "Code2",
    color: "from-green-500 to-green-600"
  },
  {
    id: "creative",
    name: "Творчество",
    description: "Тексты и идеи",
    icon: "Palette",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "analysis",
    name: "Анализ",
    description: "Данные и выводы",
    icon: "BarChart3",
    color: "from-orange-500 to-orange-600"
  }
];

const ModeSelector = ({ selectedMode, onModeChange, className = "" }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {modes.map((mode) => (
        <motion.button
          key={mode.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeChange(mode.id)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all duration-200 text-left",
            selectedMode === mode.id
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white hover:border-gray-300"
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center",
              mode.color
            )}>
              <ApperIcon name={mode.icon} size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">
                {mode.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {mode.description}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ModeSelector;
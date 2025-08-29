import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ModeSelector from "@/components/molecules/ModeSelector";
import { cn } from "@/utils/cn";

const Header = ({ 
  currentMode, 
  onModeChange, 
  onToggleSidebar,
  className = "" 
}) => {
  const getModeInfo = (mode) => {
    const modes = {
      general: { name: "Общий чат", icon: "MessageCircle", color: "from-blue-500 to-blue-600" },
      coding: { name: "Программирование", icon: "Code2", color: "from-green-500 to-green-600" },
      creative: { name: "Творчество", icon: "Palette", color: "from-purple-500 to-purple-600" },
      analysis: { name: "Анализ", icon: "BarChart3", color: "from-orange-500 to-orange-600" }
    };
    return modes[mode] || modes.general;
  };

  const modeInfo = getModeInfo(currentMode);

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
              <ApperIcon name="Bot" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text hidden sm:block">
              AI Помощник
            </h1>
          </div>

          {/* Current Mode Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <div className={cn(
              "w-6 h-6 rounded bg-gradient-to-r flex items-center justify-center",
              modeInfo.color
            )}>
              <ApperIcon name={modeInfo.icon} size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {modeInfo.name}
            </span>
          </div>
        </div>

        {/* Right Section - Mode Selector */}
        <div className="hidden sm:block">
          <ModeSelector
            selectedMode={currentMode}
            onModeChange={onModeChange}
          />
        </div>

        {/* Mobile Mode Indicator */}
        <div className="sm:hidden flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
            modeInfo.color
          )}>
            <ApperIcon name={modeInfo.icon} size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Mode Selector */}
      <div className="sm:hidden mt-4">
        <ModeSelector
          selectedMode={currentMode}
          onModeChange={onModeChange}
        />
      </div>
    </div>
  );
};

export default Header;
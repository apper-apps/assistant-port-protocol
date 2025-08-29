import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Avatar = ({ 
  src, 
  alt = "", 
  size = "md", 
  fallback = "U",
  type = "user",
  className = "" 
}) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg"
  };

  const getBackgroundColor = () => {
    if (type === "assistant") {
      return "bg-gradient-to-br from-primary to-purple-600";
    }
    return "bg-gradient-to-br from-gray-400 to-gray-600";
  };

  const getIcon = () => {
    if (type === "assistant") {
      return <ApperIcon name="Bot" className="w-1/2 h-1/2 text-white" />;
    }
    return <ApperIcon name="User" className="w-1/2 h-1/2 text-white" />;
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center font-medium text-white",
        sizes[size],
        getBackgroundColor(),
        className
      )}
    >
      {type === "assistant" || type === "user" ? getIcon() : fallback}
    </div>
  );
};

export default Avatar;
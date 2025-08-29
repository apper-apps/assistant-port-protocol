import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import ConversationList from "@/components/organisms/ConversationList";
import { cn } from "@/utils/cn";

const Layout = ({ children, ...headerProps }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <Header 
        onToggleSidebar={toggleSidebar}
        {...headerProps}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Static positioned */}
        <aside className="hidden lg:flex w-80 bg-white border-r border-gray-200 flex-col">
          <ConversationList 
            selectedConversationId={headerProps.selectedConversationId}
            onConversationSelect={headerProps.onConversationSelect}
            onNewConversation={headerProps.onNewConversation}
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              />
              
              {/* Mobile Sidebar */}
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50"
              >
                <div className="h-full flex flex-col">
                  {/* Mobile sidebar header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Диалоги</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeSidebar}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Mobile sidebar content */}
                  <div className="flex-1 overflow-hidden">
                    <ConversationList 
                      selectedConversationId={headerProps.selectedConversationId}
                      onConversationSelect={(id) => {
                        headerProps.onConversationSelect(id);
                        closeSidebar();
                      }}
                      onNewConversation={() => {
                        headerProps.onNewConversation();
                        closeSidebar();
                      }}
                    />
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
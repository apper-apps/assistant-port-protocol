import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import ChatInterface from "@/components/organisms/ChatInterface";

const ChatPage = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [currentMode, setCurrentMode] = useState("general");
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  useEffect(() => {
    if (conversationId) {
      setSelectedConversationId(parseInt(conversationId));
    } else {
      setSelectedConversationId(null);
    }
  }, [conversationId]);

  const handleConversationSelect = (id) => {
    setSelectedConversationId(id);
    navigate(`/chat/${id}`);
  };

  const handleNewConversation = () => {
    setSelectedConversationId(null);
    navigate("/");
  };

  const handleTitleUpdate = (newConversationId, title) => {
    setSelectedConversationId(newConversationId);
    navigate(`/chat/${newConversationId}`);
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <Layout
      currentMode={currentMode}
      onModeChange={handleModeChange}
      selectedConversationId={selectedConversationId}
      onConversationSelect={handleConversationSelect}
      onNewConversation={handleNewConversation}
    >
      <ChatInterface
        conversationId={selectedConversationId}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        onTitleUpdate={handleTitleUpdate}
        className="flex-1"
      />
    </Layout>
  );
};

export default ChatPage;
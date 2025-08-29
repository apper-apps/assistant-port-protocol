import conversationsData from "../mockData/conversations.json";

let conversations = [...conversationsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const conversationService = {
  getAll: async () => {
    await delay(300);
    return conversations.map(conv => ({ ...conv }));
  },

  getById: async (id) => {
    await delay(200);
    const conversation = conversations.find(conv => conv.Id === parseInt(id));
    return conversation ? { ...conversation } : null;
  },

  create: async (conversationData) => {
    await delay(400);
    const newId = Math.max(...conversations.map(c => c.Id), 0) + 1;
    const newConversation = {
      Id: newId,
      ...conversationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    conversations.push(newConversation);
    return { ...newConversation };
  },

  update: async (id, updateData) => {
    await delay(350);
    const index = conversations.findIndex(conv => conv.Id === parseInt(id));
    if (index !== -1) {
      conversations[index] = {
        ...conversations[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      return { ...conversations[index] };
    }
    return null;
  },

  delete: async (id) => {
    await delay(250);
    const index = conversations.findIndex(conv => conv.Id === parseInt(id));
    if (index !== -1) {
      conversations.splice(index, 1);
      return true;
    }
    return false;
  },

  addMessage: async (conversationId, message) => {
    await delay(300);
    const conversation = conversations.find(conv => conv.Id === parseInt(conversationId));
    if (conversation) {
      const newMessage = {
        ...message,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      conversation.messages.push(newMessage);
      conversation.updatedAt = new Date().toISOString();
      return { ...newMessage };
    }
    return null;
  }
};
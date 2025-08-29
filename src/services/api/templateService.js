import templatesData from "../mockData/templates.json";

let templates = [...templatesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const templateService = {
  getAll: async () => {
    await delay(200);
    return templates.map(template => ({ ...template }));
  },

  getById: async (id) => {
    await delay(150);
    const template = templates.find(t => t.Id === parseInt(id));
    return template ? { ...template } : null;
  },

  getByCategory: async (category) => {
    await delay(200);
    return templates
      .filter(t => t.category === category)
      .map(template => ({ ...template }));
  },

  create: async (templateData) => {
    await delay(300);
    const newId = Math.max(...templates.map(t => t.Id), 0) + 1;
    const newTemplate = {
      Id: newId,
      ...templateData
    };
    templates.push(newTemplate);
    return { ...newTemplate };
  },

  update: async (id, updateData) => {
    await delay(250);
    const index = templates.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      templates[index] = { ...templates[index], ...updateData };
      return { ...templates[index] };
    }
    return null;
  },

  delete: async (id) => {
    await delay(200);
    const index = templates.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      templates.splice(index, 1);
      return true;
    }
    return false;
  }
};
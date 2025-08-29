import settingsData from "../mockData/settings.json";

let settings = { ...settingsData };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const settingsService = {
  get: async () => {
    await delay(150);
    return { ...settings };
  },

  update: async (updateData) => {
    await delay(200);
    settings = { ...settings, ...updateData };
    return { ...settings };
  },

  reset: async () => {
    await delay(200);
    settings = { ...settingsData };
    return { ...settings };
  }
};
import { defineStore } from "pinia";
import { getSetting } from "@/api";

export const useConfigStore = defineStore("config", {
  state: (): State => ({
    config: {
      platform: {
        market: [],
        given: [],
        uplink: []
      },
      collection: {
        date: [],
        platform: [],
        model: []
      },
      airdrop: {
        month: [],
        platform: [],
        requirement: []
      }
    }
  }),
  getters: {
    platform: (state) => state.config.platform,
    collection: (state) => state.config.collection,
    airdrop: (state) => state.config.airdrop,
    modelMap: (state): ModelMap => {
      const map: ModelMap = {};
      state.config.collection?.model.forEach(
        (item) => (map[String(item.value)] = item.text)
      );
      return map;
    }
  },
  actions: {
    async getConfig() {
      const res = await getSetting();
      this.setConfig(res);
    },
    setConfig(payload: Config) {
      this.config = payload;
    }
  }
});

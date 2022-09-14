import { defineStore } from "pinia";
import browser from "@/utils/browser";

export const useRootStore = defineStore("root", {
  state: () => ({
    browser
  })
});

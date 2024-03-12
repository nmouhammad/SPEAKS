/**
 * This store saves allinformation related to the presentation plan the user created.
 */
import { defineStore } from 'pinia'
export const usePresentationPlanStore = defineStore('PresentationPlanStore', {
  state: () => ({
    introductionType: ''
  }),
  actions: {
    /**
     * Set the introduction type
     * @param {String} chosenIntroductionType
     */
    setIntroductionType(chosenIntroductionType) {
      this.introductionType = chosenIntroductionType
    }
  },
  /**
   * Get the introductionType
   */
  getters: {
    getIntroductionType: (state) => {
      state.introductionType
    }
  }
})

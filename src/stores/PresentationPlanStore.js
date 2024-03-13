/**
 * This store saves allinformation related to the presentation plan the user created.
 */
import { defineStore } from 'pinia'
export const usePresentationPlanStore = defineStore('PresentationPlanStore', {
  state: () => ({
    introductionType: '',
    introductionContent: []
  }),
  actions: {
    /**
     * Set the introduction type
     * @param {String} chosenIntroductionType
     */
    setIntroductionType(chosenIntroductionType) {
      this.introductionType = chosenIntroductionType
    },
    addIntroductionContent(content) {
      this.introductionContent.push(content)
    },
    removeFromIntroductionContent(toDeleteObject) {
      console.log('remove intro content: ' + toDeleteObject)
      let id = toDeleteObject.toRemove
      this.introductionContent.splice(id, 1)
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

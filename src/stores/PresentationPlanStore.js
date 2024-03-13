/**
 * This store saves allinformation related to the presentation plan the user created.
 */
import { defineStore } from 'pinia'
export const usePresentationPlanStore = defineStore('PresentationPlanStore', {
  state: () => ({
    introductionType: '',
    /**
     * Array containing the content of the introduction of the user's presentation
     */
    introductionContent: [],
    /**
     * Array containing the content of the end of the user's presentation
     */
    endContent: []
  }),
  actions: {
    /**
     * Set the introduction type
     * @param {String} chosenIntroductionType
     */
    setIntroductionType(chosenIntroductionType) {
      this.introductionType = chosenIntroductionType
    },

    /**
     * Add content to the introductionContent
     * @param {String} content
     */
    addIntroductionContent(content) {
      this.introductionContent.push(content)
    },

    /**
     * Remove content with the given ID from introductionContent
     * @param {Object} toDeleteObject (has attribute toRemove containing the ID)
     */
    removeFromIntroductionContent(toDeleteObject) {
      let id = toDeleteObject.toRemove
      this.introductionContent.splice(id, 1)
    },

    /**
     * Add content to the endContent
     * @param {String} content
     */
    addEndContent(content) {
      this.endContent.push(content)
    },

    /**
     * Remove content with the given ID from endContent
     * @param {Object} toDeleteObject (has attribute toRemove containing the ID)
     */
    removeFromEndContent(toDeleteObject) {
      let id = toDeleteObject.toRemove
      this.endContent.splice(id, 1)
    }
  },
  getters: {
    /**
     * Get the introductionType
     */
    getIntroductionType: (state) => {
      state.introductionType
    }
  }
})

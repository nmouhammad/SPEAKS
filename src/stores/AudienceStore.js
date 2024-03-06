/**
 * This store stores all information the user entered about the audience
 */
import { defineStore } from 'pinia'

export const useAudienceStore = defineStore('AudienceStore', {
  state: () => {
    // eslint-disable-next-line no-unused-labels
    knowledgeBeginning: [] // contains the knowledge the audience has in the beginning
  },
  actions: {
    /**
     * Add the given content as another element to the array knowledgeBeginning which
     * contains the knowledge the audience has in the beginning
     * @param {String} content that should be added
     */
    addToknowledgeBeginning(content) {
      this.knowledgeBeginning.push(content)
    }
  },
  getters: {}
})

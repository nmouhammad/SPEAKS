/**
 * This store stores all information the user entered about the audience
 */
import { defineStore } from 'pinia'

export const useAudienceStore = defineStore('AudienceStore', {
  state: () => ({
    // eslint-disable-next-line no-unused-labels
    knowledgeBeginning: [] // contains the knowledge the audience has in the beginning
  }),
  actions: {
    /**
     * Add the given content as another element to the array knowledgeBeginning which
     * contains the knowledge the audience has in the beginning
     * @param {Object} contentObject object containing the content that should be added
     */
    addToknowledgeBeginning(contentObject) {
      this.knowledgeBeginning.push(contentObject.content)
    }
  },
  getters: {}
})

/**
 * This store stores all information the user entered about the audience
 */
import { defineStore } from 'pinia'

export const useAudienceStore = defineStore('AudienceStore', {
  state: () => ({
    knowledgeBeginning: [], // contains the knowledge the audience has in the beginning,
    knowledgeEnd: [] // contains the knowledge the audience should have in the end
  }),
  actions: {
    /**
     * Add the given content as another element to the array knowledgeBeginning which
     * contains the knowledge the audience has in the beginning
     * @param {Object} contentObject object containing the content that should be added
     */
    addToknowledgeBeginning(content) {
      this.knowledgeBeginning.push(content)
    },
    /**
     * Removes the content with the given id from the array knowledgeBeginning which
     * contains the knowledge the audience has in the beginning
     * @param {Object} toDeleteObject object containing the id ("toRemove") for the
     * content to be deleted
     */
    removeFromKnowledgeBeginning(toDeleteObject) {
      let id = toDeleteObject.toRemove
      this.knowledgeBeginning.splice(id, 1)
    },
    /**
     * Add the given content as another element to the array knowledgeBeginning which
     * contains the knowledge the audience should have in the end
     * @param {Object} contentObject object containing the content that should be added
     */
    addToknowledgeEnd(content) {
      this.knowledgeEnd.push(content)
    },
    /**
     * Removes the content with the given id from the array knowledgeBeginning which
     * contains the knowledge the audience should have in the end
     * @param {Object} toDeleteObject object containing the id ("toRemove") for the
     * content to be deleted
     */
    removeFromKnowledgeEnd(toDeleteObject) {
      let id = toDeleteObject.toRemove
      this.knowledgeEnd.splice(id, 1)
    }
  },
  getters: {}
})

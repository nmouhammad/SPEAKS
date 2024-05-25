/**
 * This store stores all information the user entered about the audience
 */
import { defineStore } from 'pinia'

/**
 * Add the given content to the given collection
 * @param {String} content
 * @param {Object} collection Object containing two attributes:
 * content Element (String-Array) and nextID (Number)
 */
export function addToCollection(content, collection) {
  const contentObject = {
    text: content,
    id: collection.nextID
  }
  collection.contentElements.push(contentObject)
  collection.nextID++
}

/**
 * Remove the content with the given ID from the given collection
 * @param {Number} toDeleteID
 * @param {Object} collection Object containing two attributes:
 * content Element (String-Array) and nextID (Number)
 */
export function removeFromCollection(toDeleteID, collection) {
  const index = collection.contentElements.findIndex(
    (element) => element.id == toDeleteID
  )
  collection.contentElements.splice(index, 1)
}

export const useAudienceStore = defineStore('AudienceStore', {
  state: () => ({
    // contains the knowledge the audience has in the beginning,s
    knowledgeBeginning: {
      contentElements: [],
      nextID: 0
    },
    // contains the knowledge the audience should have in the end
    knowledgeEnd: {
      contentElements: [],
      nextID: 0
    }
  }),
  actions: {
    /**
     * Add the given content as another element to the array knowledgeBeginning which
     * contains the knowledge the audience has in the beginning
     * @param {Object} contentObject object containing the content that should be added
     */
    addToknowledgeBeginning(content) {
      addToCollection(content, this.knowledgeBeginning)
    },
    /**
     * Removes the content with the given id from the array knowledgeBeginning which
     * contains the knowledge the audience has in the beginning
     * @param {Object} toDeleteObject object containing the id ("toRemove") for the
     * content to be deleted
     */
    removeFromKnowledgeBeginning(toDeleteID) {
      removeFromCollection(toDeleteID, this.knowledgeBeginning)
    },
    /**
     * Add the given content as another element to the array knowledgeBeginning which
     * contains the knowledge the audience should have in the end
     * @param {Object} contentObject object containing the content that should be added
     */
    addToknowledgeEnd(content) {
      addToCollection(content, this.knowledgeEnd)
    },
    /**
     * Removes the content with the given id from the array knowledgeBeginning which
     * contains the knowledge the audience should have in the end
     * @param {Object} toDeleteObject object containing the id ("toRemove") for the
     * content to be deleted
     */
    removeFromKnowledgeEnd(toDeleteID) {
      removeFromCollection(toDeleteID, this.knowledgeEnd)
    }
  },
  getters: {},
  persist: {
    storage: sessionStorage
  }
})

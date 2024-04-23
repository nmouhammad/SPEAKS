/**
 * This store saves allinformation related to the presentation plan the user created.
 */
import { defineStore } from 'pinia'
import { addToCollection, removeFromCollection } from './AudienceStore'

export const usePresentationPlanStore = defineStore('PresentationPlanStore', {
  state: () => ({
    introductionType: '',
    /**
     * Array containing the content of the introduction of the user's presentation
     */
    introductionContent: {
      contentElements: [],
      nextID: 0
    },
    /**
     * Array containing the content of the end of the user's presentation
     */
    endContent: {
      contentElements: [],
      nextID: 0
    },
    /**
     * Array containing the content of the middle of the user's presentation
     */
    middleContent: {
      contentElements: [],
      nextID: 0
    },
    /**
     * Topic of the presentation / pitch
     */
    topic: ''
  }),
  actions: {
    /**
     * Set the introduction type
     * @param {String} chosenIntroductionType
     */
    setIntroductionType(chosenIntroductionType) {
      this.introductionType = chosenIntroductionType
    },

    emptyIntroductionContent() {
      this.introductionContent.contentElements = []
      this.introductionContent.nextID = 0
    },

    /**
     * Add content to the introductionContent
     * @param {String} content
     */
    addIntroductionContent(content) {
      addToCollection(content, this.introductionContent)
    },

    /**
     * Remove content with the given ID from introductionContent
     * @param {Object} toDeleteObject (has attribute toRemove containing the ID)
     */
    removeFromIntroductionContent(toDeleteID) {
      removeFromCollection(toDeleteID, this.introductionContent)
    },

    /**
     * Add content to the endContent
     * @param {String} content
     */
    addEndContent(content) {
      addToCollection(content, this.endContent)
    },

    /**
     * Remove content with the given ID from endContent
     * @param {Object} toDeleteObject (has attribute toRemove containing the ID)
     */
    removeFromEndContent(toDeleteID) {
      removeFromCollection(toDeleteID, this.endContent)
    },

    /**
     * Add content to the endContent
     * @param {String} content
     */
    addMiddleContent(content) {
      addToCollection(content, this.middleContent)
    },

    /**
     * Remove content with the given ID from endContent
     * @param {Object} toDeleteObject (has attribute toRemove containing the ID)
     */
    removeFromMiddleContent(toDeleteID) {
      removeFromCollection(toDeleteID, this.middleContent)
    },

    /**
     * Save the topic of the presentation / pitch
     * @param {String} topic of the presentation / pitch
     */
    addTopic(topic) {
      this.topic = topic
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

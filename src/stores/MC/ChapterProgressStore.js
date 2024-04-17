import { defineStore } from 'pinia'
import { useProgressStore } from '@/stores/MC/ProgressStore'

export const useChapterProgressStore = defineStore('ChapterProgressStore', {
  state: () => ({
    currentChapterID: 0,
    currentElementID: 0,
    waiting: false,
    chapterLengths: []
  }),
  actions: {
    /**
     * Adapt currentElementID and currentChapterID so that the next element
     * is shown (if there is any)
     */
    next() {
      if (!this.waiting) {
        if (
          this.currentElementID <
          this.chapterLengths[this.currentChapterID] - 1
        ) {
          this.currentElementID++
        } else if (this.currentChapterID < this.chapterLengths.length - 1) {
          this.currentChapterID++
          this.currentElementID = 0
        } else {
          // we have been through all chapters of this step. We need to start with the next step.
          useProgressStore().nextStep()
        }
      }
    },
    /**
     * Adapt currentElementID and currentChapterID so that the last shown element
     * is hidden again (if there is any)
     */
    previous() {
      if (this.currentElementID > 0) {
        this.currentElementID--
      } else if (this.currentChapterID > 0) {
        this.currentChapterID--
        this.currentElementID = this.chapterLengths[this.currentChapterID] - 1
      } else {
        // there is no previous chapter, we need to go to the previous step instead
        useProgressStore().previousStep()
      }
      if (this.waiting) {
        this.waiting = false
      }
    },
    /**
     * Initialise this class when a new step is started.
     * @param {Array} chapterLengths: Array with one number for each chapter standing for the
     * number of elements in the corresponding chapter
     * @param {String} stepAbbreviation the abbreviation of the step initialising this store
     */
    init(chapterLengths, stepAbbreviation) {
      // if the step has been visited before, we don't start at the beginning but at the
      // end of the chapter
      const startAtChapterBeginning =
        !useProgressStore().hasStepBeenFinished(stepAbbreviation)
      console.log('startAtChapterBeginning: ' + startAtChapterBeginning)
      if (startAtChapterBeginning) {
        this.currentChapterID = 0
        this.currentElementID = 0
      } else {
        this.currentChapterID = chapterLengths.length - 1
        this.currentElementID = chapterLengths.slice(-1)
      }
      this.waiting = false
      this.chapterLengths = chapterLengths
    },
    /**
     * Start waiting for user input. While waiting, the "next" function does not work.
     */
    setWaiting() {
      this.waiting = true
    },

    /**
     * Stop waiting for user input. Afterwards, the "next" function works again.
     */
    unsetWaiting() {
      if (this.waiting) {
        this.waiting = false
        this.next()
      }
    }
  }
})

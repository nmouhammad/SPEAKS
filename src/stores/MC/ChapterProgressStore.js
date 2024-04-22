import { defineStore } from 'pinia'
import { useProgressStore } from '@/stores/MC/ProgressStore'

export const useChapterProgressStore = defineStore('ChapterProgressStore', {
  state: () => ({
    currentChapterID: 0,
    currentElementID: 0,
    waiting: false,
    cursorInsideTextfield: false,
    chapterLengths: [],
    timeLogs: []
  }),
  actions: {
    /**
     * Adapt currentElementID and currentChapterID so that the next element
     * is shown (if there is any)
     */
    next() {
      if (!this.waiting) {
        // prepare logging the previous-action
        const progressStore = useProgressStore()
        const currentStepAbbreviation = progressStore.getCurrentStepAbbreviation
        var currentTimeLog = {
          action: 'next',
          start: {
            step: currentStepAbbreviation,
            chapterID: this.currentChapterID,
            elementID: this.currentElementID
          },
          end: {
            step: currentStepAbbreviation,
            chapterID: this.currentChapterID,
            elementID: null
          },
          timestamp: new Date().toISOString()
        }
        if (
          this.currentElementID <
          this.chapterLengths[this.currentChapterID] - 1
        ) {
          this.currentElementID++
          currentTimeLog['end']['elementID'] = this.currentElementID
        } else if (this.currentChapterID < this.chapterLengths.length - 1) {
          this.currentChapterID++
          this.currentElementID = 0
          currentTimeLog['end']['chapterID'] = this.currentChapterID
          currentTimeLog['end']['elementID'] = this.currentElementID
        } else {
          // we have been through all chapters of this step. We need to start with the next step.
          useProgressStore().nextStep()
          currentTimeLog['end']['step'] =
            progressStore.getCurrentStepAbbreviation
          currentTimeLog['end']['chapterID'] = 0
          currentTimeLog['end']['elementID'] = 0
        }

        this.timeLogs.push(currentTimeLog)
      }
    },
    /**
     * Adapt currentElementID and currentChapterID so that the last shown element
     * is hidden again (if there is any)
     */
    previous() {
      // prepare logging the previous-action
      const progressStore = useProgressStore()
      const currentStepAbbreviation = progressStore.getCurrentStepAbbreviation
      var currentTimeLog = {
        action: 'previous',
        start: {
          step: currentStepAbbreviation,
          chapterID: this.currentChapterID,
          elementID: this.currentElementID
        },
        end: {
          step: currentStepAbbreviation,
          chapterID: this.currentChapterID,
          elementID: null
        },
        timestamp: new Date().toISOString()
      }

      // if the user's cursor is inside a textfield right now, the user might use the arrows to
      // navigate inside the textfield (i.e. to go a few char to the left), in these cases the
      // previous-function should not be triggered
      if (!this.cursorInsideTextfield) {
        if (this.currentElementID > 0) {
          this.currentElementID--
          currentTimeLog['end']['elementID'] = this.currentElementID
        } else if (this.currentChapterID > 0) {
          this.currentChapterID--
          this.currentElementID = this.chapterLengths[this.currentChapterID] - 1
          currentTimeLog['end']['chapterID'] = this.currentChapterID
          currentTimeLog['end']['elementID'] = this.currentElementID
        } else {
          // there is no previous chapter, we need to go to the previous step instead
          useProgressStore().previousStep()
          currentTimeLog['end']['step'] =
            progressStore.getCurrentStepAbbreviation
          currentTimeLog['end']['chapterID'] = null
        }
        if (this.waiting) {
          this.waiting = false
        }
      }
      // currentTimeLog['end']['chapterID'] = this.currentChapterID
      // currentTimeLog['end']['elementID'] = this.currentElementID

      this.timeLogs.push(currentTimeLog)
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
      if (startAtChapterBeginning) {
        this.currentChapterID = 0
        this.currentElementID = 0
      } else {
        this.currentChapterID = chapterLengths.length - 1
        this.currentElementID = chapterLengths.slice(-1)[0] - 1
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

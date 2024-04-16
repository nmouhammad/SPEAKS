/**
 *  This store saves the progress (i.e. the steps already done) for the message composition.
 */

import { defineStore } from 'pinia'

export const useProgressStore = defineStore('ProgressStore', {
  state: () => ({
    steps: [
      {
        name: 'Audience-Beginning',
        abbreviation: 'Before',
        nextStepAbbreviation: 'After',
        hasBeenVisited: true,
        hasBeenFinished: false,
        showInProgressBar: true
      },
      {
        name: 'Introduction',
        abbreviation: 'Intro',
        nextStepAbbreviation: 'End',
        hasBeenVisited: false,
        hasBeenFinished: false,
        showInProgressBar: true
      },
      {
        name: 'Main',
        abbreviation: 'Middle',
        nextStepAbbreviation: 'S',
        hasBeenVisited: false,
        hasBeenFinished: false,
        showInProgressBar: true
      },
      {
        name: 'End',
        abbreviation: 'End',
        nextStepAbbreviation: 'Middle',
        hasBeenVisited: false,
        hasBeenFinished: false,
        showInProgressBar: true
      },
      {
        name: 'Audience-End',
        abbreviation: 'After',
        nextStepAbbreviation: 'Intro',
        hasBeenVisited: false,
        hasBeenFinished: false,
        showInProgressBar: true
      },
      {
        name: 'Summary',
        abbreviation: 'S',
        nextStepAbbreviation: 'S',
        hasBeenVisited: false,
        hasBeenFinished: false,
        showInProgressBar: false
      }
    ],
    currentStepID: 0
  }),
  actions: {
    /**
     * Change the current step to the next step (hint: in this case, steps are
     * ordered depending on when they should be done during the message
     * composition (e.g. users will prepare the introduction, then the end and
     * only afterwards the main part, even though in the presentation, they
     * will first present the introduction, then the main part and only
     * afterwards the end))
     */
    nextStep() {
      // figure out which step will be next by getting the nextStepAbbreviation
      const nextStepAbbreviation =
        this.steps[this.currentStepID].nextStepAbbreviation
      this.steps[this.currentStepID].hasBeenFinished = true
      // check if there is a next step
      if (nextStepAbbreviation) {
        // find the id of the next step based on the nextStepAbbreviation
        const nextStepID = this.getStepIDFromAbbreviation(nextStepAbbreviation)
        // set the currentStepID to the previously found nextStepID
        this.currentStepID = nextStepID
        // indicate that the next step has now been visited as well
        this.steps[nextStepID].hasBeenVisited = true
      }
    },

    getStepIDFromAbbreviation(stepAbbreviation) {
      return this.steps.findIndex(
        (step) => step.abbreviation === stepAbbreviation
      )
    },

    /**
     * Change the current step to the previous step
     * (hint: in this case, steps are ordered depending on when
     * they should be done during the message composition (e.g.
     * users will prepare the introduction, thenthe end and only
     * afterwards the main part, even though in the presentation,
     * they will first present the introduction, then the main part
     *  and only afterwards the end))
     */
    previousStep() {
      // get the abbreviation of the current step
      const currentStepAbbreviation =
        this.steps[this.currentStepID].abbreviation
      /*
       * get the idea of the previous step (by checking for which step the
       * abbreviation of the current step is saved as nextStepAbbreviation)
       */
      const previousStepID = this.steps.findIndex(
        (step) => step.nextStepAbbreviation === currentStepAbbreviation
      )
      /*
       * check if there is a previous step (findIndex will return -1 if
       * there is none)
       */
      if (previousStepID >= 0) {
        // set the currentStepID to the previously found previousStepID
        this.currentStepID = previousStepID
      }
    },
    /**
     * Changes the current step to the step with the given stepAbbreviation
     * @param {String} stepAbbreviation
     */
    changeStep(stepAbbreviation) {
      const stepID = this.getStepIDFromAbbreviation(stepAbbreviation)
      this.currentStepID = stepID
    }
  },
  getters: {
    /**
     * Check whether the state with the given id is the current state
     * @param {Number} id
     * @returns true, if the state with the given id is the current state
     */
    isCurrent: (state) => (id) => {
      return state.currentStepID == id
    },
    /**
     * Check whether the state with the given abbreviation is the current state
     * @param {String} stepAbbreviation
     * @returns true, if the state with the given abbreviation is the current state
     */
    isCurrentByAbbreviation: (state) => (stepAbbreviation) => {
      return state.isCurrent(state.getStepIDFromAbbreviation(stepAbbreviation))
    },
    stepsToShowInProgressBar: (state) => {
      return state.steps.filter((step) => step.showInProgressBar)
    },
    hasStepBeenFinished: (state) => (stepAbbreviation) => {
      const stepID = state.getStepIDFromAbbreviation(stepAbbreviation)
      return state.steps[stepID].hasBeenFinished
    }
  }
})

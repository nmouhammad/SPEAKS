/**
 *  This store saves the progress (i.e. the steps already done) for the message composition.
 */

import { defineStore } from 'pinia'

export const useProgressStore = defineStore('ProgressStore', {
  state: () => ({
    steps: [
      {
        name: 'Audience-Beginning',
        abbreviation: 'AB',
        nextStepAbbreviation: 'AE'
      },
      { name: 'Introduction', abbreviation: 'I', nextStepAbbreviation: 'E' },
      { name: 'Main-1', abbreviation: '1', nextStepAbbreviation: '2' },
      { name: 'Main-2', abbreviation: '2', nextStepAbbreviation: '3' },
      { name: 'Main-3', abbreviation: '3', nextStepAbbreviation: null },
      { name: 'End', abbreviation: 'E', nextStepAbbreviation: '1' },
      { name: 'Audience-End', abbreviation: 'AE', nextStepAbbreviation: 'I' }
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
      // check if there is a next step
      if (nextStepAbbreviation) {
        // find the id of the next step based on the nextStepAbbreviation
        const nextStepID = this.steps.findIndex(
          (step) => step.abbreviation === nextStepAbbreviation
        )
        // set the currentStepID to the previously found nextStepID
        this.currentStepID = nextStepID
      }
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
    }
  }
})

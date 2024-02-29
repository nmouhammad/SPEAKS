/**
 *  This store saves the progress (i.e. the steps already done) for the message composition.
 */

import { defineStore } from 'pinia'

export const useProgressStore = defineStore('ProgressStore', {
  state: () => ({
    steps: [
      { name: 'Audience-Beginning', abbreviation: 'AB' },
      { name: 'Introduction', abbreviation: 'I' },
      { name: 'Main-1', abbreviation: '1' },
      { name: 'Main-2', abbreviation: '2' },
      { name: 'Main-3', abbreviation: '3' },
      { name: 'End', abbreviation: 'E' },
      { name: 'Audience-End', abbreviation: 'AE' }
    ]
  })
})

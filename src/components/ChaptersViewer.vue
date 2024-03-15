<script>
  import KeyboardListener from '@/components/KeyboardListener.vue'
  import ChapterTextButton from '@/components/ChapterTextButton.vue'
  import ChapterTextChoice from '@/components/ChapterTextChoice.vue'
  import ChapterContentCollector from '@/components/ChapterContentCollector.vue'

  // @vuese
  // @group Components
  // If one view (e.g. Introduction) has different substeps (="chapters"), this component
  // can be used to display one of the chapters at a time.
  export default {
    name: 'ChaptersViewer',
    components: {
      KeyboardListener,
      ChapterTextButton,
      ChapterTextChoice,
      ChapterContentCollector
    },
    props: {
      /**
       *  collection of content objects that should be displayed after each other
       */
      content: {
        type: Array,
        default() {
          return [[]]
        },
        required: true
      }
    },
    data() {
      return {
        currentSubelementID: 0,
        currentChapterID: 0,
        // whether we need to wait for e.g. some user input before going to the next step
        wait: false
      }
    },
    computed: {
      /**
       * return the subtexts of the current chapter
       */
      currentSubtexts() {
        return this.content[this.currentChapterID].texts
      },
      // returns the current subchapter object
      currentSubchapter() {
        return this.content[this.currentChapterID]
      },
      // returns the number of substeps the current chapter has based on the chapter type
      numberOfSubstepsForCurrentChapter() {
        if (this.currentSubchapter.type == 'ChapterTextButton') {
          // ChapterTextButton has one step more than it has texts
          // (the last step is to show the button)
          return this.currentSubtexts.length
        } else if (this.currentSubchapter.type == 'ChapterTextChoice') {
          return this.currentSubchapter.elements.length - 1
        } else if (this.currentSubchapter.type == 'ChapterContentCollector') {
          return this.currentSubchapter.texts.length
        }
        return this.currentSubtexts.length - 1
      }
    },
    methods: {
      /**
       * uncover the next text or change the chapter if all texts for this
       * chapter are already uncovered
       * @public
       */
      next() {
        // check whether we are waiting for some input from the user and can
        // therefore not go next yet
        if (!this.wait) {
          // check whether we reached the end of this chapter
          if (
            this.currentSubelementID === this.numberOfSubstepsForCurrentChapter
          ) {
            // check whether there is another chapter that can be started now
            if (this.currentChapterID < this.content.length - 1) {
              this.currentChapterID++
              this.currentSubelementID = 0
            }
          } else {
            // there are more steps in the current chapter, so we can uncover
            // the next element of the current chapter
            this.currentSubelementID++
          }
        }
      },
      /**
       * go one step back by either removing the current text or change the chapter
       * if all texts for this chapter have already been removed
       * @public
       */
      previous() {
        // check whether there is a previous step in the current chapter
        if (this.currentSubelementID === 0) {
          // there is no previous step in the current chapter, therefore we now
          // check if there is a previous chapter
          if (this.currentChapterID > 0) {
            // there is a previous chapter, so now we change to the end of the
            // previous chapter
            this.currentChapterID--
            this.currentSubelementID = this.numberOfSubstepsForCurrentChapter
          }
        } else {
          // there is a previous step in the current chapter, we'll go there
          this.currentSubelementID--
        }
        if (this.wait) {
          // if we were waiting for user input before, we can stop waiting,
          // because we are at not at the step needing user input anymore
          this.wait = false
        }
      },

      /**
       * start to wait for user input (= deactivate going next)
       * @public
       */
      startWaiting() {
        this.wait = true
      },

      /**
       * the user input we were waiting for has been arrived, we can now stop
       * waiting for it and go to the next step
       * @public
       */
      stopWaitingGoNext() {
        this.wait = false
        this.next()
      }
    }
  }
</script>

<template>
  <!-- Changing the substep -->
  <KeyboardListener @next="next" @previous="previous" />
  <div class="container">
    <ChapterTextButton
      v-if="currentSubchapter.type === 'ChapterTextButton'"
      :texts="currentSubtexts"
      :current-subtext-i-d="currentSubelementID"
      :button-text="currentSubchapter.buttonText"
      @next="next"
    />
    <ChapterTextChoice
      v-if="currentSubchapter.type === 'ChapterTextChoice'"
      :elements="currentSubchapter.elements"
      :current-element-i-d="currentSubelementID"
      @wait="startWaiting"
      @stop-waiting-go-next="stopWaitingGoNext"
    />
    <ChapterContentCollector
      v-if="currentSubchapter.type === 'ChapterContentCollector'"
      :data-object="currentSubchapter"
      :current-element-i-d="currentSubelementID"
    />
  </div>
</template>

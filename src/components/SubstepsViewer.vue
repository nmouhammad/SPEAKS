<script>
  import KeyboardListener from '@/components/KeyboardListener.vue'

  // @vuese
  // @group Components
  // If one view (e.g. Introduction) has different substeps, this component can be used
  // to display one of the substeps at a time. Each substep is called "chapter" and can
  // consist of multiple texts which will be uncovered one by one.
  export default {
    components: {
      KeyboardListener
    },
    props: {
      // collection of texts that should be displayed after each other
      texts: {
        type: Array,
        default() {
          return [[]]
        },
        required: true
      }
    },
    emits: ['next', 'previous'],
    data() {
      return { currentSubtextID: 0, currentChapterID: 0 }
    },
    computed: {
      // return the subtexts of the current chapter
      currentSubtexts() {
        return this.texts[this.currentChapterID]
      },
      // return the subtexts of the current chapter that have already been uncovered
      subtextsToShow() {
        return this.currentSubtexts.slice(0, this.currentSubtextID + 1)
      }
    },
    methods: {
      // check whether a key is pressed and if yes trigger the corresponding event
      keydownEvent(event) {
        // if any of the following keys is pressed, 'next' should be emitted
        const keysTriggeringNext = ['ArrowRight', 'Enter', ' ']
        // if any of the following keys is pressed, 'previous' should be emitted
        const keysTriggeringPrevious = ['ArrowLeft']
        const pressedKey = event.key

        // check whether the pressedKey is in the array keysTriggeringNext
        if (keysTriggeringNext.indexOf(pressedKey) !== -1) {
          this.next()
        }
        // check whether the pressedKey is in the array keysTriggeringPrevious
        if (keysTriggeringPrevious.indexOf(pressedKey) !== -1) {
          this.previous()
        }
      },
      // uncover the next text or change the chapter if all texts for this chapter
      // are already uncovered
      next() {
        if (this.currentSubtextID === this.currentSubtexts.length - 1) {
          if (this.currentChapterID < this.texts.length - 1) {
            this.currentChapterID++
            this.currentSubtextID = 0
          }
        } else {
          this.currentSubtextID++
        }
      },
      // go one step back by either removing the current text or change the chapter
      // if all texts for this chapter have already been removed
      previous() {
        if (this.currentSubtextID === 0) {
          if (this.currentChapterID > 0) {
            this.currentChapterID--
            this.currentSubtextID = this.currentSubtexts.length - 1
          }
        } else {
          this.currentSubtextID--
        }
      }
    }
  }
</script>

<template>
  <!-- Changing the substep -->
  <KeyboardListener @keydown="keydownEvent" />
  <div class="btn-group">
    <!-- Chevron left -->
    <button class="btn btn-outline-secondary" @click="previous">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </button>
    <!-- Chevron right -->
    <button class="btn btn-outline-secondary" @click="next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
        />
      </svg>
    </button>
  </div>
  <!-- <p>{{ text }}</p> -->
  <p v-for="(currentSubtext, id) in subtextsToShow" :key="id">
    {{ currentSubtext }}
  </p>
</template>

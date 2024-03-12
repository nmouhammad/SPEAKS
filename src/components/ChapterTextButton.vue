<script>
  // @group Components
  // One of the chapters that can be used in the ChaptersViewer. Consists of multiple
  // texts shown on top and then a button for going to the next subchapter.
  export default {
    name: 'ChapterTextButton',
    props: {
      // the texts to be shown
      texts: {
        type: Array,
        required: true
      },
      // the text that should be shown on the button
      buttonText: {
        type: String,
        required: true
      },
      // the id of the last subtext that should be visible
      currentSubtextID: {
        type: Number,
        required: true
      }
    },
    emits: ['next'],
    computed: {
      // check whether the button should already be shown
      showButton() {
        // show the button after all other texts have been shown and the user
        // clicked next one more time
        return this.currentSubtextID === this.texts.length
      }
    },
    methods: {
      // check whether the text with the given id should already been shown
      showTextWithID(id) {
        return id <= this.currentSubtextID
      }
    }
  }
</script>
<template>
  <div>
    <p
      v-for="(currentSubtext, id) in texts"
      v-show="showTextWithID(id)"
      :key="id"
      class="text-center"
    >
      {{ currentSubtext }}
    </p>
    <div class="text-center">
      <button
        v-show="showButton"
        class="btn btn-primary"
        @click="$emit('next')"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

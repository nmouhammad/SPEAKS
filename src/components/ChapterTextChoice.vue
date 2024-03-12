<script>
  // @group Components
  // One of the chapters that can be used in the ChaptersViewer, contains text on top, then multiple
  // buttons from which the user can choose and then sees the corresponding description with the
  // option to either revert their choice by clicking on another button or choosing to go with that
  // choice by clicking the "submit"-button (with custom text) on the bottom.
  // To see an example how the elements should be formatted, look at IntroductionView.vue.
  export default {
    name: 'ChapterTextChoice',
    props: {
      // all elements that should be displayed in this chapter
      elements: {
        type: Array,
        required: true
      },
      // the id of the last subtext that should be visible
      currentElementID: {
        type: Number,
        required: true
      }
    },
    emits: ['next', 'wait', 'stopWaitingGoNext'],
    data: () => {
      return {
        // the id of the button for which the description should be shown (-1 if none)
        idOfDescriptionToShow: -1
      }
    },
    computed: {},
    watch: {
      // we watch for the changes in the currentElementID to be able to signal when we
      // need to wait for user input (in this case: after all choice buttons are shown)
      currentElementID: {
        handler(newID) {
          if (newID == this.elements.length - 1) {
            this.$emit('wait')
          }
        },
        // we need immediate to be set to true because otherwise the watch does not work
        // correctly when the user comes back from the previous step and this chapter is
        // initialized in a state where it should already been waiting
        immediate: true
      }
    },
    methods: {
      // check whether the text with the given id should already been shown
      showElementWithID(id) {
        return id <= this.currentElementID
      },
      // show the description of the button with the given id
      showDescription(id) {
        this.idOfDescriptionToShow = id
      }
    }
  }
</script>
<template>
  <!-- Texts on top -->
  <div v-for="(currentElement, id) in elements" :key="id">
    <p
      v-show="showElementWithID(id)"
      v-if="currentElement.type === 'text'"
      class="text-center"
    >
      {{ currentElement.text }}
    </p>
  </div>

  <!-- Buttons containing the choices -->
  <div class="d-flex align-vertical gap-1">
    <div v-for="(currentElement, id) in elements" :key="id">
      <div v-if="currentElement.type === 'button'" class="text-center col">
        <button
          v-show="showElementWithID(id)"
          class="btn"
          :class="[
            idOfDescriptionToShow == id ? 'btn-primary' : 'btn-outline-primary'
          ]"
          @click="showDescription(id)"
        >
          {{ currentElement.text }}
        </button>
      </div>
    </div>
  </div>

  <!-- Descriptions (shown after choosing one of the choice buttons) -->
  <p v-if="idOfDescriptionToShow > -1" class="fs-6 fw-light mt-3 text-center">
    {{ elements[idOfDescriptionToShow].description }}
  </p>

  <!-- Button to go for the next step with the given choice -->
  <div class="d-flex justify-content-center">
    <button
      v-if="idOfDescriptionToShow > -1"
      class="btn btn-primary"
      @click="$emit('stopWaitingGoNext')"
    >
      {{ elements[idOfDescriptionToShow].submitText }}
    </button>
  </div>
</template>

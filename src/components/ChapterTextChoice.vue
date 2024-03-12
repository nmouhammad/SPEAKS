<script>
  // @vuese
  // @group Components
  // One of the chapters that can be used in the ChaptersViewer, contains text on top, then multiple
  // buttons from which the user can choose and then sees the corresponding description with the
  // option to either revert their choice by clicking on another button or choosing to go with that
  // choice by clicking the "submit"-button (with custom text) on the bottom.
  // To see an example how the elements should be formatted, look at IntroductionView.vue
  export default {
    name: 'ChapterTextChoice'
  }
</script>

<script setup>
  import { ref } from 'vue'
  import { watch } from 'vue'
  import { usePresentationPlanStore } from '@/stores/PresentationPlanStore'

  const props = defineProps({
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
  })
  const emit = defineEmits(['next', 'wait', 'stopWaitingGoNext'])
  const presentationPlanStore = usePresentationPlanStore()

  // the id of the button for which the description should be shown (-1 if none)
  let idOfChosenIntroType = ref(-1)

  // check whether the text with the given id should already been shown
  function showElementWithID(id) {
    return id <= props.currentElementID
  }

  // show the description of the button with the given id
  function showDescription(id) {
    idOfChosenIntroType.value = id
  }

  // we watch for the changes in the currentElementID to be able to signal when we
  // need to wait for user input (in this case: after all choice buttons are shown)
  watch(() => props.currentElementID, watchForWhenToWait, { immediate: true })
  // we need immediate to be set to true because otherwise the watch does not work
  // correctly when the user comes back from the previous step and this chapter is
  // initialized in a state where it should already been waiting
  function watchForWhenToWait(newID) {
    if (newID == props.elements.length - 1) {
      const IDSavedIntroType = getIDforSavedIntroType()
      if (IDSavedIntroType > 0) {
        idOfChosenIntroType.value = IDSavedIntroType
      } else {
        emit('wait')
      }
    }
  }

  /**
   * Saves the chosen IntroType to the store and emits to the parent that the next
   * Chapter can be started
   */
  function saveIntroTypeAndContinue() {
    presentationPlanStore.setIntroductionType(
      props.elements[idOfChosenIntroType.value].introType
    )
    emit('stopWaitingGoNext')
  }
  /**
   * Returns the ID of the button corresponding to the saved IntroType
   */
  function getIDforSavedIntroType() {
    const introType = presentationPlanStore.introductionType
    if (introType && introType.length > 0) {
      const buttonID = props.elements.findIndex(
        (currentElement) => currentElement.introType === introType
      )
      return buttonID
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
            idOfChosenIntroType == id ? 'btn-primary' : 'btn-outline-primary'
          ]"
          @click="showDescription(id)"
        >
          {{ currentElement.text }}
        </button>
      </div>
    </div>
  </div>

  <!-- Descriptions (shown after choosing one of the choice buttons) -->
  <p v-if="idOfChosenIntroType > -1" class="fs-6 fw-light mt-3 text-center">
    {{ elements[idOfChosenIntroType].description }}
  </p>

  <!-- Button to go for the next step with the given choice -->
  <div class="d-flex justify-content-center">
    <button
      v-if="idOfChosenIntroType > -1"
      class="btn btn-primary"
      @click="saveIntroTypeAndContinue"
    >
      {{ elements[idOfChosenIntroType].submitText }}
    </button>
  </div>
</template>

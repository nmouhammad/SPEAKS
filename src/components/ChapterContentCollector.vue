<script setup>
  // @vuese
  // @group Components
  // One of the chapters that can be used in the ChaptersViewer, contains text on top, then a
  // ContentCollector.

  import ContentCollector from './ContentCollector.vue'
  const props = defineProps({
    // the object containing all relevant information to be displayed here,
    // should contain the following attributes: texts (String-Array),
    // contentElements (String-Array), hasRemoveOption (Boolean),
    // contentBoxHeading (String), remove (Function), add (Function)
    dataObject: {
      type: Object,
      required: true
    },
    /**
     * the id of the last subtext that should be visible
     */
    currentElementID: {
      type: Number,
      required: true
    }
  })
</script>

<template>
  <p
    v-for="(currentText, id) in props.dataObject.texts"
    v-show="id <= props.currentElementID"
    :key="id"
    class="text-center"
  >
    {{ currentText }}
  </p>
  <div
    v-if="props.currentElementID == props.dataObject.texts.length"
    class="d-flex flex-column align-items-center gap-3"
  >
    <ContentCollector
      :all-content-to-display="props.dataObject.contentElements"
      :has-remove-option="props.dataObject.hasRemoveOption"
      :content-box-heading="props.dataObject.contentBoxHeading"
      @add="props.dataObject.add"
      @remove="props.dataObject.remove"
    />
  </div>
</template>

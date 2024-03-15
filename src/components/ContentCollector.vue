<script>
  import SubpointAdder from '@/components/SubpointAdder.vue'
  import ContentBox from '@/components/ContentBox.vue'

  // @vuese
  // @group Components
  // Combination of ContentBox and SubpointAdder that can be used when content should be added and shown
  export default {
    name: 'ContentCollector',
    components: { SubpointAdder, ContentBox },
    props: {
      // Array containing the elements that should be shown
      allContentToDisplay: {
        type: Object,
        default() {
          return {}
        }
      },
      // Whether there is an "x" on each badge for removing this content
      hasRemoveOption: {
        type: Boolean,
        default: true
      },
      // The heading of the box displaying the content
      contentBoxHeading: {
        type: String,
        required: true
      }
    },
    emits: ['add', 'remove'],
    methods: {
      addContent(content) {
        this.$emit('add', content)
      },
      removeContent(content) {
        this.$emit('remove', content)
      }
    }
  }
</script>

<template>
  <SubpointAdder @add="addContent" />
  <ContentBox
    :content-elements="allContentToDisplay"
    :has-remove-option="hasRemoveOption"
    :content-box-heading="contentBoxHeading"
    @remove="removeContent"
  />
</template>

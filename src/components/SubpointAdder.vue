<script>
  // @vuese
  // @group Components
  // A component that can be used if subpoints should be added. It consists of a
  // textfield and a button "Add."
  export default {
    name: 'SubpointAdder',
    emits: ['add'],
    data() {
      return {
        content: ''
      }
    },
    methods: {
      /**
       * Checks if there is something except whitespace in content, if yes
       *    it emits that content to the parent and cleans the textfield
       * called when the user is clicking "Add"
       */
      addContent() {
        const contentToAdd = this.content.trim()
        if (contentToAdd !== '') {
          let objectToSend = { content: contentToAdd }
          // sends content of the textfield to parent when "Add" is clicked
          // @arg an object containing the content of the textfield
          this.$emit('add', objectToSend)
          this.content = ''
        }
      }
    }
  }
</script>

<template>
  <div class="row g-2">
    <div class="col-auto">
      <input
        v-model="content"
        type="text"
        class="form-control"
        aria-label="Previous knowledge of the audience"
      />
    </div>
    <div class="col-auto">
      <button class="btn btn-primary" @click.prevent="addContent">Add</button>
    </div>
  </div>
</template>

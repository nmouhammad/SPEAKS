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
  <div class="container">
    <div class="row">
      <div class="col-10 p-0">
        <input
          v-model="content"
          type="text"
          class="form-control"
          aria-label="Previous knowledge of the audience"
          @keyup.enter="addContent"
        />
      </div>
      <div class="col-2 p-0 ps-2">
        <button class="btn btn-primary w-100" @click.prevent="addContent">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

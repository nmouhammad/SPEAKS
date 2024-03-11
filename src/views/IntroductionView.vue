<script>
  import SubstepsViewer from '@/components/SubstepsViewer.vue'

  // @vuese
  // @group Views
  // This view guides the user through creating the introduction
  export default {
    name: 'IntroductionView',
    components: {
      SubstepsViewer
    }
  }
</script>
<script setup>
  const subtextArray = [
    [
      'Great, now that we know more about your audience and what you want to reach with your presentation, we can start with preparing the actual presentation!'
    ],
    [
      "First, we'll make sure to interest your audience into your topic.",
      'A good chance for this is in your Introduction.',
      'Many people waste this chance by starting with "Hello my name is HyTea and today we talk about xyz. This is my schedule. First, we start with ..."'
    ],
    [
      'See how everyone is already falling asleep or looking at their phones?',
      "Let's make sure this won't happen to you!",
      "The good news is: there are multiple great options how to gain the audience's interest. Just pick what feels like the best match for you!"
    ]
  ]
</script>

<template>
  <p>Introduction</p>
  <SubstepsViewer :texts="subtextArray" />
</template>

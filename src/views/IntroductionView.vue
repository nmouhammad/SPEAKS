<script>
  import ChaptersViewer from '@/components/ChaptersViewer.vue'

  // @vuese
  // @group Views
  // This view guides the user through creating the introduction
  export default {
    name: 'IntroductionView',
    components: {
      ChaptersViewer
    }
  }
</script>
<script setup>
  const subtextArray = [
    {
      type: 'ChapterTextButton',
      texts: [
        'Great, now that we know more about your audience and what you want to reach with your presentation, we can start with preparing the actual presentation!'
      ],
      buttonText: 'Lets start'
    },
    {
      type: 'ChapterTextButton',
      texts: [
        "First, we'll make sure to interest your audience into your topic.",
        'A good chance for this is in your Introduction.',
        'Many people waste this chance by starting with "Hello my name is HyTea and today we talk about xyz. This is my schedule. First, we start with ..."',
        'See how everyone is already falling asleep or looking at their phones?'
      ],
      buttonText: "Let's make sure this won't happen to you!"
    },
    {
      type: 'ChapterTextButton',
      texts: [
        "The good news is: there are multiple great options how to gain the audience's interest. Just pick what feels like the best match for you!"
      ],
      buttonText: 'Show me these options!'
    },
    {
      type: 'ChapterTextChoice',
      elements: [
        { type: 'text', text: 'Ok, here are the different options: ' },
        {
          type: 'button',
          text: 'Tell a story',
          description: 'Telling a story is a good way ...',
          submitText: 'I want to start with a story'
        },
        {
          type: 'button',
          text: 'Make a joke',
          description: 'Making a joke is a good way ...',
          submitText: 'I want to start with a joke'
        },
        {
          type: 'button',
          text: 'Tell an impressive fact',
          description: 'Starting with an impressive fact ..',
          submitText: 'I want to start with a fact'
        },
        {
          type: 'button',
          text: 'Ask a question',
          description: 'Asking your audience a question ...',
          submitText: 'I want to start with a question'
        }
      ]
    },
    {
      type: 'ChapterTextButton',
      texts: [
        "The good news is: there are multiple great options how to gain the audience's interest. Just pick what feels like the best match for you!"
      ],
      buttonText: 'Show me these options!'
    }
  ]
</script>

<template>
  <ChaptersViewer :content="subtextArray" />
</template>

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
  import { ref, watch } from 'vue'
  import { usePresentationPlanStore } from '@/stores/PresentationPlanStore'
  const presentationPlanStore = usePresentationPlanStore()

  const subtextArray = ref([
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
          submitText: 'I want to start with a story',
          introType: 'story'
        },
        {
          type: 'button',
          text: 'Make a joke',
          description: 'Making a joke is a good way ...',
          submitText: 'I want to start with a joke',
          introType: 'joke'
        },
        {
          type: 'button',
          text: 'Tell an impressive fact',
          description: 'Starting with an impressive fact ..',
          submitText: 'I want to start with a fact',
          introType: 'fact'
        },
        {
          type: 'button',
          text: 'Ask a question',
          description: 'Asking your audience a question ...',
          submitText: 'I want to start with a question',
          introType: 'question'
        }
      ]
    },
    {
      type: 'ChapterContentCollector',
      texts: ['example 1', 'example 2'],
      contentElements: presentationPlanStore.introductionContent,
      hasRemoveOption: true,
      contentBoxHeading: 'heading',
      remove: presentationPlanStore.removeFromIntroductionContent,
      add: presentationPlanStore.addIntroductionContent
    },
    {
      type: 'ChapterTextButton',
      texts: [
        "The good news is: there are multiple great options how to gain the audience's interest. Just pick what feels like the best match for you!"
      ],
      buttonText: 'Show me these options!'
    }
  ])

  watch(() => presentationPlanStore.introductionType, reactToIntroTypeChange, {
    immediate: true
  })

  function reactToIntroTypeChange(newIntroType, oldIntroType) {
    // check whether the new introType is not empty
    // and different than the previous introType
    if (newIntroType.length > 0 && !(newIntroType === oldIntroType)) {
      // remove the old introductionContent
      presentationPlanStore.introductionContent = []
      // find out which index the chapter where we need to change instructions has
      const relevantChapterID = subtextArray.value.findIndex(
        (element) => element.type === 'ChapterContentCollector'
      )
      // adapt the content based on the introType
      if (newIntroType === 'story') {
        subtextArray.value[relevantChapterID].texts = ['Story 1', 'Story 2']
        subtextArray.value[relevantChapterID].contentBoxHeading =
          'Content of your story'
      } else if (newIntroType === 'fact') {
        subtextArray.value[relevantChapterID].texts = ['Fact 1', 'Fact 2']
        subtextArray.value[relevantChapterID].contentBoxHeading =
          'Presentation of your fact(s)'
      } else if (newIntroType === 'joke') {
        subtextArray.value[relevantChapterID].texts = ['Joke 1', 'Joke 2']
        subtextArray.value[relevantChapterID].contentBoxHeading =
          'Content of your joke'
      } else if (newIntroType === 'question') {
        subtextArray.value[relevantChapterID].texts = [
          'Question 1',
          'Question 2'
        ]
        subtextArray.value[relevantChapterID].contentBoxHeading =
          'Presentation of your question'
      }
    }
  }
</script>

<template>
  <ChaptersViewer :content="subtextArray" />
</template>

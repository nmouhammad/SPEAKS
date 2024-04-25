<script setup>
  // One of the arrows representing one step in the ProgressBar.
  import { useProgressStore } from '@/stores/MC/ProgressStore'
  const store = useProgressStore()

  const props = defineProps({
    // Abbreviation of the step title (should be <=2 letters) that will be displayed inside the circle
    abbreviation: {
      type: String,
      required: true
    },
    // True, if this step is the current step, false otherwise
    isCurrent: {
      type: Boolean,
      default: false
    },
    // True if this step should already be visible
    isShown: {
      type: Boolean,
      default: false
    }
  })

  /**
   * Converts the abbreviation of a step into the arrow type
   * (arrow types are: "Before", "After" and "Middle")
   * @param {String} abbr abbreviation of the current step
   */
  function abbreviationToArrowType(abbr) {
    return abbr == 'Before' || abbr == 'After' ? abbr : 'Middle'
  }

  /**
   * To convert the arrow type + whether it is the current step
   * into the correct css class for the arrow (= right svg file)
   */
  const situationToCssClass = {
    Before: {
      true: 'svg-button-before',
      false: 'svg-button-before-outline'
    },
    Middle: {
      true: 'svg-button-middle',
      false: 'svg-button-middle-outline'
    },
    After: {
      true: 'svg-button-after',
      false: 'svg-button-after-outline'
    }
  }

  function showFilledVersion() {
    return (
      props.isCurrent ||
      (store.getCurrentStepAbbreviation === 'S' &&
        !(props.abbreviation == 'Before' || props.abbreviation == 'After'))
    )
  }
</script>

<template>
  <button
    v-show="isShown"
    class="svg-button"
    :class="
      situationToCssClass[abbreviationToArrowType(abbreviation)][
        showFilledVersion()
      ]
    "
    @click="store.changeStep(abbreviation)"
  >
    {{ abbreviation }}
  </button>
</template>

<style scoped>
  .svg-button-before {
    background-image: url('@/assets/arrow-before.svg');
    width: 144px; /* Set the width of the button */
  }
  .svg-button-before-outline {
    background-image: url('@/assets/arrow-before-outline.svg');
    width: 144px; /* Set the width of the button */
  }
  .svg-button-middle {
    background-image: url('@/assets/arrow-middle.svg');
    width: 140px; /* Set the width of the button */
  }
  .svg-button-middle-outline {
    background-image: url('@/assets/arrow-middle-outline.svg');
    width: 140px; /* Set the width of the button */
  }
  .svg-button-after {
    background-image: url('@/assets/arrow-after.svg');
    width: 121px; /* Set the width of the button */
  }
  .svg-button-after-outline {
    background-image: url('@/assets/arrow-after-outline.svg');
    width: 121px; /* Set the width of the button */
  }
  .svg-button {
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat; /* Prevent repeating of the SVG */
    background-position: center; /* Center the SVG within the button */
    background-color: transparent;
    height: 50px; /* Set the height of the button */
    border: none;
    cursor: pointer;
  }
  /* modified from https://bootsnipp.com/snippets/dKB */
  .btn-lg {
    text-align: center;
    width: 80px;
    height: 50px;
    padding: 10px 5px;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 25px;
  }

  /* based on https://stackoverflow.com/a/70797508 */

  .arr {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 150px;
    position: relative;
    background: rgba(var(--bs-light-rgb));
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%);
  }

  .arr-non-active:before {
    content: '';
    background: white;
    height: 44px;
    width: 138px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%);
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 150px;
    position: relative;
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%);
  }

  .arrow-outline {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 150px;
    position: relative;
    background: black;
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%);
  }

  .arrow-outline:after {
    content: '';
    background: white;
    height: calc(100% - 2px);
    width: calc(100% - 3px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%);
  }
  div span {
    z-index: 2;
    position: relative;
  }
</style>

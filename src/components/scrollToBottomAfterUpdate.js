import { nextTick } from 'vue'

/**
 * This function waits for the DOM to update (this is needed for the
 * scrolling to take place only after the new element has been added)
 * and then scrolls to the bottom of the page
 */
export function scrollToBottomAfterUpdate() {
  // Wait for DOM to update and then scroll to bottom
  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  })
}

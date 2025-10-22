<script>
  import MessageCompositionView from './views/MC/MessageCompositionView.vue'

  // @vuese
  // @group Views
  // Main view, this should contain only the MessageCompositionView, everything else is done there
  export default {
    name: 'App',
    components: {
      MessageCompositionView
    }
  }
</script>

<template>
  <!-- Make the app root fill the viewport so the footer can be positioned relative to it -->
  <div class="min-vh-100 d-flex flex-column">
    <MessageCompositionView />

    <!-- Fixed footer (always visible at the bottom of the viewport) -->
    <footer class="app-footer fixed-bottom border-top">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <div class="content">
              <p class="mb-0">
                Made by
                <a
                  href="https://edutec.science"
                  target="_blank"
                  rel="noopener noreferrer"
                  >EduTec</a
                >
                with ❤️ |
                <a
                  href="https://edutec.science/imprint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Imprint</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
  /* Footer height: keep in sync with the content-padding added to the page */
  .app-footer {
    height: 88px; /* adjust if you change the footer padding/size */
    z-index: 1030;
    padding-top: 14px;
    padding-bottom: 14px;
    overflow: auto;

    /* subtle grey-ish background to visually separate the footer */
    background-color: #f8fafc;
    color: #212529; /* ensure readable text on the grey background */
  }

  /* Small screens: make footer taller to fit stacked content */
  @media (max-width: 576px) {
    .app-footer {
      height: auto;
      padding: 12px 0;
    }
  }
</style>

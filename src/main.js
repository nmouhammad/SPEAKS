import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
// import router from './router'

const pinia = createPinia()
// use the plugin "piniaPluginPersistedState" which saves the pinia data in the cache
// so that it is not deleted when reloading the page
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)
// app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import { useAuthStore } from './store/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

const authStore = useAuthStore()
authStore.setCsrfToken()

app.mount('#app')

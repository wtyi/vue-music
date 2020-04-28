import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import registerDirective from '@/core/directive'

const app = createApp(App)
registerDirective(app)

app.use(router).use(store).mount('#app')

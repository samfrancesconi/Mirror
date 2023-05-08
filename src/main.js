import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { VueFlip } from 'vue-flip'

const app = createApp(App)

app.component(VueFlip);


app.use(router)

app.mount('#app')

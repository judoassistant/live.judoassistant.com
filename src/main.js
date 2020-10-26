import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import styles from './styles/main.module.scss'
import icons from '@mdi/font/scss/materialdesignicons.scss'

const app = createApp(App);
app.use(styles);
app.use(icons);
app.use(store);
app.use(router);
app.mount('#app');

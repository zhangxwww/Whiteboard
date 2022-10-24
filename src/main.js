import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

// import contentmenu from 'v-contextmenu'
// import 'v-contextmenu/dist/index.css'

// import Contextmenu from "vue-contextmenujs"
// import 'v-contextmenu/dist/themes/default.css'

import contextmenu from 'vue3-contextmenu'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'


import locale from 'element-plus/lib/locale/lang/zh-cn'

createApp(App).use(ElementPlus, { locale }).use(contextmenu).mount('#app')

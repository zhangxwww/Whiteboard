import { createApp } from 'vue'
import App from './App.vue'

import store from './store'


import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'



import contextmenu from 'vue3-contextmenu'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'


import locale from 'element-plus/lib/locale/lang/zh-cn'


import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn'

import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'

import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'

import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

import Prism from 'prismjs'

VueMarkdownEditor
    .use(vuepressTheme, {
        Prism,
    })
    .use(createKatexPlugin())
    .use(createMermaidPlugin())
    .use(createTodoListPlugin())
    .use(createLineNumbertPlugin())
    .use(createHighlightLinesPlugin())
    .use(createCopyCodePlugin())
    .use(createAlignPlugin())


createApp(App)
    .use(store)
    .use(ElementPlus, { locale })
    .use(contextmenu)
    .use(VueMarkdownEditor)
    .directive('drag', {
        mounted: function (el) {
            let oDiv = el;  // 获取当前元素
            console.log(el)
            oDiv.onmousedown = (e) => {
                console.log('onmousedown')
                // 算出鼠标相对元素的位置
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = (e) => {
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    oDiv.style.left = left + 'px';
                    oDiv.style.top = top + 'px';
                };

                // eslint-disable-next-line no-unused-vars
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
    })
    .directive('no-drag', {
        mounted: function (el) {
            el.onmousedown = (e) => {
                e.stopPropagation()
            }
            console.log(el)
        }
    })
    .mount('#app')

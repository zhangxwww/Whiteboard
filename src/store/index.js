import { createStore } from 'vuex'

export default createStore({
    state: {
        // { position: { x: ..., y: ... }, data: { text: ... } }
        items: {
            writeboards: [
                {
                    position: { x: '150px', y: '150px' },
                    data: { text: 'Hello World' }
                }
            ]
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})
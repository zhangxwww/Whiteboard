<template>
  <div v-for="(item, idx) in items.whiteboards"
       :key=idx
       v-drag
       style="position:absolute; width=600px">
    <white-board :id=idx
                 :initPosition="item.position"
                 :initText="item.data.text"></white-board>
  </div>
</template>

<script>
import WhiteBoard from './WhiteBoard.vue'

export default {
  name: 'MainPanel',
  components: {
    WhiteBoard
  },
  data () {
    return {
      items: {
        whiteboards: [],    // { position: { x: ..., y: ... }, data: { text: ... } }
        deadlines: [],   // { position: { x: ..., y: ... }, data: { time: ..., description: ...} }
        times: [],  // { position: { x: ..., y: ... }, data: { } }
      }
    }
  },
  methods: {
    save () { },
    load () { },
    // eslint-disable-next-line no-unused-vars
    add (type, position) { },
    // eslint-disable-next-line no-unused-vars
    edit (type, id, data) { },
    // eslint-disable-next-line no-unused-vars
    delete (type, id) { },

  },
  mounted () {
    this.items.whiteboards.push(...this.$store.state.items.whiteboards)
  }
}
</script>
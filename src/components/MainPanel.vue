<template>
  <div v-for="(item, idx) in items.writeboards"
       :key=idx
       v-drag
       class="writeboard">
    <write-board :id=idx
                 :initPosition="item.position"
                 :initText="item.data.text"
                 @delete="onWriteBoardDelete"
                 @edit="onWriteBoardEdit"></write-board>
  </div>
</template>

<script>
import WriteBoard from './WriteBoard.vue'

export default {
  name: 'MainPanel',
  components: {
    WriteBoard
  },
  data () {
    return {
      items: {
        writeboards: [],    // { position: { x: ..., y: ... }, data: { text: ... } }
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

    onWriteBoardDelete (id) {
      this.items.writeboards.splice(id, 1)
    },
    onWriteBoardEdit (id, text) {
      this.items.writeboards[id].data.text = text
      // save
    }
  },
  mounted () {
    this.items.writeboards.push(...this.$store.state.items.writeboards)
  }
}
</script>

<style>
.writeboard {
  position: absolute;
  width: 600px;
}
</style>
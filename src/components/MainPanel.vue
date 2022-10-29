<template>
  <div></div>
</template>

<script>
export default {
  name: 'MainPanel',
  data () {
    return {
      items: {
        mds: [],    // { position: { x: ..., y: ... }, data: { text: ... } }
        ddls: [],   // { position: { x: ..., y: ... }, data: { time: ..., description: ...} }
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
    delete (type, id) { }
  }
}
</script>
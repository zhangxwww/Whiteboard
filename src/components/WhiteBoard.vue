<template>
  <div style="position:absolute; width:600px"
       :style="{top: position.y, left: position.x}"
       @click="onClick">
    <v-md-editor ref="editor"
                 v-model="text"
                 height="auto"
                 left-toolbar="undo redo clear | strikethrough quote | table | link"
                 right-toolbar="preview"
                 :autofocus=true
                 :mode=mode
                 @blur="onBlur"></v-md-editor>
  </div>
</template>

<script>
export default {
  // left toolbar: todo-list (icon: list), mermaid (icon: <el-icon><Opportunity /></el-icon>)
  // right toolbar: delete

  data () {
    return {
      text: '',
      position: {
        x: '0px',
        y: '0px'
      },
      mode: 'editable',
    }
  },
  props: {
    id: Number,
    initText: String,
    initPosition: Object
  },
  mounted () {
    // const content = this.$store.state.items.whiteboards[this.id]
    this.text = this.initText
    this.position = this.initPosition
  },
  methods: {
    onBlur: function (e) {
      console.log('onblur')
      console.log(e)
      this.mode = 'preview'
    },
    onClick: function () {
      console.log('click')
      this.mode = 'editable'
      console.log(this.$refs.editor)
      this.$nextTick(() => {
        this.$refs.editor.focus()
      })
    }
  }
}
</script>
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
    onBlur: function () {
      this.mode = 'preview'
      const re = /^\s*?$/
      if (re.test(this.text)) {
        this.$emit('delete', this.id)
      } else {
        this.$emit('edit', this.id, this.text)
      }
    },
    onClick: function () {
      this.mode = 'editable'
      this.$nextTick(() => {
        this.$refs.editor.focus()
      })
    }
  }
}
</script>
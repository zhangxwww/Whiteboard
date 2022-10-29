<template>
  <div :style="{top: position.y, left: position.x}"
       @click="onClick">
    <v-md-editor ref="editor"
                 v-model="text"
                 height="auto"
                 left-toolbar="undo redo clear | strikethrough quote | table | link"
                 right-toolbar="preview"
                 :autofocus=true
                 :mode=mode
                 :class="select"
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
    this.text = this.initText
    this.position = this.initPosition
    this.$refs.editor.$el.childNodes[1].childNodes[1].childNodes[0].onmousedown = (e) => {
      e.stopPropagation()
    }
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
  },
  computed: {
    select: function () {
      return this.mode === 'editable' ? 'can-select' : 'no-select'
    }
  }
}
</script>

<style>
.can-select {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
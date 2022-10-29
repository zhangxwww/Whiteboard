<template>
  <div :style="{top: position.y, left: position.x}"
       @click="onClick">
    <v-md-editor ref="editor"
                 v-model="text"
                 height="auto"
                 left-toolbar="undo redo clear | left center right | strikethrough quote  table link todo mermaid"
                 right-toolbar="preview delete"
                 :toolbar="toolbar"
                 :autofocus=true
                 :mode=mode
                 @blur="onBlur"></v-md-editor>
  </div>
</template>

<script>
import '../assets/css/icomoon.css'

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

      toolbar: {
        mermaid: {
          title: 'Mermaid',
          icon: 'icon-database',
          action (editor) {
            editor.insert(function (selected) {
              const prefix = '\n```mermaid\ngraph LR\n'
              const suffix = '\n```'
              const content = selected || ''

              return {
                text: `${prefix}${content}${suffix}`,
                selected: content
              }
            })
          }
        },
        left: {
          title: 'Left Align',
          icon: 'icon-paragraph-left',
          action (editor) {
            editor.insert(function (selected) {
              const prefix = '\n::: align-left\n'
              const suffix = '\n:::\n'
              const content = selected || ''

              return {
                text: `${prefix}${content}${suffix}`,
                selected: content
              }
            })
          }
        },
        center: {
          title: 'Center Align',
          icon: 'icon-paragraph-center',
          action (editor) {
            editor.insert(function (selected) {
              const prefix = '\n::: align-center\n'
              const suffix = '\n:::\n'
              const content = selected || ''

              return {
                text: `${prefix}${content}${suffix}`,
                selected: content
              }
            })
          }
        },
        right: {
          title: 'Right Align',
          icon: 'icon-paragraph-right',
          action (editor) {
            editor.insert(function (selected) {
              const prefix = '\n::: align-right\n'
              const suffix = '\n:::\n'
              const content = selected || ''

              return {
                text: `${prefix}${content}${suffix}`,
                selected: content
              }
            })
          }
        },
        todo: {
          title: 'TODO List',
          icon: 'icon-checkbox-checked',
          action (editor) {
            editor.insert(function (selected) {
              const prefix = '\n- [ ] '
              const suffix = ''
              const content = selected || ''

              return {
                text: `${prefix}${content}${suffix}`,
                selected: content
              }
            })
          }
        },
        delete: {
          title: 'Delete',
          icon: 'icon-bin',
          action () {
            this.$emit('delete', this.id)
          }
        }
      }
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
    this.$refs.editor.$el.childNodes[1].childNodes[1].childNodes[1].style.userSelect = 'none'
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
      console.log('select')
      return this.mode === 'editable' ? 'can-select' : 'no-select'
    }
  }
}
</script>

<style>
</style>
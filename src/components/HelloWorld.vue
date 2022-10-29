<template>
  <div class="hello"
       v-contextmenu="{name: 'context-menu-1', id: '123'}">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org"
         target="_blank"
         rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
           target="_blank"
           rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
           target="_blank"
           rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org"
           target="_blank"
           rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org"
           target="_blank"
           rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org"
           target="_blank"
           rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs"
           target="_blank"
           rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org"
           target="_blank"
           rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org"
           target="_blank"
           rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org"
           target="_blank"
           rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools"
           target="_blank"
           rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org"
           target="_blank"
           rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue"
           target="_blank"
           rel="noopener">awesome-vue</a></li>
    </ul>
    <el-form :label-position="labelPosition"
             label-width="100px"
             :model="formLabelAlign"
             style="max-width: 460px">
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
    </el-form>
    <el-button @click="save"
               style="position: fixed"
               :style="{position: 'fixed', top: click_pos.top, left: click_pos.left}">Default</el-button>
  </div>

  <context-menu name="context-menu-1"
                ref="context">
    <context-menu-submenu :label="'查看'">
      <context-menu-item disabled>图标</context-menu-item>
      <context-menu-item>列表</context-menu-item>
      <context-menu-item>详细信息</context-menu-item>
    </context-menu-submenu>

    <context-menu-item @click="refresh"
                       :divider="true">刷新</context-menu-item>
    <context-menu-item @itemClickHandle="itemClickEvent"
                       :divider="true">停止</context-menu-item>

    <context-menu-item :disabled="true">属性</context-menu-item>
  </context-menu>

  <div v-drag
       id="drag"
       style="position:absolute; top:100px; left:100px">
    <p>打印</p>
  </div>

  <div style="width:600px"
       @click=onClick>
    <v-md-editor ref='editor'
                 v-model="text"
                 height="auto"
                 left-toolbar="undo redo clear | strikethrough quote | table | link"
                 right-toolbar="preview"
                 :autofocus=true
                 :mode=mode
                 @blur=onBlur></v-md-editor>
  </div>

</template>


<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    // VueDraggableResizable
  },
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      click_pos: {
        top: "0px",
        left: "0px"
      },
      list: [
        { x: '15px', y: '15px', name: '1', width: '100px', height: '100px' },
      ],
      text: '',
      mode: 'editable',
    }
  },
  methods: {
    save () {
      localStorage.setItem('formLabelAlign', JSON.stringify(this.formLabelAlign))
    },
    itemClickEvent (item) {
      console.log(item.name)
      console.log(item.id)
      console.log(this.$refs.context.contextmenu.style.top)

      this.click_pos.top = this.$refs.context.contextmenu.style.top
      this.click_pos.left = this.$refs.context.contextmenu.style.left
    },
    onResize: function (x, y, width, height) {
      console.log(x, y, width, height)
      this.list[0].x = x
      this.list[0].y = y
      this.list[0].width = width
      this.list[0].height = height
    },
    onDrag: function (x, y) {
      console.log(x, y)
      this.list[0].x = x
      this.list[0].y = y
    },
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
  },
  mounted () {
    const formLabelAlign = localStorage.getItem('formLabelAlign')
    if (formLabelAlign) {
      this.formLabelAlign = JSON.parse(formLabelAlign)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

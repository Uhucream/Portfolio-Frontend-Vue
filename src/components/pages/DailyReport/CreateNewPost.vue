<template>
  <v-container fluid style="height: 100%">
    <div class="bodyContent">
      <v-card
        class="pa-3"
        height="100%"
      >
        <v-text-field
          dense
          label="日報タイトル"
          outlined
          :rules="fieldRule"
          v-model="titleText"
        />
        <v-divider/>
        <v-row>
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <v-col>
              <div>
                <v-btn
                  text
                  icon
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="commands.heading({level: 1})"
                >
                  <b> H1 </b>
                </v-btn>
                <v-btn
                  text
                  icon
                  :class="{ 'is-active': isActive.bold () }"
                  @click="commands.bold"
                >
                  <v-icon>mdi-format-bold</v-icon>
                </v-btn>

                <v-btn
                  text
                  icon
                  :class="{ 'is-active': isActive.underline () }"
                  @click="commands.underline"
                >
                  <v-icon>mdi-format-underline</v-icon>
                </v-btn>

                <v-btn
                  text
                  icon
                  @click="loadImage(commands.image)"
                >
                  <v-icon>mdi-image</v-icon>
                </v-btn>
              </div>
            </v-col>
          </editor-menu-bar>
        </v-row>
        <v-row>
          <v-col cols="12">
            <editor-content class="editor-box" :editor="editor"/>
          </v-col>
        </v-row>
        <v-btn
          absolute bottom
          style="right: 96px"
        >
          キャンセル
        </v-btn>
        <v-btn
          absolute bottom right
          color="primary"
          :disabled="!this.titleText && !this.bodyContent"
          @click="onSubmitClicked"
        >
          投稿
        </v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Heading,
  Bold,
  Underline,
  Image
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      titleText: null,
      bodyContent: null,
      fieldRule: [(v) => !!v || '入力必須'],
      editor: new Editor({
        extensions: [
          new Heading({levels: [1, 2, 3]}),
          new Bold(),
          new Underline(),
          new Image()
        ],
        onUpdate: ({ getHTML }) => {
          const newContent = getHTML()
          this.bodyContent = newContent
        },
        onFocus: ({ event, state, view }) => {
        },
        onPaste: (data) => {
        },
        onTransaction: ({ state }) => {
        }
      })
    }
  },
  methods: {
    loadImage (command) {
      command({ src: null })
    },
    onSubmitClicked () {
      this.$axios.post('/v1/submit_post', {
        'title': this.titleText,
        'body_text': this.bodyContent
      },
      {
        withCredentials: true,
        headers: {
          'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
        }
      })
        .then(response => {
          let postId = response.data.id
          this.$router.push(`/daily_reports/post/${postId}`)
        })
        .catch(_ => {
        })
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style>
.editor-box> * {
    border-color: grey;
    border-style: solid;
    border-radius: 4px;
    border-width: 1px;
}

.is-active{
    border-color: grey;
    border-style: solid;
    border-width: 1px;
}
 /* *:focus {
    outline: none;
}  */
</style>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>

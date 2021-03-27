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
          v-model="reportData.titleText"
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

        <v-dialog
          v-model="confirmDialog"
          max-width="290px"
        >
          <v-card>
            <v-card-title class="headline">削除確認</v-card-title>
            <v-card-text>ホンマに言うてます？</v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                text
                color="primary"
                @click="confirmDialog = false"
              >
                キャンセル
              </v-btn>
              <v-btn
                text
                :loading="deleteProgress"
                color="red"
                @click="deletePost"
              >
                削除
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          absolute bottom left
          color="red"
          @click.stop="confirmDialog = !confirmDialog"
        >
          この投稿を削除
        </v-btn>
        <v-btn
          absolute bottom
          style="right: 96px"
          to="/"
        >
          キャンセル
        </v-btn>
        <v-btn
          absolute bottom right
          color="primary"
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
      reportData: {
        uuid: null,
        titleText: null,
        bodyContent: null
      },
      confirmDialog: false,
      deleteProgress: false,
      fieldRule: [(v) => !!v || '入力必須'],
      editor: new Editor({
        content: null,
        extensions: [
          new Heading({levels: [1, 2, 3]}),
          new Bold(),
          new Underline(),
          new Image()
        ],
        onUpdate: ({ getHTML }) => {
          const newContent = getHTML()
          this.reportData.bodyContent = newContent
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
    async fetchReportData () {
      await this.$axios
        .get(`/v1/post/${this.$route.params['id']}`)
        .then((response) => {
          this.$set(this.reportData, 'uuid', response.data.uuid)
          this.$set(this.reportData, 'titleText', response.data.title)
          this.$set(this.reportData, 'bodyContent', response.data.body_text)
          this.editor.setContent(response.data.body_text)
        })
    },
    async deletePost () {
      this.deleteProgress = true
      await this.$axios
        .delete(
          `/v1/delete_post?id=${this.$route.params['id']}&uuid=${this.reportData.uuid}`,
          {
            withCredentials: true,
            headers: {
              'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
            }
          }
        )
        .then(() => {
          this.deleteProgress = false
          this.$router.push({path: '/daily_reports/posts'})
        })
        .catch((error) => {
          if (error.response.data.message === 'Missing cookie "access_token_cookie"') {
            this.$router.push({path: '/login', query: {backuri: this.$route.fullPath}})
          }
          this.deleteProgress = false
        })
    },
    onSubmitClicked () {
      this.$axios
        .patch(
          '/v1/edit_post',
          {
            'id': this.$route.params['id'],
            'uuid': this.reportData.uuid,
            'title': this.reportData.titleText,
            'body_text': this.reportData.bodyContent
          },
          {
            withCredentials: true,
            headers: {
              'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
            }
          }
        )
        .then(() => {
          this.$router.push(`/daily_reports/post/${this.$route.params['id']}`)
        })
        .catch(() => {
        })
    }
  },
  created () {
    this.fetchReportData()
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

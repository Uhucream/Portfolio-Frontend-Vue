<template>
  <v-container fluid>
    <div class="bodyContent">
      <v-card
        class="pa-3"
        height="100%"
      >
        <v-row>
          <v-card-title>
            <div>
              <p class="display-1 text--primary">
                Login
              </p>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form ref="loginForm">
              <v-text-field
                v-model="inputData.id"
                label="ID"
                outlined
              />
              <v-text-field
                v-model="inputData.password"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
              />
              <v-checkbox
                v-model="inputData.keepLoggedIn"
                label="ログイン状態を保持"
              >
              </v-checkbox>
            </v-form>
          </v-card-text>
        </v-row>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            :loading="cancelProgress"
            @click="onCancelClicked"
          >
            Cancel
          </v-btn>
          <v-btn
            :disabled="!(inputData.id && inputData.password) || loginProgress"
            :loading="loginProgress"
            color="primary"
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      inputData: {
        id: null,
        password: null,
        keepLoggedIn: false
      },
      showPass: false,
      loginProgress: false,
      cancelProgress: false
    }
  },
  methods: {
    login () {
      // バリデーションが通った場合
      if (this.$refs.loginForm.validate()) {
        // ぐるぐる表示にしてボタンを二度押しできなくする
        this.loginProgress = true
        // APIでログイン認証を行う
        this.$axios
          .post(
            '/auth/login',
            {
              'remember': this.inputData.keepLoggedIn ? 1 : 0
            },
            {
              withCredentials: true,
              auth: {
                username: this.inputData.id,
                password: this.inputData.password
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.$router.push({path: 'backuri' in this.$route.query && this.$route.query.backuri.match(/^\//) ? this.$route.query.backuri : '/'})
            } else {
              this.loginProgress = false
            }
          }).catch(_ => {
            this.loginProgress = false
          })
      }
    },
    onCancelClicked () {
      this.cancelProgress = true
      const routesList = this.$router.getRoutes()
      const backPath = this.$route.query.backuri
      var backPathInfo = routesList.filter((item) => {
        if (backPath === item.path) return true
      })[0]

      if (backPathInfo && !backPathInfo.meta.requireAuth) {
        this.$router.push({ path: backPath })
      } else {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>

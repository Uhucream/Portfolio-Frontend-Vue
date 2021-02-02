<template>
  <v-container :fluid="isTopPage">
    <v-breadcrumbs v-if="!isTopPage" :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-iterator
      :items="reportPosts"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
      no-data-text="No Posts Found"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="post in props.items"
            :key="post.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-text class="pb-0">
                <div>{{ post.date }}</div>
              </v-card-text>
              <v-card-title class="subheading font-weight-bold">
                {{ post.name }}
              </v-card-title>
              <v-card-text>
                <div class="text--primary cardBody">
                  {{ post.body }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="blue-grey lighten-1"
                  link
                  :to="`/daily_reports/post/${post.id}`"
                >
                  続きを読む
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  name: 'dailyReportsList',
  props: ['isTopPage'],
  data () {
    return {
      itemsPerPage: 4,
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'Daily Reports',
          disabled: true,
          to: '/daily_reports/posts'
        }
      ],
      reportPosts: [
        {
          id: 1,
          date: '2021/01/30',
          body: '今日、ようやくプロゲートのSQLの全コースを修了しました。かかった日数は１週間です。',
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          id: 2,
          date: '2021/01/30',
          body: '今日、ようやくプロゲートのSQLの全コースを修了しました。かかった日数は１週間です。',
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          id: 1,
          date: '2021/01/30',
          body: '今日、ようやくプロゲートのSQLの全コースを修了しました。かかった日数は１週間です。',
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          id: 3,
          date: '2021/01/30',
          body: '今日、ようやくプロゲートのSQLの全コースを修了しました。かかった日数は１週間です。',
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          id: 4,
          date: '2021/01/30',
          body: '今日、ようやくプロゲートのSQLの全コースを修了しました。かかった日数は１週間です。',
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        }
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // }
      ]
    }
  },
  methods: {
    switchMaxNum () {
      if (this.isXsDevice && this.$route.path !== '/daily_reports/posts') {
        this.itemsPerPage = 2
      } else if (this.$route.path === '/daily_reports/posts') {
        this.itemsPerPage = undefined
      }
    },
    postAmount () {
      if (this.$route.path !== '/daily_reports/posts') {
        this.$emit('postAmount', this.reportPosts.length)
      }
    }
  },
  watch: {
    isXsDevice: function () {
      if (this.isXsDevice && this.$route.path !== '/daily_reports/posts') {
        this.itemsPerPage = 2
      } else {
        this.itemsPerPage = 4
      }
    }
  },
  computed: {
    isXsDevice: function () {
      return this.$vuetify.breakpoint.xs
    }
  },
  mounted () {
    this.switchMaxNum()
    this.postAmount()
  }
}
</script>

<style scoped>
  .cardBody {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 35ch;
  }
</style>

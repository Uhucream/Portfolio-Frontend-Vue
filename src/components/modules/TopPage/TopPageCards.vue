<template>
  <v-container>
    <v-row>
      <v-col
        :cols="(12 / itemsPerRow)"
      >
        <v-subheader>About Me</v-subheader>
        <v-card>
          <v-img
            class="white--text align-end"
            :src="require('@/assets/WWDC.png')"
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
            position="left 50% bottom 20%"
            max-height="225"
          >
            <v-card-title class="display-1 text--primary">
              自己紹介
            </v-card-title>
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey darken-2"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="text-body-1 text--primary">
            金沢工業大学 3年 情報工学科の学生です。
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="blue-grey lighten-1"
              :to="{ name: 'AboutMe' }"
            >
              詳しい情報
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        :cols="worksCardsCols"
      >
        <v-subheader>My Works</v-subheader>
        <WorksList
          @numOfWorks="getNumOfWorks($event)"
          :isTopPage="isTopPage"
          :isSameRow="isSameRow"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <v-subheader>Daily Reports</v-subheader>
        <DailyReportsList
          :isTopPage="isTopPage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorksList from '@/components/pages/Works/WorksList'
import DailyReportsList from '@/components/pages/DailyReport/DailyReportsList'
export default {
  name: 'top-page-cards',
  components: {
    WorksList,
    DailyReportsList
  },
  data () {
    return {
      isTopPage: true,
      numOfWorksCards: null
    }
  },
  computed: {
    itemsPerRow () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 2
        case 'md': return 3
        case 'lg': return 4
        case 'xl': return 6
      }
    },
    isSameRow () {
      if (12 % this.numOfWorksCards !== 0) {
        return false
      } else {
        if (this.numOfWorksCards + 1 <= this.itemsPerRow) {
          return true
        } else {
          return false
        }
      }
    },
    worksCardsCols () {
      if (!this.isSameRow || this.$vuetify.breakpoint.xs) {
        return 12
      } else {
        return (12 / this.itemsPerRow) * this.numOfWorksCards
      }
    }
  },
  methods: {
    getNumOfWorks (num) {
      this.numOfWorksCards = num
    }
  }
}
</script>

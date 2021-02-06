<template>
  <div>
    <template v-for="block in mdContent.mdBody">
      <component :is="block.component" :block="block" :key="block._uid" v-bind="block" v-text="block.headline"></component>
    </template>
  </div>
</template>

<script>
export default {
  name: 'markdownParser',
  data () {
    return {
      mdContent: {
        mdBody: [
          {
            _uid: 'BUY6Drn9e1',
            component: 'v-btn',
            headline: 'Foo',
            // props: {
            text: true
            // }
          },
          {
            _uid: 'gJZoSLkfZV',
            component: 'v-subheader',
            title: 'Bar'
          },
          {
            _uid: 'X1JAfdsZxy',
            component: 'v-text',
            headline: 'Another headline'
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>

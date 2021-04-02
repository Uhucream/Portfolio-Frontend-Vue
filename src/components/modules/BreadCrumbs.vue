<template functional>
  <v-breadcrumbs :items="$options.generateItems(props)" class="pt-1 pl-2">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    path: Array
  },
  generateItems (props) {
    var crumbsItems = [
      {
        text: 'Top',
        link: true,
        exact: true,
        disabled: false,
        to: { name: 'TopPage' }
      }
    ]
    props.path.forEach(elem => {
      crumbsItems.push(
        {
          ...elem,
          link: true,
          exact: true
        }
      )
    })
    return crumbsItems
  }
}
</script>

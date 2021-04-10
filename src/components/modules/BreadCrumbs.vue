<template functional>
  <v-breadcrumbs :key="props.key" :items="$options.generateItems(props)" class="pt-1 pb-0 pl-2">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        v-bind="item"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    path: Array,
    key: null
  },
  generateItems (props) {
    var crumbsItems = [
      {
        text: 'Top',
        ripple: true,
        exact: true,
        disabled: false,
        to: { name: 'TopPage' }
      }
    ]
    props.path.forEach(elem => {
      crumbsItems.push(
        {
          ...elem,
          ripple: true,
          exact: true,
          disabled: false
        }
      )
    })
    return crumbsItems
  }
}
</script>

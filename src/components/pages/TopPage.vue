<template>
  <div>
    <TopPageCarousel />
    <TopPageCards />
  </div>
</template>

<script>
import TopPageCarousel from '@/components/modules/TopPage/Carousel'
import TopPageCards from '@/components/modules/TopPage/TopPageCards'
export default {
  name: 'top-page',
  components: {
    TopPageCards,
    TopPageCarousel
  }
}
</script>

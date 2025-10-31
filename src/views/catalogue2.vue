<template>
  <CommonCarousel :images="cards" />
</template>

<script>
import CommonCarousel from '@/components/CommonCarousel.vue'

export default {
  name: 'catalogue2',
  components: {
    CommonCarousel
  },
  data() {
    return {
      cards: [
        {
          src: require('../assets/catalogue2/1.jpg'),
          alt: '1.jpg'
        },
        {
          src: require('../assets/catalogue2/2.jpg'),
          alt: '2.jpg'
        },
        {
          src: require('../assets/catalogue2/3.jpg'),
          alt: '3.jpg'
        },
        {
          src: require('../assets/catalogue2/4.jpg'),
          alt: '4.jpg'
        },
        {
          src: require('../assets/catalogue2/5.jpg'),
          alt: '5.jpg'
        },
        {
          src: require('../assets/catalogue2/6.jpg'),
          alt: '6.jpg'
        },
      ]
    }
  }
}
</script>
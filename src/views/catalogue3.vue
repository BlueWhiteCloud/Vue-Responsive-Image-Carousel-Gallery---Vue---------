<template>
  <CommonCarousel :images="cards" />
</template>

<script>
import CommonCarousel from '@/components/CommonCarousel.vue'

export default {
  name: 'catalogue3',
  components: {
    CommonCarousel
  },
  data() {
    return {
      cards: [
        {
          src: require('../assets/catalogue3/1.jpg'),
          alt: '1.jpg'
        },
        {
          src: require('../assets/catalogue3/2.jpg'),
          alt: '2.jpg'
        },
        {
          src: require('../assets/catalogue3/3.jpg'),
          alt: '3.jpg'
        },
        {
          src: require('../assets/catalogue3/4.jpg'),
          alt: '4.jpg'
        },
        {
          src: require('../assets/catalogue3/5.jpg'),
          alt: '5.jpg'
        },
        {
          src: require('../assets/catalogue3/6.jpg'),
          alt: '6.jpg'
        },
        {
          src: require('../assets/catalogue3/7.jpg'),
          alt: '7.jpg'
        },
      ]
    }
  }
}
</script>
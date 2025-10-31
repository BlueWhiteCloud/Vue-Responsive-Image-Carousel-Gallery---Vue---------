<template>
  <CommonCarousel :images="cards" />
</template>

<script>
import CommonCarousel from '@/components/CommonCarousel.vue'

export default {
  name: 'catalogue1',
  components: {
    CommonCarousel
  },
  data() {
    return {
      cards: [
        {
          src: require('../assets/catalogue1/1.jpg'),
          alt: '1.jpg'
        },
        {
          src: require('../assets/catalogue1/2.jpg'),
          alt: '2.jpg'
        },
        {
          src: require('../assets/catalogue1/3.jpg'),
          alt: '3.jpg'
        },
        {
          src: require('../assets/catalogue1/4.jpg'),
          alt: '4.jpg'
        },
        {
          src: require('../assets/catalogue1/5.jpg'),
          alt: '5.jpg'
        },
        {
          src: require('../assets/catalogue1/6.jpg'),
          alt: '6.jpg'
        },
        {
          src: require('../assets/catalogue1/7.jpg'),
          alt: '7.jpg'
        },
        {
          src: require('../assets/catalogue1/8.jpg'),
          alt: '8.jpg'
        },
        {
          src: require('../assets/catalogue1/9.jpg'),
          alt: '9.jpg'
        },
        {
          src: require('../assets/catalogue1/10.jpg'),
          alt: '10.jpg'
        },
      ]
    }
  }
}
</script>
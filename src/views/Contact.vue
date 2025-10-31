<template>
  <div class="column-presentation">
    <div class="column-content">
      <h2 style="letter-spacing: 0.1em;">Contact</h2>
      <p>如果你喜欢我的摄影作品，欢迎与我联系，我的邮箱地址是：</p>
      <p style="letter-spacing: 0.1em;">xxxxxxxxxx@xxxxx.com</p>
    </div> 
  </div>

  <div class="cover-board">
    
    <img 
      class="background" 
      :class="{ active: currentIndex === index }" 
      v-for="(image, index) in coverImages" 
      :key="index" 
      :src="image" 
      alt="cover"
      @load="handleImageLoad"
    >
  </div>
</template>

<script>
export default{
  name:'conduct',
  data(){
    return{
      currentIndex: 0,
      coverImages: [
        require('../assets/covers/cover0.jpg'),
        require('../assets/covers/cover1.jpg'),
        require('../assets/covers/cover2.jpg'),

      ],

    }
  },
  created() {
    const bgIndex = this.$route.query.bgIndex;
    if (bgIndex !== undefined) {
      this.currentIndex = parseInt(bgIndex);
    }
  }
}
</script>




<style scoped>
.cover-board {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: hidden;
  isolation: isolate;
}

.background {
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  mask-image: linear-gradient(to left, black 50%, transparent 100%);
  filter:brightness(0.7) ;
  -webkit-mask-image: linear-gradient(to left, black 50%, transparent 100%);
  will-change: opacity, transform;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

.background.active {
  opacity: 1;
}

.column-presentation{
  position: fixed;
  display:flex;
  z-index:2;
  color:white;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width:100%;
  height:100%;
}

.column-content{
    width:350px;
    height:350px;
    background-color: rgba(0, 0, 0, 0.8);
    padding:50px;
}
.column-content h2{
  text-align: center;
  margin:0 0 0.7em 0;
}
.column-content p{
  line-height: 1.3;
  margin: 0 0 0.7em 0;
}

@media (max-width: 480px) {
  .column-content{
    transform: scale(0.8);
  }
}
</style>
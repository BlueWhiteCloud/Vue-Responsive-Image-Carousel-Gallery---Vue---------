<template>
  <div class="column-presentation">
    <div class="column-content">
        <h2 style="letter-spacing: 0.1em;">ABOUT</h2>
        <p>我总在寻找那些藏在喧嚣背后的宁静——一片落叶的弧度，一盏灯的光晕，都是自然与生活的低语。</p>   
        <p>我的镜头，试图将这些细碎的美好定格，让瞬间成为永恒的诗意。</p>
        <p>以镜头为笔，记录时光里易逝的瞬间。</p>
        <p>若你能从信里读出共鸣，那我们早已在光影里相遇。</p>
        <p style="text-align: end;">[你的名字]</p>
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
  name:'about',
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
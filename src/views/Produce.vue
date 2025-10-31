<template>
  <div class="column-presentation">
    <div class="column-content">
      <h2 style="letter-spacing: 0.1em;">PRODUCE & DESIGN</h2>
      <p>这个线上图片作品集，旨在构建深度、专注的呈现载体。</p>
      <p>设计上以流畅的浏览体验和无痕的细节，使观者沉浸于作品本身。</p>
      <p>在本项目中我负责网站的整体规划、前端设计与开发、PC端与移动端适配、用户体验规划。</p>
      <p>目前本人大三在读，如果你也喜欢这个网站，或对合作感兴趣，欢迎与我联系。</p>   
      <p style="letter-spacing: 0.1em;">Email :  1356232877@qq.com</p>
      <p style="text-align: end;letter-spacing: 0.1em;">BlueWhiteCloud</p>
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
  name:'produce',
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
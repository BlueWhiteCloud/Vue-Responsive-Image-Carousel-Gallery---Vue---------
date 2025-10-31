<template>
  <div class="presentation">
    <div class="name-bar">
      <div class="logo"><img src="@/assets/logo.png" alt="logo"></img></div>
      <span class="ch-name">[你的名字]</span><span class="en-name">[Your Name]</span>
    </div>
    <div class="catalogue">
      <ul>
        <li @mouseenter="handleSwitchCover(0)" @click="goToPage('catalogue1')">catalogue1</li>
        <li @mouseenter="handleSwitchCover(1)" @click="goToPage('catalogue2')">catalogue2</li>
        <li @mouseenter="handleSwitchCover(2)" @click="goToPage('catalogue3')">catalogue3</li>
      </ul>
    </div>
    <div class="column-bar">
      <span id="about" @click="goToPage('about')">About</span>
      |
      <span id="contact" @click="goToPage('contact')">Contact</span>
      |
      <span id="produce" @click="goToPage('produce')">Produce</span>
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
  name:'home',
  data(){
    return{
      currentIndex: 0,
      coverImages: [
        require('../assets/covers/cover0.jpg'),
        require('../assets/covers/cover1.jpg'),
        require('../assets/covers/cover2.jpg'), 
      ],
      imagesLoaded: false,
      switchTimeout: null
    }
  },
  mounted() {
    this.preloadImages();
  },
  methods:{
    preloadImages() {
      const loadPromises = this.coverImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      
      Promise.all(loadPromises).then(() => {
        this.imagesLoaded = true;
      });
    },
    
    handleSwitchCover(index) {
      if (!this.imagesLoaded) return;
      
      if (this.switchTimeout) {
        clearTimeout(this.switchTimeout);
      }
      
      this.switchTimeout = setTimeout(() => {
        if (index !== this.currentIndex) {
          this.currentIndex = index;
        }
      }, 50);
    },
    
    handleImageLoad() {
      console.log('Image loaded successfully');
    },
    goToPage(pageName) {
      const routeMap = {
        'catalogue1': '/catalogue1',
        'catalogue2': '/catalogue2',
        'catalogue3': '/catalogue3',
        'about': '/about',
        'contact': '/contact',
        'produce': '/produce'
      };
      
      const path = routeMap[pageName];
      
      if (!path) {
        console.error(`无效的页面名称: ${pageName}`);
        return;
      }
      
      const pagesWithQuery = ['about', 'contact', 'produce'];
      
      if (pagesWithQuery.includes(pageName)) {
        this.$router.push({
          path: path,
          query: { bgIndex: this.currentIndex }
        });
      } else {
        this.$router.push(path);
      }
    }
  }
}
</script>

<style>
:root{
  --catalogue-gap:20vh;
  --ch-name-fontsize:calc(max(2vw,30px));
  --logo-size:calc(var(--ch-name-fontsize)*1.5);
  --en-name-fontsize:calc(var(--ch-name-fontsize)*0.8);
  --en-name-margin-left:1vw;
  --li-fontsize: calc(var(3vw)/3*1.5);
  --dot-size:0.8vw;
  --name-direction:row;
  --column-fontsize:22px;
  --logo-margin-left:0;
  --column-margin-top:5vh;
}

@media (max-width: 900px) {
  :root{
    --ch-name-fontsize:20px;
    --logo-size:calc(var(--ch-name-fontsize)*4);
    --li-fontsize: 24px;
    --en-name-fontsize:calc(var(--ch-name-fontsize)*0.5);
    --en-name-margin-left:0vw;
    --name-direction:column;
    --column-fontsize:18px;
    --logo-margin-left:5vw;
  }
}

@media (min-height: 1200px) {
    :root{
      --ch-name-fontsize:4vh;
      
    }
}
    
</style>


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


.goto{
  
  position: fixed;
  right:10vw;
  bottom:10vh;
  color:white;
  z-index: 3;
  
  
}

.presentation{
  position: fixed;
  display: flex;
  height:100%;
  flex-direction: column;
  align-items: flex-start;
  color:#ccc;
  font-size:var(--ch-name-fontsize);
  margin-top:5vh;
  margin-left:4vw;
  z-index: 2; 
  will-change: transform;
}
.name-bar{
  display: flex;
  align-items: center;
  margin-left:var(--logo-margin-left);
  flex-direction: var(--name-direction);
}
.logo{
  position: relative;

  left:-1vw;
  width:var(--logo-size);
  height:var(--logo-size);
  z-index: 10;
}
.logo img{
  width:100%;
  height:100%;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  user-select: none;
  -webkit-user-select: none;
}
.en-name{
  margin-left:var(--en-name-margin-left);
  letter-spacing: 0.3vw;
  font-size: var(--en-name-fontsize);
  color: #ffffffe0;
  font-family:serif;
  font-weight: 100;
}

.catalogue{
  margin-top:20vh;
  font-size:var(--li-fontsize);
  margin-left: 3.5vw;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}

.catalogue ul{
  list-style:none;
  margin: 0;
  padding: 0;
}

.catalogue li{
  margin-top: 1vh;
  transition: transform 0.3s ease, color 0.3s ease;
  cursor: pointer;
  position: relative;
  padding-left: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.catalogue li:hover{
  transform: scale(1.05);
  color: white;
  padding-left: 1vw;
}

.catalogue li::before {
  content: '';
  position: absolute;
  left: -1.5vw;
  top: 50%;
  transform: translateY(-50%);
  width: var(--dot-size);
  height: var(--dot-size);
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.catalogue li:hover::before {
  opacity: 1;
}

@media (max-width: 768px) {
  .background {
    transition: opacity 0.4s ease-in-out;
  }
  
  .atalogue li {
    transition: color 0.3s ease; 
  }
  
  .atalogue li:hover {
    transform: none; 
  }
}

.column-bar{
  position:relative;
  margin-left: 2.5vw;
  margin-top: var(--column-margin-top);
  margin-bottom: 5vh;
  color:#ccc;
  width: fit-content;
  font-size: var(--column-fontsize);
  z-index:5;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}
.column-bar span{
  margin:0 0.5vw;
  cursor:pointer;
}
.column-bar span:hover{
  color: white;
}
</style>
<template>
  <Loading ref="loadingRef" />
  <div 
    class="back" 
    v-if="$route.path !== '/'" 
    @click="$router.push('/')"
  >
    BACK
  </div>
  <div class="app-container"></div>
  
  <!-- 使用 keep-alive 缓存路由组件 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Loading from "./components/loading.vue"

const router = useRouter()
const loadingRef = ref(null)

// 等待所有图片加载完成
const waitForImages = () => {
  return new Promise((resolve) => {
    const images = document.images
    let loadedCount = 0
    const totalImages = images.length
    
    if (totalImages === 0) {
      resolve()
      return
    }

    const imageLoaded = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        resolve()
      }
    }

    // 检查图片是否已经加载完成
    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        loadedCount++
      } else {
        images[i].addEventListener('load', imageLoaded)
        images[i].addEventListener('error', imageLoaded) // 即使加载失败也计数
      }
    }

    if (loadedCount === totalImages) {
      resolve()
    }
  })
}

// 检查加载状态
const checkLoading = async () => {
  // 等待 Vue 完成初始渲染
  await nextTick()
  
  // 等待所有图片加载完成
  await waitForImages()
  
  // 额外延迟确保用户体验
  setTimeout(() => {
    loadingRef.value?.hideLoading()
  }, 1000)
}

// 路由切换处理
router.beforeEach((to, from, next) => {
  loadingRef.value?.showLoading()
  next()
})

router.afterEach(() => {
  // 路由切换后等待内容加载
  setTimeout(() => {
    loadingRef.value?.hideLoading()
  }, 800)
})

onMounted(() => {
  checkLoading()
})
</script>

<style>
*{
  font-family: "STSong", "华文宋体", serif;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
}

.back{
  position:fixed;
  right: 5%;
  bottom: 5%;
  font-size: 28px;
  color:#f6f6f6b6;
  cursor: pointer;
  z-index: 2000;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}

.back:hover{
  transform: scale(1.1);
  color: white;
  border-bottom: 2px solid white;
}

.app-container{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: black;
}

/* 全局重置，确保无滚动条 */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
    /* 提示浏览器这是高性能应用 */
  transform: translateZ(0);
  backface-visibility: hidden;
}

#app {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* 确保路由视图不产生滚动 */
.router-view {
  height: 100vh;
  overflow: hidden;
}

/* 为所有动画元素启用硬件加速 */
#app, .carousel-app, .container, .card, .loading-content {
  transform: translateZ(0);
  will-change: transform;
}
</style>
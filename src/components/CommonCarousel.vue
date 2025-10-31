<template>
  <div class="carousel-app">
    <div class="cover-board">
      <img 
        class="background" 
        :class="{ active: activeIndex === index }" 
        v-for="(image, index) in images" 
        :key="index" 
        :src="image.src" 
        alt="cover"
        @load="handleImageLoad"
        @error="handleImageError($event, index, 'background')"
      >
    </div>
    
    <div class="container"
        @wheel="handleWheel"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startTouch"  
        @touchmove="handleTouch"  
        @touchend="endTouch"      
        @touchcancel="endTouch">
      
      <div class="card-wrapper" id="cardWrapper">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="card"
          :class="getCardClass(index)"
          :data-index="index"
          @click="handleCardClick(index)"
          @mousedown="handleCardMouseDown"
          @touchstart="handleCardTouchStart($event, index)"
          @touchend="handleCardTouchEnd($event, index)"
        >
          <img 
            :src="image.src" 
            :alt="image.alt" 
            @error="handleImageError($event, index, 'card')"
          />
        </div>
      </div>
      
      <!-- 上箭头 -->
      <div 
        class="arrow arrow-up" 
        id="arrowUp"
        @click="prevCard"
        @touchstart="handleArrowTouch('prev')"
      >↑</div>
      
      <!-- 下箭头 -->
      <div 
        class="arrow arrow-down" 
        id="arrowDown"
        @click="nextCard"
        @touchstart="handleArrowTouch('next')"
      >↓</div>
    </div>

    <!-- 图片详情模态框 -->
    <div v-if="showDetail" class="image-detail-modal" @click="closeDetail">
      <div class="modal-backdrop"></div>
      <div class="modal-content" @click.stop>
        <img :src="currentDetailImage.src" :alt="currentDetailImage.alt" class="detail-image" />
        <div class="image-info">
          <p class="image-counter">{{ currentDetailIndex + 1 }} / {{ images.length }}</p>
        </div>
        <!-- 导航箭头现在固定在屏幕两端 -->
        <button class="nav-btn prev-btn" @click="prevDetailImage">‹</button>
        <button class="nav-btn next-btn" @click="nextDetailImage">›</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonCarousel',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: 0,
      intervalId: null,
      isDragging: false,
      dragStartY: 0,
      lastDragY: 0,
      accumulatedDistance: 0,
      dragThreshold: 80,
      minDragThreshold: 10,
      touchStartY: 0,
      touchStartTime: 0,
      isTouching: false,
      lastTouchY: 0,
      touchAccumulatedDistance: 0,
      showDetail: false,
      currentDetailIndex: 0,
      currentDetailImage: null,
      retryCounts: {},
      maxRetries: 3,
      retryDelay: 1000
    };
  },
  methods: {
    getCardClass(index) {
      const positions = [-2, -1, 0, 1, 2];
      const positionIndex = positions.findIndex(pos => 
        (this.activeIndex + pos + this.images.length) % this.images.length === index
      );
      
      if (positionIndex === -1) return 'hidden';
      
      return ['prev-2', 'prev-1', 'active', 'next-1', 'next-2'][positionIndex];
    },
    
    switchToCard(targetIndex) {
      if (targetIndex >= 0 && targetIndex < this.images.length) {
        this.activeIndex = targetIndex;
      }
    },
    
    nextCard() {
      const nextIndex = (this.activeIndex + 1) % this.images.length;
      this.switchToCard(nextIndex);
    },
    
    prevCard() {
      const prevIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
      this.switchToCard(prevIndex);
    },

    handleCardClick(index) {
      if (this.isDragging || this.isTouching) return;
      
      if (index === this.activeIndex) {
        this.showImageDetail();
      } else {
        this.switchToCard(index);
      }
    },

    handleCardTouchStart(event, index) {
      event.stopPropagation();
      this.touchStartY = event.touches[0].clientY;
      this.touchStartTime = Date.now();
      this.isTouching = true;
      this.lastTouchY = this.touchStartY;
      this.touchAccumulatedDistance = 0;
    },

    handleCardTouchEnd(event, index) {
      event.stopPropagation();
      const touchEndY = event.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - this.touchStartTime;
      const deltaY = Math.abs(touchEndY - this.touchStartY);
      
      if (touchDuration < 300 && deltaY < 10 && !this.isDragging) {
        this.handleCardClick(index);
      }
      
      this.isTouching = false;
      this.touchAccumulatedDistance = 0;
    },

    handleArrowTouch(direction) {
      event.preventDefault();
      event.stopPropagation();
      
      if (direction === 'prev') {
        this.prevCard();
      } else {
        this.nextCard();
      }
    },

    handleCardMouseDown(event) {
      event.stopPropagation();
    },

    showImageDetail() {
      this.currentDetailIndex = this.activeIndex;
      this.currentDetailImage = this.images[this.activeIndex];
      this.showDetail = true;
    },

    closeDetail() {
      this.showDetail = false;
    },

    prevDetailImage() {
      this.currentDetailIndex = (this.currentDetailIndex - 1 + this.images.length) % this.images.length;
      this.currentDetailImage = this.images[this.currentDetailIndex];
      this.activeIndex = this.currentDetailIndex;
    },

    nextDetailImage() {
      this.currentDetailIndex = (this.currentDetailIndex + 1) % this.images.length;
      this.currentDetailImage = this.images[this.currentDetailIndex];
      this.activeIndex = this.currentDetailIndex;
    },

    handleWheel(event) {
      event.preventDefault();
      
      if (event.deltaY > 0) {
        this.nextCard();
      } else {
        this.prevCard();
      }
    },
    
    startDrag(event) {
      if (event.target.closest('.card')) return;
      
      this.isDragging = true;
      this.dragStartY = event.clientY;
      this.lastDragY = event.clientY;
      this.accumulatedDistance = 0;
    },
    
    handleDrag(event) {
      if (!this.isDragging) return;
      
      const currentY = event.clientY;
      const deltaY = currentY - this.lastDragY;
      
      this.accumulatedDistance += Math.abs(deltaY);
      
      if (this.accumulatedDistance > this.minDragThreshold) {
        if (this.accumulatedDistance >= this.dragThreshold) {
          if (deltaY > 0) {
            this.prevCard();
          } else {
            this.nextCard();
          }
          this.accumulatedDistance = this.accumulatedDistance % this.dragThreshold;
        }
      }
      
      this.lastDragY = currentY;
    },
    
    endDrag() {
      this.isDragging = false;
      this.accumulatedDistance = 0;
    },

    startTouch(event) {
      if (event.target.closest('.card')) return;
      
      event.preventDefault();
      this.touchStartY = event.touches[0].clientY;
      this.lastTouchY = this.touchStartY;
      this.isTouching = true;
      this.touchAccumulatedDistance = 0;
    },

    handleTouch(event) {
      if (!this.isTouching) return;
      event.preventDefault();
      
      const currentY = event.touches[0].clientY;
      const deltaY = currentY - this.lastTouchY;
      
      this.touchAccumulatedDistance += Math.abs(deltaY);
      
      if (this.touchAccumulatedDistance > this.minDragThreshold) {
        if (this.touchAccumulatedDistance >= this.dragThreshold) {
          if (deltaY > 0) {
            this.prevCard();
          } else {
            this.nextCard();
          }
          this.touchAccumulatedDistance = this.touchAccumulatedDistance % this.dragThreshold;
        }
      }
      
      this.lastTouchY = currentY;
    },

    endTouch() {
      this.isTouching = false;
      this.touchAccumulatedDistance = 0;
    },

    handleImageLoad(event) {
      console.log('图片加载完成:', event.target.src);
      const src = event.target.src;
      this.retryCounts[src] = 0;
    },
    
    handleImageError(event, index, type) {
      const imgElement = event.target;
      const originalSrc = imgElement.src;
      
      console.error('图片加载失败:', originalSrc, '类型:', type, '索引:', index);
      
      const retryKey = `${originalSrc}-${index}-${type}`;
      if (!this.retryCounts[retryKey]) {
        this.retryCounts[retryKey] = 0;
      }
      
      if (this.retryCounts[retryKey] < this.maxRetries) {
        this.retryCounts[retryKey]++;
        console.log(`正在重试加载图片 (${this.retryCounts[retryKey]}/${this.maxRetries}):`, originalSrc);
        
        setTimeout(() => {
          const newSrc = this.images[index].src + (this.images[index].src.includes('?') ? '&' : '?') + `retry=${Date.now()}`;
          imgElement.src = newSrc;
        }, this.retryDelay);
      } else {
        console.warn('图片重试次数已达上限，停止重试:', originalSrc);
      }
    }
  }
}
</script>

<style scoped>
.carousel-app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%; 
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch; 
}

.container:active {
  cursor: grabbing;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--card-width);
  max-width: var(--card-max-width);
  height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  isolation: isolate;
  position: relative;
  overflow: visible;
}

.card {
  flex-shrink: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: var(--card-width);
  height: var(--card-height);
  min-height: 133px;
  min-width: 200px;
  max-width: var(--card-max-width);
  margin: 0;
  transition: all var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  background-color: black;
  transform: translate3d(-50%, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform, opacity, filter;
  pointer-events: auto;
}

.card.active {
  top: 50%;
  transform: translate3d(-50%, -50%, 0) scale(var(--active-times));
  z-index: 5;
  opacity: 1;
  filter: blur(0) brightness(1) saturate(1);
  box-shadow: 0 6px 14px 10px rgba(0, 0, 0, 0.5);
}

.card.prev-1 {
  top: calc(50% - var(--img-gap));
  transform: translate3d(-50%, -50%, 0) scale(1);
  z-index: 4;
  opacity: 0.85;
  filter: blur(var(--blur-strength-1)) brightness(0.7) saturate(0.8);
}

.card.next-1 {
  top: calc(50% + var(--img-gap));
  transform: translate3d(-50%, -50%, 0) scale(1);
  z-index: 4;
  opacity: 0.85;
  filter: blur(var(--blur-strength-1)) brightness(0.7) saturate(0.8);
}

.card.prev-2 {
  top: calc(50% - calc(var(--img-gap) * 2));
  transform: translate3d(-50%, -50%, 0) scale(1);
  z-index: 3;
  opacity: 0.7;
  filter: blur(var(--blur-strength-2)) brightness(0.5) saturate(0.6);
}

.card.next-2 {
  top: calc(50% + calc(var(--img-gap) * 2));
  transform: translate3d(-50%, -50%, 0) scale(1);
  z-index: 3;
  opacity: 0.7;
  filter: blur(var(--blur-strength-2)) brightness(0.5) saturate(0.6);
}

.card.hidden {
  opacity: 0;
  filter: blur(8px) brightness(0.1) saturate(0.1);
  pointer-events: none;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0); 

}

.arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: background-color 0.3s, transform 0.2s;
  pointer-events: auto;
}

.arrow:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: translateX(-50%) scale(1.1);
}

.arrow-up {
  top: 20px;
}

.arrow-down {
  bottom: 20px;
}

@media (max-width: 768px) {
  .arrow {
    width: 50px;
    height: 50px;
    font-size: 28px;
  }
  
  .arrow-up {
    top: 30px;
  }
  
  .arrow-down {
    bottom: 30px;
  }
}

.cover-board {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.background {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  z-index: 0;
  transition: opacity 0.6s ease-in-out;
  mask-image: linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%);
  filter: blur(var(--blur-strength));
  will-change: opacity;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  pointer-events: none;
}

.background.active {
  opacity: 0.5;
}

.background:not(.active) {
  opacity: 0;
  visibility: hidden;
}

.image-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}

.image-info {
  color: white;
  text-align: center;
  margin-top: 1rem;
}

.image-counter {
  color: #ccc;
  font-size: 0.9rem;
}

.nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 3rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.2s;
  z-index: 1002;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

@media (max-width: 768px) {
  .nav-btn {
    width: 50px;
    height: 50px;
    font-size: 2.5rem;
  }
  
  .prev-btn {
    left: 10px;
  }
  
  .next-btn {
    right: 10px;
  }
}

@media (max-width: 480px) {
  .nav-btn {
    width: 45px;
    height: 45px;
    font-size: 2rem;
  }
  
  .prev-btn {
    left: 5px;
  }
  
  .next-btn {
    right: 5px;
  }
}

.card, .arrow,.nav-btn {
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}
@media (max-width: 768px){
  .card {
    filter: none !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
    backdrop-filter: none;
  }
  .card:not(.active){
    filter:  brightness(0.6) !important;
  }
  .background {
    filter: blur(8px) !important; 
    mask-image: none; 
    -webkit-mask-image: none;
  }
  
  .modal-backdrop {
    backdrop-filter: blur(3px);
  }

  .card {
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform, opacity;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); 
  }
  
  :root {
    --transition-duration: 0.4s; 
  }

}

</style>
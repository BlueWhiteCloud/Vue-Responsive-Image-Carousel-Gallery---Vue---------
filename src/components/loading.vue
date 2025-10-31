<template>
  <div id="loading" :class="{ 'loading-out': !isLoading }">
    <div class="blur-background"></div>
    <div class="loading-content">
      <svg viewBox='0 0 50 50'>
        <circle r='25' cx='25' cy='25'></circle>
      </svg>
      <p>LOADING</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(true);

const showLoading = () => {
  isLoading.value = true;
};

const hideLoading = () => {
  isLoading.value = false;
};

defineExpose({
  showLoading,
  hideLoading
});
</script>

<style scoped>
#loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
}

#loading:not(.loading-out) {
  clip-path: circle(150% at 50% 50%);
}

.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: -1;
}

.loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#loading svg {
  width: 5rem;
  margin-bottom: 2rem;
  overflow: visible;
  transition: opacity 0.3s ease;
}

#loading svg circle {
  fill: none;
  stroke: white;
  stroke-width: 12;
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  transform-origin: center;
  animation: circle-rotate 3s ease-in infinite;
}

@keyframes circle-rotate {
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: 160;
  }
  100% {
    transform: rotate(360deg);
    stroke-dashoffset: -160;
  }
}

#loading p {
  font-family: sans-serif;
  letter-spacing: 0.5vw;
  font-size: 2rem;
  color: white;
  font-weight: 900;
  transition: opacity 0.3s ease;
}

.loading-out {
  clip-path: circle(0% at 50% 50%);
}

.loading-out .loading-content svg,
.loading-out .loading-content p {
  opacity: 0;
}

@media (max-width: 768px) {
  #loading {
    clip-path: none !important;
    opacity: 1;
    transition: opacity 0.6s ease;
  }
  
  #loading.loading-out {
    opacity: 0;
    clip-path: none !important;
    pointer-events: none; 
    visibility: hidden;
  }
  
  .blur-background {
    
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: brightness(0.6);
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 0.6s ease;
  }
  
  #loading.loading-out .blur-background {
    opacity: 0;
    filter: brightness(1);
    background-color: rgba(0, 0, 0, 0);
  }
  
  #loading p {
    font-size: 1.5rem;
  }
  
  #loading svg {
    width: 4rem;
  }
}
</style>
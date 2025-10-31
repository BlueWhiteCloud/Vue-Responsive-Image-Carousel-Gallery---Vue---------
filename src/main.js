import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/styles/carousel.css'
createApp(App).use(router).mount('#app')
// 应用启动时提示浏览器
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
document.head.appendChild(meta);

// 禁止缩放以提升性能
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
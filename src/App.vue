<script setup>
import { reactive, ref } from 'vue'
import Home from './components/home.vue'
import Gallery from './components/gallery.vue'
import Artist from './components/artist.vue'
import Liked from './components/liked.vue'
import Basket from './components/basket.vue'
import Contact from './components/contact.vue'
import Shop from './components/shop.vue'
import Account from './components/account.vue'



const local = reactive({
  page: 1,
})


function changePage(page) {
  local.page = page
}

// Состояние наведения на картинку
const isHovered = ref(false)

// Функция прокрутки наверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

</script>

<template>
  <div class="body">
  <div id="app">
    <nav class="navbar">
      <div @click="changePage(1)" class="logo-button">
      <img src="/igm/logo_3.png" alt="Логотип" class="logo-img" /></div>
      <button @click="changePage(2)">Галерея</button>
      <button @click="changePage(3)">Художники</button>
      <button @click="changePage(4)">Контакты</button>
      <img src="/igm/logo_main.png" alt="Логотип2" class="logo_main">
      
      <div class="buutton-left">
      <div @click="changePage(5)" class="logo-button">
      <img src="/igm/ikon_1.png" alt="ikon" class="logo-img-2" /><div class="tooltip">Избранное</div></div>
      <div @click="changePage(6)" class="logo-button">
      <img src="/igm/ikon_2.png" alt="ikon" class="logo-img-2" /><div class="tooltip">Корзина</div></div>
      <div @click="changePage(7)" class="logo-button">
      <img src="/igm/ikon_3.png" alt="ikon" class="logo-img-2" /><div class="tooltip">Мои заказы</div></div>
      <div @click="changePage(8)" class="logo-button">
      <img src="/igm/ikon_4.png" alt="ikon" class="logo-img-2" /><div class="tooltip">Личный кабинет</div></div>
    
    </div>
    </nav>

    <main>
      <Home v-if="local.page === 1" @change-page="changePage" />
      <Gallery v-else-if="local.page === 2" />
      <Artist v-else-if="local.page === 3" />
      <Contact v-else-if="local.page === 4" />
      <Liked v-else-if="local.page === 5" />
      <Basket v-else-if="local.page === 6" @change-page="changePage" />
      <Shop v-else-if="local.page === 7" />
      <Account v-else-if="local.page === 8" @change-page="changePage" />
    </main>
  </div>

  <footer class="site-footer">
  <div class="footer-content">
    <!-- Соцсети -->
    <div class="footer-section">
  <h4 class="footer-subtitle">Мы в соцсетях: </h4>
  <div class="social-icons">
    <a href="https://t.me/your_tg" target="_blank">
      <img src="/igm/tg.png" alt="Telegram" />
    </a>
    <a href="https://vk.com/your_vk" target="_blank">
      <img src="/igm/vk.png" alt="VK" />
    </a>
    <a href="https://instagram.com/your_insta" target="_blank">
      <img src="/igm/inst.png" alt="Instagram" />
    </a>
  </div>
    </div>

    <div class="footer-section">
      <h4 class="footer-subtitle">Навигация</h4>
      <ul class="footer-links">
        <li><button @click="changePage(1)" class="btn_footer">Главная</button></li>
        <li><button @click="changePage(2)" class="btn_footer">Галерея</button></li>
        <li><button @click="changePage(3)" class="btn_footer">Художники</button></li>
        <li><button @click="changePage(4)" class="btn_footer">Контакты</button></li>
      </ul>
    </div>
    
    <div class="footer-section">
      <h4 class="footer-subtitle">The Line Between</h4>
      <p class="footer-text">Онлайн-галерея для продажи и вдохновения.</p>
    </div>

    
    <div class="footer-section">
      <h4 class="footer-subtitle">Контакты</h4>
      <p>Email: thelinebetween@mail.com</p>
      <p>Тел: +7 (948) 748-44-87</p>
      <p>     +7 (965) 279-08-47</p>
    </div>

    

  
</div>
<div class="footer-bottom">
    © 2025 The Line Between. Все права защищены.
  </div>
</footer>


<!-- Кнопка "Наверх" с изображением -->
<div class="scroll-to-top" @click="scrollToTop">
  <img 
    :src="isHovered ? '/igm/кнопка.png' : '/igm/кнопка2.png'" 
    alt="Наверх" 
    class="scroll-img"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    
  /><div class="tooltip">Вернуться к началу</div>
</div>


  </div> <!-- закрывает body -->
</template>

<style scoped>
.social-icons {
  display: flex;
  gap: 14px;
  margin-top: 10px;
  align-items: center;
}

.social-icons img {
  width: 50px;
  height: 50px;
  transition: opacity 0.3s ease;
}

.social-icons a:hover img {
  opacity: 0.7;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto 20px;
}


.footer-text,
.footer-links,
.footer-section p {
  font-size: 20px;
  color: #414141;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}


.social-icons {
  display: flex;
  gap: 12px;
  font-size: 22px;
  margin-top: 5px;
}

.social-icons a {
  color: #ccc;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid #333;
  text-align: center;
  padding-top: 15px;
  font-size: 18px;
  color: #888;
}

.body {
  max-width: 1920px;
  margin: 0 auto; 
  width: 100%;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 60px;
  padding: 25px 10px;
  background-color: rgb(255, 255, 255);
  border-bottom: 2px #F4DB9A solid;
}


/* div с картинкой, которая выходит за рамки, но обрабатывает клик */
.logo-button {
  cursor: pointer; /* Делает div с картинкой кликабельным */
  position: relative; /* Для корректного позиционирования картинки */
  overflow: visible; /* Чтобы картинка могла выходить за пределы */
}
.buutton-left {
  padding-right: 50px;
  display: flex;
  gap: 20px;
  margin-left: auto;
}
.tooltip {
  font-size: 24px;
  position: absolute;
  top: 100%;  /* Размещаем текст ниже картинки */
  left: 50%;
  transform: translateX(-50%);  /* Центрируем по горизонтали */
  margin-top: 5px;  /* Отступ сверху, чтобы текст не прилипал */
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;  /* Изначально текст невидим */
  pointer-events: none;  /* Чтобы не мешал кликам */
  transition: opacity 0.3s ease-in-out;  /* Плавный переход */
}
.logo-button:hover .tooltip {
  opacity: 1;  /* Текст появляется при наведении */
}
 
.logo_main {
  margin: 0 auto;
  width: 360px;
  height: auto;
}
.logo-img {
  border-radius: 50%;
  object-fit: cover;
  height: 120px; /* Высота картинки */
  width: auto; /* Пропорционально увеличиваем ширину */
  margin-top: 10px;

  transition: transform 0.15s ease, box-shadow 0.15s ease;; /* Плавный переход */
}
.logo-img-2 {

  object-fit: cover;
  height: 70px; /* Высота картинки */
  width: auto; /* Пропорционально увеличиваем ширину */

  
  transition: transform 0.15s ease; /* Плавный переход */
}
.logo-img-2:active {
  transform: scale(0.95);

} 

.logo-button:active .logo-img {
  transform: scale(0.95);
  box-shadow: 0 5px 30px 20px rgba(255, 248, 202, 0.897); 
}


nav {
  background-color: #f8f8f8;
  padding: 10px;
  display: flex;
  gap: 10px;
}

.btn_footer {
  color: #1e1e1e;
  cursor: pointer;
  font-size: 16px;
  border: #ccc 0px;
  background-color: #ffffff;
}
.navbar button {
  font-family: 'Times New Roman', Times, serif;
  font-size: 26px;
  color: rgba(80, 44, 10, 1);
  padding: 0px 10px 18px;
  margin-right: -20px;
  margin-bottom: -50px;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  border: 0px solid #696969;
  transition: transform 0.15s ease; 
}
.navbar button:active {
  transform: scale(0.95);
}


button:hover {
  color: #d56f20;
}

.site-footer {
  border-top: 3px solid #ffdd89;
  background-color: #ffffff;
  color: #2e2e2e;
  padding: 20px 20px 20px;
  font-size: 14px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1 1 200px;
  min-width: 200px;
}



.footer-subtitle {
  font-size: 26px;
  color: #1e1e1e;
  margin-bottom: 8px;
  font-weight: 600;
}

.footer-text {
  margin-bottom: 10px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}





.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  margin-top: 30px;
}



/* Картинка при наведении */
.scroll-to-top {
  position: fixed;
  bottom: 60px;
  right: 60px;
  width: 100px;  
  height: 100px;
  cursor: pointer;
  z-index: 1000;
}

.scroll-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s;
}

.scroll-img:hover {
  transform: scale(1.15);
}

.scroll-to-top:hover .tooltip {
  opacity: 1;

}
</style>



<style>
/* глобальные стили*/
::-webkit-scrollbar {
  width: 12px;
  height: 14px;
}
::-webkit-scrollbar-track {
  background: rgb(42, 42, 42);
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #929292;
  border-radius: 6px;

}
::-webkit-scrollbar-thumb:hover {
  background-color: #c5c5c5;
}



</style>
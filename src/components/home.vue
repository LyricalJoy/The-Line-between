<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['change-page'])

const images = ref([
'/art/art_4.png',
'/art/art_5.png',
'/art/art_6.png',
])

// Текущий слайд и направление анимации
const currentSlide = ref(0)
const direction = ref('next')


function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % images.value.length
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + images.value.length) % images.value.length
}

function goToSlide(index) {
  currentSlide.value = index
}

onMounted(() => {
  setInterval(() => {
    nextSlide()
  }, 5000) // автосмена каждые 5 сек
})

const email = ref('')
const agree = ref(false)
const emailError = ref(false)
const showSuccess = ref(false)
let timeout = null

function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

function handleSubscribe() {
  emailError.value = !isValidEmail(email.value)

  if (!emailError.value) {
    // Показываем всплывающее сообщение
    showSuccess.value = true

    // Автоматическое скрытие через 3 секунды
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      showSuccess.value = false
    }, 3000)

    // Очистка полей
    email.value = ''
    agree.value = false
  }
}



// Переход в каталог
function goToCatalog() {
  emit('change-page', 2)
}

// Автосмена слайдов (можно изменить интервал здесь ↓)
function startSlider() {
  setInterval(() => {
    nextSlide()
  }, 5000) // <--- Интервал автосмены: 5000 мс = 5 секунд
}

</script>

<template>
  <div class="home-page">
    <section class="hero">
      <h1 class="site-title">THE LINE BETWEEN</h1>
      <p class="site-subtitle">
        Галерея, где тонкая грань между творчеством и восприятием превращается в живой диалог.
      </p>

      <div class="slider">
      <!-- Лента всех изображений -->
      <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="slide" v-for="(img, index) in images" :key="index">
          <img :src="img" alt="Slide image" />
        </div>
      </div>

      <!-- Кнопки -->
      <button class="slider-button left" @click="prevSlide">&#10094;</button>
      <button class="slider-button right" @click="nextSlide">&#10095;</button>

      <!-- Точки -->
      <div class="dots">
        <span
          v-for="(img, index) in images"
          :key="'dot-' + index"
          :class="{ dot: true, active: index === currentSlide }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>

<button class="catalog-button" @click="goToCatalog">Перейти в каталог</button>
    
      <!-- Слайдер -->
      <!-- <div class="slider">
        <transition :name="direction === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
          <img
            class="slider-image"
            :src="images[currentSlide]"
            :key="images[currentSlide]"
            alt="Art Preview"
          />
        </transition> -->

        <!-- <div class="slider_2">
          <div class="slider_line">
            <img class="slider_img" src="/igm/slider_1.png">
            <img class="slider_img" src="/igm/slider_1.png">
            <img class="slider_img" src="/igm/slider_1.png">
          </div>

          <button class="slider_btn_prev"></button>
          <button class="slider_btn_next"></button>
        </div> -->


        <!-- Кнопки -->
        <!-- <button class="slider-button left" @click="prevSlide">&#10094;</button>
        <button class="slider-button right" @click="nextSlide">&#10095;</button> -->

        <!-- Точки -->
        <!-- <div class="dots">
          <span
            v-for="(image, index) in images"
            :key="index"
            class="dot"
            :class="{ active: index === currentSlide }"
            @click="goToSlide(index)"
          ></span>
        </div> -->
      </div>
      </section>
      <button class="catalog-button" @click="goToCatalog">Перейти в каталог</button>
    </section>

    <!-- Блок "О нас" -->
    <section class="about">
      <h2>О НАС</h2>
      <p>
        The Line Between — это не просто онлайн-галерея, это идея.  
        Пространство, где две противоположности — личная глубина художника и восприятие зрителя — соединяются в одной точке.
      </p>
      <p>
        Мы верим, что искусство рождается именно на этой границе: между тишиной и словом, между точным расчётом и чистой интуицией. И наша платформа отражает это равновесие.
      </p>
      <p>
        Мы отбираем работы вручную, лично общаемся с художниками, знаем историю каждой картины. Наш проект — это живая среда, где каждый элемент имеет смысл.
      </p>
      <p>
        Вы не просто покупаете картину — вы вступаете в диалог. С эпохой. С автором. С собой.  
        The Line Between — это та самая грань, на которой возникает настоящее искусство.
      </p>
    </section>
      <section class="subscribe">
  <h2>Подписка на новости</h2>
  <p>Будьте в курсе новых поступлений и историй художников</p>

  <form @submit.prevent="handleSubscribe" novalidate>
    <input
      type="email"
      v-model="email"
      placeholder="Введите ваш email"
      class="email-input"
      :class="{ invalid: emailError }"
    />
    <!-- Сообщение об ошибке -->
    <p v-if="emailError" class="error-message">Ошибка! Пустой ввод или некорректнач почта. Введите корректный email</p>

    <div class="checkbox-container">
      <input
        type="checkbox"
        id="agree"
        v-model="agree"
      />
      <label for="agree">
        Я соглашаюсь на обработку персональных данных и получение рассылки
      </label>
    </div>
    <button class="subscribe-button" :disabled="!agree">Подписаться</button>
  </form>
  <!-- Уведомление об успешной подписке -->
<transition name="fade">
  <div v-if="showSuccess" class="success-message">
    Спасибо! Вы успешно подписались на рассылку.
  </div>
</transition>
</section>

</template>

<style scoped>



.slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 12px;
}

.slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s ease; /* мягкая анимация */
}

.slide {
  min-width: 100%;
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  font-size: 24px;
  padding: 10px 14px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s;
}

.slider-button.left {
  left: 10px;
}

.slider-button.right {
  right: 10px;
}

.slider-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Точки */
.dots {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: #111;
}
.success-message {
  margin-top: 15px;
  padding: 12px 20px;
  background-color: #e0f9e6;
  border: 1px solid #a2d5aa;
  color: #2c6e49;
  border-radius: 8px;
  font-size: 15px;
  text-align: center;
}

/* Анимация появления */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.home-page {
  padding: 40px 20px;
  text-align: center;
  background-color: #f8f8f8;
}

.hero {
  margin-bottom: 60px;
}

.site-title {
  font-size: 52px;
  font-weight: bold;
  letter-spacing: 4px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.site-subtitle {
  font-size: 20px;
  max-width: 700px;
  margin: 0 auto 30px;
  color: #444;
  font-style: italic;
}

.catalog-button {
  padding: 12px 26px;
  font-size: 16px;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.catalog-button:hover {
  background-color: #333;
}

/* Слайдер */
.slider {
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 400px;
  margin: 0 auto 20px;
  overflow: hidden;
  border-radius: 12px;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* Кнопки */
.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: none;
  padding: 10px 14px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1;
  transition: background-color 0.3s ease;
}

.slider-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.slider-button.left {
  left: 10px;
}

.slider-button.right {
  right: 10px;
}

/* Точки (dots) */
.dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #111;
}

/* Анимация — смещение */
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* О нас */
.about {
  max-width: 850px;
  margin: 0 auto;
  text-align: left;
}

.about h2 {
  font-size: 26px;
  margin-bottom: 20px;
  border-bottom: 2px solid #111;
  display: inline-block;
  padding-bottom: 5px;
}

.about p {
  margin-bottom: 20px;
  line-height: 1.7;
  color: #2a2a2a;
  font-size: 16px;
}

.subscribe {
  max-width: 600px;
  margin: 60px auto 40px;
  text-align: left;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.subscribe h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.subscribe p {
  margin-bottom: 20px;
  color: #444;
}

.email-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.4;
}

.checkbox-container input[type='checkbox'] {
  margin-top: 4px;
  cursor: pointer;
}

.subscribe-button {
  background-color: #111;
  color: #fff;
  padding: 10px 22px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.subscribe-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.subscribe-button:not(:disabled):hover {
  background-color: #333;
}

</style>
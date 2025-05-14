<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['change-page'])

const images = ref([
'./art/art_4.png',
'./art/art_5.png',
'./art/art_6.png',
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

const reviews = [
  {
    avatar: './igm/oto_1.png',
    text: '«Очень доволен покупкой! Картина превзошла ожидания — вживую цвета ещё глубже. Заказ оформил за пару минут, доставка была аккуратной и точно в срок.»',
    author: 'Гарри Ллойд',
    stars: 5
  },
  {
    avatar: './igm/oto_3.png',
    text: '«Картину выбрал для кабинета — атмосфера сразу изменилась. Удобный сайт, хорошие описания, и главное — работы действительно уникальные.»',
    author: 'Нил Ньюбон',
    stars: 5
  },
  {
    avatar: './igm/oto_2.png',
    text: '«Приятно удивлена качеством упаковки и скоростью доставки. Сайт вдохновляет, хочется возвращаться за новыми работами!»',
    author: 'Детка Безмонетки',
    stars: 5
  }
]

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
    <div class="hero">
      <h1 class="site-title">THE LINE BETWEEN</h1>
      <p class="site-subtitle">
        Галерея, где тонкая грань между творчеством и восприятием превращается в живой диалог.
      </p>
    </div>
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

        <!-- Лучшие работы месяца -->
    <section class="highlighted-art">
      <h2>Лучшие работы месяца</h2>
      <div class="art-grid">
        <div class="art-item" v-for="n in 3" :key="'art' + n">
          <img :src="'/igm/art' + n + '.jpg'" alt="Картина" />
          <p>Название картины {{ n }}</p>
        </div>
      </div>
      <button class="catalog-button" @click="goToCatalog">Перейти в каталог</button>
    </section>

    <!-- Избранные художники -->
    <section class="featured-artists">
      <h2>Избранные художники</h2>
      <div class="artist-grid">
        <div class="artist-card" v-for="n in 3" :key="'artist' + n">
          <img :src="'/igm/artist' + n + '.jpg'" alt="Художник" />
          <p>Имя художника {{ n }}</p>
        </div>
      </div>
    </section>

<!-- Как купить картину -->
<section class="how-it-works">
  <h2>Как купить картину?</h2>
  <div class="steps">
    <div class="step">
      <span>1</span>
      <p>Выберите картину в галерее, которая откликнется вам по стилю и настроению.</p>
    </div>
    <div class="step">
      <span>2</span>
      <p>Зарегистрируйтесь на сайте, чтобы получить доступ к оформлению заказа.</p>
    </div>
    <div class="step">
      <span>3</span>
      <p>Заполните простую форму с адресом и контактами для доставки.</p>
    </div>
    <div class="step">
      <span>4</span>
      <p>Оплатите картину удобным способом прямо на сайте.</p>
    </div>
    <div class="step">
      <span>5</span>
      <p>Ожидайте доставку — мы бережно передадим вам искусство в руки.</p>
    </div>
  </div>
</section>

  
<section class="reviews">
  <h2>Отзывы</h2>
  <div class="review-grid">
    <div class="review" v-for="(review, index) in reviews" :key="'review' + index">
      <img :src="review.avatar" alt="Пользователь" class="review-avatar" />
      <div class="review-text">
        <p>{{ review.text }}</p>
        <div class="stars">
          <span
            v-for="i in review.stars"
            :key="i"
            class="star"
          > ★ </span>
        </div>
        <span class="review-author">{{ review.author }}</span>
      </div>
    </div>
  </div>
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

</div>
</template>

<style scoped>

.quote-block {
  text-align: center;
  font-style: italic;
  font-size: 22px;
  margin: 60px auto 40px;
  color: #333;
  max-width: 700px;
}

.style-select {
  text-align: center;
  margin: 60px auto;
}

.style-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.style-buttons button {
  padding: 10px 20px;
  background-color: #f4db9a;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.style-buttons button:hover {
  background-color: #e2c97e;
}

.highlighted-art,
.featured-artists,
.reviews,
.how-it-works {
  margin: 60px auto;
  max-width: 1000px;
  padding: 0 20px;
}

.art-grid,
.artist-grid,
.review-grid,
.steps {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.art-item,
.artist-card,
.review {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.art-item img,
.artist-card img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.review {
  font-size: 15px;
  color: #333;
}

.review span {
  display: block;
  margin-top: 8px;
  color: #777;
  font-size: 13px;
}

.how-it-works .steps {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
  margin-top: 30px;
}


.step {
  text-align: center;
  max-width: 220px;
  background-color: #fff4e5;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.step span {
  font-size: 28px;
  font-weight: bold;
  display: block;
  color: #8b4513;
  margin-bottom: 10px;
}


.reviews {
  margin: 60px auto;
  max-width: 1000px;
  padding: 0 20px;
  text-align: center;
}

.review-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}

.review {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
  max-width: 400px;
  width: 100%;
}

.review-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f4db9a;
}

.review-text {
  text-align: left;
  flex: 1;
}

.review-text p {
  font-size: 15px;
  margin-bottom: 8px;
  color: #333;
}

.review-author {
  font-size: 13px;
  color: #777;
}

.stars {
  display: flex;
  color: #f5a623;
  font-size: 18px;
  margin-bottom: 5px;
}

.star {
  margin-right: 2px;
}

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
  background-color: #f9f9f9;
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
  margin-top: 40px;
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

h2 {

  font-size: 26px;
  margin-bottom: 20px;
  border-bottom: 2px solid #111;
  display: inline-block;
  padding-bottom: 5px;
}
.about h2 {
  margin-left: 45%;
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
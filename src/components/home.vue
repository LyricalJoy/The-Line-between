<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['change-page'])

const images = ref([
'./igm/banner_1.png',
'./igm/banner_2.png',
'./igm/banner_3.png',
'./igm/banner_4.png',
'./igm/banner_5.png',
'./igm/banner_6.png',
'./igm/banner_7.png',
])

const featuredArtists = [
  {
    avatar: './igm/artist_2.png',
    name: 'Анна Лебедева',
    nickname: 'anna.lebedeva'
  },
  {
    avatar: './igm/artist_1.png',
    name: 'Julie',
    nickname: 'Shuploc'
  },
  {
    avatar: './igm/artist_3.png',
    name: 'Kevin Alejandro',
    nickname: 'Jayce'
  }
]

const bestArtworks = [
  {
    image: './art/art_8.png',
    title: 'Shimmer',
    artist: 'Jayce'
  },
  {
    image: './art/art_9.png',
    title: 'Astarion',
    artist: 'Shuploc'
  },
  {
    image: './art/art_10.png',
    title: 'Victor',
    artist: 'Shuploc'
  }
]

// Текущий слайд и направление анимации
const currentSlide = ref(0)

const workSteps = [
  {
    icon: './igm/banner_8.png',
    title: 'Отбор художников',
    text: 'Художники сами выходят на нас — ведь мы завоевали доверие как честная и уважаемая платформа. Наш арт-координатор назначает встречу, проводит переговоры и заключает договор.'
  },
  {
    icon: './igm/banner_9.png',
    title: 'Размещение на сайте',
    text: 'Наш IT-специалист вручную добавляет каждую картину после модерации и одобрения.'
  },
  {
    icon: './igm/banner_10.png',
    title: 'Оформление и доставка',
    text: 'Покупатель оформляет заказ, и мы организуем бережную доставку прямо в руки.'
  },
  {
    icon: './igm/banner_11.png',
    title: 'Расчёт с художником',
    text: 'Художник получает оплату за вычетом нашей комиссии. Прозрачно и честно.'
  }
]



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
    text: '«Приятно удивлен качеством упаковки и скоростью доставки. Сайт вдохновляет, хочется возвращаться за новыми работами!»',
    author: 'Детка Безмонетки',
    stars: 6
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

</script>

<template>
  <div class="home-page">
  <div class="body">
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
        <button
    v-for="(img, index) in images"
    :key="'dot-' + index"
    :class="{ dot: true, active: index === currentSlide }"
    @click="goToSlide(index)"
    aria-label="'Перейти к слайду ' + (index + 1)"
  ></button>
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

            <section class="how-we-work">
          <h2>Как мы работаем</h2>
          <p class="intro">
            Мы выстраиваем прозрачный процесс между художником и покупателем — от идеи до доставки.
          </p>
          <div class="work-card-grid">
            <div class="work-card" v-for="(step, index) in workSteps" :key="'step' + index">
              <img :src="step.icon" :alt="step.title" class="work-icon" />
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </div>
        </section>




        <!-- Лучшие работы месяца -->
        <section class="highlighted-art">
          <h2>Лучшие работы месяца</h2>
          <div class="art-grid">
            <div class="art-item" v-for="(art, index) in bestArtworks" :key="'art' + index">
              <img :src="art.image" alt="Картина" class="art-image" />
              <p class="art-title">{{ art.title }}</p>
              <p class="art-artist">Автор: {{ art.artist }}</p>
            </div>
          </div>
          <button class="catalog-button" @click="goToCatalog">Перейти в каталог</button>
        </section>

    <!-- Избранные художники -->
    <section class="featured-artists">
      <h2>Избранные художники</h2>
      <div class="artist-grid">
        <div class="artist-card" v-for="(artist, index) in featuredArtists" :key="'artist' + index">
          <img :src="artist.avatar" alt="Аватар художника" class="artist-avatar" />
          <p class="artist-name">{{ artist.name }}</p>
          <p class="artist-nick">@{{ artist.nickname }}</p>
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
      <p>Оплатите картину удобным вам способом.</p>
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
</div>
</template>

<style scoped>

.how-we-work {
  padding: 60px 20px;
  text-align: center;
}

.how-we-work h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.how-we-work .intro {
  max-width: 700px;
  margin: 0 auto 40px;
  font-size: 16px;
  color: #555;
}

.work-card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.work-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  max-width: 250px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.07);
  transition: transform 0.3s, box-shadow 0.3s;
}

.work-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.work-icon {
  width: 250px;
  margin-bottom: 15px;
}

.work-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #8b4513;
}

.work-card p {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
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

.artist-grid {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.artist-card {
  text-align: center;
  max-width: 200px;
}

.artist-avatar {
  width: 100%;
  max-width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.artist-name {
  font-weight: bold;
  font-size: 18px;
}

.artist-nick {
  color: #888;
  font-size: 14px;
}

.art-grid {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.art-item:hover,
.artist-card:hover {
  transition: transform 1.0s ease;
  transform: scale(1.15);
}
.art-item {
  background-color: white;
  max-width: 450px;
  text-align: center;
}

.art-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
}

.art-title {
  font-weight: bold;
  font-size: 18px;
}

.art-artist {
  color: #666;
  font-size: 14px;
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
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border: 2px solid;
  border-color: lightskyblue;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
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
  border: 2px solid;
  border-color: rgba(242, 205, 138, 1);
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
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  padding: 0;
}

.dot.active {
  background-color: #ffb24e; 
  transform: scale(1.2);
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

.home-page {
  padding: 40px 20px;
  text-align: center;
  background-color: #ffffff;
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
  max-width: 800px;
  height: 500px;
  margin: 0 auto 20px;
  overflow: hidden;
  border-radius: 12px;
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

p {
  font-size: 20px;
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
  font-size: 20px;
}

.subscribe {
  max-width: 600px;
  margin: 60px auto 40px;
  text-align: left;
  padding: 30px;
  border: 3px solid;
  border-color: rgb(255, 188, 65);
  background-color: rgba(242, 205, 138, 1);
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
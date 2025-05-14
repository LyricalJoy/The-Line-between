<script setup>
import { ref, computed } from 'vue'
import '@vueform/slider/themes/default.css'
import VueSlider from '@vueform/slider'

// Состояния
const searchQuery = ref('')
const isInStock = ref(false)
const isDiscounted = ref(false)
const priceRange = ref([0, 100000])
const sortBy = ref('noSort')

const paintings = ref([
  { title: 'Картина 1', createdAt: '2024-05-01', price: 5000, artist: 'Иван Иванов', size: '20x20', imageUrl: '/art/art_1.png', inStock: true, isDiscounted: false },
  { title: 'Картина 2', createdAt: '2024-05-04', price: 3750, oldPrice: 5000, artist: 'Петр Петров', size: '20x20', imageUrl: '/art/art_2.png', inStock: true, isDiscounted: true },
  { title: 'Картина 3', createdAt: '2024-05-06', price: 10000, artist: 'Алексей Алексеев', size: '20x20', imageUrl: '/art/art_3.png', inStock: true, isDiscounted: false },
  { title: 'Картина 4', createdAt: '2024-05-07', price: 10000, artist: 'Алексей Алексеев', size: '20x20', imageUrl: '/art/art_4.png', inStock: true, isDiscounted: false },
  { title: 'Картина 5', createdAt: '2024-05-02', price: 10000, artist: 'Алексей Алексеев', size: '20x20', imageUrl: '/art/art_5.png', inStock: false, isDiscounted: false },
  { title: 'Картина 6', createdAt: '2024-05-03', price: 8700, oldPrice: 11600, artist: '*Неизвестно*', size: '20x20', imageUrl: '/art/art_6.png', inStock: true, isDiscounted: true },
  { title: 'Картина 7', createdAt: '2024-05-05', price: 9500, artist: '*Неизвестно*', size: '20x20', imageUrl: '/art/art_7.png', inStock: false, isDiscounted: false },
])

const addedToFavorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const addedToCart = ref(JSON.parse(localStorage.getItem('cart')) || [])

// Реактивная фильтрация и сортировка
const filteredPaintings = computed(() => {
  let result = paintings.value

  // Фильтр по поиску
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(query) || p.artist.toLowerCase().includes(query))
  }

  // Фильтр по наличию
  if (isInStock.value) {
    result = result.filter(p => p.inStock)
  }

  // Фильтр по скидке
  if (isDiscounted.value) {
    result = result.filter(p => p.isDiscounted)
  }

  // Фильтр по цене
  result = result.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  // Сортировка
  if (sortBy.value === 'alphabetical') {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortBy.value === 'priceAsc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'priceDesc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'newest') {
    result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return result
})

function handleSort(option) {
  sortBy.value = option
}

function toggleFavorite(painting) {
  const index = addedToFavorites.value.findIndex(p => p.title === painting.title)
  if (index === -1) {
    addedToFavorites.value.push(painting)
  } else {
    addedToFavorites.value.splice(index, 1)
  }
  localStorage.setItem('favorites', JSON.stringify(addedToFavorites.value))
}

function toggleCart(painting) {
  const index = addedToCart.value.findIndex(p => p.title === painting.title)
  if (index === -1) {
    addedToCart.value.push(painting)
  } else {
    addedToCart.value.splice(index, 1)
  }
  localStorage.setItem('cart', JSON.stringify(addedToCart.value))
}

function isInCart(painting) {
  return addedToCart.value.some(p => p.title === painting.title)
}

function isFavorite(painting) {
  return addedToFavorites.value.some(p => p.title === painting.title)
}

function clearFilters() {
  isInStock.value = false
  isDiscounted.value = false
  priceRange.value = [0, 100000]
}
</script>

<template>
  <div class="main">
    <!-- Поисковая строка и кнопка -->
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Введите название картины или имя автора..." 
        class="search-input"
      /><img src="/igm/lupa.png" alt="lupa" class="lupa">
    </div>

    <!-- Контейнер для сортировки и фильтрации -->
    <div class="filters-sort">
      <!-- Сортировка -->
      <div class="sort-section">
        <h2>Сортировка:</h2>
        <div class="sort-buttons">
          <button 
            :class="{ active: sortBy === 'newest' }" 
            @click="handleSort('newest')">🆕 По новизне</button>
          <button 
            :class="{ active: sortBy === 'alphabetical' }" 
            @click="handleSort('alphabetical')">🔤 По названию (А–Я)</button>
          <button 
            :class="{ active: sortBy === 'priceAsc' }" 
            @click="handleSort('priceAsc')">💸 По цене (возрастание)</button>
          <button 
            :class="{ active: sortBy === 'priceDesc' }" 
            @click="handleSort('priceDesc')">💸 По цене (убывание)</button>
          <button 
            :class="{ active: sortBy === 'noSort' }" 
            @click="handleSort('noSort')">Без сортировки</button>
        </div>
      </div>

      <!-- Фильтрация -->
      <div class="filter-section">
        <h2>Фильтрация:</h2>
        <div class="filter-buttons">
          <!-- Ползунок для выбора диапазона цен -->
          <div class="price-range">
            <h3>Цена:</h3>
            <VueSlider 
              v-model="priceRange" 
              :min="0" 
              :max="500000" 
              :tooltip="'always'" 
              :interval="100" 
              class="slider"
            />
            <div class="price-range-labels">
              <span>Мин: {{ priceRange[0] }}₽</span>
              <span>Макс: {{ priceRange[1] }}₽</span>
            </div>
            <label>
              <input type="checkbox" v-model="isInStock" /> В наличии
            </label>
            <label>
              <input type="checkbox" v-model="isDiscounted" /> Со скидкой 
            </label>
          </div>
        </div>
        <button @click="clearFilters" class="clear-filters-button">Очистить фильтрацию</button>
      </div>
    </div>

    <h1> Все картины — The Line Between</h1>
    <p>_________________________________________________________________________________________________________________________________________________________________</p>
  </div>

  <div class="art">
    <!-- Карточки товаров -->
    <div class="art-card" v-for="painting in filteredPaintings" :key="painting.title">
      <div class="image-wrapper">
        <img 
          :src="painting.imageUrl" 
          alt="Картина" 
          class="art-image" 
          :class="{ grayscale: !painting.inStock }" 
        />
        <div v-if="!painting.inStock" class="out-of-stock-label">
          Продано!
        </div>
      </div>
      <h3>{{ painting.title }}</h3>
      <div class="price-block">
        <div v-if="painting.isDiscounted">
          <span class="old-price">{{ painting.oldPrice }}₽</span>
          <span class="new-price">{{ painting.price }}₽</span>
          <span class="sale-label">SALE 25%</span>
        </div>
        <div v-else>
          <h2>Цена: {{ painting.price }}₽</h2>
        </div>
      </div>
      <p>Автор: {{ painting.artist }}</p>
      <p>{{ painting.size }}</p>

      <div class="btnn">
        <button 
          @click="toggleCart(painting)" 
          class="btn_pay" 
          :disabled="!painting.inStock"
        >
          {{ isInCart(painting) ? 'Убрать из корзины' : 'Добавить в корзину' }}
        </button>

        <div class="tooltip-container">
          <button @click="toggleFavorite(painting)" class="btn_heart">
            <img 
              :src="isFavorite(painting) 
                ? '/igm/кнопка_сердце2.png' 
                : '/igm/кнопка_сердце1.png'" 
              alt="ikon" 
              class="heart-icon"
            />
          </button>
          <span class="tooltip-text">
            {{ isFavorite(painting) ? 'Удалить из избранного' : 'Добавить в избранное' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>

.price-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.old-price {
  text-decoration: line-through;
  color: #888;
  font-size: 18px;
}

.new-price {
  margin: 5px;
  color: #ff6b49;
  font-weight: bold;
  font-size: 26px;
}

.sale-label {
  margin: 10px;
  background-color: rgba(255, 191, 25, 1);
  color: white;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.grayscale {
  filter: grayscale(100%);
}

.out-of-stock-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.416);
  color: white;
  padding: 6px 12px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 6px;
  pointer-events: none;
  z-index: 1;
}

.btn_pay:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


.lupa {
  margin: 2px;
  width: 40px;
  height: auto;
}
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  width: max-content;
  background-color: #444;
  color: #fff;
  text-align: center;
  padding: 6px 10px;
  border-radius: 6px;
  position: absolute;
  bottom: -50px; /* позиция под кнопкой */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 20px;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
.btnn {
  margin-top: 5px;
  display: flex;
  Justify-content: center;
  gap: 10px;
  align-items: center;
}
.heart-icon {

  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.art {

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-items: center;
  padding: 20px;
}
.art-card {
  /* border: 1px solid #ccc;
  border-radius: 8px;*/
  padding: 10px; 
  width: auto;
  max-width: 1200px;  
  text-align: center;
  margin: 10px;
}

.art-image {
  width: 100%;
  height: auto;
}

.art-card h3 {
  font-size: 24px;
  margin: 5px 0;
}
.art-card h2 {
  font-size: 22px;
  margin: 2px 0;
}

.art-card p {
  margin: 0px;
  font-size: 20px;
  color: #555;
}

.btn_pay {
  font-size: 20px;
  color: rgba(68, 107, 186, 1);
  margin-top: 10px;
  padding: 10px 24px;
  background-color: #ffffff;
  border: 4px solid rgba(68, 107, 186, 1);
  cursor: pointer;
  transition: color 1s,  background-color 0.5s;
}

.btn_pay:hover {
  color: white;
  background-color: rgba(68, 107, 186, 1);
}

.btn_heart {
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.15s ease; 
}

.btn_heart:active {
  transform: scale(0.45);
}




.main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #f4db9a;
}


/* Стили для фильтров и сортировки */
.filters-sort {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  gap: 200px;
  padding: 20px;
  background-color: rgb(255, 255, 255)
}

/* Стили для сортировки */
.sort-section {
  flex: 1;
}

.sort-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sort-buttons button {
  font-size: 18px;
  text-align: left;
  color: white;
  margin-left: 50px;
  width: 300px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: rgba(116, 169, 221, 1);
  border: 2px solid rgba(25, 56, 91, 1);
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sort-buttons button:hover {
  background-color: rgba(68, 107, 186, 1);
}

.sort-buttons button.active {
  background-color: rgba(68, 107, 186, 1);
}

/* Стили для фильтрации */
.filter-section {
  flex: 1;
}

.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-buttons label {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-buttons input {
  margin-right: 5px;
}

/* Ползунок цен */
.price-range {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price-range-labels {
  display: flex;
  justify-content: space-between;
}

.slider {
  width: 100%;
  margin: 10px 0;
}

/* Кнопка очистки фильтрации */
.clear-filters-button {
  margin-top: 15px;
  padding: 15px 20px;
  background-color: rgba(68, 107, 186, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}


</style>

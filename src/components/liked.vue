<script setup>
import { ref } from 'vue'

// Получаем избранные картины из localStorage
const addedToFavorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

// Получаем корзину из localStorage
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

// Функция для удаления картины из избранного
function removeFromFavorites(painting) {
  addedToFavorites.value = addedToFavorites.value.filter(p => p.title !== painting.title)
  localStorage.setItem('favorites', JSON.stringify(addedToFavorites.value))
}

// Функция для добавления/удаления картины из корзины
function toggleCart(painting) {
  if (isInCart(painting)) {
    removeFromCart(painting)
  } else {
    addToCart(painting)
  }
}

// Проверка, находится ли картина в корзине
function isInCart(painting) {
  return cart.value.some(item => item.title === painting.title)
}

// Добавление картины в корзину
function addToCart(painting) {
  cart.value.push(painting)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

// Удаление картины из корзины
function removeFromCart(painting) {
  cart.value = cart.value.filter(item => item.title !== painting.title)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
</script>

<template>
  <div class="favorites">
    <h1>Избранное</h1>
    <div v-if="addedToFavorites.length === 0" class="empty-message">
      Ваше избранное пусто. Добавьте картины в избранное.
    </div>

    <div class="art-card" v-for="painting in addedToFavorites" :key="painting.title">
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
        <!-- Кнопка "Удалить из избранного" -->
        <button @click="removeFromFavorites(painting)" class="btn_pay">
          Удалить из избранного
        </button>

        <!-- Кнопка "Добавить в корзину/Убрать из корзины" -->
        <button 
          @click="toggleCart(painting)" 
          class="btn_pay"
          :disabled="!painting.inStock"
        >
          {{ isInCart(painting) ? 'Убрать из корзины' : 'Добавить в корзину' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites {
  padding: 20px;
}

.art-card {
  display: inline-block;
  width: 300px;
  padding-left: 40px;
  padding-bottom: 40px;
  text-align: center;
}

.art-image {
  max-width: 100%;
  height: auto;
}

.price-block {
  margin-top: 10px;
}


.sale-label {
  background-color: red;
  color: white;
  padding: 5px;
}


.btnn {
  margin-top: 5px;
  display: flex;
  Justify-content: center;
  gap: 10px;
  align-items: center;
}

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
.btn_pay {
  font-size: 16px;
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

</style>

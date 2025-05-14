<script setup>
import { ref, computed } from 'vue'
import Modal from './modal.vue'

// Состояния для формы
const lastName = ref('')
const firstName = ref('')
const middleName = ref('')
const email = ref('')
const phone = ref('')
const agree = ref(false)
const successModal = ref(false)

// Ошибки валидации
const errors = ref({
  lastName: '',
  firstName: '',
  middleName: '',
  email: '',
  phone: '',
  agree: ''
})

const emit = defineEmits(['change-page'])

function goToAccount() {
  emit('change-page', 8) // 8 — это номер страницы account
}

// Состояния корзины и избранного
const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || [])
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

// Модальное окно для оформления заказа
const showModal = ref(false)

// Признак регистрации (пока заглушка, заменим на реальную авторизацию)
const isRegistered = ref(!!localStorage.getItem('user'))

// Удаление товара из корзины
function removeFromCart(item) {
  cartItems.value = cartItems.value.filter(p => p.title !== item.title)
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

// Добавление или удаление из избранного
function toggleFavorite(item) {
  if (isInFavorites(item)) {
    favorites.value = favorites.value.filter(p => p.title !== item.title)
  } else {
    favorites.value.push(item)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

// Проверка, есть ли в избранном
function isInFavorites(item) {
  return favorites.value.some(p => p.title === item.title)
}

// Вычисление общей суммы
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + Number(item.price)
  }, 0)
})

// Оформление заказа с кастомной валидацией

function submitOrder(event) {
  event.preventDefault()

  // Очистка ошибок
  errors.value = {
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    agree: ''
  }


  // Проверка валидности
  let isValid = true

  if (!lastName.value || !/^[a-zA-Zа-яА-Я]+$/.test(lastName.value)) {
    errors.value.lastName = 'Фамилия должно содержать только буквы'
    isValid = false
  }

  if (!firstName.value || !/^[a-zA-Zа-яА-Я]+$/.test(firstName.value)) {
    errors.value.firstName = 'Имя должно содержать только буквы'
    isValid = false
  }

  if (!middleName.value || !/^[a-zA-Zа-яА-Я]+$/.test(middleName.value)) {
    errors.value.middleName = 'Отчество должно содержать только буквы'
    isValid = false
  }

  if (!email.value || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)) {
    errors.value.email = 'Введите корректный email'
    isValid = false
  }

  if (!phone.value || !/^\d{11}$/.test(phone.value)) {
    errors.value.phone = 'Телефон должен содержать только цифры, 10 символов'
    isValid = false
  }

  if (!agree.value) {
    errors.value.agree = 'Необходимо согласие на обработку данных'
    isValid = false
  }

  if (!isValid) {
    return // Прерываем отправку формы, если есть ошибки
  }

// Добавление заказа в список
const existingOrders = JSON.parse(localStorage.getItem('orders')) || []
const newOrder = {
  id: existingOrders.length + 1,
  date: new Date().toLocaleDateString(),
  items: [...cartItems.value]
}
existingOrders.push(newOrder)
localStorage.setItem('orders', JSON.stringify(existingOrders))

// Очистка корзины
cartItems.value = []
localStorage.setItem('cart', JSON.stringify([]))


  // Закрываем форму заказа и открываем успешное сообщение
  showModal.value = false
  successModal.value = true
}
</script>

<template>
  <div class="cart">
    <h1>Корзина</h1>
    <!-- Проверка на пустую корзину -->
    <div v-if="cartItems.length === 0" class="empty-message">
      Ваша корзина пуста. Добавьте картины из галереи.
    </div>

    <!-- Отображение товаров в корзине -->
    <div class="art-card" v-for="item in cartItems" :key="item.title">
      <div class="image-wrapper">
        <img :src="item.imageUrl" alt="Картина" class="art-image" />
      </div>
      <h3>{{ item.title }}</h3>
      <div class="price-block">
        <div v-if="item.isDiscounted">
          <span class="old-price">{{ item.oldPrice }}₽</span>
          <span class="new-price">{{ item.price }}₽</span>
          <span class="sale-label">SALE 25%</span>
        </div>
        <div v-else>
          <h2>Цена: {{ item.price }}₽</h2>
        </div>
      </div>
      <p>Автор: {{ item.artist }}</p>
      <p>{{ item.size }}</p>

      <!-- Кнопки для удаления и добавления в избранное -->
      <div class="btnn">
        <button @click="removeFromCart(item)" class="btn_remove-fav">
          Удалить из корзины
        </button>

        <button @click="toggleFavorite(item)" class="btn_pay">
          {{ isInFavorites(item) ? 'Убрать из избранного' : 'Добавить в избранное' }}
        </button>
      </div>
    </div>

    <!-- Блок с общей информацией о корзине -->
    <div v-if="cartItems.length > 0" class="summary">
      <p>Количество товаров: {{ cartItems.length }} шт.</p>
      <p>Сумма заказа: {{ totalPrice }}₽</p>
      <button class="btn_checkout" @click="showModal = true">Оформить заказ</button>
    </div>



    <!-- Модальное окно -->
    <Modal :show="showModal" @close="showModal = false">
      <template v-if="isRegistered">
        <h2>Заполните форму чтобы оформить заказ</h2>
        <form @submit="submitOrder" novalidate>
          <label>
            Фамилия:
            <input type="text" v-model="lastName" />
            <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
          </label>
          <label>
            Имя:
            <input type="text" v-model="firstName" />
            <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
          </label>
          <label>
            Отчество:
            <input type="text" v-model="middleName" />
            <span v-if="errors.middleName" class="error">{{ errors.middleName }}</span>
          </label>
          <label>
            Email:
            <input type="email" v-model="email" />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </label>
          <label>
            Телефон:
            <input 
              type="text" 
              v-model="phone" 
              placeholder="8 (967) 238 32-23" 
              inputmode="numeric"
            />
            <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="agree" />
            Согласен на обработку персональных данных
            <span v-if="errors.agree" class="error">{{ errors.agree }}</span>
          </label>
          <button type="submit" :disabled="!agree ">
            Оформить заказ
          </button>
        </form>
      </template>
  

         <template v-else>
        <p>Для оформления заказа необходимо зарегистрироваться.</p>
        <button @click="goToAccount">Перейти к регистрации</button>
        </template>
        </Modal>
        </div>
        <Modal :show="successModal" @close="successModal = false">
  <div class="success-content">
    <h2>Спасибо за заказ!</h2>
    <p>Мы скоро свяжемся с вами для подтверждения доставки.</p>
    <button @click="successModal = false">ОК</button>
  </div>
</Modal>

         </template>

<style scoped>

.success-content {
  text-align: center;
  padding: 20px;
}

.success-content h2 {
  color: #2e7d32;
  margin-bottom: 10px;
}

.success-content button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}



form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 16px;
  max-width: 500px;
  margin: 0 auto;
}

form h2 {
  text-align: center;
  margin-bottom: 10px;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="number"] {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus {
  border-color: #4a90e2;
  outline: none;
}

input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.2);
}

.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

button[type="submit"] {
  background-color: #4a90e2;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #357ab8;
}

button[type="submit"]:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

/* Стили для корзины и товаров */
.cart {
  padding: 20px;
}

.art-card {
  display: inline-block;
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
}

.art-image {
  max-width: 100%;
  height: auto;
}

.price-block {
  margin-top: 10px;
}

.old-price {
  text-decoration: line-through;
  color: red;
}

.new-price {
  font-weight: bold;
}

.sale-label {
  background-color: red;
  color: white;
  padding: 5px;
}

.btnn {
  margin-top: 10px;
}

.btn_remove-fav {
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.btn_pay {
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.btn_checkout {
  background-color: green;
  color: white;
  padding: 15px;
  border: none;
  cursor: pointer;
}

/* Стили для формы доставки */
.order-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.order-form label {
  display: block;
  margin-bottom: 10px;
}

.order-form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.order-form button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.order-form button:disabled {
  background-color: #ccc;
}
</style>

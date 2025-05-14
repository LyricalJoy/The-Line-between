<script setup>
import { ref } from 'vue'

// Данные пользователя (если зарегистрирован)
const user = ref(JSON.parse(localStorage.getItem('user')) || null)
const name = ref('')
const email = ref('')
const gender = ref('') // Пол

// Ошибки
const errors = ref({
  name: '',
  email: '',
  gender: ''
})

// Функция для проверки логина
function validateName() {
  const regex = /^[^\s]{3,30}$/ // Без пробелов, от 3 до 30 символов
  if (!name.value) {
    errors.value.name = 'Поле логин не может быть пустым.'
  } else if (!regex.test(name.value)) {
    errors.value.name = 'Логин должен содержать от 3 до 30 символов, без пробелов.'
  } else {
    errors.value.name = ''
  }
}

// Функция для проверки email
function validateEmail() {
  const regex = /^[a-zA-Z0-9._-]+@mail\.ru$/ // Только mail.ru
  if (!email.value) {
    errors.value.email = 'Поле email не может быть пустым.'
  } else if (!regex.test(email.value)) {
    errors.value.email = 'Введите корректный email в формате: example@mail.ru.'
  } else {
    errors.value.email = ''
  }
}

// Функция для проверки выбора пола
function validateGender() {
  if (!gender.value) {
    errors.value.gender = 'Выберите пол.'
  } else {
    errors.value.gender = ''
  }
}

// Регистрация
function register() {
  validateName()
  validateEmail()
  validateGender()

  // Если ошибок нет, то сохраняем пользователя
  if (!errors.value.name && !errors.value.email && !errors.value.gender) {
    user.value = {
      name: name.value,
      email: email.value,
      gender: gender.value,
    }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
}

// Выход из аккаунта
function logout() {
  user.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('orders') // Удаляем данные о заказах
  name.value = ''
  email.value = ''
  gender.value = ''
}

</script>

<template>
  <div class="account">
    <h1 v-if="!user">Вы еще не зарегистрированы.</h1>
    <p v-if="!user">Пройдите регистрацию чтобы оформить заказ.</p>

    <div v-if="!user" class="form-container">
      <!-- Форма регистрации -->
      <div class="form-group">
        <label for="name">Логин:</label>
        <input type="text" id="name" v-model="name" @blur="validateName" />
        <div v-if="errors.name" class="error">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" @blur="validateEmail" />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>

      <div class="form-group">
        <label for="gender">Пол:</label>
        <select v-model="gender" id="gender" @blur="validateGender">
          <option value="">Выберите пол</option>
          <option value="male">Мужчина</option>
          <option value="female">Женщина</option>
        </select>
        <div v-if="errors.gender" class="error">{{ errors.gender }}</div>
      </div>
      <button @click="register" class="btn-register">Зарегистрироваться</button>
    </div>

    <div v-else class="user-info">
      <!-- Показ данных пользователя -->
      <h2>Привет, {{ user.name }}!</h2>
      <p>Email: {{ user.email }}</p>
      <p>Пол: {{ user.gender }}</p>

      <button @click="$emit('changePage', 7)" class="btn-orders">Мои заказы</button>
      <button @click="logout" class="btn-logout">Выйти</button>
      
    </div>
  </div>
</template>

<style scoped>
.account {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  margin-bottom: 5px;
}

input, select {
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}

.btn-register {
  background-color: #4CAF50;
  color: white;
}

.btn-orders {
  background-color: #2196F3;
  color: white;
}

.btn-logout {
  background-color: #f44336;
  color: white;
}

.user-info {
  text-align: center;
}

.user-info p {
  font-size: 18px;
  margin: 10px 0;
}
</style>

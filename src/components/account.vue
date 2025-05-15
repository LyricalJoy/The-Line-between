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
  padding: 30px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
  color: #8b4513;
}

p {
  text-align: center;
  font-size: 15px;
  color: #444;
  margin-bottom: 25px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

input, select {
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #d2b48c;
  background-color: #ffffff;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #caa84c;
}

.error {
  color: #c0392b;
  font-size: 13px;
  margin-top: 5px;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-register {
  background-color: #caa84c;
  color: white;
}

.btn-register:hover {
  background-color: #b08c30;
}

.btn-orders {
  background-color: #7caeff;
  color: white;
  margin-right: 10px;
}

.btn-orders:hover {
  background-color: #ffc73a;
}

p{
  font-size: 24px;
}
.btn-logout {
  background-color: #e74c3c;
  color: white;
  margin-top: 10px;
}

.btn-logout:hover {
  background-color: #c0392b;
}

.user-info {
  text-align: center;
}

.user-info h2 {
  font-size: 24px;
  color: #8b4513;
  margin-bottom: 15px;
}

.user-info p {
  font-size: 16px;
  margin: 8px 0;
  color: #444;
}

</style>

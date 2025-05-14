<script setup>
import { ref } from 'vue'

// Состояние для формы
const name = ref('')
const email = ref('')
const message = ref('')
const userType = ref('buyer') // Новый стейт для выбора пользователя

// Функция для отправки формы
function submitForm() {
  // Здесь можно добавить логику отправки сообщения, например через API
  console.log('Сообщение отправлено:', { name: name.value, email: email.value, message: message.value, userType: userType.value })
  // Очищаем поля формы
  name.value = ''
  email.value = ''
  message.value = ''
  userType.value = 'buyer' // Сбрасываем выбор после отправки
}
</script>

<template>
  <div class="contacts-page">
    <h1>Контакты</h1>

    <!-- Контактная информация -->
    <section class="contact-info">
      <h2>Мы на связи!</h2>
      <p>Телефон: <a href="tel:+70001234567">+7 (000) 123-45-67</a></p>
      <p>Email: <a href="mailto:info@thelinebetween.com">info@thelinebetween.com</a></p>
      <p>Адрес: ул. Пушкина, д. 10, Москва, Россия</p>
    </section>

    <!-- Форма обратной связи -->
    <section class="contact-form">
      <h2>Напишите нам</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <input type="text" id="name" v-model="name" placeholder="Введите ваше имя" required />
        </div>

        <div class="form-group">
          <label for="email">Ваш email</label>
          <input type="email" id="email" v-model="email" placeholder="Введите ваш email" required />
        </div>

        <div class="form-group">
          <label for="userType">Вы кто?</label>
          <div>
            <label>
              <input type="radio" v-model="userType" value="buyer" /> Покупатель
            </label>
            <label>
              <input type="radio" v-model="userType" value="artist" /> Художник
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="message">Сообщение</label>
          <textarea id="message" v-model="message" placeholder="Ваше сообщение" required></textarea>
        </div>

        <button type="submit">Отправить</button>
      </form>
    </section>

    <!-- Карта (например, Google Maps) -->
    <section class="map">
      <h2>Как нас найти</h2>
      <iframe 
        src="https://www.google.com/maps" 
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy">
      </iframe>
    </section>
  </div>
</template>

<style scoped>
.contacts-page {
  padding: 20px;
}

.contact-info, .contact-form, .map {
  margin-bottom: 30px;
}

.contact-info a {
  color: #0066cc;
}

.contact-form .form-group {
  margin-bottom: 15px;
}

.contact-form input, .contact-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form button {
  background-color: #0066cc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-form button:hover {
  background-color: #004080;
}

.map iframe {
  width: 100%;
  max-width: 600px;
  height: 350px;
}
</style>

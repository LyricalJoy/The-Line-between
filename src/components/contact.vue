<script setup>
import { ref } from 'vue'

// Состояние для формы
const name = ref('')
const email = ref('')
const message = ref('')
const userType = ref('buyer') // Новый стейт для выбора пользователя
const formSuccess = ref(false)


function submitForm() {
  // Проверка полей
  errors.value.name = name.value.trim() === ''
  errors.value.email = email.value.trim() === ''
  errors.value.message = message.value.trim() === ''

  if (errors.value.name || errors.value.email || errors.value.message) {
    return
  }

  console.log('Сообщение отправлено:', {
    name: name.value,
    email: email.value,
    message: message.value,
    userType: userType.value
  })

  // Показываем сообщение об успешной отправке
  formSuccess.value = true
  setTimeout(() => {
    formSuccess.value = false
  }, 4000)

  // Очистка формы
  name.value = ''
  email.value = ''
  message.value = ''
  userType.value = 'buyer'
  errors.value = { name: false, email: false, message: false }
}

const errors = ref({
  name: false,
  email: false,
  message: false
})
</script>

<template>
  <div class="contacts-page">
    <h1>Контакты</h1>

    <!-- Контактная информация -->
    <section class="contact-info">
      <h2>Мы на связи!</h2>
      <p>Телефон: <a href="tel:+70001234567">+7 (948) 748-44-87</a></p>
      <p>Email: <a href="mailto:info@thelinebetween.com">thelinebetween@mail.com</a></p>
      <p>Адрес: ул. Пушкина, д. 10, Санкт-Петербург, Россия</p>
    </section>

    <!-- Форма обратной связи -->
    <section class="contact-form" >
      <h2>Напишите нам</h2>
      <p class="contact-intro">
        Если вы амбициозный художник — напишите нам, и мы обсудим возможность сотрудничества.  
        Если вы покупатель — мы всегда рады вашим отзывам, вопросам и предложениям!
      </p>
      <form @submit.prevent="submitForm" novalidate>
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <input type="text" id="name" v-model="name" placeholder="Введите ваше имя" />
          <p v-if="errors.name" class="error-message">Пожалуйста, введите имя</p>
        </div>

        <div class="form-group">
          <label for="email">Ваш email</label>
          <input type="email" id="email" v-model="email" placeholder="Введите ваш email" required />
          <p v-if="errors.email" class="error-message">Пожалуйста, введите email</p>
        </div>

        <div class="form-group">
          <label for="userType">Кто вы?</label>
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
          <p v-if="errors.message" class="error-message">Пожалуйста, напишите сообщение</p>
        </div>

        <button type="submit">Отправить</button>
      </form>
      <transition name="fade">
  <div v-if="formSuccess" class="success-message">
    Спасибо! Ваше сообщение отправлено.
  </div>
</transition>
    </section>

    <!-- Карта (например, Google Maps) -->
    <section class="map">
      <h2>Как нас найти</h2>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1126.1485688277382!2d35.15889203766222!3d47.830917955536194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc678c60222573%3A0xe959302a24dcec6a!2z0L_Quy4g0J_Rg9GI0LrQuNC90LAsIDIsINCX0LDQv9C-0YDQvtC20YzQtSwg0JfQsNC_0L7RgNC-0LbRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNjkwOTU!5e0!3m2!1sru!2sua!4v1715431089883!5m2!1sru!2sua" 
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy">
      </iframe>
    </section>
  </div>
</template>

<style scoped>

.success-message {
  margin-top: 20px;
  background-color: #e3fbe3;
  color: #2c6e2c;
  border: 1px solid #a7e6a7;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Анимация появления */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
label {
  font-size: 24px;
}
.error-message {
  color: #b30000;
  font-size: 24px;
  margin-top: 4px;
}
.contacts-page {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
  color: #2e2e2e;
}

.contacts-page h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  color: #8b4513; /* коричневый */
}

.contact-intro {
  font-size: 24px;
  margin-bottom: 20px;
  color: #444;
  background-color: #fff7e8;
  padding: 15px 20px;
  border-left: 5px solid #caa84c; /* золотая полоса */
  border-radius: 8px;
}

.contact-info, .contact-form, .map {
  background-color: #fffdf7;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.contact-info h2,
.contact-form h2,
.map h2 {

  color: #8b4513;
  margin-bottom: 20px;
}

.contact-info a {
  color: #0077b6; /* голубой */
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.contact-form .form-group {
  margin-bottom: 20px;
}

.contact-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d2b48c; /* светло-коричневый */
  border-radius: 8px;
  font-size: 14px;
  background-color: #fdfaf5;
  transition: border-color 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #caa84c; /* золотистый */
}

.contact-form textarea {
  resize: vertical;
  min-height: 100px;
}

.contact-form button {
  background-color: #caa84c; /* золотой */
  color: white;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-form button:hover {
  background-color: #b9912b;
}

.contact-form input[type="radio"] {
  margin-right: 6px;
}

h3{
  font-size: 24px;
}
p{
  font-size: 24px;
}
.map iframe {
  width: 100%;
  border-radius: 12px;
  height: 400px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

</style>

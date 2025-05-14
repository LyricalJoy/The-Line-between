<script setup>
import { ref } from 'vue'

// Получаем данные о пользователе из localStorage
const user = ref(JSON.parse(localStorage.getItem('user')) || null)

// Пример данных заказов (можно хранить в localStorage)
const orders = ref(JSON.parse(localStorage.getItem('orders')) || [])

// Если заказов нет, показываем соответствующее сообщение
const noOrdersMessage = orders.value.length === 0 ? 'У вас пока не было заказов' : ''

// Если пользователь не авторизован, выводим сообщение
const notLoggedInMessage = !user.value ? 'Пожалуйста, войдите в личный кабинет для просмотра ваших заказов.' : ''

const getOrderTotal = (order) => {
  return order.items.reduce((sum, item) => sum + Number(item.price), 0)
}

// Отслеживание раскрытых заказов
const openOrderId = ref(null)

function toggleOrder(id) {
  openOrderId.value = openOrderId.value === id ? null : id
}
</script>

<template>
  <div class="my-orders">
    <h1>Мои заказы:</h1>

    <!-- Если пользователь не авторизован, выводим сообщение -->
    <div v-if="notLoggedInMessage">
      <p>{{ notLoggedInMessage }}</p>
    </div>

    <!-- Если есть заказы и пользователь авторизован, выводим их список -->
    <div v-else>
      <!-- Если нет заказов, выводим сообщение -->
      <div v-if="noOrdersMessage">
        <p>{{ noOrdersMessage }}</p>
      </div>

      <!-- Если есть заказы, выводим их список -->
      <div v-for="order in orders" :key="order.id" class="order-summary">
        <div class="order-header" @click="toggleOrder(order.id)">
          Заказ №{{ order.id }} от {{ order.date }} - Сумма: {{ getOrderTotal(order) }}₽
        </div>

        <div v-if="openOrderId === order.id" class="order-details">
          <div v-for="item in order.items" :key="item.title" class="order-item">
            <img :src="item.imageUrl" alt="картина" width="100" />
            <div>
              <h3>{{ item.title }}</h3>
              <p>Автор: {{ item.artist }}</p>
              <p>Размер: {{ item.size }}</p>
              <p>Цена: {{ item.price }}₽</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>
.order-summary {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.order-header {
  background: #f0f0f0;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}
.order-details {
  padding: 10px;
  background: white;
}
.order-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>

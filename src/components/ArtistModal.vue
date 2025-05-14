<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  artist: {
    type: Object,
    required: true
  },
  closeModal: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- Кнопка для закрытия модального окна -->
      <button @click="props.closeModal" class="close-button">✖</button>
      <div class="artist-info">
        <img :src="props.artist.avatar" alt="Artist" class="artist-avatar" />
        <h2>{{ props.artist.alias }}</h2>
        <p>{{ props.artist.name }}</p>
        <p>Картин: {{ props.artist.paintingsCount }}</p>
        
        <!-- Текст о художнике (общий для всех) -->
        <div class="artist-description">
          <h3>О художнике:</h3>
          <p>Этот художник представляет собой уникальное сочетание традиционного и современного искусства. Его работы погружают зрителя в мир эмоций и глубоких переживаний. Он активно выставляется на различных арт-выставках и уже успел завоевать признание среди поклонников искусства.</p>
        </div>

        <!-- Представленные работы (общие для всех) -->
        <div class="artist-paintings">
          <h3>Представленные работы для продажи:</h3>
          <div class="paintings-list">
            <div class="painting-card">
              <img src="./art/art_5.png" alt="Painting 1" class="painting-image" />
              <p>Картина 1</p>
            </div>
            <div class="painting-card">
              <img src="./art/art_6.png" alt="Painting 2" class="painting-image" />
              <p>Картина 2</p>
            </div>
            <div class="painting-card">
              <img src="./art/art_7.png" alt="Painting 3" class="painting-image" />
              <p>Картина 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 1200px;
  text-align: center;
  position: relative;
  max-height: 90vh; /* Ограничиваем максимальную высоту */
  overflow-y: auto; /* Включаем прокрутку по вертикали */
}

.artist-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.artist-description {
  margin-top: 20px;
  text-align: left;
}

.artist-paintings {
  margin-top: 20px;
  text-align: left;
}

.paintings-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.painting-card {
  text-align: center;
}

.painting-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-button:hover {
  color: #ff0000;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import ArtistModal from './ArtistModal.vue' // Импортируем компонент модального окна

// Состояния для фильтрации и сортировки
const searchQuery = ref('')
const sortBy = ref('noSort')

const artists = ref([
  { alias: 'Shuploc', name: 'Julie', avatar: './igm/artist_1.png', createdAt: '2021-03-01', paintingsCount: 22 },
  { alias: 'anna.lebedeva', name: 'Анна Лебедева', avatar: './igm/artist_2.png', createdAt: '2024-02-15', paintingsCount: 5 },
  { alias: 'Jayce', name: 'Kevin Alejandro', avatar: './igm/artist_3.png', createdAt: '2024-04-10', paintingsCount: 7 },
])

// Состояние для открытия модального окна
const isModalVisible = ref(false)
const selectedArtist = ref(null)

// Реактивная фильтрация и сортировка
const filteredArtists = computed(() => {
  let result = artists.value

  // Фильтр по поиску
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(a => a.alias.toLowerCase().includes(query) || a.name.toLowerCase().includes(query))
  }

  // Сортировка
  if (sortBy.value === 'alphabetical') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'newest') {
    result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return result
})

function handleSort(option) {
  sortBy.value = option
}

// Функция для открытия модального окна
function openArtistModal(artist) {
  selectedArtist.value = artist
  isModalVisible.value = true
}

// Функция для закрытия модального окна
function closeArtistModal() {
  isModalVisible.value = false
}
</script>

<template>
  <div class="artists-page">
    <!-- Поисковая строка -->
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Введите псевдоним или имя художника..." 
        class="search-input"
      />
    </div>

    <!-- Сортировка -->
    <div class="sort-section">
      <h2>Сортировка:</h2>
      <div class="sort-buttons">
        <button @click="handleSort('alphabetical')">По имени</button>
        <button @click="handleSort('newest')">По новизне</button>
      </div>
    </div>

    <!-- Контейнер для художников -->
    <div class="artist-container">
      <div 
        v-for="artist in filteredArtists" 
        :key="artist.alias" 
        class="artist-card"
        @click="openArtistModal(artist)"
      >
        <img :src="artist.avatar" alt="Avatar" class="artist-avatar"/>
        <div class="artist-details">
          <h3>{{ artist.alias }}</h3>
          <p>{{ artist.name }}</p>
          <p>Картин: {{ artist.paintingsCount }}</p>
        </div>
      </div>
    </div>

    <!-- Модальное окно с подробной информацией -->
    <ArtistModal 
      v-if="isModalVisible" 
      :artist="selectedArtist" 
      :closeModal="closeArtistModal" 
    />
  </div>
</template>

<style scoped>
.artists-page {
  padding: 20px;
}

.search-bar {
  margin-left: 35%;
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


.sort-section {
  margin-bottom: 30px;
}

.sort-buttons button {
  background-color: #0066cc;
  color: white;
  padding: 10px;
  border: none;
  margin-right: 10px;
  border-radius: 5px;
}

.sort-buttons button:hover {
  background-color: #004080;
}

.artist-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.artist-card {
  background-color: #cde6ff;
  padding: 20px;
  border: 3px solid rgba(239, 209, 136, 1);
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

.artist-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.artist-details {
  margin-top: 10px;
}
</style>

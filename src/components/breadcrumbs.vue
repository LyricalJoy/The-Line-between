<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Пример логики — получаем путь и разбиваем его на части
const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter(p => p)
  const crumbs = []

  if (parts.length === 0) {
    crumbs.push({ name: 'Главная', to: '/' })
  } else {
    crumbs.push({ name: 'Главная', to: '/' })
    if (parts[0] === 'gallery') {
      crumbs.push({ name: 'Галерея', to: '/gallery' })
    }
    if (parts[1]) {
      crumbs.push({ name: decodeURIComponent(parts[1]), to: null })
    }
  }

  return crumbs
})

function go(to) {
  if (to) router.push(to)
}
</script>

<template scoped>
  <nav class="breadcrumb">
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <span v-if="index !== 0">›</span>
        <a
          v-if="crumb.to"
          @click.prevent="go(crumb.to)"
          href="#"
        >{{ crumb.name }}</a>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb ul {
  list-style: none;
  display: flex;
  gap: 5px;
  font-size: 14px;
  padding: 0;
}
.breadcrumb li {
  display: flex;
  align-items: center;
}
.breadcrumb a {
  color: #007acc;
  text-decoration: none;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
</style>

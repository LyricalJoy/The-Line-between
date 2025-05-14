  <script setup>
  defineProps({
    show: Boolean
  })
  
  const emit = defineEmits(['close'])
  
  function close() {
    emit('close')
  }
  </script>
  
  
  <template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="close">×</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  
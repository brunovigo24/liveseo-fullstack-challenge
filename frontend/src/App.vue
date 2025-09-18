<template>
  <div id="app">
    <header class="app-header">
      <h1>Desafio Técnico – Desenvolvedor Fullstack</h1>
      <p>Vue.js 3 + Aplicativo Frontend TypeScript</p>
    </header>
    
    <main class="app-main">
      <div class="container">
        <UserList />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2025 Desafio Técnico – Desenvolvedor Fullstack</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import UserList from './components/UserList.vue'
</script>

<style scoped>
.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.app-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.app-header p {
  margin: 0;
  opacity: 0.8;
}

.app-main {
  min-height: calc(100vh - 120px);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}



.app-footer {
  background-color: #f8f9fa;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}

.app-footer p {
  margin: 0;
  color: #6c757d;
}
</style>
<template>
  <div id="app">
    <header class="app-header">
      <h1>Fullstack Technical Test</h1>
      <p>Vue.js 3 + TypeScript Frontend Application</p>
    </header>
    
    <main class="app-main">
      <div class="container">
        <!-- Main content will be added in subsequent tasks -->
        <div class="placeholder">
          <h2>Welcome to the User Management System</h2>
          <p>This application will display users from JSONPlaceholder API</p>
        </div>
      </div>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2024 Fullstack Technical Test</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Main App component using Composition API
// Additional functionality will be added in subsequent tasks
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

.placeholder {
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.placeholder h2 {
  color: #495057;
  margin-bottom: 1rem;
}

.placeholder p {
  color: #6c757d;
  font-size: 1.1rem;
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
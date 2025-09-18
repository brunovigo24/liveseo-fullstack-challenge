<template>
  <div class="user-list">
    <div v-if="loading">Carregando usuários...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h2>Usuários ({{ users.length }})</h2>
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ user.address.city }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService } from '../services/UserService'
import type { User } from '../types/user'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  
  try {
    users.value = await userService.fetchUsers()
  } catch (err) {
    error.value = 'Falha ao carregar usuários'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.user-list {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  color: #e53e3e;
  margin-bottom: 0.5rem;
}

.error-state p {
  color: #c53030;
  margin-bottom: 1.5rem;
}

.retry-button {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #2c5aa0;
}

/* Users Content */
.users-content {
  margin-top: 1rem;
}

.users-header {
  margin-bottom: 2rem;
  text-align: center;
}

.users-header h2 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.users-count {
  color: #718096;
  font-size: 1rem;
}

/* Users Grid */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.user-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-name {
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.user-email {
  color: #4a5568;
  font-size: 1rem;
  margin: 0;
}

.user-city {
  color: #718096;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  background-color: #f7fafc;
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  margin: 2rem 0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #718096;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-list {
    padding: 0.5rem;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .user-card {
    padding: 1rem;
  }
  
  .users-header h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .loading-state,
  .error-state,
  .empty-state {
    padding: 2rem 1rem;
  }
  
  .user-name {
    font-size: 1.1rem;
  }
  
  .user-email {
    font-size: 0.9rem;
  }
}
</style>
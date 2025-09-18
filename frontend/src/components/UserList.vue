<template>
  <div class="user-list">
    <div v-if="loading">Carregando usuários...</div>
    <div v-else-if="error">
      Erro: {{ error }}
      <button @click="fetchUsers">Tentar novamente</button>
    </div>
    <div v-else>
      <div class="controls">
        <SearchBar v-model="searchTerm" />
        
        <div class="view-controls">
          <button 
            @click="viewMode = 'cards'" 
            :class="{ active: viewMode === 'cards' }"
            class="view-button"
          >
            📱 Cards
          </button>
          <button 
            @click="viewMode = 'table'" 
            :class="{ active: viewMode === 'table' }"
            class="view-button"
          >
            📋 Tabela
          </button>
        </div>
      </div>
      
      <h2>Usuários ({{ filteredUsers.length }})</h2>
      
      <div v-if="filteredUsers.length === 0 && searchTerm">
        Nenhum usuário encontrado para "{{ searchTerm }}"
      </div>
      
      <!-- Cards View -->
      <div v-if="viewMode === 'cards'" class="users-grid">
        <div v-for="user in filteredUsers" :key="user.id" class="user-card">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <p>{{ user.address.city }}</p>
        </div>
      </div>
      
      <!-- Table View -->
      <div v-else class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.address.city }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { userService } from '../services/UserService'
import SearchBar from './SearchBar.vue'
import type { User, ViewMode } from '../types/user'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchTerm = ref('')
const viewMode = ref<ViewMode>('cards')

const filteredUsers = computed(() => {
  if (!searchTerm.value.trim()) {
    return users.value
  }

  const search = searchTerm.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search) ||
    user.address.city.toLowerCase().includes(search)
  )
})

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
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.view-controls {
  display: flex;
  gap: 0.5rem;
}

.view-button {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.view-button:hover {
  background: #e9ecef;
}

.view-button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* Cards View */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.user-card h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.user-card p {
  margin: 0.25rem 0;
  color: #666;
}

/* Table View */
.users-table-container {
  margin-top: 1rem;
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.users-table tr:hover {
  background: #f8f9fa;
}

.users-table tr:last-child td {
  border-bottom: none;
}

/* General buttons */
button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

/* Responsive */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .view-controls {
    justify-content: center;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
  }
}
</style>
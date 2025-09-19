<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-96">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div class="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mb-4"></div>
      <p class="text-muted-foreground text-lg">Carregando usuários...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-16 px-8 text-center bg-destructive/10 border border-destructive/20 rounded-2xl my-8">
      <div class="w-16 h-16 text-destructive mb-4">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-destructive mb-2">Erro ao carregar usuários</h3>
      <p class="text-muted-foreground mb-6">{{ error }}</p>
      <button @click="fetchUsers" class="btn-primary px-6 py-3 gap-2 flex items-center">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 3v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 21v-5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Tentar novamente
      </button>
    </div>
    
    <!-- Main Content -->
    <div v-else class="animate-fade-in">
      <div class="card flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <SearchBar v-model="searchTerm" />
        <ViewToggle :current-view="viewMode" @view-changed="handleViewChange" />
      </div>

      <div class="mb-6">
        <h2 class="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Usuários 
          <span class="text-lg lg:text-xl font-normal text-muted-foreground">({{ filteredUsers.length }})</span>
        </h2>
        <div v-if="searchTerm" class="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground text-sm">
          <span>Resultados para: <strong class="text-foreground">"{{ searchTerm }}"</strong></span>
          <button @click="clearSearch" class="btn-ghost text-xs px-2 py-1 gap-1 self-start sm:self-auto flex items-center">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Limpar busca
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div v-if="filteredUsers.length === 0 && searchTerm" class="flex flex-col items-center justify-center py-16 px-8 text-center bg-muted border border-border rounded-2xl my-8">
        <div class="w-16 h-16 text-muted-foreground mb-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-foreground mb-2">Nenhum usuário encontrado</h3>
        <p class="text-muted-foreground mb-6 max-w-md">Não encontramos usuários que correspondam à sua busca por <strong>"{{ searchTerm }}"</strong></p>
        <button @click="clearSearch" class="btn-secondary">Limpar busca</button>
      </div>

      <!-- User Display Components -->
      <div v-else class="animate-slide-up">
        <!-- Cards View -->
        <UserCards v-if="viewMode === 'cards'" :users="filteredUsers" />

        <!-- Table View -->
        <UserTable v-else :users="filteredUsers" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { userService } from '../services/UserService'
import SearchBar from './SearchBar.vue'
import ViewToggle from './ViewToggle.vue'
import UserTable from './UserTable.vue'
import UserCards from './UserCards.vue'
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

const handleViewChange = (newView: ViewMode) => {
  viewMode.value = newView
}

const clearSearch = () => {
  searchTerm.value = ''
}

// Expose methods for testing
defineExpose({
  clearSearch
})

onMounted(fetchUsers)
</script>


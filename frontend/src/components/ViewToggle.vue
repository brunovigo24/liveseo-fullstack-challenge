<template>
  <div class="flex gap-1 p-1 bg-muted rounded-2xl border border-border">
    <button 
      @click="handleViewChange('cards')" 
      :class="[
        'toggle-button flex items-center gap-2 min-w-20 justify-center',
        currentView === 'cards' ? 'active' : ''
      ]"
      :aria-pressed="currentView === 'cards'"
      aria-label="Visualização em cards"
    >
      <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span class="hidden sm:inline text-xs font-medium">Cards</span>
    </button>
    <button 
      @click="handleViewChange('table')" 
      :class="[
        'toggle-button flex items-center gap-2 min-w-20 justify-center',
        currentView === 'table' ? 'active' : ''
      ]"
      :aria-pressed="currentView === 'table'"
      aria-label="Visualização em tabela"
    >
      <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span class="hidden sm:inline text-xs font-medium">Tabela</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ViewMode } from '../types/user'

interface Props {
  currentView: ViewMode
}

interface Emits {
  (e: 'viewChanged', view: ViewMode): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleViewChange = (view: ViewMode) => {
  if (view !== props.currentView) {
    emit('viewChanged', view)
  }
}
</script>


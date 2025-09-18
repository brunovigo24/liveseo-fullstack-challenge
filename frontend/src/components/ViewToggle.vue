<template>
  <div class="view-toggle">
    <button 
      @click="handleViewChange('cards')" 
      :class="{ active: currentView === 'cards' }"
      class="view-button"
      :aria-pressed="currentView === 'cards'"
      aria-label="Visualização em cards"
    >
      <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span class="label">Cards</span>
    </button>
    <button 
      @click="handleViewChange('table')" 
      :class="{ active: currentView === 'table' }"
      class="view-button"
      :aria-pressed="currentView === 'table'"
      aria-label="Visualização em tabela"
    >
      <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span class="label">Tabela</span>
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

<style scoped>
.view-toggle {
  display: flex;
  gap: 0.5rem;
  border-radius: 6px;
  background: #f8f9fa;
  padding: 0.25rem;
  border: 1px solid #e9ecef;
}

.view-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 80px;
  justify-content: center;
}

.view-button:hover {
  background: #e9ecef;
  color: #495057;
}

.view-button.active {
  background: #007bff;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
}

.view-button.active:hover {
  background: #0056b3;
}

.icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.label {
  font-size: 0.85rem;
  font-weight: 500;
}

.view-button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.view-button:focus:not(:focus-visible) {
  outline: none;
}

@media (max-width: 480px) {
  .view-toggle {
    width: 100%;
  }
  
  .view-button {
    flex: 1;
    min-width: auto;
  }
  
  .label {
    display: none;
  }
  
  .icon {
    width: 18px;
    height: 18px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .view-toggle {
    border-color: #000;
  }
  
  .view-button {
    border: 1px solid transparent;
  }
  
  .view-button.active {
    border-color: #fff;
  }
}

@media (prefers-reduced-motion: reduce) {
  .view-button {
    transition: none;
  }
}
</style>
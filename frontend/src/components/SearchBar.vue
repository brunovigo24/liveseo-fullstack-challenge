<template>
    <div class="search-bar">
        <div class="search-input-container">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <input v-model="searchValue" type="text" class="search-input" placeholder="Buscar usuários..."
                @input="handleInput" />
            <button v-if="searchValue" @click="clearSearch" class="clear-button" type="button">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const searchValue = ref(props.modelValue)
let debounceTimer: NodeJS.Timeout | null = null

const handleInput = () => {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }

    debounceTimer = setTimeout(() => {
        emit('update:modelValue', searchValue.value)
    }, 300)
}

const clearSearch = () => {
    searchValue.value = ''
    emit('update:modelValue', '')
}
</script>

<style scoped>
.search-bar {
    margin-bottom: 1rem;
}

.search-input-container {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 400px;
}

.search-input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.search-input:focus {
    outline: none;
    border-color: #007bff;
}

.search-icon {
    position: absolute;
    left: 0.5rem;
    width: 16px;
    height: 16px;
    color: #666;
    pointer-events: none;
    z-index: 1;
}

.clear-button {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 2px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-button svg {
    width: 14px;
    height: 14px;
}

.clear-button:hover {
    color: #333;
    background-color: #f0f0f0;
}
</style>
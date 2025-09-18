<template>
    <div class="search-bar">
        <div class="search-input-container">
            <div class="search-icon">🔍</div>
            <input v-model="searchValue" type="text" class="search-input" placeholder="Buscar usuários..."
                @input="handleInput" />
            <button v-if="searchValue" @click="clearSearch" class="clear-button" type="button">
                ✕
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
    font-size: 1rem;
}

.clear-button:hover {
    color: #333;
    background-color: #f0f0f0;
}
</style>
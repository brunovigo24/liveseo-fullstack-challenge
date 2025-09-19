<template>
    <div class="w-full max-w-md">
        <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <input 
                v-model="searchValue" 
                type="text" 
                class="input-field pl-10 pr-10" 
                placeholder="Buscar usuários..."
                @input="handleInput" 
            />
            <button 
                v-if="searchValue" 
                @click="clearSearch" 
                class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-accent transition-colors" 
                type="button"
            >
                <svg class="w-4 h-4 text-muted-foreground hover:text-accent-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const searchValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (newValue) => {
    searchValue.value = newValue
})

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


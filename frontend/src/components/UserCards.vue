<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div 
      v-for="user in users" 
      :key="user.id" 
      class="card group hover:scale-105 transition-transform duration-200 cursor-pointer"
    >
      <div class="flex items-start justify-between mb-4">
        <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg class="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 7h10v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div class="space-y-3">
        <div>
          <h3 class="font-semibold text-card-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-200">
            {{ user.name }}
          </h3>
          <p class="text-muted-foreground text-sm break-all">{{ user.email }}</p>
        </div>
        
        <div class="flex items-center gap-2 text-muted-foreground text-sm">
          <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span class="truncate">{{ user.address.city }}</span>
        </div>
        
        <div v-if="user.phone" class="flex items-center gap-2 text-muted-foreground text-sm">
          <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span class="truncate">{{ user.phone }}</span>
        </div>
        
        <div v-if="user.company?.name" class="flex items-center gap-2 text-muted-foreground text-sm">
          <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 21V7l8-4v18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 21V11l-6-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="truncate">{{ user.company.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types/user'

defineProps<{
  users: User[]
}>()
</script>
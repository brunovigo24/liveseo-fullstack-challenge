<template>
  <div class="table-modern overflow-x-auto">
    <table class="w-full min-w-[600px]">
      <thead>
        <tr>
          <th class="text-left">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
              </svg>
              Nome
            </div>
          </th>
          <th class="text-left">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
              </svg>
              Email
            </div>
          </th>
          <th class="text-left">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
              </svg>
              Cidade
            </div>
          </th>
          <th class="text-left hidden md:table-cell">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
              </svg>
              Telefone
            </div>
          </th>
          <th class="text-left hidden lg:table-cell">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 21V7l8-4v18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 21V11l-6-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Empresa
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="group cursor-pointer">
          <td class="font-medium">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <span class="group-hover:text-primary transition-colors duration-200 text-sm sm:text-base truncate">{{ user.name }}</span>
            </div>
          </td>
          <td class="text-muted-foreground">
            <span class="break-all text-xs sm:text-sm">{{ user.email }}</span>
          </td>
          <td class="text-muted-foreground text-sm sm:text-base">{{ user.address.city }}</td>
          <td class="text-muted-foreground hidden md:table-cell">
            {{ user.phone || '-' }}
          </td>
          <td class="text-muted-foreground hidden lg:table-cell">
            <span class="truncate max-w-32 block" :title="user.company?.name">
              {{ user.company?.name || '-' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../types/user'

defineProps<{
  users: User[]
}>()
</script>
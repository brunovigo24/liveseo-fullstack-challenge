<template>
  <div id="app" class="min-h-screen flex flex-col bg-background">
    <header class="bg-primary text-primary-foreground shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl md:text-3xl font-bold text-center">
          Desafio Técnico – Desenvolvedor Fullstack - LiveSEO
        </h1>
        <p class="text-center opacity-90 mt-2 text-sm md:text-base">
          Vue.js 3 + Aplicativo Frontend TypeScript
        </p>
      </div>
    </header>

    <main class="flex-1 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserList />
      </div>
    </main>

    <footer class="bg-card border-t border-border mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p class="text-center text-muted-foreground text-sm">
          &copy; 2025 Desafio Técnico – Desenvolvedor Fullstack - LiveSEO
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import UserList from './components/UserList.vue'
</script>

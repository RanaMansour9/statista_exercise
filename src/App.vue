<script setup>
import SearchApp from './components/SearchApp.vue'
</script>

<template>
  <SearchApp class="h-full flex flex-col grow" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

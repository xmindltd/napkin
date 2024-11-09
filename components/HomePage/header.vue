<template>
  <div class="flex my-3">
    <div class="font-semibold text-xl">AInfographic</div>
    <div class="ml-auto">
      <button
        class="mr-3 font-semibold md:border border-border-light dark:border-border-dark md:bg-white md:dark:bg-surface-bright-dark relative py-1 px-3 max-md:px-1 rounded-md font-medium md:hover:bg-bg-01-light md:dark:hover:bg-surface-bright-darken-dark transition-colors"
      >
        <IconHeaderAdd />
        <div class="max-md:hidden">Cycle</div>
      </button>
      <button
        class="font-semibold md:border border-border-light dark:border-border-dark md:bg-white md:dark:bg-surface-bright-dark relative py-1 px-3 max-md:px-1 rounded-md font-medium md:hover:bg-bg-01-light md:dark:hover:bg-surface-bright-darken-dark transition-colors"
      >
        <IconHeaderAdd />
        <div class="max-md:hidden">New</div>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
// import IconHeaderAdd from "~/assets/icons/header-add.svg?component";
</script>

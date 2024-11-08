<template>
  <div class="flex justify-center bg-[#f8f8f8] w-screen h-screen">
    <ClientOnly>
      <div class="flex flex-col w-4/5">
        <HomePageHeader />
        <HomePageMain />
      </div>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup></script>

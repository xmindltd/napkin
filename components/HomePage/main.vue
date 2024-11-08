<template>
  <div class="flex w-full flex-col h-full">
    <div class="flex w-full h-3/4 bg-white rounded-3xl p-4">
      <div class="flex flex-1 relative">
        <vue-draggable-resizable
          class="!bg-transparent"
          :class="
            active
              ? '!border !border-solid !border-[#1ac6ff] handle'
              : '!border-none'
          "
          :parent="true"
          v-model:active="active"
          draggable="true"
        >
          <Text
            :element="textElement"
            @input="(newValue: string) => (textElement.value = newValue)"
          />
        </vue-draggable-resizable>
      </div>
      <div class="flex flex-1">
        <Render />
      </div>
    </div>
    <div
      class="flex flex-col justify-between w-full mt-4 flex-1 bg-white rounded-3xl p-5"
    >
      <AutoExpandTextarea
        ref="generateInputRef"
        class="outline-none w-full bg-transparent texPt-black dark:text-white"
        :tabindex="0"
        :minHeight="100"
        :maxlength="1000"
        :modelValue="input"
        :placeholderClass="'text-fg-04-light dark:text-[#aeb5bd]'"
        @update:modelValue="updateModelValue"
        @submit="onSubmit"
        @keydown="onKeydown"
        @touchstart.stop
        @blur="onBlur"
        @paste="onPaste"
      >
        <template #placeholder>
          <div class="fade-in text-base text-placeholder">
            <div>Input your text here...</div>
          </div>
        </template>
      </AutoExpandTextarea>
      <div
        class="mb-3 h-[1px] bg-divider-light dark:bg-divider-dark w-full"
      ></div>
      <div class="flex h-9">
        <div class="leading-9 text-sm text-fg-04-light dark:text-[#aeb5bd]">
          {{ input.length }}/1000
        </div>
        <button
          class="ml-auto font-semibold md:border border-border-light dark:border-border-dark md:bg-[#f0f0f0] md:dark:bg-surface-bright-dark relative py-1 px-3 max-md:px-1 rounded-md font-medium md:hover:bg-bg-01-light md:dark:hover:bg-surface-bright-darken-dark transition-colors"
        >
          <div class="max-md:hidden">Generate</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueDraggableResizable from "vue-draggable-resizable";
const generateInputRef = ref();
const input = ref("");
defineExpose({
  focus: () => {
    generateInputRef.value?.focus();
  },
});
const textElement = ref<ElementText>({
  point: { x: 0, y: 0 },
  style: {},
  value: "TEST",
  class: "",
  placement: "top",
});
const active = ref(false);
const updateModelValue = (value: string) => {
  input.value = value;
};
const onSubmit = () => {
  console.log("submit");
};
const onKeydown = () => {
  console.log("keydown");
};
const onBlur = () => {
  console.log("blur");
};
const onPaste = async () => {
  await sleep(100);
  console.log("paste");
};
</script>
<style>
.handle > .handle {
  border-radius: 2px !important;
  background-color: #1ac6ff !important;
}
</style>

<template>
  <div class="relative">
    <slot name="disabled-content">
      <textarea
        :tabindex="tabindex"
        :autofocus="autofocus"
        :disabled="disabled"
        :maxlength="maxlength"
        rows="1"
        v-model="inputText"
        ref="textarea"
        class="hidden-scrollbar resize-none scrollbar overflow-y-scroll block outline-none bg-transparent w-full relative transition-all"
        :class="[!isMaxHeight && 'scrollbar-no-bg', textareaClass]"
        @compositionstart="isInComposition = true"
        @compositionend="isInComposition = false"
        @keydown="handleKeyDown"
        @blur="(e) => emit('blur', e)"
        @focus="emit('focus')"
        @input="e => emit('input', e as InputEvent)"
        @paste="(e) => emit('paste', e)"
      ></textarea>
      <div
        class="absolute inset-0 pointer-events-none"
        :class="[placeholderClass, !isShowPlaceholder && 'opacity-0']"
        ref="placeholderArea"
      >
        <slot name="placeholder">
          <span class="text-fg-03-light dark:text-fg-03-dark">{{
            placeholder
          }}</span>
        </slot>
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useElementBounding } from "@vueuse/core";

const props = defineProps<{
  maxHeight?: number;
  minHeight?: number;
  modelValue?: string;
  maxlength?: number;
  disabled?: boolean;
  handleSubmit?: () => void;
  autofocus?: boolean;
  placeholder?: string;
  tabindex?: number | string;
  textareaClass?: string;
  disableAutoExpand?: boolean;
  isFixedPlaceholder?: boolean;
  placeholderClass?: string;
}>();

const emit = defineEmits<{
  (ev: "update:modelValue", value: string): void;
  (ev: "submit", value: string): void;
  (ev: "blur", e: FocusEvent): void;
  (ev: "focus"): void;
  (ev: "keydown", e: KeyboardEvent): void;
  (ev: "input", e: InputEvent): void;
  (ev: "paste", e: ClipboardEvent): void;
}>();

const inputText = computed({
  set(v: string) {
    if (props.disabled) return;
    autoExpand();
    emit("update:modelValue", v);
  },
  get() {
    nextTick(() => {
      autoExpand();
    });
    return props.modelValue || "";
  },
});
const MAX_HEIGHT = 100;
const isMaxHeight = ref(false);
const textarea = ref<HTMLTextAreaElement>();
const placeholderArea = ref<HTMLElement>();
const { width: textWidth } = useElementBounding(textarea);
const { height: placeholderHeight } = useElementBounding(placeholderArea);

const isInComposition = ref(false);
const isShowPlaceholder = computed(
  () => !isInComposition.value && !props.modelValue
);
const maxHeight = computed(() =>
  isShowPlaceholder.value ? Infinity : props.maxHeight ?? MAX_HEIGHT
);
const minHeight = computed(() => {
  const _ = placeholderHeight.value;
  const minHeight = props.isFixedPlaceholder
    ? placeholderArea.value?.clientHeight ?? 0
    : 0;
  return Math.max(minHeight, props.minHeight ?? 0);
});

const calHeight = async (el: HTMLTextAreaElement) => {
  const currentHeight = parseFloat(el.style.height);
  el.style.transition = "none";
  el.style.height = `${minHeight.value ?? 0}px`;
  const height = el.scrollHeight;
  el.style.height = `${currentHeight}px`;
  // force sync layout
  el.offsetHeight;
  await sleep(0);
  el.style.transition = "";
  return { height, currentHeight };
};

watch(
  () => textWidth.value,
  async () => {
    debouncedAutoExpand();
  }
);
const autoExpand = () => {
  if (props.disableAutoExpand || !textarea.value) return;
  const textareaEl = textarea.value;

  textareaEl.style.height = "auto";
  let newHeight = Math.max(
    minHeight.value,
    Math.min(textareaEl.scrollHeight, maxHeight.value)
  );
  if (textareaEl.style.height !== `${newHeight}px`) {
    textareaEl.style.height = `${newHeight}px`;
  }
  isMaxHeight.value = newHeight === maxHeight.value;
};

const debouncedAutoExpand = debounce(autoExpand, 50, { leading: true });

watch(
  () => [
    props.placeholder,
    placeholderArea.value,
    props.isFixedPlaceholder,
    placeholderHeight.value,
    minHeight.value,
  ],
  async () => {
    debouncedAutoExpand();
  },
  {
    flush: "post",
  }
);

const handleKeyDown = (e: KeyboardEvent) => {
  emit("keydown", e);
  if (e.key === "Enter" && !e.shiftKey) {
    // 当正在输入的时候，按 Enter 不触发事件
    if (isInComposition.value) return;

    e.preventDefault();
    props?.handleSubmit?.();
    emit("submit", inputText.value);
  }
};

defineExpose({
  insertAtCursor(text: string) {
    const el = textarea.value;
    if (!el) return;
    const { selectionStart, selectionEnd } = el;
    const inputValue = props.modelValue || "";
    const value =
      inputValue.slice(0, selectionStart) +
      text +
      inputValue.slice(selectionEnd);
    emit("update:modelValue", value);
  },
  focus() {
    textarea.value?.focus();
  },
  blur() {
    textarea.value?.blur();
  },
});

onMounted(() => {
  autoExpand();
});
</script>
<style>
.scrollbar-no-bg::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 5px;
}

.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 兼容火狐 */
.scrollbar-no-bg {
  scrollbar-color: transparent transparent;
}
.dark .scrollbar-no-bg::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>

<template>
  <div
    @dblclick="setEdit"
    class="text"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
  >
    <!-- tabindex >= 0 使得双击时聚焦该元素 -->
    <div
      ref="text"
      :style="style"
      :contenteditable="canEdit"
      :class="{ 'can-edit': canEdit }"
      tabindex="1"
      @paste="clearStyle"
      @mousedown="handleMousedown"
      @blur="handleBlur"
      @input="handleInput"
      v-html="element.value"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const text = ref(null);
const props = defineProps({
  element: {
    type: Object,
    default: () => ({}),
  },
});

const style = computed(() => {
  let placementStyle = {};
  switch (props.element.placement) {
    case "top":
      placementStyle = { textAlign: "center", verticalAlign: "top" };
      break;
    case "bottom":
      placementStyle = { textAlign: "center", verticalAlign: "bottom" };
      break;
    case "left":
      placementStyle = { textAlign: "left", verticalAlign: "middle" };
      break;
    case "right":
      placementStyle = { textAlign: "right", verticalAlign: "middle" };
      break;
    case "top-start":
      placementStyle = { textAlign: "left", verticalAlign: "top" };
      break;
    case "top-end":
      placementStyle = { textAlign: "right", verticalAlign: "top" };
      break;
    case "right-start":
      placementStyle = { textAlign: "left", verticalAlign: "middle" };
      break;
    case "right-end":
      placementStyle = { textAlign: "right", verticalAlign: "middle" };
      break;
    case "bottom-start":
      placementStyle = { textAlign: "left", verticalAlign: "bottom" };
      break;
    case "bottom-end":
      placementStyle = { textAlign: "right", verticalAlign: "bottom" };
      break;
    case "left-start":
      placementStyle = { textAlign: "left", verticalAlign: "middle" };
      break;
    case "left-end":
      placementStyle = { textAlign: "right", verticalAlign: "middle" };
      break;
    default:
      break;
  }
  return {
    ...placementStyle,
    ...props.element.style, // 合并外部自定义样式
  };
});

const emit = defineEmits(["input"]);

const canEdit = ref(false);

// 处理 input 事件
const handleInput = (e: Event) => {
  const target = e.target as HTMLDivElement;
  e.stopPropagation();
  document.execCommand("selectAll", false, undefined);
  document.getSelection()?.collapseToEnd();
  emit("input", target.innerHTML);
};

// 设置编辑状态
const setEdit = () => {
  canEdit.value = true;
  selectText(text.value);
};

const selectText = (element: HTMLElement | null) => {
  if (!element) return;
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection?.removeAllRanges();
  selection?.addRange(range);
};
// 阻止冒泡的处理事件
const handleKeydown = (e: Event) => {
  if (canEdit.value) e.stopPropagation();
};

const handleKeyup = (e: Event) => {};
const handleMousedown = (e: Event) => {
  e.stopPropagation();
};

const clearStyle = (e: ClipboardEvent) => {
  e.preventDefault();
  const target = e.target as HTMLDivElement;
  const clp = e.clipboardData;
  if (clp) {
    const text = clp.getData("text/plain") || "";
    if (text !== "") {
      document.execCommand("insertText", false, text); // 插入纯文本
    }
  }
  emit("input", target.innerHTML);
};

const handleBlur = (e: Event) => {
  canEdit.value = false;
};
</script>

<style scoped>
.text {
  width: 100%;
  height: 100%;
  display: table;
}

.text div {
  display: table-cell;
  width: 100%;
  height: 100%;
  outline: none;
  word-break: break-all;
  padding: 4px;
  /* background-color: aliceblue; */
}

.text .can-edit {
  cursor: text;
  height: 100%;
}
</style>

<template>
  <div class="w-full h-full" ref="wrapperContainerRef">
    <div
      class="relative origin-left"
      :style="{
        transform: `scale(${scale})`,
        width: stopped ? `${wrapperOriginWidth}px` : 'auto',
        height: `${bounding.height.value}px`,
      }"
    >
      <div :class="!stopped && 'absolute left-0 top-0 w-screen h-screen'">
        <div
          ref="layoutContainerRef"
          class="block"
          :class="stopped && 'w-full'"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useElementBounding } from "@vueuse/core";
const props = withDefaults(
  defineProps<{
    fit?: "width" | "height";
    enable?: boolean;
    minScale?: number;
    minWidth?: number;
  }>(),
  {
    fit: "width",
    enable: true,
  }
);

const layoutContainerRef = ref<HTMLDivElement>();
const wrapperContainerRef = ref<HTMLDivElement>();
const bounding = useElementBounding(layoutContainerRef);
const wrapperBounding = useElementBounding(wrapperContainerRef);
const scale = ref(1);

let ignoreChange = false;

const stopped = computed(() => {
  if (wrapperBounding.width.value < (props.minWidth || 0)) {
    return true;
  }
  return false;
});

const wrapperOriginWidth = computed(() => {
  return wrapperBounding.width.value / scale.value;
});

const calLayoutContainerRect = () => {
  const el = layoutContainerRef.value;
  if (!el) return { width: 0, height: 0 };
  el.style.width = "auto";
  el.style.height = "auto";
  el.style.position = "absolute";
  el.offsetHeight;
  const width = el.clientWidth;
  const height = el.clientHeight;
  el.style.width = "";
  el.style.height = "";
  el.style.position = "";
  return { width, height };
};

const reCalculateScale = async () => {
  const allowedWidth = Math.max(
    wrapperBounding.width.value,
    props.minWidth || 0
  );
  const allowedHeight = wrapperBounding.height.value;
  const { width, height } = calLayoutContainerRect();
  if (allowedWidth === 0 || allowedHeight === 0 || width === 0 || height === 0)
    return;
  const widthScale = allowedWidth / width;
  const heightScale = allowedHeight / height;
  const _scale = props.fit === "width" ? widthScale : heightScale;
  if (_scale < 1) {
    scale.value = Math.max(props.minScale || 0, _scale);
  } else {
    scale.value = 1;
  }
  await nextTick();
};

watch(
  [
    bounding.width,
    wrapperBounding.width,
    bounding.height,
    wrapperBounding.height,
  ],
  async () => {
    if (ignoreChange || props.enable === false) return;
    ignoreChange = true;
    await reCalculateScale();
    ignoreChange = false;
  }
);
</script>

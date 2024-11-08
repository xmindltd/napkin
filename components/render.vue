<template>
  <!-- 使用 ref 获取 SVG 容器 -->
  <div class="flex flex-1 relative justify-center" ref="svgContainer">
    <div v-for="element in elementList">
      <vue-draggable-resizable
        style="border: none"
        :x="element.point.x"
        :y="element.point.y"
        :w="100"
        :h="100"
        :parent="true"
      >
        <Text
          :element="element"
          @input="(newValue: string) => (element.value = newValue)"
        />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueDraggableResizable from "vue-draggable-resizable";
import { useSvgCycle } from "../composables/useSvgCycle";
import { onMounted, ref } from "vue";
const svgContainer = ref<HTMLElement | null>(null);
const {
  radius,
  radiusChildren,
  centerX,
  centerY,
  count,
  render,
  circleCoordinate,
  getDiffPosition,
} = useSvgCycle();
const elementList = computed(() => {
  return getDiffPosition(
    circleCoordinate.value,
    { width: 100, height: 100 },
    { width: radiusChildren.value * 2, height: radiusChildren.value * 2 },
    { x: 0, y: 5 }
  );
});
onMounted(() => {
  if (svgContainer.value) {
    render(svgContainer.value);
  }
});
</script>

<style>
@import "vue-draggable-resizable/style.css";
.main-round {
  stroke: transparent;
  stroke-width: 2;
  fill: none;
}

.other-round {
  stroke: black;
  stroke-width: 2;
  fill: none;
}

.arrow-path {
  stroke: black;
  stroke-width: 3;
  fill: none;
  marker-end: url(#arrowhead);
}
</style>

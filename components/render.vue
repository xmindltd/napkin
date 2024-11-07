<template>
  <!-- 使用 ref 获取 SVG 容器 -->
  <div style="width: 648px; height: 648px" ref="svgContainer">
    <div v-for="point in circleCoordinate">
      <vue-draggable-resizable
        :x="point.x"
        :y="point.y"
        :w="100"
        :h="100"
        :parent="true"
      >
        <Text
          :element="element"
          @input="(newValue) => (element.value = newValue)"
        />
      </vue-draggable-resizable>
    </div>
  </div>
  {{ circleCoordinate }}
  <!-- <div
    style="
      height: 500px;
      width: 500px;
      border: 1px solid red;
      position: relative;
    "
  >
    <vue-draggable-resizable :w="300" :h="300" :parent="true">
      <Text
        :element="element"
        @input="(newValue) => (element.value = newValue)"
      />
    </vue-draggable-resizable>
  </div> -->
  <input type="text" v-model="radius" />
  <input type="text" v-model="radiusChildren" />
</template>

<script lang="ts" setup>
import VueDraggableResizable from "vue-draggable-resizable";
import { computePosition } from "@floating-ui/vue";
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
} = useSvgCycle();
const diffPosition = [{}];
const element = ref({ value: "test", class: "" });
onMounted(() => {
  if (svgContainer.value) {
    render(svgContainer.value);
  }
});
</script>

<style>
@import "vue-draggable-resizable/style.css";
.bg {
  background-color: beige;
}

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

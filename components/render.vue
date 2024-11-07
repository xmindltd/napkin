<template>
  <!-- 使用 ref 获取 SVG 容器 -->
  <div
    style="width: 648px; height: 648px; position: relative"
    ref="svgContainer"
  >
    <div v-for="element in elementList">
      <vue-draggable-resizable
        :x="element.point.x"
        :y="element.point.y"
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
import type { ElementText } from "../composables/type";
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
const elementList = computed(() => {
  return getDiffPosition(
    circleCoordinate.value,
    { width: 100, height: 100 },
    { width: radiusChildren.value * 2, height: radiusChildren.value * 2 },
    { x: 0, y: 5 }
  );
});
const getDiffPosition = (
  originList: Point[],
  targetRect: { width: number; height: number },
  elementRect: { width: number; height: number },
  diffSize: { x: number; y: number } = { x: 0, y: 0 }
): ElementText[] => {
  const size = originList.length;
  const baseWidth = Math.floor(targetRect.width / 2);
  const baseHeight = Math.floor(targetRect.height / 2);
  const extraWidth = Math.floor(elementRect.width / 2);
  const extraHeight = Math.floor(elementRect.height / 2);
  const diffX = diffSize.x;
  const diffY = diffSize.y;
  let newArray: Point[] = [];
  const element: Omit<ElementText, "point"> = {
    style: {},
    value: "",
    class: "",
    placement: "top",
  };
  switch (size) {
    case 2:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        { x: -(baseWidth + diffX), y: extraHeight + diffY },
      ];
      break;
    case 3:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: diffY,
        },
      ];
      break;
    case 4:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: diffY,
        },
        {
          x: -(baseWidth + diffX),
          y: extraHeight + diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: diffY,
        },
      ];
      break;
    case 5:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: -(baseHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: -(baseHeight + diffY),
        },
      ];
      break;
    case 6:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: -(baseHeight * 2 + diffY),
        },
        {
          x: extraWidth + diffX,
          y: diffY,
        },
        {
          x: -(baseWidth + diffX),
          y: extraHeight + diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: -(baseHeight * 2 + diffY),
        },
      ];
      break;
    case 7:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: -(baseHeight * 2 + diffY),
        },
        {
          x: extraWidth + diffX,
          y: -(baseHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: -(baseHeight + diffY),
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: -(baseHeight * 2 + diffY),
        },
      ];
      break;
    case 8:
      newArray = [
        {
          x: -(baseWidth + diffX),
          y: -(baseHeight * 2 + extraHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: -(baseHeight * 2 + diffY),
        },
        {
          x: extraWidth + diffX,
          y: -(baseHeight + diffY),
        },
        {
          x: extraWidth + diffX,
          y: diffY,
        },
        {
          x: -(baseWidth + diffX),
          y: extraHeight + diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: diffY,
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: -(baseHeight + diffY),
        },
        {
          x: -(baseWidth * 2 + extraWidth + diffX),
          y: -(baseHeight * 2 + diffY),
        },
      ];
      break;
    default:
      newArray = new Array(size).fill({ x: 0, y: 0 });
  }
  // console.log(newArray);
  return newArray.map((diffPoint: Point, index: number) => {
    return {
      point: {
        x: diffPoint.x + originList[index].x,
        y: diffPoint.y + originList[index].y,
      },
      ...element,
    };
  });
};
// const element = ref({ value: "test", class: "" });
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

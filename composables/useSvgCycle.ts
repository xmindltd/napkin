import * as d3 from "d3";
import { ref } from "vue";
import type { ElementText, Point } from "./type";
import { EnumPlacement } from "./type";
import RenderSvgBase from "./base";

export class RenderSvgCycle extends RenderSvgBase {
  diffAngle = -90;
  gapAngle = 16;
  arrowLength = 10;
  data = ref({
    centerX: 200,
    centerY: 200,
    radius: 140,
    count: 8,
    radiusChildren: 25,
  });
  circleCoordinate = ref<Point[]>([]);
  pointAngleList = ref<number[]>([]);
  constructor() {
    super();
  }

  drawCircle(cx: number, cy: number, r: number, className: string, slot?: any) {
    if (!this.svg.value) return;
    const svg = this.svg.value;
    const group = svg.append("g").attr("transform", `translate(${cx}, ${cy})`); // 将 <g> 元素移到圆心
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .classed(className, true);
    if (slot) {
      const slotElement = d3.select(slot).node();
      group.node()?.appendChild(slotElement);
    }
  }

  drawArrow(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    largeArcFlag: number = 1,
    sweepFlag = 1
  ) {
    if (!this.svg.value) return;
    const svg = this.svg.value;
    const { radius } = this.data.value;
    const arrowPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
    svg
      .append("path")
      .attr("d", arrowPath)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .classed("arrow-path", true);
  }

  render() {
    if (!this.svg.value) return;
    if (this.svgContainer.value) {
      this.data.value.centerX = this.svgContainer.value.clientWidth / 2;
      this.data.value.centerY = this.svgContainer.value.clientHeight / 2;
    }
    const svg = this.svg.value;
    const { centerX, centerY, radius, count, radiusChildren } = toRefs(
      this.data.value
    );
    const arrowLength = this.arrowLength;
    const gapAngle = this.gapAngle;
    const diffAngle = this.diffAngle;
    this.destroy();
    const defs = svg.append("defs");
    const marker = defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("markerWidth", 6)
      .attr("markerHeight", 4)
      .attr("refX", 0)
      .attr("refY", 2)
      .attr("orient", "auto");

    marker
      .append("polygon")
      .attr("points", "0 0, 6 2, 0 4")
      .attr("fill", "black");
    this.drawCircle(centerX.value, centerY.value, radius.value, "main-round");
    const totalAngle = 360 / count.value; // 均分每一个角度
    const arrowAngle = totalAngle - 2 * gapAngle;
    const arrowAngleOffset = (arrowLength / (2 * Math.PI * radius.value)) * 360;
    this.circleCoordinate.value = [];
    for (let i = 0; i < count.value; i++) {
      const currentAngle = totalAngle * i + diffAngle; // 当前角度
      const arc = currentAngle * (Math.PI / 180); // 转化成弧度
      const newRound: Point = {
        x: centerX.value + Math.cos(arc) * radius.value,
        y: centerY.value + Math.sin(arc) * radius.value,
      };
      this.pointAngleList.value.push(currentAngle - diffAngle);
      this.circleCoordinate.value.push(newRound);
      const slotCenter = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      slotCenter.setAttribute("x", "0");
      slotCenter.setAttribute("y", "0");
      slotCenter.setAttribute("text-anchor", "middle");
      slotCenter.setAttribute("dominant-baseline", "central");
      slotCenter.textContent = "center";

      this.drawCircle(
        newRound.x,
        newRound.y,
        radiusChildren.value,
        "other-round",
        slotCenter
      );

      // 箭头长度占用的角度，计算方式：角度 = 箭头长度 / 圆周长度 * 360度
      const arrowStartAngle = currentAngle + gapAngle + 3 - arrowAngleOffset;
      const startX =
        centerX.value +
        radius.value * Math.cos((arrowStartAngle * Math.PI) / 180);
      const startY =
        centerY.value +
        radius.value * Math.sin((arrowStartAngle * Math.PI) / 180);

      const arrowEndAngle =
        currentAngle + arrowAngle + gapAngle - 1 - arrowAngleOffset;
      const endX =
        centerX.value +
        radius.value * Math.cos((arrowEndAngle * Math.PI) / 180);
      const endY =
        centerY.value +
        radius.value * Math.sin((arrowEndAngle * Math.PI) / 180);

      const largeArcFlag = arrowAngle > 180 ? 1 : 0;
      const sweepFlag = 1;
      this.drawArrow(startX, startY, endX, endY, largeArcFlag, sweepFlag);
    }
  }

  getDiffPosition(
    originList: Point[],
    targetRect: { width: number; height: number },
    elementRect: { width: number; height: number },
    diffSize: { x: number; y: number } = { x: 0, y: 0 },
    element: Omit<ElementText, "point"> = {
      style: {},
      value: "test",
      class: "",
      placement: "top",
    }
  ): ElementText[] {
    const size = originList.length;
    const baseWidth = Math.floor(targetRect.width / 2);
    const baseHeight = Math.floor(targetRect.height / 2);
    const extraWidth = Math.floor(elementRect.width / 2);
    const extraHeight = Math.floor(elementRect.height / 2);
    const diffX = diffSize.x;
    const diffY = diffSize.y;
    const pointAngleList = this.pointAngleList.value;
    let newArray: Point[] = [];
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
            y: -(baseHeight + diffY),
          },
          {
            x: -(baseWidth + diffX),
            y: extraHeight + diffY,
          },
          {
            x: -(baseWidth * 2 + extraWidth + diffX),
            y: -(baseHeight + diffY),
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
    return newArray.map((diffPoint: Point, index: number) => {
      const _this = this;
      const newElement = {
        ...element,
        value: `${pointAngleList[index]}-${index}`,
        placement: _this.getPlacement(pointAngleList[index]),
      };
      return {
        point: {
          x: diffPoint.x + originList[index].x,
          y: diffPoint.y + originList[index].y,
        },
        ...newElement,
      };
    });
  }

  getPlacement(angle: number): Placement {
    if (angle == 0) return EnumPlacement.Bottom;
    if (angle > 0 && angle < 45) return EnumPlacement.LeftStart;
    if (angle === 45 || angle === 60) return EnumPlacement.BottomStart;
    if (angle > 45 && angle < 90) return EnumPlacement.Left;
    if (angle === 90) return EnumPlacement.Left;
    if (angle > 90 && angle < 135) return EnumPlacement.TopStart;
    if (angle === 135) return EnumPlacement.TopStart;
    if (angle > 135 && angle < 180) return EnumPlacement.TopStart;
    if (angle === 180) return EnumPlacement.Top;
    if (angle > 180 && angle < 225) return EnumPlacement.TopEnd;
    if (angle === 225) return EnumPlacement.TopEnd;
    if (angle > 225 && angle < 270) return EnumPlacement.TopEnd;
    if (angle === 270) return EnumPlacement.Right;
    if (angle === 300) return EnumPlacement.BottomEnd;
    if (angle > 270 && angle < 315) return EnumPlacement.RightEnd;
    if (angle === 315) return EnumPlacement.BottomEnd;
    return EnumPlacement.Bottom;
  }
}

export const svgCycle = new RenderSvgCycle();

export function useSvgCycle() {
  return {
    data: svgCycle.data,
    render: svgCycle.render,
    getDiffPosition: svgCycle.getDiffPosition.bind(svgCycle),
    getPlacement: svgCycle.getPlacement,
    circleCoordinate: svgCycle.circleCoordinate,
  };
}

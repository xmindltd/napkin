import * as d3 from "d3";
import { ref } from "vue";

interface Point {
  x: number;
  y: number;
}

export function useSvgCycle() {
  const radius = ref(140);
  const radiusChildren = ref(25);
  const centerX = ref(300);
  const centerY = ref(300);
  const refDiv = ref<HTMLElement | string>("");
  const count = ref(3); // 默认绘制6个圆
  const diffAngle = -90;
  const gapAngle = 16;
  const arrowLength = 10;
  let circleCoordinate: Point[] = [];
  function drawArrow(
    svg: any,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    largeArcFlag: number = 1,
    sweepFlag = 1
  ) {
    const arrowPath = `M ${startX} ${startY} A ${radius.value} ${radius.value} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
    svg
      .append("path")
      .attr("d", arrowPath)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .classed("arrow-path", true);
  }

  function drawCircle(
    svg: any,
    cx: number,
    cy: number,
    r: number,
    className: string,
    slot?: any
  ) {
    const group = svg.append("g").attr("transform", `translate(${cx}, ${cy})`); // 将 <g> 元素移到圆心
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .classed(className, true);
    if (slot) {
      const slotElement = d3.select(slot).node();
      group.node().appendChild(slotElement);
    }
  }

  function render(div: HTMLElement | string, slot?: any) {
    d3.select(div).selectAll("*").remove();
    refDiv.value = div;
    const svgContainer = d3.select(div);

    const svg = svgContainer
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .classed("bg", true);

    // 添加 defs 和箭头形状
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
    drawCircle(svg, radius.value, radius.value, radius.value, "main-round");
    const totalAngle = 360 / count.value; // 均分每一个角度
    const arrowAngle = totalAngle - 2 * gapAngle;
    const arrowAngleOffset = (arrowLength / (2 * Math.PI * radius.value)) * 360;

    for (let i = 0; i < count.value; i++) {
      const currentAngle = totalAngle * i + diffAngle; // 当前角度
      const arc = currentAngle * (Math.PI / 180); // 转化成弧度
      const newRound: Point = {
        x: centerX.value + Math.cos(arc) * radius.value,
        y: centerY.value + Math.sin(arc) * radius.value,
      };
      circleCoordinate.push(newRound);
      const slotCenter = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      slotCenter.setAttribute("x", "0");
      slotCenter.setAttribute("y", "0");
      slotCenter.setAttribute("text-anchor", "middle");
      slotCenter.setAttribute("dominant-baseline", "central");
      slotCenter.textContent = "center";

      drawCircle(
        svg,
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
      drawArrow(svg, startX, startY, endX, endY, largeArcFlag, sweepFlag);
    }
  }
  watch([radius, radiusChildren, centerX, centerY, count], (newRadius) => {
    radius.value = +newRadius[0];
    radiusChildren.value = +newRadius[1];
    centerX.value = +newRadius[2];
    centerY.value = +newRadius[3];
    count.value = +newRadius[4];
    console.log("render");
    if (refDiv.value) {
      render(refDiv.value);
    }
  });
  return {
    radius,
    radiusChildren,
    centerX,
    centerY,
    count,
    render,
    circleCoordinate,
  };
}

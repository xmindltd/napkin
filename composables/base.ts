import * as d3 from "d3";
const renderSvgTasks: any[] = [];

export default class RenderSvgBase {
  svg = ref<d3.Selection<SVGSVGElement, unknown, null, undefined>>();
  svgContainer = ref<HTMLElement>();
  constructor() {
    renderSvgTasks.push(this);
  }

  init(svg: any, div: HTMLElement) {
    this.svg.value = svg;
    this.svgContainer.value = div;
  }

  destroy() {
    this.svg.value?.selectAll("*").remove();
  }
}

export const useRenderSvgFrame = (div: HTMLElement) => {
  const svgContainer = d3.select(div);
  const svg = svgContainer
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .classed("bg", true);

  renderSvgTasks.forEach((task) => task.init(svg, div));
  const execute = () => {
    renderSvgTasks.forEach((task) => task.render());
    requestAnimationFrame(execute);
  };
  execute();
};

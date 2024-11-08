import * as d3 from "d3";

export default class RenderSvgBase {
  svgContainer: HTMLElement | null = null;
  svg: d3.Selection<HTMLElement | null, unknown, null, undefined>;
  tasks: any[] = [];
  constructor(svgContainer: HTMLElement) {
    this.svgContainer = svgContainer;
    this.svg = this.getSvg();
  }

  // 获取 SVG 容器的 D3 选择
  public getSvg(): d3.Selection<HTMLElement | null, unknown, null, undefined> {
    this.svg = d3.select(this.svgContainer);
    return this.svg;
  }

  // 获取 SVG 容器的尺寸信息
  public getContainerRect(): DOMRect | undefined {
    return this.svgContainer?.getBoundingClientRect();
  }

  // 执行渲染操作
  public render() {
    this.destroy(); // 清空之前的内容
    this.tasks.forEach((task) => {
      task();
    });
  }

  // 销毁现有的 SVG 内容
  public destroy(): void {
    this.svg.selectAll("*").remove();
  }
}

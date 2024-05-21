export class Camera {
  width: number;
  height: number;
  x: number;
  y: number;

  constructor() {
    this.width = 750;
    this.height = 750;
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'lightblue';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
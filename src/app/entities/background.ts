import { Attributes } from "../types/attributes";

export class Background {
  gameWidth: number;
  gameHeight: number;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;

  constructor(gameAttributes: Pick<Attributes, "size" | "position">) {
    const gameWidth = gameAttributes.size.width;
    const gameHeight = gameAttributes.size.height;
    const { position } = gameAttributes;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = new Image();
    this.image.src = 'assets/img/background.png';

    this.x = position.x;
    this.y = position.y;
    this.width = 2400;  // Width of the background image
    this.height = 750;  // Height of the background image
    this.speed = 1;

    const context = document.createElement('canvas').getContext('2d');
    if (!context) {
      throw new Error('Could not create 2D rendering context.');
    }

    this.image.onload = () => {
      this.draw(context);  // Draw initially after loading image
    };
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    // context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }

  update(): void {
    // this.x -= this.speed;
    // if (this.x <= -this.width) {
    //   this.x = 0;
    // }
  }
  setPosition(x: number, y: number) {
    this.x = x;
    // this.y = y;
  }
}

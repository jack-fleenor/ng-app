import { Attributes } from "../types/attributes";
import { Entity } from "./entity";

export class Ground extends Entity {
  constructor(attributes: Attributes) {
    super({
      ...attributes,
    });
  }
  override draw(context: CanvasRenderingContext2D): void {
    const { position, size } = this.getAttributes();
    const img = document.createElement('img');
    document.body.appendChild(img);
    img.id = 'rock';
    img.src = 'assets/img/ground.png';
    img.style.display = 'none';
    context.drawImage((document.getElementById('rock') as HTMLImageElement), position.x, position.y, size.width, size.height);
  }
}

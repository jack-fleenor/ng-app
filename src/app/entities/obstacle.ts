import { Attributes } from "../types/attributes";
import { Entity } from "./entity";

export class Obstacle extends Entity {
  constructor(attributes: Attributes) {
    super({
      ...attributes,
    });
  }
  override draw(context: CanvasRenderingContext2D): void {
    const { position, size } = this.getAttributes();
    // context.fillRect(position.x, position.y, size.width, size.height);
    // const img = new Image();
    const img = document.createElement('img');
    document.body.appendChild(img);
    img.id = 'bug';
    img.src = 'assets/img/bug.png';
    img.style.display = 'none';
    context.drawImage((document.getElementById('bug') as HTMLImageElement), position.x, position.y, size.width, size.height);
  }
}

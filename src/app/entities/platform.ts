import { Attributes } from "../types/attributes";
import { Entity } from "./entity";

export class Platform extends Entity {
  constructor(attributes: Attributes) {
    super({
      ...attributes,
    });
  }
  override   draw(context: CanvasRenderingContext2D) {
    const { position, size, color } = this.attributes;
    // Fill the rectangle with the entity's color
    context.fillStyle = color;
    context.fillRect(position.x, position.y, size.width, size.height);

    // Set the outline color and draw the rectangle's outline
    context.lineWidth = 1;
    context.strokeRect(position.x, position.y, size.width, size.height);
  }

}
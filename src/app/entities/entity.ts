import { Attributes } from "../types/attributes";

export class Entity {
  attributes: Attributes;
  constructor(attributes: Attributes) {
    // Just making all the block the same.
    // Worry about custom sizes later.
    this.attributes = {
      ...attributes,
      size: {
        height: 50,
        width: 50
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const { position, size, color } = this.attributes;
    // Fill the rectangle with the entity's color
    context.fillStyle = color;
    context.fillRect(position.x, position.y, size.width, size.height);

    // Set the outline color and draw the rectangle's outline
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.strokeRect(position.x, position.y, size.width, size.height);
  }

  getAttributes() {
    return this.attributes;
  }

  setPosition(x: number, y: number) {
    this.attributes.position.x = x;
    this.attributes.position.y = y;
  }

  setSize(width: number, height: number) {
    this.attributes.size.width = width;
    this.attributes.size.height = height;
  }

  setColor(color: string) {
    this.attributes.color = color;
  }
}
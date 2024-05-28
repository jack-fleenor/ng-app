import { Attributes } from "../types/attributes";

export class Camera {
  constructor(public attributes: Attributes) {}
  public draw(context: CanvasRenderingContext2D) {
    const { position, size, color } = this.attributes;
    // Fill the rectangle with the entity's color
    // context.fillStyle = color;
    // context.fillRect(position.x, position.y, size.width, size.height);

    // Set the outline color and draw the rectangle's outline
    context.lineWidth = 1;
    context.strokeRect(position.x, position.y, 1600, 1600);
  }
  public setPosition(x: number, y: number): void {
    this.attributes.position.x = x;
    this.attributes.position.y = y;
  }
  public setSize(width: number, height: number): void {
    this.attributes.size.width = width;
    this.attributes.size.height = height;
  }
  public setAttributes(attributes: Attributes): void {
    this.attributes = attributes;
  }
  public getAttributes(): Attributes {
    return this.attributes;
  }
  public getPosition(): { x: number, y: number } {
    return { x: this.attributes.position.x, y: this.attributes.position.y };
  }
  public getSize(): { width: number, height: number } {
    return { width: this.attributes.size.width, height: this.attributes.size.height };
  }
}
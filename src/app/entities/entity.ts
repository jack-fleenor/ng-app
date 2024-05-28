import { Attributes } from "../types/attributes";

export class Entity {
  attributes: Attributes;
  id?: string;
  constructor(attributes: Attributes) {
    this.attributes = {
      ...attributes,
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const { position, size, color } = this.attributes;
    // Fill the rectangle with the entity's color
    // context.fillStyle = color;
    // context.fillRect(position.x, position.y, size.width, size.height);

    // Set the outline color and draw the rectangle's outline
    // context.lineWidth = 5;
    // context.strokeRect(position.x, position.y, size.width, size.height);
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
  collision(entity: any): boolean {
    const { position, size } = this.getAttributes();
    const { position: entityPosition, size: entitySize } =
      entity.getAttributes();

    return (
      position.x < entityPosition.x + entitySize.width &&
      position.x + size.width > entityPosition.x &&
      position.y < entityPosition.y + entitySize.height &&
      position.y + size.height > entityPosition.y
    );
  }
   isOnTopOf(entity: Entity): boolean {
    const { position, size } = this.getAttributes();
    const { position: entityPosition, size: entitySize } =
      entity.getAttributes();

    return (
      position.y  === entityPosition.y - entitySize.height &&
      position.x + 5 < entityPosition.x + entitySize.width &&
      position.x + size.width - 5 > entityPosition.x
    );
  }

   isHittingBottom(platformAttrs: Attributes): boolean {
    const { position, size } = this.getAttributes();
    return (
      position.y < platformAttrs.position.y + platformAttrs.size.height &&
      position.y + size.height >
        platformAttrs.position.y + platformAttrs.size.height &&
      position.x < platformAttrs.position.x + platformAttrs.size.width &&
      position.x + size.width > platformAttrs.position.x
    );
  }

   isLandingOnTop(platformAttrs: Attributes): boolean {
    const { position, size } = this.getAttributes();
    return (
      position.y + size.height > platformAttrs.position.y &&
      position.y + size.height <
        platformAttrs.position.y + platformAttrs.size.height &&
      position.x < platformAttrs.position.x + platformAttrs.size.width &&
      position.x + size.width > platformAttrs.position.x
    );
  }
  isBlocked(entity: Entity): boolean {
    const { position, size } = this.getAttributes();
    const { position: entityPosition, size: entitySize } =
      entity.getAttributes();

    return (
      position.y < entityPosition.y + entitySize.height &&
      position.y + size.height > entityPosition.y &&
      position.x < entityPosition.x + entitySize.width &&
      position.x + size.width > entityPosition.x
    );
  }
}
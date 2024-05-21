import { Attributes } from "../types/attributes";
import { Camera } from "./camera";
import { Entity } from "./entity";

export class Platform extends Entity {
  constructor(attributes: Attributes) {
    super({
      ...attributes,
      // position: { x: camera.x, y: window.innerHeight - (camera.y + 60) },
    });
  }
}
import { Camera } from "./camera";
import { Entity } from "./entity";

export class Obstacle extends Entity {
  constructor(camera: Camera, x: number, y: number, height: number, width: number, color: string) {
    super({
      position: { x: camera.x + 50 + x, y: window.innerHeight - (camera.y + 110) - y },
      size: { width, height },
      color
    });
  }
}

import { Attributes } from "../types/attributes";
import { Background } from "./background";
import { Entity } from "./entity";
import { Game } from "./game";
import { Ground } from "./ground";
import { Platform } from "./platform";
import { Player } from "./player";

export class Enemy extends Entity {
  override id: string;
  private speed: number = .5;
  base: number = 0;
  jumping: any;
  verticalVelocity: number = 0;
  // game: Game;
  constructor(attributes: Attributes, id: string, public game: Game) {
    super({
      ...attributes,
    });
    this.id = id;
    this.base = window.innerHeight - this.game.canvas.width + attributes.size.height
  }
  override draw(context: CanvasRenderingContext2D): void {
    const { position, size } = this.getAttributes();
    const img = document.createElement('img');
    document.body.appendChild(img);
    img.id = 'bug';
    img.src = 'assets/img/bug.png';
    img.style.display = 'none';
    if (position.x <= 0) {
      document.getElementById('bug')?.remove();
    } else {
      context.drawImage((document.getElementById('bug') as HTMLImageElement), position.x, position.y, size.width, size.height);
    }
  }
  
  update(): void {
    const { position } = this.getAttributes();
    let onPlatform = false;
    if (position.x > 0) {
      position.x -= this.speed;
    }
    if (position.x <= 0) {
      position.x = 800;
    }
    for(const entity of this.game.objects){
      if(entity instanceof Platform || entity instanceof Ground){
        if(this.isOnTopOf(entity)){
          onPlatform = true;
        }
      }
      if(!(entity instanceof Background) && this.isBlocked(entity) && !(entity instanceof Player)){
        const touching = {
          left: entity.attributes.position.x > position.x,
          right: entity.attributes.position.x < position.x,
        }
        switch (true) {
          case touching.left:
            position.x = entity.attributes.position.x + entity.attributes.size.width;
            break;
          case touching.right:
            position.x = entity.attributes.size.width + entity.attributes.position.x;
            break;
          default:
            break;
        }
      }
    }
    if (!onPlatform && position.y < this.base && !this.jumping) {
      this.jumping = true;
      this.verticalVelocity = 1;
    }
    if (this.jumping) {
      this.jump();
    }
  }
  private jump() {
    const { position, size } = this.getAttributes();
    position.y += this.verticalVelocity;
    this.verticalVelocity += .5;

    // Check for collision with ground
    if (position.y >= this.base) {
      position.y = this.base;
      this.jumping = false;
      this.verticalVelocity = 0;
    }

    // Check for collision with platforms
    for (const entity of this.game.objects) {
      if (
        (entity instanceof Platform || entity instanceof Ground) &&
        this.collision(entity)
      ) {
        const platformAttrs = entity.getAttributes();
        // If hitting the bottom of the platform, bounce off
        if (this.isHittingBottom(platformAttrs)) {
          position.y = platformAttrs.position.y + platformAttrs.size.height;
          this.verticalVelocity = 1; // Make the player bounce downwards
        }
        // If landing on top of the platform
        else if (this.isLandingOnTop(platformAttrs)) {
          position.y = platformAttrs.position.y - size.height;
          this.jumping = false;
          this.verticalVelocity = 0;
        } else {
          // If hitting the side of the platform
          if (position.x < platformAttrs.position.x) {
            position.x = platformAttrs.position.x + size.width;
          } else {
            position.x = platformAttrs.position.x + platformAttrs.size.width;
          }
        }
      }
    }
  }

  getID(): string {
    return this.id;
  }
  override getAttributes(): Attributes {
    return this.attributes;
  }

}

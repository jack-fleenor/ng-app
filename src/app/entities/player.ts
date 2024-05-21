import { Attributes } from '../types/attributes';
import { Camera } from './camera';
import { Entity } from './entity';
import { Game } from './game';
import { Ground } from './ground';
import { Obstacle } from './obstacle';
import { Platform } from './platform';

export class Player extends Entity {
  private jumping: boolean = false;
  private verticalVelocity: number = 0;
  private speed: number = 5;
  private base: number = 0;

  constructor(private game: Game, attributes: Attributes) {
    super({
      ...attributes,
      position: {
        x: attributes.position.x + attributes.size.width,
        y: attributes.position.y - attributes.size.height,
      },
    });
    this.base = window.innerHeight - this.game.camera.y + attributes.size.height
  }

  update() {
    const { position } = this.getAttributes();
    if (this.game.keys.get('ArrowLeft')) position.x -= this.speed;
    if (this.game.keys.get('ArrowRight')) position.x += this.speed;

    // console.log('update')
    // Check if player is standing on a platform
    let onPlatform = false;
    for (const entity of this.game.objects) {
      if (
        (entity instanceof Platform || entity instanceof Ground) &&
        this.isOnTopOf(entity)
      ) {
        onPlatform = true;
        break;
      }
      if (
        entity instanceof Obstacle &&
        this.isLandingOnTop(entity.getAttributes())
      ) {
        this.game.objects = this.game.objects.filter((obj) => obj !== entity);
        break;
      }
      if (
        entity instanceof Obstacle &&
        this.collision(entity) &&
        !this.isOnTopOf(entity)
      ) {
        console.log('hit')
        // this.game.pause = true;
        window.location.reload();
        break;
      }
    }

    if (!onPlatform && position.y < this.base && !this.jumping) {
      this.jumping = true;
      this.verticalVelocity = 1;
    }

    if (this.game.keys.get('Enter') && !this.jumping) {
      this.jumping = true;
      this.verticalVelocity = -20;
    }
    if (this.jumping) {
      this.jump();
    }
  }

  private jump() {
    const { position, size } = this.getAttributes();
    position.y += this.verticalVelocity;
    this.verticalVelocity += 1;

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
        }
      }
    }
  }

  private isOnTopOf(entity: Entity): boolean {
    const { position, size } = this.getAttributes();
    const { position: entityPosition, size: entitySize } =
      entity.getAttributes();

    return (
      position.y + size.height === entityPosition.y &&
      position.x < entityPosition.x + entitySize.width &&
      position.x + size.width > entityPosition.x
    );
  }

  private isHittingBottom(platformAttrs: Attributes): boolean {
    const { position, size } = this.getAttributes();
    return (
      position.y < platformAttrs.position.y + platformAttrs.size.height &&
      position.y + size.height >
        platformAttrs.position.y + platformAttrs.size.height &&
      position.x < platformAttrs.position.x + platformAttrs.size.width &&
      position.x + size.width > platformAttrs.position.x
    );
  }

  private isLandingOnTop(platformAttrs: Attributes): boolean {
    const { position, size } = this.getAttributes();
    return (
      position.y + size.height > platformAttrs.position.y &&
      position.y + size.height <
        platformAttrs.position.y + platformAttrs.size.height &&
      position.x < platformAttrs.position.x + platformAttrs.size.width &&
      position.x + size.width > platformAttrs.position.x
    );
  }

  collision(entity: Entity): boolean {
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
}

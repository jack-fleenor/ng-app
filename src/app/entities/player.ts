import { Attributes } from '../types/attributes';
import { Enemy } from './enemy';
import { Entity } from './entity';
import { Game } from './game';
import { Ground } from './ground';
import { Obstacle } from './obstacle';
import { Platform } from './platform';

export class Player extends Entity {
  private jumping: boolean = false;
  private verticalVelocity: number = 0;
  private speed: number = 3;
  private base: number = 0;
  private health: number = 100;
  private score: number = 0;
  constructor(private game: Game, attributes: Attributes) {
    super(attributes);
    this.base = window.innerHeight - this.game.canvas.width + attributes.size.height
  }
  override draw(context: CanvasRenderingContext2D): void {
    const { position, size } = this.getAttributes();
    const img = document.createElement('img');
    document.body.appendChild(img);
    img.id = 'player';
    img.src = 'assets/img/wubby.png';
    img.style.display = 'none';
    context.drawImage((document.getElementById('player') as HTMLImageElement), position.x, position.y, size.width, size.height);
  }
  update() {
    const { position, size } = this.getAttributes();
    if (this.game.keys.get('ArrowLeft')) position.x -= this.speed;
    if (this.game.keys.get('ArrowRight')) position.x += this.speed;
    
    // Check if player is standing on a platform
    let onPlatform = false;
    for (const entity of this.game.objects) {
      if (
        (entity instanceof Platform || entity instanceof Ground) &&
        this.isOnTopOf(entity)
      ) {
        onPlatform = true;
      }
      if(entity instanceof Platform || entity instanceof Ground || entity instanceof Obstacle){
        if(this.collision(entity)){
          const touching = {
            left: entity.attributes.position.x > size.width,
            right: entity.attributes.position.x < size.width,
          }
          switch (true) {
            case touching.left:
              position.x -= 15;
              break;
            case touching.right:
              position.x += entity.attributes.size.width + entity.attributes.position.x + 15;
              break;
            default:
              break;
          }
        }
      }
      if (
        entity instanceof Enemy &&
        this.isLandingOnTop(entity.getAttributes())
      ) {
        this.game.objects = this.game.objects.filter((obj) => (obj instanceof Enemy) ? obj.id !== entity.id :  obj);
        this.score += 10;
        return;
      }
      if (
        entity instanceof Enemy &&
        this.collision(entity)
      ) {
        this.health -= 10;
        const touching = {
          top: entity.attributes.position.y < size.height,
          bottom: entity.attributes.position.y > size.height,
          left: entity.attributes.position.x < size.width,
          right: entity.attributes.position.x > size.width,
        } 
        switch (true) {
          case touching.left:
            position.x += 10;
            break;
          case touching.right:
            position.x -= 10;
            break;
          default:
            break;
        }
        return;
      }
    }

    if (!onPlatform && position.y < this.base && !this.jumping) {
      this.jumping = true;
      this.verticalVelocity = 1;
    }

    if (this.game.keys.get('Enter') && !this.jumping) {
      this.jumping = true;
      this.verticalVelocity = -13;
    }
    if (this.jumping) {
      this.jump();
    }
  }

  public getHealth(){
    return this.health;
  }
  public getScore(){
    return this.score;
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



}

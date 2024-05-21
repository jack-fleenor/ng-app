import { Attributes } from '../types/attributes';
import { Camera } from './camera';
import { Entity } from './entity';
import { Ground } from './ground';
import { Obstacle } from './obstacle';
import { Platform } from './platform';
import { Player } from './player';

export class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  camera: Camera;
  player: Player | null = null;
  objects: Array<Entity> = [];
  keys: Map<string, boolean> = new Map();
  pause: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.camera = new Camera();
    
    this.player = new Player(this, {
      position: {
        x: this.camera.x + 50, // 50 is the Ground. Bad.
        y: window.innerHeight - (this.camera.y + 50),
      },
      size: {
        height: 50,
        width: 50,
      },
      color: 'red',
    });

    for(let index = 0; index < 15; index++){
      this.objects.push(new Ground({
        color: 'green',
        position: {
          x: this.camera.x + ( 50 * index + 1 ),
          y: this.camera.y + 700
        },
        size: {
          height: 50,
          width: 50
        }
      }))
    }
    this.objects.push(new Obstacle(this.camera, 0, 160, 50, 50, 'black'));

    for(let index = 4; index < 7; index++){
      this.objects.push(new Platform({
        color: 'blue',
        position: {
          x: this.camera.x + ( 50 * index + 1 ),
          y: this.camera.y + 550
        },
        size: {
          height: 50,
          width: 50
        }
      }))
    }
    for(let index = 7; index < 8; index++){
      this.objects.push(new Platform({
        color: 'blue',
        position: {
          x: this.camera.x + ( 50 * index + 1 ),
          y: this.camera.y + 450
        },
        size: {
          height: 50,
          width: 50
        }
      }))
    }
    this.objects.push(this.player)

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.pause = !this.pause;
      }
      this.keys.set(event.key, true);
    });

    window.addEventListener('keyup', (event) => {
      this.keys.set(event.key, false);
    });
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera.draw(this.context);
    if (!this.pause && this.player) {
      this.objects.forEach((obj) => obj.draw(this.context));
      this.player.update();
    }
  }
}

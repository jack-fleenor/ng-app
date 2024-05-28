import { Background } from './background';
import { Enemy } from './enemy';
import { Entity } from './entity';
import { Ground } from './ground';
import { Platform } from './platform';
import { Player } from './player';
import { v4 as uuidv4 } from 'uuid';

export class Game {
  context: CanvasRenderingContext2D;
  player: Player | null = null;
  objects: Array<Entity | Background> = [];
  keys: Map<string, boolean> = new Map();
  pause: boolean = false;
  background: Background;
  gameOver: boolean = false;
  gameMap: Array<Array<string>> = [ // 8 x 16 ( + 2 )
    ['','','','','','','','','','','','','','','','','',''],
    ['','','','','','','','','','','','','','','','','',''],
    ['','','','','','','','','','','','','','','','','',''],
    ['','','','','','','','','','','','','','','','','',''],
    ['','','','','','','','','','','','','','','','','',''],
    ['','','','','','','','','','','','','','','','','',''],
    ['P','','','','','','','','','','','','','','','','',''],
    ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','p','p'],
  ];

  constructor(public canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
    this.background = new Background({
      size: {
        height: this.canvas.height,
        width: this.canvas.width,
      },
      position: {
        x: 0,
        y: 0,
      }
    });
    this.objects.push(this.background);

   this.gameMap.forEach((row, i) => {
      row.forEach((cell, j) => {
        if(cell === 'P'){
          this.player = new Player(this, {
            position: {
              x: j * 50,
              y: i * 50
            },
            size: {
              height: 50,
              width: 50,
            },
            color: 'orange',
          });
          this.objects.push(this.player);
        }
        if (cell === 'E') {
          this.objects.push(new Enemy({
            position: {
              x: j * 50,
              y: i * 50
            },
            size: {
              height: 50,
              width: 50,
            },
            color: 'orange',
          }, uuidv4(), this)); 
        }
        if(cell === 'g'){
          this.objects.push(new Ground({
            position: {
              x: j * 50,
              y: i * 50
            },
            size: {
              height: 50,
              width: 50,
            },
            color: 'green',
          }));
        }
        if(cell === 'p'){
          this.objects.push(new Platform({
            position: {
              x: j * 50,
              y: i * 50
            },
            size: {
              height: 50,
              width: 50,
            },
            color: 'green',
          }));
        }
      });
    });



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
    if(this.gameOver || this.pause){
      if(this.gameOver){
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Set the outline color and draw the rectangle's outline
        // this.context.lineWidth = 5;
        // this.context.strokeRect(0, 800, this.canvas.width, this.canvas.height);
        this.context.font = '48px serif';
        this.context.fillStyle = 'red';
        this.context.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2);
        return
      }
      this.context.font = '48px serif';
      this.context.fillText('Paused', this.canvas.width / 2 - 100, this.canvas.height / 2);
      return
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.camera.draw(this.context);
      if(this.player){
        if(this.player.getHealth() <= 0){
          this.gameOver = true;
          
            this.context.fillStyle = 'red';
            this.context.fillRect(0, 800, this.canvas.width, this.canvas.height);
            // Set the outline color and draw the rectangle's outline
            this.context.lineWidth = 5;
            this.context.strokeRect(0, 800, this.canvas.width, this.canvas.height);
            // this.context.font = '48px serif';
            // this.context.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2);
        }
      }
      this.objects.forEach((obj) => {
        if ('update' in obj) {
          obj.update();
          if(obj instanceof Background){
            obj.setPosition(-this.player!.attributes.position.x, -this.player!.attributes.position.y + this.canvas.height - 100);
          }
        }
      });
      if(this.objects.reduce((a, v) => v instanceof Enemy ? a + 1 : a, 0) < 1){
        this.objects.push(new Enemy(
          {
            position: {
              x: this.canvas.width,
              y: 700,
            },
            size: {
              height: 50,
              width: 50,
            },
            color: 'red',
          }, uuidv4(), this));
      }
      this.objects.forEach(obj => obj.draw(this.context));
    } 
}

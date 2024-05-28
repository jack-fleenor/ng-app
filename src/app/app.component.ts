import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Game } from './entities/game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false })
  canvas!: HTMLCanvasElement;
  game!: Game;

  onInit() {
    this.game = new Game(this.canvas);
  }

  ngAfterViewInit(): void {
    this.startGame();
  }

  startGame() {
    if (!document.querySelector('canvas')) console.log('Canvas not found,');
    this.canvas = (document.querySelector('canvas') as HTMLCanvasElement);
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.game = new Game(this.canvas);

    const animate = () =>{
      this.game.render();
      requestAnimationFrame(animate);
    }
    animate();
  };
  
  restart() {
    this.game = new Game(this.canvas);
    const animate = () => this.game.render();
    animate();
  }

  pause() {
    this.game.pause = !this.game.pause;
  }

}


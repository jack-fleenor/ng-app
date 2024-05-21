import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('canvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  game!: Game;

  ngAfterViewInit(): void {
    this.startGame();
  }

  startGame() {
    window.addEventListener('load', () => {
      const canvas = document.querySelector('canvas')!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // console.log(canvas)
      const game = new Game(canvas);
      
      function animate(){
        game.render();
        requestAnimationFrame(animate);
      }
      animate();
  });
}
}


import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- ADD THIS IMPORT

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], // <-- ADD RouterOutlet HERE
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
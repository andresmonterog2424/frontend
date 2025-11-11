import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  user: { role: string } | null = null;

  // Mensaje dinámico
  welcomeMessage(): string {
    return this.isAuthenticated()
      ? `Bienvenido, ${this.getRole().toUpperCase()}`
      : 'Por favor, inicia sesión para continuar.';
  }

  // Simula autenticación
  isAuthenticated(): boolean {
    return this.user !== null;
  }

  // Devuelve el rol actual
  getRole(): string {
    return this.user ? this.user.role : '';
  }

  // Cierra sesión
  logout(): void {
    this.user = null;
  }
}


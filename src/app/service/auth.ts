import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface User {
  username: string;
  role: 'admin' | 'student';
}

interface LoginResponse {
  success: boolean;
  user: User | null;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
      <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm transition-all duration-300">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Inicia Sesión
        </h2>
        @if (currentUser()) {
          <div class="text-center p-6 bg-green-50 border-t-4 border-green-500 rounded-lg">
            <p class="text-lg font-semibold text-green-700">
              ¡Bienvenido, {{ currentUser()!.username }}!
            </p>
            <p class="text-sm text-gray-600 mt-2">
              Tu rol es: <span class="font-bold capitalize">{{ currentUser()!.role }}</span>.
            </p>
            <button 
              (click)="onLogout()"
              class="w-full mt-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 ease-in-out shadow-md"
            >
              Cerrar Sesión
            </button>
          </div>
        }
        @if (!currentUser()) {
          <form (ngSubmit)="onLogin()" class="space-y-4">
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1">Usuario:</label>
              <input 
                type="text" 
                [(ngModel)]="username" 
                name="username"
                placeholder="Ej: admin o student"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password"
                placeholder="Contraseña"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
            
            <button type="submit" [disabled]="loading()"
              class="w-full py-3 text-white font-semibold rounded-lg transition duration-150 ease-in-out shadow-lg"
              [ngClass]="{
                'bg-blue-600 hover:bg-blue-700': !loading(),
                'bg-blue-400 cursor-not-allowed': loading()
              }"
            >
              @if (loading()) {
                Cargando...
              } @else {
                Ingresar
              }
            </button>
          </form>
          @if (error()) {
            <div class="text-red-600 bg-red-100 p-3 rounded-lg mt-5 text-center text-sm font-medium border border-red-300">
              {{ error() }}
            </div>
          }
        }
        <div class="mt-8 p-4 bg-gray-50 border-l-4 border-gray-300 rounded-lg text-sm text-gray-600">
          <h3 class="text-base font-semibold text-gray-800 mb-2">Usuarios de Prueba:</h3>
          <p class="mb-1">
            <span class="font-bold text-gray-700">Admin:</span> admin / admin123
          </p>
          <p>
            <span class="font-bold text-gray-700">Estudiante:</span> student / student123
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class App {
  username = '';
  password = '';

  loading = signal(false);
  error = signal('');
  currentUser = signal<User | null>(null);
  private mockLogin(username: string, password: string): Promise<LoginResponse> {
    this.error.set('');
    return new Promise(resolve => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          resolve({ 
            success: true, 
            user: { username: 'Admin', role: 'admin' }, 
            message: 'Login successful' 
          });
        } else if (username === 'student' && password === 'student123') {
          resolve({ 
            success: true, 
            user: { username: 'Estudiante', role: 'student' }, 
            message: 'Login successful' 
          });
        } else {
          resolve({ 
            success: false, 
            user: null, 
            message: 'Credenciales inválidas' 
          });
        }
      }, 1000); 
    });
  }
  async onLogin() {
    if (!this.username || !this.password) {
      this.error.set('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    this.loading.set(true);

    try {
      const response = await this.mockLogin(this.username, this.password);
      
      if (response.success && response.user) {
        this.currentUser.set(response.user);
        this.username = '';
        this.password = '';
      } else {
        this.error.set(response.message);
      }
    } catch (e) {
      this.error.set('Error de conexión con el servidor. Inténtalo de nuevo.');
    } finally {
      this.loading.set(false);
    }
  }
  onLogout() {
    this.currentUser.set(null);
    this.error.set('Sesión cerrada correctamente.');
  }
}
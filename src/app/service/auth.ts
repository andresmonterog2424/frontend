import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Definición de la respuesta del login
interface LoginResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Señal para el usuario autenticado
  private currentUserSig = signal<null>(null);

  // Señal calculada para saber si el usuario está logueado
  isLoggedIn = computed(() => !!this.currentUserSig());
  
  // Exponer el usuario actual como un valor de solo lectura (computed)
  currentUser = computed(() => this.currentUserSig());

  // Usuarios de prueba
  private readonly TEST_USERS = {
    'admin': { id: 1, username: 'admin', role: 'admin', firstName: 'Super', lastName: 'Admin' },
    'student': { id: 2, username: 'student', role: 'student', firstName: 'Juan', lastName: 'Pérez' }
  };

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }
  login(username: string, password: string): Observable<LoginResponse> {
    return of({ username, password }).pipe(
      delay(1500), 
      tap(() => {
        if (username === 'admin' && password === 'admin123') {
          return { success: true, user: this.TEST_USERS['admin'] };
        } else if (username === 'student' && password === 'student123') {
          return { success: true, user: this.TEST_USERS['student'] };
        } else {
          throw { success: false, message: 'Usuario o contraseña incorrectos' };
        }
      }),
      (value: any) => {
        if (value.success === false) {
          return throwError(() => new Error(value.message));
        }
        return of({ success: true, user: this.TEST_USERS});
      }
    ) as Observable<LoginResponse>;
  }
  setUser(): void {
    this.currentUserSig();
  }

  /**
   * Carga el usuario desde el localStorage al iniciar el servicio.
   */
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSig.set(user);
        if (this.router.url.includes('/login') || this.router.url === '/') {
          this.router.navigate(['/dashboard']);
        }
      } catch (e) {
        console.error('Error parsing user from storage', e);
        localStorage.removeItem('currentUser');
      }
    }
  }
  logout(): void {
    this.currentUserSig.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { User } from '../interface/user.interface'; // Importar la interfaz

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // URL de tu backend (¡Recuerda cambiar a la URL de Render cuando despliegues!)
  private readonly apiUrl = 'http://localhost:3000/api/auth'; 

  // --- GESTIÓN DE ESTADO CON SIGNALS ---
  
  // Signal para almacenar el usuario logeado. Null si no hay sesión.
  public currentUser = signal<User | null>(this.loadUserFromStorage());
  
  // Computed Signal para saber si el usuario está logeado.
  public isLogged = computed(() => !!this.currentUser());
  
  // Computed Signal para verificar si el usuario es Administrador.
  public isAdmin = computed(() => this.currentUser()?.role === 'Administrador');

  constructor() { }

  // --- LÓGICA DE ALMACENAMIENTO ---
  
  private saveUserToStorage(user: User): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
  
  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem('auth_user');
    return userJson ? JSON.parse(userJson) : null;
  }
  
  private removeUserFromStorage(): void {
    localStorage.removeItem('auth_user');
  }

  // --- PETICIONES HTTP ---

  login(credentials: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        // Actualizar el estado y persistir la sesión
        this.currentUser.set(user);
        this.saveUserToStorage(user);
        this.router.navigateByUrl('/books'); // Redirigir después del login
      }),
      catchError(error => {
        // Manejar errores de credenciales inválidas, etc.
        console.error('Error en el login:', error);
        // Retornamos un Observable para que el componente pueda manejar el error
        return new Observable<never>(subscriber => subscriber.error(error));
      })
    );
  }

  register(userData: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap(user => {
        // El flujo es similar al login después de un registro exitoso
        this.currentUser.set(user);
        this.saveUserToStorage(user);
        this.router.navigateByUrl('/books');
      })
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.removeUserFromStorage();
    this.router.navigateByUrl('/auth/login');
  }
}
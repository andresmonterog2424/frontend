import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  FormBuilder, 
  ReactiveFormsModule, 
  Validators, 
  FormGroup 
} from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importar módulos necesarios
  templateUrl: './login.html',
  styleUrl: './login.css' // Si usas SCSS
})
export class LoginComponent {
  
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  // Signal para gestionar el estado de carga y evitar múltiples envíos
  public isLoading = signal<boolean>(false); 
  // Signal para mostrar errores al usuario
  public errorMessage = signal<string | null>(null);

  // Definición del Formulario Reactivo
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]], // Obligatorio y formato email
    password: ['', [Validators.required, Validators.minLength(6)]] // Obligatorio y mínimo 6 caracteres
  });

  constructor() {
    // Si el usuario ya está logeado, podríamos redirigirlo automáticamente
    if (this.authService.isLogged()) {
      // El servicio ya redirige en el login, pero es buena práctica verificar
    }
  }

  /**
   * Método de ayuda para verificar si un campo es inválido y ha sido tocado/modificado.
   */
  isFieldInvalid(fieldName: string): boolean | undefined {
    const field = this.loginForm.get(fieldName);
    return field?.invalid && (field?.dirty || field?.touched);
  }

  /**
   * Procesa el formulario de login.
   */
  onSubmit(): void {
    this.errorMessage.set(null); // Limpiar errores anteriores

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marcar todos para mostrar errores
      this.errorMessage.set('Por favor, complete el formulario correctamente.');
      return;
    }

    this.isLoading.set(true); // Activar estado de carga
    
    // Desestructurar email y password del formulario
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        // Redirección manejada por el AuthService en el tap()
        this.isLoading.set(false);
      },
      error: (err) => {
        // Manejo de errores de la API (ej: Credenciales inválidas)
        this.isLoading.set(false);
        const apiMessage = err.error?.message || 'Credenciales inválidas o error de conexión.';
        this.errorMessage.set(apiMessage);
        this.loginForm.reset({ email: email, password: '' }); // Mantener el email, limpiar password
      }
    });
  }
}
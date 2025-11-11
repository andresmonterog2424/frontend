import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // 1. Verificar si el usuario está logeado usando la Signal computed
  if (authService.isLogged()) {
    return true; // Permitir el acceso
  }

  // 2. Si no está logeado, redirigir al login
  return router.createUrlTree(['/auth/login']);
};
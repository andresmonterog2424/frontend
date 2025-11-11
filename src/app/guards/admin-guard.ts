import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Verificar si el usuario es Administrador usando la Signal computed
  if (authService.isAdmin()) {
    return true; // Permitir el acceso
  }
  
  // 2. Si no es Admin, redirigir a una página de inicio o de error 403
  alert('Acceso denegado: Se requiere rol de Administrador.');
  return router.createUrlTree(['/books']); // Redirigir a la vista pública de libros
};
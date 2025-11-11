import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Ruta de Autenticación (Login/Register)
  // No protegida, los usuarios deben poder acceder
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // Rutas Públicas (Vista de Libros)
  {
    path: 'books',
    // Componente de listado de libros (público)
    // loadComponent: () => import('./books/book-list/book-list.component'), 
  },
  
  // Rutas Privadas para Estudiante
  {
    path: 'my-loans',
    canActivate: [authGuard], // Solo usuarios logeados
    // Componente para ver préstamos del estudiante
    // loadComponent: () => import('./loans/my-loans/my-loans.component'),
  },

  // Rutas Privadas para Administrador (CRUD de la gestión)
  // Usamos lazy loading para modularizar el panel de administración
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard], // Debe estar logeado Y ser Admin
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  
  // Rutas por defecto
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }, // Ruta comodín para 404
];
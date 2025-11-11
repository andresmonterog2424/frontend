import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { BookListComponent } from './books/book-list/book-list.component'; 
// 👇 ADD IMPORTS FOR OTHER COMPONENTS/MODULES HERE 👇
// import { MyLoansComponent } from './loans/my-loans/my-loans.component'; 
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
// etc.
// ... Imports above

export const routes: Routes = [
  // Ruta de Autenticación (Login/Register)
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // Rutas Públicas (Vista de Libros)
  {
    path: 'books',
    component: BookListComponent, 
  },
  
  // 👇 COMPLETE THE REST OF THE ROUTES 👇
  // Ruta de Administración (Protegida por authGuard Y adminGuard)
  {
    path: 'admin',
    // component: AdminDashboardComponent,
    // canActivate: [authGuard, adminGuard]
    // OR if it's a feature module:
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard, adminGuard]
  },
  
  // Rutas por defecto
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }, 
];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component ({
  selector: 'admin',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="admin-container">
        <div class="header">
            <h1>Panel de Administración de Biblioteca</h1>
            <div class="user-info">
                <span>Bienvenido, Bibliotecario name </span>
                <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
            </div>
        </div>
        
        <div class="content">
            <div class="card">
                <h2>Funciones del Bibliotecario</h2>
                <ul>
                    <li>**Gestionar Libros** (Añadir, Editar, Eliminar)</li>
                    <li>**Gestionar Usuarios** (Registrar, Modificar, Buscar)</li>
                    <li>**Registrar Préstamos y Devoluciones**</li>
                    <li>Ver **Reportes de Circulación**</li>
                    <li>**Administrar el Catálogo** (Clasificación, Etiquetas)</li>
                </ul>
            </div>
            
            <div class="card">
                <h2>Estadísticas Clave</h2>
                <div class="stats">
                    <div class="stat-item">
                        <h3>Libros Totales</h3>
                        <p>4500</p>
                    </div>
                    <div class="stat-item">
                        <h3>Libros Prestados Hoy</h3>
                        <p>45</p>
                    </div>
                    <div class="stat-item">
                        <h3>Usuarios Activos</h3>
                        <p>1250</p>
                    </div>
                    <div class="stat-item">
                        <h3>Nuevos Registros (Semana)</h3>
                        <p>12</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
   .admin-container {
      font-family: Arial, sans-serif;
      background-color: #f4f7f6;
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #007bff;
      color: white;
      padding: 15px 20px;
      border-radius: 8px 8px 0 0;
    }
    .logout-btn {
      background-color: #dc3545; 
      color: white;
      border: none;
      padding: 8px 15px;
      cursor: pointer;
      border-radius: 5px;
    }
    .content {
      display: flex;
      gap: 20px;
      padding: 20px 0;
    }
    .card {
      flex: 1;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .card h2 {
      color: #007bff;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .card ul {
      list-style: disc;
      padding-left: 20px;
    }
    .stats {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .stat-item {
      flex: 1;
      min-width: 150px;
      padding: 15px;
      background-color: #e9ecef; 
      border-radius: 5px;
      text-align: center;
    }
    .stat-item h3 {
      margin: 0 0 5px 0;
      color: #343a40;
      font-size: 1em;
    }
    .stat-item p {
      margin: 0;
      font-size: 1.8em;
      font-weight: bold;
      color: #007bff;
    }
  `]
})
export class AdminComponent { 
 constructor() {}

  logout() {
    console.log('Cerrar sesión presionado'); 
  }
}
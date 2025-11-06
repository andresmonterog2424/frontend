import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Loan {
    loanId: number;
    title: string;
    author: string;
    dueDate: Date;
    isRenewable: boolean;
}
export interface UserStatus {
    reservedBook: string | null;
    isReadyForPickup: boolean;
    finesAmount: number; 
}

@Component({
  selector: 'app-student-library-portal', 
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="library-container">
      <div class="header">
        <h1>Portal de Recursos Bibliotecarios (Estudiante)</h1>
        <div class="user-info">
          <span>Bienvenido, Estudiante </span>
          <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
        </div>
      </div>
      
      <div class="content">
        <div class="card">
          <h2>📚 Mis Préstamos Activos</h2>
          <div class="loan-list">
            
            <div class="loan-item" *ngFor="let loan of activeLoans">
              <h3>{{ loan.title }} <small>({{ loan.author }})</small></h3>
              <p>Fecha de Devolución: **{{ loan.dueDate | date:'dd/MM/yyyy' }}**</p>
              <p>ID Préstamo: #{{ loan.loanId }} 
                 <span [class.renewable]="loan.isRenewable" *ngIf="loan.isRenewable"> | Renovable</span>
              </p>
            </div>
            
            <div *ngIf="activeLoans.length === 0" class="no-loans">
                <p>¡No tienes préstamos activos!</p>
            </div>
          </div>
          <button class="action-btn" [disabled]="activeLoans.length === 0">Renovar Préstamos Seleccionados</button>
        </div>
        
        <div class="card">
          <h2>⭐ Reservas y Multas</h2>
          <ul>
            <li>
                **Libro Reservado:** <span *ngIf="userStatus.reservedBook">
                    {{ userStatus.reservedBook }} - 
                    <span [class.ready-pickup]="userStatus.isReadyForPickup">
                        {{ userStatus.isReadyForPickup ? 'Listo para recoger' : 'En cola' }}
                    </span>
                </span>
                <span *ngIf="!userStatus.reservedBook">
                    Ninguna reserva activa.
                </span>
            </li>
            <li>**Multas Pendientes:** <span [class.fine-amount]="userStatus.finesAmount > 0">
                    {{ userStatus.finesAmount | currency:'USD':'symbol':'1.2-2':'es' }}
                </span>
            </li>
            <li><a href="/history">Historial de Préstamos</a></li>
          </ul>
        </div>

        <div class="card large-card">
            <h2>🔎 Búsqueda Rápida de Recursos Académicos</h2>
            <input type="text" placeholder="Buscar título, autor, asignatura o ISBN..." class="search-input">
            <button class="search-btn">Buscar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .library-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .header {
      background-color: #007bff; 
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logout-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .logout-btn:hover {
        background-color: #c82333;
    }

    .content {
      padding: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .card:hover {
        transform: translateY(-3px);
    }
    
    .loan-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 15px;
    }
    
    .loan-item {
      padding: 1rem;
      background-color: #e9f5ff;
      border-radius: 4px;
      border-left: 5px solid #007bff;
    }
    
    .loan-item h3 {
      margin: 0 0 0.5rem 0;
      color: #0056b3;
      font-size: 1.1em;
    }
    
    .loan-item p {
      margin: 0;
      color: #666;
      font-size: 0.9em;
    }

    .action-btn, .search-btn {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        margin-top: 10px;
        transition: background-color 0.3s;
    }
    .action-btn:hover, .search-btn:hover {
        background-color: #1e7e34;
    }
    
    .search-input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .card.large-card {
        grid-column: 1 / -1;
    }

    .renewable {
        color: #28a745; 
        font-weight: bold;
    }

    .ready-pickup {
        color: #007bff;
        font-weight: bold;
    }

    .fine-amount {
        color: #dc3545; 
        font-weight: bold;
    }

    .no-loans {
        text-align: center;
        padding: 20px;
        border: 1px dashed #ccc;
        border-radius: 5px;
    }
  `]
})
export class StudentLibraryPortalComponent implements OnInit {
  activeLoans: Loan[] = [];
  userStatus: UserStatus = {
      reservedBook: null,
      isReadyForPickup: false,
      finesAmount: 0.00
  };

  constructor() {} 

  ngOnInit(): void {
    this.activeLoans = [
      {
        loanId: 8754,
        title: 'Cálculo Diferencial e Integral',
        author: 'Stewart',
        dueDate: new Date(2025, 11, 15), 
        isRenewable: true
      },
      {
        loanId: 8755,
        title: 'Historia de Chile: Siglo XX',
        author: 'Salazar',
        dueDate: new Date(2025, 11, 18), 
        isRenewable: false
      }
    ];
    this.userStatus = {
        reservedBook: 'Introducción a la Economía',
        isReadyForPickup: true,
        finesAmount: 5.50
    };
  }

  logout() {
    console.log('El estudiante ha cerrado sesión desde el portal de biblioteca.');
  }
}
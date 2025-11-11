import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../service/auth.service';
import { Book } from '../../interface/book.interface';
import { FormsModule } from '@angular/forms'; // Necesario para el campo de búsqueda

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookListComponent implements OnInit {
  
  // Inyección de dependencias
  private bookService = inject(BookService);
  public authService = inject(AuthService); // Lo hacemos público para usar isAdmin() en el HTML

  // Signals para el estado
  public books = signal<Book[]>([]);
  public isLoading = signal<boolean>(false);
  public errorLoading = signal<string | null>(null);
  
  // Model para el campo de búsqueda
  public searchKeyword: string = '';

  ngOnInit(): void {
    this.loadBooks();
  }
  
  /**
   * Carga la lista de libros desde el servicio, aplicando el filtro de búsqueda.
   */
  loadBooks(): void {
    this.isLoading.set(true);
    this.errorLoading.set(null);
    
    this.bookService.getBooks(this.searchKeyword).subscribe({
      next: (data) => {
        this.books.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
        this.errorLoading.set('No se pudieron cargar los libros. Inténtalo de nuevo más tarde.');
        this.isLoading.set(false);
        this.books.set([]); // Limpiar la lista
      }
    });
  }
  
  /**
   * Método para refrescar la lista. Usado al hacer clic en el botón de búsqueda o al borrar el input.
   */
  onSearch(): void {
    this.loadBooks();
  }
}
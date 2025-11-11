import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interface/book.interface';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  // URL de tu backend
  private readonly apiUrl = 'http://localhost:3000/api/books';

  constructor() { }

  /**
   * Genera los encabezados con el token de autorización (JWT).
   * Necesario para rutas protegidas.
   */
  private getAuthHeaders() {
    const token = this.authService.currentUser()?.token;
    return {
      Authorization: `Bearer ${token}`
    };
  }

  /**
   * Obtiene todos los libros. Permite la búsqueda por palabra clave (keyword).
   * @param keyword Palabra clave para buscar por título o autor.
   */
  getBooks(keyword: string = ''): Observable<Book[]> {
    let params = new HttpParams();
    
    if (keyword.trim()) {
      params = params.set('keyword', keyword.trim());
    }
    
    // Esta ruta es pública en el backend (GET /api/books), por lo que no requiere headers.
    return this.http.get<Book[]>(this.apiUrl, { params });
  }

  // --- MÉTODOS CRUD (Solo para Administrador) ---

  /**
   * Crea un nuevo libro (POST /api/books). Requiere rol de Administrador.
   */
  createBook(bookData: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, bookData, { 
      headers: this.getAuthHeaders() 
    });
  }

  /**
   * Actualiza un libro (PUT /api/books/:id). Requiere rol de Administrador.
   */
  updateBook(id: string, bookData: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, bookData, { 
      headers: this.getAuthHeaders() 
    });
  }

  /**
   * Elimina un libro (DELETE /api/books/:id). Requiere rol de Administrador.
   */
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }
} 
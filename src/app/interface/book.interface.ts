// src/app/interfaces/book.interface.ts

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  // Puedes añadir más campos si los incluiste en el modelo de Mongoose (Book.js)
}
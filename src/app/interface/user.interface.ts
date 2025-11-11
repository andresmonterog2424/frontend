// src/app/interfaces/user.interface.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Estudiante';
  token: string;
}
// // services/auth.ts
// import api from '../lib/api';

// interface LoginResponse {
//   token: string;
// }

// interface ErrorResponse {
//   message: string;
//   status?: number;
// }

// export const login = async (email: string, password: string): Promise<LoginResponse> => {
//   try {
//     const response = await api.post('/auth/login', {
//       email: email.trim().toLowerCase(),
//       password
//     });

//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       // Erro retornado pelo servidor
//       throw new Error(error.response.data.message || 'Credenciais inválidas');
//     } else if (error.request) {
//       // A requisição foi feita mas não houve resposta
//       throw new Error('Servidor não respondeu');
//     } else {
//       // Erro ao configurar a requisição
//       throw new Error('Erro ao configurar a requisição');
//     }
//   }
// };
// export const register = async (name: string, email: string, password: string): Promise<LoginResponse> => {
//   try {
//     const response = await api.post('/auth/register', {
//       name,
//       email: email.trim().toLowerCase(),
//       password 
//     });

//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       // Erro retornado pelo servidor
//       throw new Error(error);
//     } else if (error.request) {
//       // A requisição foi feita mas não houve resposta
//       throw new Error('Servidor não respondeu');
//     } else {
//       // Erro ao configurar a requisição
//       throw new Error('Erro ao configurar a requisição');
//     }
//   }
// };

// export const logout = async () => {
//   try {
//     localStorage.removeItem('token');
//     return "Sessão terminada!";
//   } catch (error: any) {
//     throw new Error('ao terminar a sessão');
//   }
// };
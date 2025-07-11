import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const storeApi = axios.create({
  baseURL: `${baseURL}/stores`,
  timeout: 10000,
});

interface StoreData {
  name: string;
  nif: string;
  email: string;
  phone: string;
  iban: string;
  commerce: string;
  province: string;
  address: string;
  owner: string;
  createdAt?: string;
}

interface StoreResponse {
  msg: string;
  store: {
    _id: string;
    name: string;
    nif: string;
    email: string;
    phone: string;
    iban: string;
    commerce: string;
    province: string;
    address: string;
    owner: string;
    createdAt: string;
  };
}

export const registerStore = async (
  storeData: StoreData,
  token: string
): Promise<StoreResponse> => {
  try {
    const response = await storeApi.post('/', storeData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(error.response.data.message || 'Dados inválidos');
        case 401:
          throw new Error('Acesso não autorizado');
        case 403:
          throw new Error('Apenas vendedores podem cadastrar lojas');
        case 404:
          throw new Error('Usuário não encontrado');
        case 409:
          throw new Error('Loja já cadastrada');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(error.response.data.message || 'Erro ao cadastrar loja');
      }
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Verifique sua conexão.');
    } else {
      throw new Error('Erro ao configurar a requisição');
    }
  }
};
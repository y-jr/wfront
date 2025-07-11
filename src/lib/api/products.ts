import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const productApi = axios.create({
    baseURL: `${baseURL}/products`,
    timeout: 10000,
});

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  storeId: string;
}

interface ProductsResponse {
  products: Product[];
  nHits: number;
}

export const fetchStoreProducts = async (token: string): Promise<ProductsResponse> => {
  try {
    const response = await productApi.get('/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('Acesso não autorizado');
        case 404:
          throw new Error('Loja não encontrada');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(error.response.data.message || 'Erro ao buscar produtos');
      }
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Verifique sua conexão.');
    } else {
      throw new Error('Erro ao configurar a requisição');
    }
  }
};

// src/lib/api/product.ts
export const createProduct = async (
  formData: FormData,
  token: string
): Promise<{
  msg: string;
  product: Product;
}> => {
  try {
    const response = await productApi.post('/', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(error.response.data.message || 'Dados inválidos ou imagem faltando');
        case 401:
          throw new Error('Acesso não autorizado');
        case 404:
          throw new Error('Loja não encontrada');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(error.response.data.message || 'Erro ao cadastrar produto');
      }
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Verifique sua conexão.');
    } else {
      throw new Error('Erro ao configurar a requisição');
    }
  }
};
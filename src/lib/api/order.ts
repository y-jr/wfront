import axios from 'axios';
import { promises } from 'dns';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const orderApi = axios.create({
    baseURL: `${baseURL}/orders`,
    timeout: 10000,
});
const checkOutApi = axios.create({
    baseURL: `${baseURL}/checkou`,
    timeout: 10000,
});

interface orderData {
    userId: number;
    sellerId: number;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: [{
        id: string;
        name: string;
        qtd: number;
        untprice: number
    }]
}

interface orderResponse {
    success: boolean;
    msg: string;
    orderId: string;
    clientSecret: string
    checkoutUrl: string
}

interface checkOutResponse {
    url: string
}

export const createOrder = async (
    orderdtata: orderData,
    token: string
): Promise<orderResponse> => {
    try {
        const response = await orderApi.post('/', orderdtata, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });


        if (!(response.status == 200)) {
            throw "Erro ao cria o pedido";
        }

        const orderId = response.data.orderId;

        const checkoutUrl = await checkout(orderId, token);

        response.data.checkoutUrl = checkoutUrl;
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
}

export const checkout = async (
    id: string,
    token: string
): Promise<checkOutResponse> => {

    const response = await checkOutApi.post('/', id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data


}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/Components/Header";
import { registerEmployee, registerSeller } from "@/lib/api/user";
import { StoreProvider, useStore } from "@/context/StoreContext";

interface Store {
    _id: string;
    name: string;
    // Adicione outros campos conforme necessário
}

interface FormData {
    name: string;
    bi: string;
    email: string;
    phone: string;
    address: string;
    store: string;
}

interface FormErrors {
    name?: string;
    bi?: string;
    email?: string;
    phone?: string;
    address?: string;
    store?: string;
    form?: string;
}


export default function EmployeeRegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        bi: '',
        email: '',
        phone: '',
        address: '',
        store: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [stores, setStores] = useState<Store[]>([]); // Tipo explícito adicionado aqui
    const { fetchStores } = useStore();
    const [errors, setErrors] = useState<FormErrors>({});

    // Buscar lojas do vendedor logado
    useEffect(() => {
        const loadStores = async () => {
            try {
                const userStores = await fetchStores();
                setStores(userStores);
                if (userStores.length > 0) {
                    setFormData(prev => ({ ...prev, store: userStores[0]._id }));
                }
            } catch (err) {
                setError('Erro ao carregar lojas');
            }
        };
        loadStores();
    }, [fetchStores]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.bi || !formData.phone) {
            setError('Preencha todos os campos obrigatórios');
            return false;
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            setError('Email inválido');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Sessão expirada. Faça login novamente.');

            const result = await registerEmployee(formData, token);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />


            {/* FORMULÁRIO */}
            <main className="flex items-center justify-center p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full max-w-4xl mt-10">
                    <h2 className="text-2xl font-bold text-[#24044c] text-center mb-6">Cadastrar novo funcionário</h2>

                    {errors && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                            {errors.form}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="p-3 bg-green-100 text-green-700 rounded-md">
                                Funcionário cadastrado com sucesso! Um email com os dados de acesso foi enviado.
                            </div>
                            <button
                                onClick={() => setSuccess(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Cadastrar Outro Funcionário
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome */}
                            <div>
                                <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">Nome completo</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>


                            {/* BI */}
                            <div>
                                <label htmlFor="bi" className="block mb-1 text-gray-700 font-medium">BI/Identificação</label>
                                <input
                                    id="bi"
                                    type="text"
                                    name="bi"
                                    value={formData.bi}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.bi ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.bi && <p className="text-red-500 text-sm mt-1">{errors.bi}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Telefone */}
                            <div>
                                <label htmlFor="phone" className="block mb-1 text-gray-700 font-medium">Senha</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            {/* Endereço */}
                            <div>
                                <label htmlFor="address" className="block mb-1 text-gray-700 font-medium">Endereço:</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            {stores.length > 0 && (
                                <div>
                                    <label htmlFor="stor" className="block mb-1 text-gray-700 font-medium">Loja:</label>
                                    <select
                                        id="store"
                                        name="store"
                                        value={formData.store}
                                        onChange={handleChange}
                                        required
                                        className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        {stores.map(store => (
                                            <option key={store._id} value={store._id}>
                                                {store.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                            )}

                            {/* Botão */}
                            <div className="md:col-span-2 flex justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-[#720cf2] hover:bg-[#5b09c2] text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Cadastrando...' : 'Cadastrar funcionário'}
                                </button>
                            </div>
                            {stores.length === 0 && (
                                <p className="text-red-500 text-sm">
                                    Você precisa ter pelo menos uma loja cadastrada para registrar funcionários.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}

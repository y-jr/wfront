'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/Components/Header';
import { createProduct } from '@/lib/api/products';

export default function NewProductPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        desc: '',
        category: '',
        colors: '',
        sizes: '',
        qty: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validações básicas
        if (!fileInputRef.current?.files?.[0]) {
            setError('Adicione uma imagem do produto');
            return;
        }

        if (!formData.name || !formData.price || !formData.qty) {
            setError('Preencha todos os campos obrigatórios');
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Sessão expirada. Faça login novamente.');

            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formData.price);
            data.append('desc', formData.desc);
            data.append('category', formData.category);
            data.append('colors', JSON.stringify(formData.colors.split(',').map(c => c.trim())));
            data.append('sizes', JSON.stringify(formData.sizes.split(',').map(s => s.trim())));
            data.append('qty', formData.qty);
            data.append('image', fileInputRef.current.files[0]);

            const result = await createProduct(data, token);
            setSuccess(true);

            // Redireciona após 2 segundos
            setTimeout(() => {
                router.push('/dashboard/products');
            }, 2000);
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
                    <h2 className="text-2xl font-bold text-[#24044c] text-center mb-6">Cadastrar Produto</h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                            Produto cadastrado com sucesso! Redirecionando...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Imagem do Produto */}
                            <div>
                                <label className="block mb-2 font-medium">Imagem do Produto*</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    required
                                    className="hidden"
                                    id="productImage"
                                />
                                <label
                                    htmlFor="productImage"
                                    className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#720cf2] transition-colors"
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Pré-visualização"
                                            className="mx-auto h-40 object-contain"
                                        />
                                    ) : (
                                        <div className="space-y-1">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-[#720cf2]">Clique para upload</span> ou arraste e solte
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF até 5MB</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {/* Nome do Produto */}
                            <div>
                                <label className="block mb-1 font-medium">Nome do Produto*</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                />
                            </div>

                            {/* Preço e Quantidade */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Preço (AOA)*</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Quantidade em Estoque*</label>
                                    <input
                                        type="number"
                                        name="qty"
                                        value={formData.qty}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Categoria */}
                            <div>
                                <label className="block mb-1 font-medium">Categoria</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="Roupas">Roupas</option>
                                    <option value="Calçados">Calçados</option>
                                    <option value="Eletrônicos">Eletrônicos</option>
                                    <option value="Alimentos">Alimentos</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>

                            {/* Cores e Tamanhos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Cores (separadas por vírgula)</label>
                                    <input
                                        type="text"
                                        name="colors"
                                        value={formData.colors}
                                        onChange={handleChange}
                                        placeholder="Ex: Vermelho, Azul, Preto"
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Tamanhos (separados por vírgula)</label>
                                    <input
                                        type="text"
                                        name="sizes"
                                        value={formData.sizes}
                                        onChange={handleChange}
                                        placeholder="Ex: P, M, G, GG"
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Descrição */}
                            <div>
                                <label className="block mb-1 font-medium">Descrição</label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#720cf2] focus:outline-none"
                                />
                            </div>

                            {/* Botões */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => router.push('/dashboard/products')}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-[#720cf2] text-white rounded-md hover:bg-[#5b09c2] transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Cadastrando...' : 'Cadastrar Produto'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // necessário para o header
import Header from "@/Components/Header";
import { registerSeller } from "@/lib/api/user";
import { registerStore } from "@/lib/api/store";
import { angolaProvinces } from "@/app/static/data";

interface FormData {
  name: string;
  nif: string;
  email: string;
  phone: string;
  iban: string;
  commerce: string;
  province: string;
  address: string;
}

export default function CreateStoreForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    nif: '',
    email: '',
    phone: '',
    iban: '',
    commerce: '',
    province: '',
    address: ''
  });

  const [alvaraFile, setAlvaraFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle para mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };




  // função para validar o formulário
  const validateForm = () => {
    const newErrors: any = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
      valid = false;
    } else if (formData.name.trim().length < 3 || formData.name.trim().length > 100) {
      newErrors.name = 'O nome deve ter entre 3 e 100 caracteres.';
      valid = false;
    }

    if (formData.nif.length !== 9) {
      newErrors.nif = 'NIF deve ter 9 dígitos';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Email inválido.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  // const validateForm = () => {
  //   if (!formData.name || !formData.nif || !formData.email || !formData.phone) {
  //     setError('Preencha todos os campos obrigatórios');
  //     return false;
  //   }
  //   if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
  //     setError('Email inválido');
  //     return false;
  //   }
  //   if (formData.nif.length !== 9) {
  //     setError('NIF deve ter 9 dígitos');
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Sessão expirada. Faça login novamente.');

      const userData = JSON.parse(localStorage.getItem('user') || '{}');

      const storeData = {
        ...formData,
        owner: userData.userId,
        createdAt: new Date().toISOString()
      };

      const result = await registerStore(storeData, token);
      setSuccess(true);

      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push('/dashboard/stores');
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
          <h2 className="text-2xl font-bold text-[#24044c] text-center mb-6">Cadastrar Loja</h2>

          {errors.form && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {errors.form}
            </div>
          )}

          {success ? (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Loja cadastrada com sucesso! Redirecionando...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">Nome da Loja</label>
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


              {/* NIF */}
              <div>
                <label htmlFor="nif" className="block mb-1 text-gray-700 font-medium">NIF</label>
                <input
                  id="nif"
                  type="text"
                  name="nif"
                  value={formData.nif}
                  onChange={handleChange}
                  maxLength={9}
                  minLength={9}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.nif ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nif && <p className="text-red-500 text-sm mt-1">{errors.nif}</p>}
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
                <label htmlFor="phone" className="block mb-1 text-gray-700 font-medium">Telefone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* IBAN */}
              <div>
                <label htmlFor="iban" className="block mb-1 text-gray-700 font-medium">IBAN</label>
                <input
                  id="iban"
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.iban ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.iban && <p className="text-red-500 text-sm mt-1">{errors.iban}</p>}
              </div>

              {/* Ramo de comércio */}
              <div>
                <label htmlFor="commerce" className="block mb-1 text-gray-700 font-medium">Ramo de comércio</label>
                <input
                  id="commerce"
                  type="text"
                  name="commerce"
                  value={formData.commerce}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.commerce ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.commerce && <p className="text-red-500 text-sm mt-1">{errors.commerce}</p>}
              </div>



              {/* Provícia */}
              <div>
                <label htmlFor="province" className="block mb-1 text-gray-700 font-medium">Senha</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">
                    Selecione uma provícia
                  </option>
                  {angolaProvinces.map(province => (
                    <option key={province.key} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
              </div>

              {/* Endereço */}
              <div>
                <label htmlFor="address" className="block mb-1 text-gray-700 font-medium">Endereço</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Botão */}
              <div className="md:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#720cf2] hover:bg-[#5b09c2] text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Cadastrando...' : 'Cadastrar Loja'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

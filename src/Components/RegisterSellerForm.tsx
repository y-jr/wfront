"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { registerBuyer, registerSeller } from '@/lib/api/user';

export default function RegisterSellerForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [alvaraFile, setAlvaraFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.password) {
      newErrors.name = 'A senha é obrigatória.';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.name = 'A senha não pode ter menosd de 6 caracteres.';
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

  const handleSubmit = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      if (alvaraFile) {
        data.append('alvara', alvaraFile);
      }

      const result = await registerSeller(data);
      setSuccess(true);
      console.log('Registration successful:', result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle para mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAlvaraFile(e.target.files[0]);
    }
  };
  return (
    <div className="flex min-h-screen bg-[#24044c]">
      {/* Imagem lado esquerdo */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Imagem de fundo"
          className="object-cover w-full h-full rounded-r-3xl"
        />
      </div>

      {/* Formulário lado direito */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative">

          {/* Logo por cima */}
          <div className="flex justify-center -mt-20 mb-6">
            <img
              src="/img/logo.png" // Substitua pelo caminho da sua logo
              alt="Logo"
              className="w-30 h-30 rounded-full shadow-md bg-white p-2 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-[#24044c] mb-6">
            Criar nova conta de vendedor
          </h2>

          {/* Mensagem de erro geral */}
          {errors.form && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="font-semibold">Erro:</p>
              <p>{errors.form}</p>
            </div>
          )}

          {success ? (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Cadastro realizado com sucesso!
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => validateForm()}
                  autoComplete="off"
                  required
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => validateForm()}
                  autoComplete="off"
                  required
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => validateForm()}
                  autoComplete="off"
                  required
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Alvará */}
              <div>
                <label htmlFor="alvara" className="block text-sm font-medium text-gray-700 mb-1">
                  Alvará de comerciante
                </label>
                <input
                  type="file"
                  id="alvara"
                  name="alvara"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  onBlur={() => validateForm()}
                  required
                  className={`w-full border ${errors.alvara ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
                />
                {errors.alvara && <p className="text-red-500 text-sm mt-1">{errors.alvara}</p>}
              </div>

              {/* Botão de cadastro */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#720cf2] hover:bg-[#5e0cc2] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>
          )}
          {/* Link para login */}
          <div className="mt-6 text-center text-[#720cf2] text-sm">
            <Link href="/pages/user/login" className="hover:underline">
              Já tem uma conta? Faça login
            </Link>
          </div>
          {/* Link para cadastrar usuário */}
          <div className="mt-6 text-center text-[#720cf2] text-sm">
            <Link href="/pages/user/register" className="hover:underline">
              Criar conta comprador
            </Link> 
          </div>
        </div>
      </div>
    </div>
  );
}

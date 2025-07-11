"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";
import { registerSeller } from "@/lib/api/user";

export default function CreateStoreForm() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />


      {/* FORMULÁRIO */}
      <main className="flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full max-w-4xl mt-10">
          <h2 className="text-2xl font-bold text-[#24044c] text-center mb-6">Cadastrar vendedor</h2>

          {errors.form && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {errors.form}
            </div>
          )}

          {success ? (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Cadastro realizado com sucesso!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">Nome do vendedor</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">Senha</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Alvará */}
              <div>
                <label htmlFor="alvara" className="block mb-1 text-gray-700 font-medium">Alvará de comerciante:</label>
                <input
                  id="alvara"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  required
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#b681f8] focus:outline-none transition-colors ${errors.alvara ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.alvara && <p className="text-red-500 text-sm mt-1">{errors.alvara}</p>}
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

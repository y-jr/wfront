"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { registerBuyer } from "@/lib/api/user";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    form: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", form: "" };

    if (!name.trim()) {
      newErrors.name = "O nome é obrigatório";
      valid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email inválido";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: "" })); // Limpa erros anteriores

    try {
      const { token, user } = await registerBuyer(name, email, password);
      localStorage.setItem("token", token);

      // Feedback visual antes do redirecionamento
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s de delay
      router.push("/");
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setIsLoading(false);
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
            Cadastrar-se como comprador
          </h2>

          {/* Mensagem de erro geral */}
          {errors.form && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="font-semibold">Erro:</p>
              <p>{errors.form}</p>
            </div>
          )}

          <form onSubmit={handleRegister} noValidate className="space-y-6">
            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateForm()}
                autoComplete="off"
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateForm()}
                autoComplete="off"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validateForm()}
                autoComplete="off"
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Botão de cadastro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#720cf2] hover:bg-[#5e0cc2] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center text-[#720cf2] text-sm">
            <Link href="/pages/user/login" className="hover:underline">
              Já tem uma conta? Faça login
            </Link>
          </div>
          {/* Link para vendedor */}
          <div className="mt-6 text-center text-[#720cf2] text-sm">
            <Link href="/pages/user/registerseller" className="hover:underline">
              Criar conta vendedor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

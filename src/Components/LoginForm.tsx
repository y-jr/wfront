"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/api/user";

export default function LoginForm() {
  
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    router.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", form: "" };

    if (!email) {
      newErrors.email = "Email é obrigatório";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setErrors({ ...errors, form: "" });

    if (!validateForm()) {
      setErrors((prev) => ({ ...prev, form: "Por favor, corrija os erros no formulário" }));
      return;
    }

    setIsLoading(true);
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, form: err.message || "Erro durante o login" }));
      console.error("Erro no login:", err);
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

          {/* Imagem da Logo */}
          <div className="flex justify-center -mt-20 mb-6">
            <img
              src="/img/logo.png" // <-- aqui você troca pelo caminho da sua logo
              alt="Logo"
              className="w-30 h-30 rounded-full shadow-md bg-white p-2 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-[#24044c] mb-6">
            Bem-vindo de volta
          </h2>

          {errors.form && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="font-semibold">Erro:</p>
              <p>{errors.form}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-[#720cf2] focus:border-[#720cf2]"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Lembrar de mim */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-[#720cf2] rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="w-full bg-[#720cf2] hover:bg-[#5e0cc2] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Cadastro */}
          <div className="mt-6 text-center text-[#720cf2] text-sm">
            <Link href="/pages/user/register" className="hover:underline">
              Não tem conta? Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

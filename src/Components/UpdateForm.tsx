"use client";

import { registerBuyer } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateForm() {
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

  // Validação dos campos
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      form: "",
    };

    // Validação do nome
    if (!name.trim()) {
      newErrors.name = "O nome é obrigatório";
      valid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres";
      valid = false;
    }

    // Validação do email
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email inválido";
      valid = false;
    }

    // Validação da senha
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

    // Validação antes de submeter
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const { token } = await registerBuyer(name, email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      router.push("/");
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        form: err.message || "Erro durante o registro",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      {/* Lado esquerdo: Imagem */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Imagem de fundo"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado direito: Formulário */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">
          Atualizar informações do usuário
        </h1>

        {/* Mensagem de erro geral */}
        {errors.form && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{errors.form}</p>
          </div>
        )}

        <form onSubmit={handleRegister} noValidate>
          {/* Campo de nome completo */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateForm()}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Campo de email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateForm()}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Campo de senha */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validateForm()}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Botão de cadastro */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full mb-4 disabled:opacity-50"
          >
            {isLoading ? "Atualizando..." : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
}

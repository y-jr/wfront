"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/Components/Header";
import { fetchStoreProducts } from "@/lib/api/products";
import { staticProducts } from "@/app/static/data";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seccsess, setSuccess] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let token;
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token");
        }

        if (!token) throw new Error("Sessão expirada. Faça login novamente.");

        const { products } = await fetchStoreProducts(token);
        setProducts(products);
        setSuccess(true);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {loading && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#720cf2] mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        </div>
      )}

      {seccsess && (
        <>
          {/* Conteúdo principal */}

          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#24044c]">
                Meus Produtos
              </h1>
              <Link
                href="/dashboard/products/new"
                className="px-4 py-2 bg-[#720cf2] text-white rounded-md hover:bg-[#5b09c2] transition-colors"
              >
                Adicionar Produto
              </Link>
            </div>

            {staticProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">
                  Nenhum produto cadastrado ainda.
                </p>
                <Link
                  href="/dashboard/products/new"
                  className="px-4 py-2 bg-[#720cf2] text-white rounded-md hover:bg-[#5b09c2] transition-colors"
                >
                  Cadastrar Primeiro Produto
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staticProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    {product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#720cf2]">
                          {new Intl.NumberFormat("pt-AO", {
                            style: "currency",
                            currency: "AOA",
                          }).format(product.price)}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} em estoque`
                            : "Esgotado"}
                        </span>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link
                          href={`/dashboard/products/edit/${product._id}`}
                          className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                        >
                          Editar
                        </Link>
                        <Link
                          href={`/dashboard/products/${product._id}`}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                        >
                          Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#24044c] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopNow</h3>
              <p className="text-sm text-[#b681f8]">
                A melhor loja online para suas compras diárias.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ajuda</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Envio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Devoluções
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-[#b681f8] hover:text-white"
                  >
                    Pagamentos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-[#b681f8] mb-2">
                Inscreva-se para receber ofertas exclusivas
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-3 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none"
                />
                <button className="bg-[#720cf2] px-3 py-2 text-sm rounded-r-md hover:bg-[#5f098f]">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#5f4981] text-center text-sm text-[#b681f8]">
            <p>© 2023 ShopNow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Header from "@/Components/Header";

export default function CartCheckout() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Camiseta Básica", quantity: 2, price: 79.9 },
    { id: 2, name: "Calça Jeans", quantity: 1, price: 159.9 },
    { id: 3, name: "Tênis Esportivo", quantity: 1, price: 229.9 },
  ]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-6">
        {/* Lista de Produtos no Carrinho */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-[#24044c] mb-6">
            Meu Carrinho
          </h1>
          {cartItems.length === 0 ? (
            <p className="text-[#5f4981]">Seu carrinho está vazio.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="text-lg font-medium text-[#24044c]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#5f4981]">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#24044c]">
                      AOA {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button className="text-sm text-red-500 hover:text-red-700 mt-1">
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Checkout */}
        <aside className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold text-[#24044c] mb-4">
            Resumo do Pedido
          </h2>
          <div className="flex justify-between mb-2 text-[#5f4981]">
            <span>Subtotal</span>
            <span>AOA {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-[#5f4981]">
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div className="flex justify-between mb-6 font-bold text-[#24044c] text-lg">
            <span>Total</span>
            <span>AOA {totalPrice.toFixed(2)}</span>
          </div>
          <a href="/pages/custommer/checkout">
            <button className="w-full bg-[#720cf2] hover:bg-[#5f4981] text-white py-3 rounded-lg font-semibold transition-colors">
              Finalizar Compra
            </button>
          </a>
        </aside>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const [cartSummary] = useState({
    items: 3,
    total: 15279.00,
    shipping: 2200,
    grandTotal: 13079.00
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#24044c] text-white shadow-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
              <span className="text-[#b681f8]">Seller</span>Portal
            </Link>
            <nav className="flex space-x-6">
              <Link href="/cart" className="hover:text-[#b681f8]">Carrinho</Link>
              <Link href="/checkout" className="hover:text-[#b681f8]">Checkout</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Endereço e Pagamento */}
        <div className="lg:col-span-2 space-y-8">
          {/* Endereço de Entrega */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-[#24044c] mb-4">Endereço de Entrega</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nome completo" className="border border-gray-300 rounded-md px-4 py-2 focus:ring-[#720cf2] focus:border-[#720cf2]" />
              <input type="text" placeholder="Telefone" className="border border-gray-300 rounded-md px-4 py-2 focus:ring-[#720cf2] focus:border-[#720cf2]" />
              <input type="text" placeholder="Endereço" className="border border-gray-300 rounded-md px-4 py-2 col-span-2 focus:ring-[#720cf2] focus:border-[#720cf2]" />
              <input type="text" placeholder="Cidade" className="border border-gray-300 rounded-md px-4 py-2 focus:ring-[#720cf2] focus:border-[#720cf2]" />
              <input type="text" placeholder="Casa nº" className="border border-gray-300 rounded-md px-4 py-2 focus:ring-[#720cf2] focus:border-[#720cf2]" />
            </form>
          </section>

          {/* Método de Pagamento */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-[#24044c] mb-4">Método de Pagamento</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="text-[#720cf2]" />
                <span>Cartão de Crédito</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="text-[#720cf2]" />
                <span>Express</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="text-[#720cf2]" />
                <span>Transferência bancária</span>
              </label>
            </div>
          </section>

          {/* Botão de Finalizar */}
          <div className="flex justify-end">
            <button className="bg-[#720cf2] hover:bg-[#5e0cc2] text-white font-semibold px-6 py-3 rounded-lg transition">
              Finalizar Pedido
            </button>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <aside className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold text-[#24044c] mb-6">Resumo do Pedido</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-[#5f4981]">
              <span>Itens</span>
              <span>{cartSummary.items}</span>
            </div>
            <div className="flex justify-between text-[#5f4981]">
              <span>Subtotal</span>
              <span>AOA {cartSummary.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#5f4981]">
              <span>Entrega</span>
              <span>AOA {cartSummary.shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between font-bold text-[#24044c]">
              <span>Total</span>
              <span>AOA {cartSummary.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

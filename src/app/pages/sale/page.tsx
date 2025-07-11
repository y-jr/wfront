"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/Components/Header';

export default function SellerPortal() {
  // Dados mockados
  const [metrics] = useState({
    sales: 1245,
    revenue: 28990.50,
    products: 42,
    customers: 876
  });

  const [recentOrders] = useState([
    { id: '#ORD-7894', customer: 'Ana Silva', date: '15/05/2023', amount: 189.90, status: 'Enviado' },
    { id: '#ORD-7893', customer: 'Carlos Oliveira', date: '14/05/2023', amount: 259.90, status: 'Processando' },
    { id: '#ORD-7892', customer: 'Mariana Costa', date: '14/05/2023', amount: 99.90, status: 'Entregue' },
    { id: '#ORD-7891', customer: 'João Santos', date: '13/05/2023', amount: 429.90, status: 'Entregue' }
  ]);

  const [products] = useState([
    { id: 1, name: 'Camiseta Básica', stock: 42, price: 79.90, sales: 124 },
    { id: 2, name: 'Calça Jeans', stock: 18, price: 159.90, sales: 89 },
    { id: 3, name: 'Tênis Esportivo', stock: 7, price: 229.90, sales: 56 },
    { id: 4, name: 'Relógio Digital', stock: 23, price: 199.90, sales: 72 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Sidebar e Conteúdo Principal */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-md h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/seller" className="block px-4 py-2 text-[#24044c] hover:bg-[#f5efff] rounded-md font-medium">
                  Visão Geral
                </Link>
              </li>
              <li>
                <Link href="/pages/store/product/create" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Novo Produto
                </Link>
              </li>
              <li>
                <Link href="/seller/orders" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Gerenciar Pedidos
                </Link>
              </li>
              <li>
                <Link href="/seller/inventory" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Estoque
                </Link>
              </li>
              <li>
                <Link href="/seller/reports" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Relatórios
                </Link>
              </li>
              <li>
                <Link href="/seller/promotions" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Promoções
                </Link>
              </li>
              <li className="pt-4 mt-4 border-t border-gray-200">
                <Link href="/seller/settings" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Configurações
                </Link>
              </li>
              <li>
                <Link href="/seller/support" className="block px-4 py-2 text-[#5f4981] hover:bg-[#f5efff] rounded-md">
                  Suporte
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-[#24044c] mb-6">Dashboard do Vendedor</h1>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5f4981]">Vendas</p>
                  <p className="text-2xl font-bold text-[#24044c]">{metrics.sales.toLocaleString()}</p>
                </div>
                <div className="bg-[#f5efff] p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#720cf2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-[#b681f8] mt-2">+12% em relação ao mês passado</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5f4981]">Faturamento</p>
                  <p className="text-2xl font-bold text-[#24044c]">AOA {metrics.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-[#f5efff] p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#720cf2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-[#b681f8] mt-2">+8% em relação ao mês passado</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5f4981]">Produtos</p>
                  <p className="text-2xl font-bold text-[#24044c]">{metrics.products}</p>
                </div>
                <div className="bg-[#f5efff] p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#720cf2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-[#b681f8] mt-2">5 novos este mês</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5f4981]">Clientes</p>
                  <p className="text-2xl font-bold text-[#24044c]">{metrics.customers}</p>
                </div>
                <div className="bg-[#f5efff] p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#720cf2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-[#b681f8] mt-2">+24 novos este mês</p>
            </div>
          </div>

          {/* Gráfico e Pedidos Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#24044c]">Desempenho de Vendas</h2>
                <select className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#720cf2]">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Últimos 90 dias</option>
                </select>
              </div>
              <div className="bg-gray-50 h-64 rounded-md flex items-center justify-center text-[#5f4981]">
                [Área para Gráfico de Vendas]
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-[#24044c] mb-4">Pedidos Recentes</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-[#24044c]">{order.id}</p>
                        <p className="text-sm text-[#5f4981]">{order.customer}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                          order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-[#5f4981]">{order.date}</p>
                      <p className="text-sm font-medium text-[#24044c]">AOA {order.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/seller/orders" className="block text-center text-sm text-[#720cf2] hover:text-[#b681f8] mt-4">
                Ver todos os pedidos
              </Link>
            </div>
          </div>

          {/* Produtos com Baixo Estoque */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#24044c]">Produtos com Baixo Estoque</h2>
              <Link href="/seller/inventory" className="text-sm text-[#720cf2] hover:text-[#b681f8]">
                Gerenciar Estoque
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5f4981] uppercase tracking-wider">Produto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5f4981] uppercase tracking-wider">Estoque</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5f4981] uppercase tracking-wider">Preço</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5f4981] uppercase tracking-wider">Vendas</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5f4981] uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.filter(p => p.stock < 20).map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#24044c]">{product.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#5f4981]">
                        <span className={`px-2 py-1 rounded-full text-xs ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#5f4981]">AOA {product.price.toFixed(2)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#5f4981]">{product.sales}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#5f4981]">
                        <button className="text-[#720cf2] hover:text-[#b681f8] mr-3">Repor</button>
                        <button className="text-[#720cf2] hover:text-[#b681f8]">Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
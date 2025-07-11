"use client"

import Link from "next/link"

export default function Header() {
    return (
        <>
            {/* Header */}
            <header className="bg-[#24044c] text-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-white">
                                <span className="text-[#b681f8]">Welw</span>Express
                            </Link>
                            <nav className="ml-10 hidden md:block">
                                <ul className="flex space-x-8">
                                    <li>
                                        <Link href="/pages/home" className="text-white hover:text-[#b681f8] transition-colors">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pages/home" className="text-white hover:text-[#b681f8] transition-colors">
                                            Produtos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pages/sale" className="text-white hover:text-[#b681f8] transition-colors">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pages/custommer/cart" className="text-white hover:text-[#b681f8] transition-colors">
                                            Carrinho
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pages/store/create" className="text-white hover:text-[#b681f8] transition-colors">
                                            Nova Loja
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pages/store/employee/create" className="text-white hover:text-[#b681f8] transition-colors">
                                            Novo empregado
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pages/user/logout" className="text-white hover:text-[#b681f8] transition-colors">
                                            Sair
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-white hover:text-[#b681f8] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="p-2 text-white hover:text-[#b681f8] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                            <button className="p-2 text-white hover:text-[#b681f8] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
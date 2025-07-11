"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/user';

interface HomeProps {
  // Adicione props adicionais aqui se necessário
}

export default function Home({ }: HomeProps) {
  const router = useRouter();

  useEffect(() => {
    // Função assíncrona dentro do useEffect
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/pages/user/login'); // Alterado para register
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const msg = await logout();
      console.log(msg);
      router.push('/pages/user/login');
    } catch (error) {
      alert("Erro de logout");
    }
  };

  const handleUpdate = async () => {
    router.push('/pages/user/update');
  };

  return (
    <div className='text-center'>
      <h1>Página Inicial</h1>
      <p>Bem-vindo! Você está autenticado.</p>
      <button
        className='btn bg-black text-white p-4'
        onClick={handleLogout}
      >
        Sair
      </button>
      <button
        className='btn bg-red text-white p-4'
        onClick={handleUpdate}
      >
        Atualizar Cadastro
      </button>
    </div>
  );
}
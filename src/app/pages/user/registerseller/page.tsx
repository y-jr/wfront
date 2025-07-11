"use client"
import { useRouter } from 'next/navigation';

import RegisterForm from "@/Components/RegisterForm";
import RegisterSellerForm from '@/Components/RegisterSellerForm';

export default function LoginPage() {
 
   const router = useRouter();
   const token = localStorage.getItem('token');
   if (token) {
     router.push('/');
   }

  return (
    <RegisterSellerForm/>
  );
}
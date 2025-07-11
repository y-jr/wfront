"use client"
import { useRouter } from 'next/navigation';

import UpdateForm from '@/Components/UpdateForm';

export default function LoginPage() {
 
   const router = useRouter();
   const token = localStorage.getItem('token');
   if (token) {
     router.push('/');
   }

  return (
    <UpdateForm/>
  );
}
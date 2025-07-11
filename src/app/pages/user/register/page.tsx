"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RegisterForm from "@/Components/RegisterForm";

export default function LoginPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      router.push("/");
    }
  }, [router]);

  if (!isClient) {
    return null; // Ou um loader enquanto verifica
  }

  return <RegisterForm />;
}

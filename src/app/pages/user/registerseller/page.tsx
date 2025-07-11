"use client";
import { useRouter } from "next/navigation";

import RegisterForm from "@/Components/RegisterForm";
import RegisterSellerForm from "@/Components/RegisterSellerForm";

export default function LoginPage() {
  const router = useRouter();
  let token;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
  }

  if (token) {
    router.push("/");
  }

  return <RegisterSellerForm />;
}

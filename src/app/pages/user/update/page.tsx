"use client";
import { useRouter } from "next/navigation";

import UpdateForm from "@/Components/UpdateForm";

export default function LoginPage() {
  const router = useRouter();
  let token;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
  }

  if (token) {
    router.push("/");
  }

  return <UpdateForm />;
}

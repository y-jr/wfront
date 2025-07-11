"use client";
import { useRouter } from "next/navigation";
import LoginForm from "@/Components/LoginForm";

export default function LogoutnPage() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    localStorage.clear();
  }

  router.push("/pages/user/login");

  return <></>;
}

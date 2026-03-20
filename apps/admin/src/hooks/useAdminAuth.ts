"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  isAdmin: boolean;
}

export function useAdminAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  const user = session?.user as (AdminUser & Record<string, unknown>) | undefined;
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated" && !isAdmin) {
      router.push("/login");
    }
  }, [status, isAdmin, router]);

  return {
    user: user
      ? {
          id: user.id as string,
          name: user.name || "",
          email: user.email || "",
          image: user.image,
          role: user.role as string,
          isAdmin,
          isSuperAdmin,
        }
      : null,
    isLoading,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    session,
  };
}

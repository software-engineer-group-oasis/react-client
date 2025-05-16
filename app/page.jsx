"use client";

import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import { checkAuth } from "@/apis/auth.api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const {setUser} = useAuth();
  useEffect(() => {
    (async () => {
      const data = await checkAuth();
      if (data.success !== true) {
        router.push("/login");
      } else {
          setUser(data.data);
      }
    })();
  }, []);
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties></HomeProperties>
    </>
  )
}
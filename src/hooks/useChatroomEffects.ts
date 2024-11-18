import { useEffect } from "react";
import { useUserStore } from "@/store/useStore";
import { useUIStore } from "@/store/ui.store";
import { faker } from "@faker-js/faker";
import { api } from "@/lib/axios";

export const useChatroomEffects = () => {
  const { setUserInfo } = useUserStore();
  const { setIsMobile } = useUIStore();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [setIsMobile]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      const createUser = async () => {
        const randomName = faker.person.firstName();
        const response = await api.post("/api/users", {
          user: {
            name: randomName,
          },
        });
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        setUserInfo(data);
      };
      createUser();
    }
    if (user) setUserInfo(JSON.parse(user));
  }, [setUserInfo]);
};

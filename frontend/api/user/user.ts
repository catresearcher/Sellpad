import { User } from "@/context/userContext";

export function fetchUser() {
  const user: User = {
    username: "Teemu",
    email: "Teemu@teemu.com",
    avatar:
      "https://cdn.discordapp.com/attachments/1444186738816847924/1472392311630725266/IMG_0989.gif?ex=69fdd9f2&is=69fc8872&hm=4ce3ff3607cd3ca088d8f576b02f57ddce18be5266248b092b93ac62b175d30f&",
    role: "admin",
    tier: 1,
  };
  return user;
}

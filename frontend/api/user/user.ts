import { User } from "@/context/userContext";

export function fetchUser() {
  const user: User = {
    username: "Teemu",
    email: "Teemu@teemu.com",
    avatar:
      "https://cdn.discordapp.com/attachments/1444186738816847924/1472392311630725266/IMG_0989.gif?ex=69fc8872&is=69fb36f2&hm=b3434c667a3f759b45603614a9b3190436b794c20b1bd893c8e6b900d2d8c16b&",
    role: "admin",
    tier: 1,
  };
  return user;
}

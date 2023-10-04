import { useState } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const useUser = () => {
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState<User>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const updateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return { user, updateUser };
};

export default useUser;

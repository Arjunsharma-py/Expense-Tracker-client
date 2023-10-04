import { createContext, ReactNode, useState } from "react";
import { User } from "../hooks/useUser";

export type UserContextType = {
  user: any;
  setUser: any;
};

export const UserContext = createContext({} as UserContextType);

interface Props {
  children: ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

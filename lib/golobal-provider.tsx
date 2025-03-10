import { createContext, ReactNode } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | null>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>;

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return <GlobalContext.Provider value={}>{children}</GlobalContext.Provider>;
};

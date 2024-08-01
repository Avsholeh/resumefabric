"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { ResumeDefault } from "./default";
import { createResumeStore, ResumeStore } from "./store";

export type ResumeStoreApi = ReturnType<typeof createResumeStore>;
export const ResumeStoreContext = createContext<ResumeStoreApi | undefined>(undefined);

export const ResumeStoreProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const storeRef = useRef<ResumeStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createResumeStore(ResumeDefault);
  }
  return <ResumeStoreContext.Provider value={storeRef.current}>{children}</ResumeStoreContext.Provider>;
};

export const useResumeStore = <T,>(selector: (store: ResumeStore) => T): T => {
  const store = useContext(ResumeStoreContext);
  if (!store) {
    throw new Error("useResumeStore must be used within a ResumeStoreProvider");
  }
  return useStore(store, selector);
};

import React from "react";
import { SidebarProvider } from "./SidebarContext";

// combines all context providers in the app

export const ContextProvider = (props) => {
  return <SidebarProvider>{props.children}</SidebarProvider>;
};

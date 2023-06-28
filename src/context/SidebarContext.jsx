// changing the sidebar state btn header and sidebar components

import { createContext, useContext, useState } from "react";

const IsOpenContext = createContext(true);
const UpdateOpenContext = createContext(() => {});

export const useOpenSidebar = () => {
  return useContext(IsOpenContext);
};

export const useToggleSidebar = () => {
  return useContext(UpdateOpenContext);
};

export const SidebarProvider = (props) => {
  const [open, setOpen] = useState(true);

  const UpdateOpen = () => {
    setOpen(!open);
  };

  return (
    <IsOpenContext.Provider value={open}>
      <UpdateOpenContext.Provider value={UpdateOpen}>
        {props.children}
      </UpdateOpenContext.Provider>
    </IsOpenContext.Provider>
  );
};

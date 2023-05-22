import * as React from "react";

export interface TitleContextValue {
  title: string;
  setTitle: (newTitle: string) => void;
}

export const TitleContext = React.createContext<TitleContextValue | null>(null);

export const useTitleContext = () => React.useContext(TitleContext);

export const TitleProvider = (props: { children: React.ReactNode }) => {
  const [title, setTitle] = React.useState<string>("");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {props.children}
    </TitleContext.Provider>
  );
};

import { createContext, useState } from 'react';

export const SearchMapContext = createContext({
  showSearchMap: false,
  setShowSearchMap: () => {},
});

export const SearchMapProvider = ({ children }) => {
  const [showSearchMap, setIsToggleOpen] = useState(false);

  const setShowSearchMap = () => {
    setIsToggleOpen(!showSearchMap);
  };

  return (
    <SearchMapContext.Provider value={{ setShowSearchMap, showSearchMap }}>
      {children}
    </SearchMapContext.Provider>
  );
};

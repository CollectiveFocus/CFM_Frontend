import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const SearchMapContext = createContext({
  showSearchMap: false,
  setShowSearchMap: () => {},
});

export function SearchMapProvider({ children }) {
  const [showSearchMap, setIsToggleOpen] = useState(false);

  const setShowSearchMap = () => {
    setIsToggleOpen(!showSearchMap);
  };

  return (
    <SearchMapContext.Provider value={{ setShowSearchMap, showSearchMap }}>
      {children}
    </SearchMapContext.Provider>
  );
}
SearchMapProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

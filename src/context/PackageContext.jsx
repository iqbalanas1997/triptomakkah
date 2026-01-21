import { createContext, useContext, useState } from 'react';

const PackageContext = createContext();

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
};

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState('');

  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
};


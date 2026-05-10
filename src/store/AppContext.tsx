import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WifiPackage {
  id: string;
  name: string;
  speed: string;
  normalPrice: number;
  promoPrice: number | null;
  features: string[];
  popular: boolean;
  icon?: string;
  imageUrl?: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  promoActive: boolean;
  promoText: string;
  whatsappNumber: string;
}

interface AppState {
  content: SiteContent;
  packages: WifiPackage[];
  isAuthenticated: boolean;
}

interface AppContextType extends AppState {
  updateContent: (newContent: Partial<SiteContent>) => void;
  addPackage: (pkg: WifiPackage) => void;
  updatePackage: (id: string, pkg: Partial<WifiPackage>) => void;
  deletePackage: (id: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const defaultContent: SiteContent = {
  heroTitle: "Internet unlimited wiznet promo bulan mei.",
  heroSubtitle: "Free instalasi, gratis stb tv kabel, internet 1:1.",
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
  promoActive: true,
  promoText: "🔥 DISKON SPESIAL HINGGA 30% HANYA UNTUK BULAN INI! 🔥",
  whatsappNumber: "6281310940089"
};

const defaultPackages: WifiPackage[] = [
  {
    id: "pkg-1",
    name: "Paket Flash",
    speed: "100 Mbps",
    normalPrice: 220890,
    promoPrice: null,
    features: ["Free Instalasi", "Gratis STB + TV Kabel", "Internet 1 : 1"],
    popular: false,
    icon: "zap"
  },
  {
    id: "pkg-2",
    name: "Paket Turbo",
    speed: "150 Mbps",
    normalPrice: 243090,
    promoPrice: null,
    features: ["Free Instalasi", "Gratis STB + TV Kabel", "Internet 1 : 1"],
    popular: true,
    icon: "zap"
  },
  {
    id: "pkg-3",
    name: "Paket Blaze",
    speed: "200 Mbps",
    normalPrice: 309690,
    promoPrice: null,
    features: ["Free Instalasi", "Gratis STB + TV Kabel", "Internet 1 : 1"],
    popular: false,
    icon: "gamepad"
  },
  {
    id: "pkg-4",
    name: "Paket Thunder",
    speed: "250 Mbps",
    normalPrice: 376290,
    promoPrice: null,
    features: ["Free Instalasi", "Gratis STB + TV Kabel", "Internet 1 : 1"],
    popular: false,
    icon: "building"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('wiznetStoreContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [packages, setPackages] = useState<WifiPackage[]>(() => {
    const saved = localStorage.getItem('wiznetStorePackages');
    return saved ? JSON.parse(saved) : defaultPackages;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('wiznetStoreAuth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('wiznetStoreContent', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('wiznetStorePackages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('wiznetStoreAuth', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addPackage = (pkg: WifiPackage) => {
    setPackages(prev => [...prev, pkg]);
  };

  const updatePackage = (id: string, updatedFields: Partial<WifiPackage>) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ content, packages, isAuthenticated, login, logout, updateContent, addPackage, updatePackage, deletePackage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

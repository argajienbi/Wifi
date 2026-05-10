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
}

interface AppContextType extends AppState {
  updateContent: (newContent: Partial<SiteContent>) => void;
  addPackage: (pkg: WifiPackage) => void;
  updatePackage: (id: string, pkg: Partial<WifiPackage>) => void;
  deletePackage: (id: string) => void;
}

const defaultContent: SiteContent = {
  heroTitle: "Internet Super Cepat, Tanpa Batas Kuota",
  heroSubtitle: "Nikmati koneksi internet stabil untuk streaming, gaming, dan bekerja dari rumah dengan harga spesial bulan ini.",
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
  promoActive: true,
  promoText: "🔥 DISKON SPESIAL HINGGA 30% HANYA UNTUK BULAN INI! 🔥",
  whatsappNumber: "6281234567890"
};

const defaultPackages: WifiPackage[] = [
  {
    id: "pkg-1",
    name: "Paket Basic",
    speed: "20 Mbps",
    normalPrice: 150000,
    promoPrice: null,
    features: ["Download & Upload Cepat", "Cocok untuk 1-3 Perangkat", "Bantuan Support 24/7", "Gratis Instalasi"],
    popular: false,
    icon: "home"
  },
  {
    id: "pkg-2",
    name: "Paket Standard",
    speed: "50 Mbps",
    normalPrice: 280000,
    promoPrice: 249000,
    features: ["Streaming HD Tanpa Buffering", "Cocok untuk 4-7 Perangkat", "Prioritas Support VIP", "Router Dual-band Gratis"],
    popular: true,
    icon: "wifi"
  },
  {
    id: "pkg-3",
    name: "Paket Gamer Pro",
    speed: "100 Mbps",
    normalPrice: 450000,
    promoPrice: 399000,
    features: ["Ping Rendah, No Lag", "Cocok untuk >10 Perangkat", "IP Publik Dinamis", "Router Gaming Premium"],
    popular: false,
    icon: "gamepad"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('wifiStoreContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [packages, setPackages] = useState<WifiPackage[]>(() => {
    const saved = localStorage.getItem('wifiStorePackages');
    return saved ? JSON.parse(saved) : defaultPackages;
  });

  useEffect(() => {
    localStorage.setItem('wifiStoreContent', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('wifiStorePackages', JSON.stringify(packages));
  }, [packages]);

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
    <AppContext.Provider value={{ content, packages, updateContent, addPackage, updatePackage, deletePackage }}>
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

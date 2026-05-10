import React from 'react';
import { useAppContext, WifiPackage } from '../store/AppContext';
import { Check, Wifi, ArrowRight, ShieldCheck, Zap, Gamepad, Home, Building2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatRp = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
};

export default function Storefront() {
  const { content, packages } = useAppContext();

  const renderPackageIcon = (pkg: WifiPackage) => {
    if (pkg.icon === 'custom' && pkg.imageUrl) {
      return <img src={pkg.imageUrl} alt={pkg.name} className="w-14 h-14 object-contain rounded-xl" />;
    }
    
    const IconProps = { size: 28, className: pkg.popular ? "text-orange-400" : "text-primary-600" };
    const ContainerClass = `w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${pkg.popular ? 'bg-slate-800 border-slate-700' : 'bg-primary-50 border-primary-100'}`;

    let IconComponent = <Wifi {...IconProps} />;
    switch (pkg.icon) {
      case 'zap': IconComponent = <Zap {...IconProps} />; break;
      case 'gamepad': IconComponent = <Gamepad {...IconProps} />; break;
      case 'home': IconComponent = <Home {...IconProps} />; break;
      case 'building': IconComponent = <Building2 {...IconProps} />; break;
    }

    return (
      <div className={ContainerClass}>
        {IconComponent}
      </div>
    );
  };

  const handleOrder = (pkgName: string) => {
    const message = `Halo, saya tertarik untuk berlangganan ${pkgName}. Boleh minta informasi lebih lanjut?`;
    window.open(`https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Promo Banner */}
      {content.promoActive && (
        <div className="bg-slate-900 text-orange-400 text-center py-3 px-4 font-bold uppercase tracking-widest text-xs sm:text-sm animate-pulse">
          {content.promoText}
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                <span className="font-bold text-lg">N</span>
              </div>
              <span className="italic font-black text-xl tracking-tight text-gray-900 uppercase">NET<span className="text-primary-600">GIGA</span></span>
            </div>
            <div>
              <Link to="/admin" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary-600 transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                  <Zap size={14} className="fill-orange-600" />
                  <span>Koneksi Fiber Optic Terbaik 2024</span>
                </div>
                <h1 className="text-4xl tracking-tight font-black text-gray-900 sm:text-5xl md:text-6xl max-w-2xl leading-tight">
                  {content.heroTitle}
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {content.heroSubtitle}
                </p>
                <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-lg shadow-sm">
                    <a href="#packages" className="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-sm font-bold uppercase tracking-widest rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 md:py-4 md:px-10 hover:shadow-lg hover:shadow-primary-600/30">
                      Lihat Paket
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <a href="#features" className="w-full relative flex items-center justify-center px-8 py-3.5 font-bold uppercase tracking-widest rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 md:py-4 text-sm md:px-10 border border-gray-200 group">
                      Pelajari Dulu
                      <ArrowRight size={18} className="ml-2 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-10 lg:mt-0 pt-0 lg:pt-0 pb-10 lg:pb-0 px-4 sm:px-6 lg:px-0">
          <div className="relative h-64 sm:h-72 md:h-96 lg:h-full w-full rounded-2xl lg:rounded-none overflow-hidden shadow-xl lg:shadow-none">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={content.heroImage}
              alt="Perangkat internet wifi dan keluarga"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:block hidden"></div>
            <div className="absolute inset-0 bg-primary-600/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>

      {/* Features Outline */}
      <div id="features" className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Simetris 1:1</h3>
              <p className="text-gray-500">Kecepatan Upload dan Download yang sama rata tanpa hambatan sedikitpun.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                <Wifi size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unlimited Asli</h3>
              <p className="text-gray-500">Tanpa FUP (Batas Pemakaian Wajar). Pakai sepuasnya tanpa takut kecepatan diturunkan.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Anti Gangguan</h3>
              <p className="text-gray-500">Infrastruktur kabel optik tahan cuaca ekstrem dengan jaminan Uptime 99.9%.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="packages" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-tight">Pilih Paket Internet Sesuai Kebutuhanmu</h2>
            <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-3xl sm:mx-auto">
              Satu harga pasti, tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`relative flex flex-col p-8 rounded-2xl w-full max-w-sm transition-all duration-300 hover:-translate-y-2 overflow-hidden
                  ${pkg.popular ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl"></div>
                )}
                
                <div className="mb-4 relative z-10 flex justify-between items-start gap-4">
                  <div>
                    {pkg.popular && <p className="text-[10px] text-primary-300 font-bold uppercase mb-1 tracking-widest">Variant Terlaris</p>}
                    <h3 className={`text-xl font-bold ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>{pkg.name}</h3>
                    <div className="mt-2 flex flex-col gap-1">
                      <div className={`flex items-baseline text-4xl font-black tracking-tight ${pkg.popular ? 'text-white' : 'text-primary-600'}`}>
                        {pkg.speed}
                      </div>
                    </div>
                  </div>
                  {renderPackageIcon(pkg)}
                </div>

                <div className="mb-6 flex flex-col relative z-10">
                  {pkg.promoPrice && content.promoActive ? (
                    <>
                      <span className={`text-xs line-through opacity-50 ${pkg.popular ? 'text-gray-300' : 'text-gray-400'}`}>{formatRp(pkg.normalPrice)}/bln</span>
                      <div className="flex items-baseline">
                        <span className={`text-2xl font-bold ${pkg.popular ? 'text-orange-400' : 'text-gray-900'}`}>{formatRp(pkg.promoPrice)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-baseline">
                      <span className={`text-2xl font-bold ${pkg.popular ? 'text-orange-400' : 'text-gray-900'}`}>{formatRp(pkg.normalPrice)}</span>
                    </div>
                  )}
                </div>

                <ul className="flex-1 space-y-3 mb-8 relative z-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 text-xs opacity-90 ${pkg.popular ? 'text-white' : 'text-gray-700'}`}>
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOrder(pkg.name)}
                  className={`mt-6 block w-full py-3.5 px-4 rounded-lg font-bold text-xs uppercase tracking-widest text-center transition-colors relative z-10
                    ${pkg.popular 
                      ? 'bg-white text-gray-900 hover:bg-gray-100' 
                      : 'bg-primary-50 text-primary-700 hover:bg-primary-100'}`}
                >
                  Langganan Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Wifi size={24} className="text-primary-500" />
            <span className="font-bold text-xl tracking-tight text-white">WiFi<span className="text-primary-500">Speed</span></span>
          </div>
          <p className="text-gray-400">© 2024 WiFiSpeed Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

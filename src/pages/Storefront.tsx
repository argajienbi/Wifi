import React from 'react';
import { useAppContext, WifiPackage } from '../store/AppContext';
import { Check, Wifi, ArrowRight, ShieldCheck, Zap, Gamepad, Home, Building2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatRp = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
};

const WhatsappIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
        <div className="bg-primary-500 text-[#050505] text-center py-3 px-4 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
          {content.promoText}
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-[#050505] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl sm:text-4xl tracking-tight text-white uppercase transform -skew-x-6">WIZ<span className="text-primary-500">NET</span></span>
            </div>
            <div>
              <Link to="/admin" className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-primary-500 transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#050505] py-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-3/5">
            <div className="transform -skew-x-6">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary-500 mb-4 sm:ml-2">Koneksi Fiber Optic Terbaik 2024</p>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-white uppercase leading-[0.85] tracking-tight mb-8">
                {content.heroTitle}
              </h1>
            </div>
            <p className="mt-8 text-base sm:text-xl text-white/70 max-w-xl font-medium tracking-wide">
              {content.heroSubtitle}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <button onClick={() => handleOrder('layanan ' + content.heroTitle)} className="flex items-center justify-center gap-3 px-8 py-5 border border-primary-500 text-[11px] font-bold uppercase tracking-[0.15em] rounded-none text-[#050505] bg-primary-500 hover:bg-transparent hover:text-primary-500 transition-colors">
                <WhatsappIcon size={18} />
                Hubungi Kami
              </button>
              <a href="#packages" className="flex items-center justify-center px-8 py-5 border border-white/20 text-[11px] font-bold uppercase tracking-[0.15em] rounded-none text-white hover:bg-white/10 transition-colors">
                Lihat Paket <ArrowRight size={18} className="ml-3" />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-2/5 mt-10 lg:mt-0 relative group perspective-1000 hidden sm:block">
            <div className="relative h-[300px] sm:h-[400px] w-full transform rotate-3 sm:-rotate-3 translate-x-4 sm:translate-x-0 transition-transform duration-700 ease-out group-hover:rotate-0">
               <img
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-80 mix-blend-luminosity border border-white/10"
                  src={content.heroImage}
                  alt="Wifi connection"
                />
               <div className="absolute inset-0 bg-primary-500 mix-blend-color opacity-30"></div>
            </div>
            {/* abstract floating element */}
            <div className="absolute -bottom-10 -left-10 text-[120px] lg:text-[150px] font-display text-primary-500/20 leading-none pointer-events-none transform -skew-x-12 select-none">
              FAST
            </div>
          </div>
        </div>
      </div>

      {/* Features Outline */}
      <div id="features" className="bg-[#0a0a0a] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
            <div className="relative pt-12 md:pt-0">
              <div className="text-[100px] lg:text-[120px] font-display text-white/5 mb-[-70px] leading-none absolute top-0 -left-4 md:-top-12 md:-left-6 z-0 pointer-events-none select-none">01</div>
              <div className="relative z-10 border-t border-primary-500 pt-6">
                <h3 className="text-xl font-display uppercase tracking-wider text-white mb-4">Simetris 1:1</h3>
                <p className="text-white/60 text-sm leading-relaxed">Kecepatan Upload dan Download yang sama rata tanpa hambatan sedikitpun.</p>
              </div>
            </div>
            <div className="relative pt-12 md:pt-0">
              <div className="text-[100px] lg:text-[120px] font-display text-white/5 mb-[-70px] leading-none absolute top-0 -left-4 md:-top-12 md:-left-6 z-0 pointer-events-none select-none">02</div>
              <div className="relative z-10 border-t border-primary-500 pt-6">
                <h3 className="text-xl font-display uppercase tracking-wider text-white mb-4">Unlimited Asli</h3>
                <p className="text-white/60 text-sm leading-relaxed">Tanpa FUP (Batas Pemakaian Wajar). Pakai sepuasnya tanpa takut kecepatan diturunkan.</p>
              </div>
            </div>
            <div className="relative pt-12 md:pt-0">
              <div className="text-[100px] lg:text-[120px] font-display text-white/5 mb-[-70px] leading-none absolute top-0 -left-4 md:-top-12 md:-left-6 z-0 pointer-events-none select-none">03</div>
              <div className="relative z-10 border-t border-primary-500 pt-6">
                <h3 className="text-xl font-display uppercase tracking-wider text-white mb-4">Anti Gangguan</h3>
                <p className="text-white/60 text-sm leading-relaxed">Infrastruktur kabel optik tahan cuaca ekstrem dengan jaminan Uptime 99.9%.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="packages" className="bg-[#050505] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 transform -skew-x-2 md:-skew-x-6 text-center md:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-white uppercase tracking-tight leading-[0.85]">Paket<br/><span className="text-primary-500">Internet</span></h2>
            <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50 max-w-3xl">
              Satu harga pasti, tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`relative flex flex-col p-8 border ${pkg.popular ? 'border-primary-500 bg-[#0a0a0a]' : 'border-white/10 bg-transparent'} transition-all duration-300 hover:border-primary-500 group`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-[#050505] text-[10px] font-bold uppercase tracking-widest px-3 py-1 transform translate-x-1 -translate-y-1/2">
                    Terlaris
                  </div>
                )}
                
                <div className="mb-8 flex justify-between items-start gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-white group-hover:text-primary-500 transition-colors">{pkg.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <div className="text-4xl sm:text-5xl font-display text-white">
                        {pkg.speed.split(' ')[0]}
                      </div>
                      <span className="text-sm font-semibold tracking-widest text-primary-500 uppercase">{pkg.speed.split(' ')[1] || 'MBPS'}</span>
                    </div>
                  </div>
                  <div className="text-white/20 group-hover:text-white/40 transition-colors">
                    <Wifi size={28} />
                  </div>
                </div>

                <div className="mb-8">
                  {pkg.promoPrice && content.promoActive ? (
                    <>
                      <span className="text-[11px] line-through opacity-50 text-white/40 uppercase tracking-widest block mb-1">{formatRp(pkg.normalPrice)} / BLN</span>
                      <div className="text-2xl font-display text-primary-500 tracking-wide">{formatRp(pkg.promoPrice)}</div>
                    </>
                  ) : (
                    <div className="text-2xl font-display text-primary-500 pt-5 tracking-wide">{formatRp(pkg.normalPrice)}</div>
                  )}
                </div>

                <ul className="flex-1 space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs uppercase tracking-wider text-white/70">
                      <div className="flex-shrink-0 mt-0.5 text-primary-500">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <p className="leading-snug">{feature}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOrder(pkg.name)}
                  className={`w-full flex items-center justify-center gap-3 py-4 border text-[11px] font-bold uppercase tracking-[0.15em] transition-colors
                    ${pkg.popular 
                      ? 'bg-primary-500 border-primary-500 text-[#050505] hover:bg-transparent hover:text-primary-500' 
                      : 'border-white/20 text-white hover:border-primary-500 hover:text-primary-500'}`}
                >
                  <WhatsappIcon size={16} />
                  Langganan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => handleOrder('promo terbaru')}
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        >
          <WhatsappIcon size={28} />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mb-6 transform -skew-x-6">
            <span className="font-display text-4xl tracking-tight text-white uppercase opacity-40">WIZ<span className="text-primary-500">NET</span></span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">© 2024 Wiznet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

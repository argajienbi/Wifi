import React, { useState } from 'react';
import { useAppContext, WifiPackage } from '../store/AppContext';
import { Settings, Image as ImageIcon, CheckCircle, Tag, Plus, Trash2, Edit2, Package as PackageIcon, ArrowLeft, Gamepad, Home, Building2, Zap, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { content, updateContent, packages, addPackage, updatePackage, deletePackage } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'content' | 'packages'>('content');
  const [editingPkg, setEditingPkg] = useState<WifiPackage | null>(null);
  
  // Package Form state
  const [pkgForm, setPkgForm] = useState<Partial<WifiPackage>>({});

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pengaturan konten berhasil disimpan!');
  };

  const openPkgForm = (pkg?: WifiPackage) => {
    if (pkg) {
      setEditingPkg(pkg);
      setPkgForm(pkg);
    } else {
      setEditingPkg(null);
      setPkgForm({
        name: '', speed: '', normalPrice: 0, promoPrice: null, features: [''], popular: false
      });
    }
  };

  const handlePkgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgForm.name || !pkgForm.speed || pkgForm.normalPrice === undefined) return;
    
    if (editingPkg) {
      updatePackage(editingPkg.id, pkgForm as WifiPackage);
    } else {
      addPackage({
        ...(pkgForm as WifiPackage),
        id: `pkg-${Date.now()}`
      });
    }
    setPkgForm({});
    setEditingPkg(null);
  };

  const updatePkgFeature = (index: number, val: string) => {
    const newFeatures = [...(pkgForm.features || [])];
    newFeatures[index] = val;
    setPkgForm({...pkgForm, features: newFeatures});
  };

  const addPkgFeature = () => {
    setPkgForm({...pkgForm, features: [...(pkgForm.features || []), '']});
  };

  const removePkgFeature = (index: number) => {
    const newFeatures = (pkgForm.features || []).filter((_, i) => i !== index);
    setPkgForm({...pkgForm, features: newFeatures});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg text-white">N</span>
            </div>
            NETGIGA Admin
          </h1>
        </div>
        <nav className="p-4 flex-1 space-y-1">
          <button 
            onClick={() => {setActiveTab('content'); setPkgForm({});}}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <ImageIcon size={18} />
            Pengaturan Teks & Promo
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'packages' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <PackageIcon size={18} />
            Kelola Paket
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white font-medium pb-2 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        {activeTab === 'content' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan Konten</h2>
            
            <form onSubmit={handleContentSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">
              {/* Teks Penjualan */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Hero & Penjualan</h3>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Judul Utama (Hero Title)</label>
                    <input 
                      type="text" 
                      value={content.heroTitle}
                      onChange={(e) => updateContent({ heroTitle: e.target.value })}
                      className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Sub-judul (Hero Subtitle)</label>
                    <textarea 
                      rows={3}
                      value={content.heroSubtitle}
                      onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                      className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">URL Gambar Hero</label>
                    <input 
                      type="text" 
                      value={content.heroImage}
                      onChange={(e) => updateContent({ heroImage: e.target.value })}
                      className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Nomor WhatsApp Pelanggan</label>
                    <input 
                      type="text" 
                      value={content.whatsappNumber}
                      onChange={(e) => updateContent({ whatsappNumber: e.target.value })}
                      className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                      placeholder="6281234..."
                    />
                  </div>
                </div>
              </div>

              {/* Promo Global */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Pengaturan Promo Bulan Ini</h3>
                <div className="grid gap-6">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="promoActive"
                      checked={content.promoActive}
                      onChange={(e) => updateContent({ promoActive: e.target.checked })}
                      className="w-5 h-5 text-primary-600 border-slate-300 focus:ring-primary-500"
                    />
                    <label htmlFor="promoActive" className="text-sm font-semibold text-slate-700">Aktifkan Banner Promo</label>
                  </div>
                  {content.promoActive && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Teks Banner Promo</label>
                      <input 
                        type="text" 
                        value={content.promoText}
                        onChange={(e) => updateContent({ promoText: e.target.value })}
                        className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-md hover:bg-primary-700 font-medium text-sm shadow-sm shadow-primary-200">
                  <CheckCircle size={16} />
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kelola Paket WiFi</h2>
              {!pkgForm.name && pkgForm.name !== '' && (
                <button onClick={() => openPkgForm()} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-md hover:bg-primary-700 font-medium text-sm shadow-sm shadow-primary-200">
                  <Plus size={16} />
                  Tambah Paket
                </button>
              )}
            </div>

            {pkgForm.name !== undefined ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 pb-4 border-b border-slate-100">{editingPkg ? 'Edit Paket' : 'Tambah Paket Baru'}</h3>
                <form onSubmit={handlePkgSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Paket</label>
                      <input required type="text" value={pkgForm.name || ''} onChange={e => setPkgForm({...pkgForm, name: e.target.value})} className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Contoh: Paket Standar" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Kecepatan (Label)</label>
                      <input required type="text" value={pkgForm.speed || ''} onChange={e => setPkgForm({...pkgForm, speed: e.target.value})} className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Contoh: 100 Mbps" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Harga Dasar (Rp)</label>
                      <input required type="number" value={pkgForm.normalPrice || ''} onChange={e => setPkgForm({...pkgForm, normalPrice: parseInt(e.target.value)})} className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Harga Diskon Spesial (Opsional)</label>
                      <input type="number" value={pkgForm.promoPrice || ''} onChange={e => setPkgForm({...pkgForm, promoPrice: e.target.value ? parseInt(e.target.value) : null})} className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Kosongkan jika tidak ada diskon"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Ikon Paket</label>
                      <select required value={pkgForm.icon || 'wifi'} onChange={e => setPkgForm({...pkgForm, icon: e.target.value})} className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none">
                        <option value="wifi">Sinyal / WiFi</option>
                        <option value="zap">Petir / Super Cepat</option>
                        <option value="gamepad">Gamepad / Gaming</option>
                        <option value="home">Rumah / Basic</option>
                        <option value="building">Gedung / Bisnis</option>
                        <option value="custom">Custom URL Gambar...</option>
                      </select>
                    </div>
                    {pkgForm.icon === 'custom' && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">URL Gambar Kustom</label>
                        <input required type="text" value={pkgForm.imageUrl || ''} onChange={e => setPkgForm({...pkgForm, imageUrl: e.target.value})} className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none" placeholder="https://..." />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 flex justify-between items-end">
                      Fitur / Benefit Paket
                    </label>
                    <div className="space-y-3 mt-2">
                      {pkgForm.features?.map((feat, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={feat} onChange={e => updatePkgFeature(i, e.target.value)} placeholder={`Fitur ${i+1}`} className="flex-1 text-sm border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none" />
                          <button type="button" onClick={() => removePkgFeature(i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={addPkgFeature} className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 mt-2">
                        <Plus size={14} /> Tambah Fitur
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="isPopular" checked={pkgForm.popular || false} onChange={e => setPkgForm({...pkgForm, popular: e.target.checked})} className="w-4 h-4 text-primary-600 border-slate-300" />
                    <label htmlFor="isPopular" className="text-sm font-semibold text-slate-700">Tandai sebagai Paket "Terlaris" (Highlight UI Gelap)</label>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                    <button type="button" onClick={() => setPkgForm({})} className="px-4 py-2 text-sm border border-slate-300 rounded-md hover:bg-slate-50 font-medium">
                      Batal
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 font-medium shadow-sm shadow-primary-200">
                      Simpan Paket
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative">
                    {pkg.popular && <div className="absolute -top-3 -right-3 bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10"><Tag size={10} className="inline mr-1" />Terlaris</div>}
                    
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-800">{pkg.name}</h3>
                      {pkg.icon === 'custom' && pkg.imageUrl ? (
                        <img src={pkg.imageUrl} alt={pkg.name} className="w-8 h-8 object-contain rounded border border-slate-100" />
                      ) : (
                        <div className="text-primary-500 w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                          {pkg.icon === 'zap' ? <Zap size={16} /> : pkg.icon === 'gamepad' ? <Gamepad size={16} /> : pkg.icon === 'home' ? <Home size={16} /> : pkg.icon === 'building' ? <Building2 size={16} /> : <Wifi size={16} />}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-2xl font-black text-primary-600 my-1">{pkg.speed}</div>
                    <div className="text-slate-400 text-xs line-through">Rp{pkg.normalPrice.toLocaleString('id-ID')}</div>
                    {pkg.promoPrice ? <div className="text-slate-900 font-bold text-lg">Rp{pkg.promoPrice.toLocaleString('id-ID')}</div> : <div className="text-slate-900 font-bold text-lg">Rp{pkg.normalPrice.toLocaleString('id-ID')}</div>}
                    
                    <ul className="text-xs text-slate-500 mt-4 space-y-2 mb-6">
                      {pkg.features.slice(0, 3).map((f, i) => <li key={i} className="truncate flex items-center gap-2"><span className="text-emerald-400 font-bold text-[8px]">✓</span> {f}</li>)}
                      {pkg.features.length > 3 && <li className="pl-4 italic text-slate-400">...dan {pkg.features.length - 3} lainnya</li>}
                    </ul>

                    <div className="flex gap-2 border-t border-slate-100 pt-4">
                      <button onClick={() => openPkgForm(pkg)} className="flex-1 flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 py-2 rounded border border-transparent hover:border-primary-200 transition-colors">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button onClick={() => {if(window.confirm('Hapus paket ini?')) deletePackage(pkg.id)}} className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-2 rounded hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

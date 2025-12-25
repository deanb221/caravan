'use client';

import { useState, useEffect } from 'react';
import { caravans as initialCaravans } from '@/data/caravans';
import { caravanSites as initialSites } from '@/data/caravanSites';
import { Caravan } from '@/types';
import { CaravanSite } from '@/types';
import Image from 'next/image';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'caravans' | 'sites'>('caravans');
  const [caravans, setCaravans] = useState<Caravan[]>([]);
  const [sites, setSites] = useState<CaravanSite[]>([]);
  const [editingCaravan, setEditingCaravan] = useState<Caravan | null>(null);
  const [editingSite, setEditingSite] = useState<CaravanSite | null>(null);
  const [showCaravanForm, setShowCaravanForm] = useState(false);
  const [showSiteForm, setShowSiteForm] = useState(false);

  useEffect(() => {
    // Load from localStorage or use initial data
    const savedCaravans = localStorage.getItem('admin_caravans');
    const savedSites = localStorage.getItem('admin_sites');
    
    if (savedCaravans) {
      setCaravans(JSON.parse(savedCaravans));
    } else {
      setCaravans(initialCaravans);
    }
    
    if (savedSites) {
      setSites(JSON.parse(savedSites));
    } else {
      setSites(initialSites);
    }
  }, []);

  const saveCaravans = async (newCaravans: Caravan[]) => {
    setCaravans(newCaravans);
    localStorage.setItem('admin_caravans', JSON.stringify(newCaravans));
    
    // Also save to server (JSON file)
    try {
      const response = await fetch('/api/data/caravans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCaravans),
      });
      if (response.ok) {
        console.log('Caravans saved to server');
      }
    } catch (error) {
      console.error('Error saving to server:', error);
    }
  };

  const saveSites = async (newSites: CaravanSite[]) => {
    setSites(newSites);
    localStorage.setItem('admin_sites', JSON.stringify(newSites));
    
    // Also save to server (JSON file)
    try {
      const response = await fetch('/api/data/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSites),
      });
      if (response.ok) {
        console.log('Sites saved to server');
      }
    } catch (error) {
      console.error('Error saving to server:', error);
    }
  };

  const exportData = () => {
    const data = {
      caravans,
      sites,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caravan-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const updateLiveSite = async () => {
    try {
      // Save to server JSON files
      const [caravansRes, sitesRes] = await Promise.all([
        fetch('/api/data/caravans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(caravans),
        }),
        fetch('/api/data/sites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sites),
        }),
      ]);
      
      if (caravansRes.ok && sitesRes.ok) {
        // Also export for manual backup
        exportData();
        alert('✅ Data saved to server!\n\nNext steps:\n1. The JSON files have been updated\n2. Commit and push to git:\n   git add data/caravans.json data/caravanSites.json\n   git commit -m "Update caravan data"\n   git push\n3. Vercel will rebuild automatically\n4. Request Google re-indexing after deployment');
      } else {
        throw new Error('Failed to save to server');
      }
    } catch (error) {
      console.error('Error updating live site:', error);
      // Fallback to export
      exportData();
      alert('⚠️ Could not save to server automatically.\n\nData has been exported. Please:\n1. Open data/caravans.json and data/caravanSites.json\n2. Replace their contents with the exported data\n3. Commit and push to git');
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.caravans && Array.isArray(data.caravans)) {
          saveCaravans(data.caravans);
        }
        if (data.sites && Array.isArray(data.sites)) {
          saveSites(data.sites);
        }
        alert('Data imported successfully!');
        window.location.reload();
      } catch (error) {
        alert('Error importing data. Please check the file format.');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteCaravan = (id: string) => {
    if (confirm('Are you sure you want to delete this caravan?')) {
      saveCaravans(caravans.filter(c => c.id !== id));
    }
  };

  const handleDeleteSite = (id: string) => {
    if (confirm('Are you sure you want to delete this caravan site?')) {
      saveSites(sites.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Admin Dashboard</h1>
          <p className="text-xl text-primary-100 font-medium tracking-tight">
            Manage touring caravans and caravan sites
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Export/Import Controls */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Data Management</h3>
                <p className="text-sm text-gray-600">
                  Export your data to update the live site, or import previously exported data.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold text-sm"
                >
                  📥 Export Data
                </button>
                <label className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 font-semibold text-sm cursor-pointer">
                  📤 Import Data
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('caravans')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'caravans'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Touring Caravans ({caravans.length})
            </button>
            <button
              onClick={() => setActiveTab('sites')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'sites'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Caravan Sites ({sites.length})
            </button>
          </div>

          {/* Caravans Tab */}
          {activeTab === 'caravans' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Touring Caravans</h2>
                <button
                  onClick={() => {
                    setEditingCaravan(null);
                    setShowCaravanForm(true);
                  }}
                  className="btn-primary"
                >
                  + Add New Caravan
                </button>
              </div>

              {showCaravanForm && (
                <CaravanForm
                  caravan={editingCaravan}
                  caravans={caravans}
                  onSave={(caravan) => {
                    if (editingCaravan) {
                      saveCaravans(caravans.map(c => c.id === caravan.id ? caravan : c));
                    } else {
                      saveCaravans([...caravans, caravan]);
                    }
                    setShowCaravanForm(false);
                    setEditingCaravan(null);
                  }}
                  onCancel={() => {
                    setShowCaravanForm(false);
                    setEditingCaravan(null);
                  }}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caravans.map(caravan => (
                  <div key={caravan.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={caravan.images[0]}
                        alt={caravan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{caravan.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{caravan.shortDescription}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span>Sleeps {caravan.sleeps}</span>
                        <span>{caravan.berths} Berths</span>
                        {caravan.petFriendly && <span className="text-primary-600">Pet Friendly</span>}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCaravan(caravan);
                            setShowCaravanForm(true);
                          }}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCaravan(caravan.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sites Tab */}
          {activeTab === 'sites' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Caravan Sites</h2>
                <button
                  onClick={() => {
                    setEditingSite(null);
                    setShowSiteForm(true);
                  }}
                  className="btn-primary"
                >
                  + Add New Site
                </button>
              </div>

              {showSiteForm && (
                <SiteForm
                  site={editingSite}
                  sites={sites}
                  onSave={(site) => {
                    if (editingSite) {
                      saveSites(sites.map(s => s.id === site.id ? site : s));
                    } else {
                      saveSites([...sites, site]);
                    }
                    setShowSiteForm(false);
                    setEditingSite(null);
                  }}
                  onCancel={() => {
                    setShowSiteForm(false);
                    setEditingSite(null);
                  }}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map(site => (
                  <div key={site.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={site.image}
                        alt={site.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{site.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{site.location}</p>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{site.description}</p>
                      {site.rating && (
                        <div className="flex items-center space-x-1 mb-4">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-semibold">{site.rating}</span>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingSite(site);
                            setShowSiteForm(true);
                          }}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSite(site.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Caravan Form Component
function CaravanForm({ 
  caravan, 
  caravans, 
  onSave, 
  onCancel 
}: { 
  caravan: Caravan | null; 
  caravans: Caravan[];
  onSave: (caravan: Caravan) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Caravan>>({
    id: caravan?.id || `caravan-${Date.now()}`,
    name: caravan?.name || '',
    slug: caravan?.slug || '',
    description: caravan?.description || '',
    shortDescription: caravan?.shortDescription || '',
    sleeps: caravan?.sleeps || 2,
    berths: caravan?.berths || 2,
    images: caravan?.images || [''],
    features: caravan?.features || [],
    petFriendly: caravan?.petFriendly || false,
    pricing: caravan?.pricing || {
      weekend: 90,
      weekly: 400,
      peakSeason: 110,
    },
    availability: caravan?.availability || { bookedDates: [] },
  });

  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: number]: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug from name if not provided
    if (!formData.slug && formData.name) {
      formData.slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    // Ensure images array has at least one image
    if (!formData.images || formData.images.length === 0 || formData.images[0] === '') {
      alert('Please add at least one image URL');
      return;
    }

    onSave(formData as Caravan);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    });
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), newImage.trim()],
      });
      setNewImage('');
    }
  };

  const handleImageUpload = async (file: File, index?: number) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }

    setUploading(true);
    if (index !== undefined) {
      setUploadProgress({ ...uploadProgress, [index]: true });
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        try {
          // Upload to API
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
          });

          const data = await response.json();

          if (data.success && data.url) {
            if (index !== undefined) {
              // Update existing image
              const newImages = [...(formData.images || [])];
              newImages[index] = data.url;
              setFormData({ ...formData, images: newImages });
              setUploadProgress({ ...uploadProgress, [index]: false });
            } else {
              // Add new image
              setFormData({
                ...formData,
                images: [...(formData.images || []), data.url],
              });
            }
          } else {
            alert('Failed to upload image. Please try again.');
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Error uploading image. Please try again.');
        } finally {
          setUploading(false);
          if (index !== undefined) {
            setUploadProgress({ ...uploadProgress, [index]: false });
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading image file. Please try again.');
      setUploading(false);
      if (index !== undefined) {
        setUploadProgress({ ...uploadProgress, [index]: false });
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index) || [],
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
        {caravan ? 'Edit Caravan' : 'Add New Caravan'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="auto-generated from name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
          <input
            type="text"
            required
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sleeps *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.sleeps}
              onChange={(e) => setFormData({ ...formData, sleeps: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Berths *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.berths}
              onChange={(e) => setFormData({ ...formData, berths: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="petFriendly"
            checked={formData.petFriendly}
            onChange={(e) => setFormData({ ...formData, petFriendly: e.target.checked })}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
          <label htmlFor="petFriendly" className="ml-2 text-sm font-semibold text-gray-700">
            Pet Friendly
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Images *</label>
          <div className="space-y-3">
            {formData.images?.map((img, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => {
                      const newImages = [...(formData.images || [])];
                      newImages[idx] = e.target.value;
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Image URL"
                  />
                  <label className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors font-semibold cursor-pointer">
                    {uploadProgress[idx] ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, idx);
                      }}
                      disabled={uploading || uploadProgress[idx]}
                    />
                  </label>
                  {formData.images && formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {img && (
                  <div className="relative h-32 w-full rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', img);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex space-x-2">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Or paste image URL"
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <label className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold cursor-pointer">
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={uploading}
                />
              </label>
              <button
                type="button"
                onClick={addImage}
                disabled={!newImage.trim()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add URL
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Upload images (max 10MB) or paste image URLs. At least one image is required.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
          <div className="space-y-2 mb-2">
            {formData.features?.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="flex-1 px-4 py-2 bg-gray-50 rounded-lg">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              placeholder="Add feature"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weekend Price</label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricing?.weekend}
              onChange={(e) => setFormData({
                ...formData,
                pricing: { ...formData.pricing!, weekend: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weekly Price</label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricing?.weekly}
              onChange={(e) => setFormData({
                ...formData,
                pricing: { ...formData.pricing!, weekly: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Peak Season</label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricing?.peakSeason}
              onChange={(e) => setFormData({
                ...formData,
                pricing: { ...formData.pricing!, peakSeason: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="btn-primary flex-1">
            {caravan ? 'Update Caravan' : 'Add Caravan'}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Site Form Component
function SiteForm({ 
  site, 
  sites, 
  onSave, 
  onCancel 
}: { 
  site: CaravanSite | null; 
  sites: CaravanSite[];
  onSave: (site: CaravanSite) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<CaravanSite>>({
    id: site?.id || `site-${Date.now()}`,
    name: site?.name || '',
    location: site?.location || '',
    description: site?.description || '',
    image: site?.image || '',
    website: site?.website || '',
    features: site?.features || [],
    rating: site?.rating,
    facilities: site?.facilities || [],
  });

  const [newFeature, setNewFeature] = useState('');
  const [newFacility, setNewFacility] = useState('');
  const [uploadingSiteImage, setUploadingSiteImage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as CaravanSite);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    });
  };

  const addFacility = () => {
    if (newFacility.trim()) {
      setFormData({
        ...formData,
        facilities: [...(formData.facilities || []), newFacility.trim()],
      });
      setNewFacility('');
    }
  };

  const removeFacility = (index: number) => {
    setFormData({
      ...formData,
      facilities: formData.facilities?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSiteImageUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }

    setUploadingSiteImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
          });

          const data = await response.json();

          if (data.success && data.url) {
            setFormData({ ...formData, image: data.url });
          } else {
            alert('Failed to upload image. Please try again.');
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Error uploading image. Please try again.');
        } finally {
          setUploadingSiteImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading image file. Please try again.');
      setUploadingSiteImage(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
        {site ? 'Edit Caravan Site' : 'Add New Caravan Site'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image *</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Image URL"
                />
                <label className="px-4 py-3 bg-secondary-600 text-white rounded-xl hover:bg-secondary-700 transition-colors font-semibold cursor-pointer">
                  {uploadingSiteImage ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleSiteImageUpload(file);
                    }}
                    disabled={uploadingSiteImage}
                  />
                </label>
              </div>
              {formData.image && (
                <div className="relative h-32 w-full rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={formData.image}
                    alt="Site preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', formData.image);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL *</label>
            <input
              type="url"
              required
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (optional)</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating || ''}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
          <div className="space-y-2 mb-2">
            {formData.features?.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="flex-1 px-4 py-2 bg-gray-50 rounded-lg">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              placeholder="Add feature"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Facilities</label>
          <div className="space-y-2 mb-2">
            {formData.facilities?.map((facility, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="flex-1 px-4 py-2 bg-gray-50 rounded-lg">{facility}</span>
                <button
                  type="button"
                  onClick={() => removeFacility(idx)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFacility())}
              placeholder="Add facility"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={addFacility}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="btn-primary flex-1">
            {site ? 'Update Site' : 'Add Site'}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}







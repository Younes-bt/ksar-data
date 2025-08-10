import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Users, Info, Map } from 'lucide-react';

const HistoricalMap = ({ data, loading, t, language, theme }) => {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  // Use data from props instead of fetching internally
  const placesData = data || [];

  // Initialize map
  useEffect(() => {
    const initializeMap = async () => {
      // Load Leaflet dynamically
      if (typeof window !== 'undefined' && !leafletRef.current) {
        // Add Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css';
        document.head.appendChild(link);

        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js';
        script.onload = () => {
          leafletRef.current = window.L;
          createMap();
        };
        document.head.appendChild(script);
      } else if (leafletRef.current) {
        createMap();
      }
    };

    const createMap = () => {
      if (!mapRef.current || !leafletRef.current) return;

      // Clear existing map if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize map centered on Ksar El Kebir
      const map = leafletRef.current.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
      }).setView([35.0018, -5.9063], 15);

      mapInstanceRef.current = map;

      // Add terrain tile layer (fixed as default)
      leafletRef.current.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap contributors',
        maxZoom: 17,
        tileSize: 256,
        zoomOffset: 0
      }).addTo(map);

      // Add markers for each historical place with custom images
      placesData.forEach((place, index) => {
        if (place.coordinates) {
          let markerIcon;
          
          // Create custom icon with image if available
          if (place.image_url) {
            markerIcon = leafletRef.current.divIcon({
              html: `
                <div class="custom-marker-container">
                  <div class="marker-image-wrapper">
                    <img src="${place.image_url}" 
                         alt="${place.name?.en || place.name || 'Historical Place'}" 
                         class="marker-image"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                    <div class="marker-fallback" style="display: none;">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div class="marker-pointer"></div>
                </div>
                <style>
                  .custom-marker-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }
                  .marker-image-wrapper {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    overflow: hidden;
                    background: #3B82F6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  .marker-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                  .marker-fallback {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #3B82F6;
                  }
                  .marker-pointer {
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 12px solid white;
                    margin-top: -2px;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                  }
                  .custom-marker-container:hover .marker-image-wrapper {
                    transform: scale(1.1);
                    transition: transform 0.2s ease;
                  }
                </style>
              `,
              className: 'custom-image-marker',
              iconSize: [50, 65],
              iconAnchor: [25, 62],
              popupAnchor: [0, -60]
            });
          } else {
            // Fallback to default icon if no image
            markerIcon = leafletRef.current.divIcon({
              html: `<div class="bg-blue-600 rounded-full p-3 shadow-lg border-3 border-white">
                       <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                         <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                       </svg>
                     </div>`,
              className: 'custom-marker',
              iconSize: [40, 40],
              iconAnchor: [20, 20]
            });
          }

          const marker = leafletRef.current.marker(place.coordinates, { icon: markerIcon })
            .addTo(map)
            .on('click', () => {
              setSelectedPlace(place);
            });
        }
      });

      setIsMapLoading(false);
    };

    initializeMap();
  }, [placesData]); // Re-run when places data changes

  const closeModal = () => {
    setSelectedPlace(null);
  };

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'hotel':
        return '🏨';
      case 'mosque':
        return '🕌';
      case 'market':
        return '🏪';
      default:
        return '🏛️';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'hotel':
        return 'bg-blue-100 text-blue-800';
      case 'mosque':
        return 'bg-green-100 text-green-800';
      case 'market':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div style={language === 'ar' ? 
          { fontFamily: 'Noto Kufi Arabic, sans-serif' } : 
          { fontFamily: 'Inter, sans-serif', direction:'ltr' }
        } className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'} text-center shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl font-bold ">
                {language === 'ar' ? 'الأماكن التاريخية في القصر الكبير' :
                 language === 'fr' ? 'Lieux Historiques de Ksar El Kebir' :
                 'Historical Places of Ksar El Kebir'}
              </h1>
              <p className=" mt-1">
                {language === 'ar' ? 'اكتشف التراث الغني لمدينة القصر الكبير' :
                 language === 'fr' ? 'Découvrez le riche patrimoine de Ksar El Kebir' :
                 'Discover the rich heritage of Ksar El Kebir'}
              </p>
            </div>
            
            {/* Places Count */}
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Map className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                {placesData.length} {language === 'ar' ? 'مكان تاريخي' : language === 'fr' ? 'lieux historiques' : 'historical places'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        {(loading || isMapLoading) && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {loading ? 
                  (language === 'ar' ? 'جاري تحميل البيانات...' :
                   language === 'fr' ? 'Chargement des données...' :
                   'Loading data...') :
                  (language === 'ar' ? 'جاري تحميل الخريطة...' :
                   language === 'fr' ? 'Chargement de la carte...' :
                   'Loading map...')
                }
              </p>
            </div>
          </div>
        )}
        
        <div 
          ref={mapRef} 
          className="w-full h-[calc(100vh-120px)] bg-gray-200 relative"
          style={{ minHeight: '500px', zIndex: 1 }}
        />
      </div>

      {/* Place Details Modal */}
      {selectedPlace && (
        <>
          {/* Backdrop with higher z-index */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            onClick={closeModal}
          ></div>
          
          {/* Modal content with highest z-index */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] pointer-events-none">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-start p-6 border-b">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(selectedPlace.type)}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedPlace.name?.[language] || selectedPlace.name || 'Unknown Place'}
                    </h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedPlace.type)}`}>
                      {selectedPlace.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                {/* Location */}
                {selectedPlace.location && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'ar' ? 'الموقع' :
                         language === 'fr' ? 'Emplacement' :
                         'Location'}
                      </h3>
                      <p className="text-gray-700">
                        {typeof selectedPlace.location === 'object' 
                          ? selectedPlace.location[language] || selectedPlace.location.en || selectedPlace.location.ar
                          : selectedPlace.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Ownership */}
                {selectedPlace.ownership && (
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'ar' ? 'الملكية' :
                         language === 'fr' ? 'Propriété' :
                         'Ownership'}
                      </h3>
                      <p className="text-gray-700">
                        {typeof selectedPlace.ownership === 'object' 
                          ? selectedPlace.ownership[language] || selectedPlace.ownership.en || selectedPlace.ownership.ar
                          : selectedPlace.ownership}
                      </p>
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedPlace.description && (
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'ar' ? 'الوصف' :
                         language === 'fr' ? 'Description' :
                         'Description'}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {typeof selectedPlace.description === 'object' 
                          ? selectedPlace.description[language] || selectedPlace.description.en || selectedPlace.description.ar
                          : selectedPlace.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Price */}
                {selectedPlace.price && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        {language === 'ar' ? 'السعر' :
                         language === 'fr' ? 'Prix' :
                         'Price'}:
                      </span>
                      <span className="text-gray-700">
                        {typeof selectedPlace.price === 'object' 
                          ? selectedPlace.price[language] || selectedPlace.price.en || selectedPlace.price.ar
                          : selectedPlace.price}
                      </span>
                    </div>
                  </div>
                )}

                {/* Source */}
                {selectedPlace.source_page && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'المصدر: ' :
                       language === 'fr' ? 'Source: ' :
                       'Source: '} {selectedPlace.source_page}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoricalMap;
'use client';

import { useEffect, useRef } from 'react';
import type { Location } from '@/lib/data/locations';

type LocationsMapProps = {
  locations: Location[];
};

export default function LocationsMap({ locations }: LocationsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      // @ts-expect-error - Leaflet internal property access
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [30.5, 72.0],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors © CARTO',
      }).addTo(map);

      locations.forEach((loc) => {
        const icon = L.divIcon({
          html: `<div style="background:${loc.isOpen ? '#D62828' : '#6E6557'};width:14px;height:14px;clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,0 100%);"></div>`,
          className: '',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${loc.name}</strong><br/>${loc.address}`);
      });

      mapInstanceRef.current = map;
    });
  }, [locations]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: 320 }} aria-label="Map of D2P Foods locations" role="img" />
    </>
  );
}

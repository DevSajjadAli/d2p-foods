'use client';

import { useEffect, useRef } from 'react';

type OrderMapProps = {
  statusIndex: number;
};

// Lahore coordinates for mock delivery
const RESTAURANT = { lat: 31.5204, lng: 74.3587 };
const CUSTOMER = { lat: 31.5350, lng: 74.3782 };

// Interpolate rider position based on status
function getRiderPosition(statusIndex: number) {
  if (statusIndex === 0) return RESTAURANT;
  if (statusIndex === 1) return RESTAURANT;
  if (statusIndex === 3) return CUSTOMER;
  // Out for delivery: halfway
  return {
    lat: (RESTAURANT.lat + CUSTOMER.lat) / 2,
    lng: (RESTAURANT.lng + CUSTOMER.lng) / 2,
  };
}

export default function OrderMap({ statusIndex }: OrderMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const riderMarkerRef = useRef<import('leaflet').Marker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Dynamically import leaflet
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return;

      // Fix default icon paths
      // @ts-expect-error - Leaflet internal property access
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [31.527, 74.368],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Restaurant marker (red)
      const restaurantIcon = L.divIcon({
        html: '<div style="background:#D62828;width:16px;height:16px;clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,0 100%);"></div>',
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      L.marker([RESTAURANT.lat, RESTAURANT.lng], { icon: restaurantIcon })
        .addTo(map)
        .bindPopup('D2P Foods Restaurant');

      // Customer marker
      const customerIcon = L.divIcon({
        html: '<div style="background:#1B1714;width:16px;height:16px;border-radius:50%;border:3px solid #E7E1D3;"></div>',
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      L.marker([CUSTOMER.lat, CUSTOMER.lng], { icon: customerIcon })
        .addTo(map)
        .bindPopup('Delivery Address');

      // Rider marker (animated dot)
      const riderPos = getRiderPosition(statusIndex);
      const riderIcon = L.divIcon({
        html: '<div style="background:#D62828;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(214,40,40,0.6);"></div>',
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      const riderMarker = L.marker([riderPos.lat, riderPos.lng], { icon: riderIcon }).addTo(map);
      riderMarkerRef.current = riderMarker;

      mapInstanceRef.current = map;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update rider position on status change
  useEffect(() => {
    if (!riderMarkerRef.current) return;
    const pos = getRiderPosition(statusIndex);
    riderMarkerRef.current.setLatLng([pos.lat, pos.lng]);
  }, [statusIndex]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} aria-label="Delivery tracking map" role="img" />
    </>
  );
}

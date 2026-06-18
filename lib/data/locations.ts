export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: { weekday: string; weekend: string };
  lat: number;
  lng: number;
  isOpen: boolean;
};

export const locations: Location[] = [
  {
    id: 'gulberg',
    name: 'D2P Foods Gulberg',
    address: 'Main Gulberg Boulevard, Gulberg III',
    city: 'Lahore',
    phone: '+92 42 3571 1234',
    hours: { weekday: '11:00 AM – 12:00 AM', weekend: '11:00 AM – 1:00 AM' },
    lat: 31.5204,
    lng: 74.3587,
    isOpen: true,
  },
  {
    id: 'dha-lahore',
    name: 'D2P Foods DHA Lahore',
    address: 'Phase 6, DHA, Main Khayaban-e-Iqbal',
    city: 'Lahore',
    phone: '+92 42 3571 5678',
    hours: { weekday: '12:00 PM – 11:30 PM', weekend: '12:00 PM – 12:30 AM' },
    lat: 31.4697,
    lng: 74.4032,
    isOpen: true,
  },
  {
    id: 'clifton',
    name: 'D2P Foods Clifton',
    address: 'Block 9, Clifton, near Do Darya',
    city: 'Karachi',
    phone: '+92 21 3571 9012',
    hours: { weekday: '12:00 PM – 1:00 AM', weekend: '12:00 PM – 2:00 AM' },
    lat: 24.8138,
    lng: 67.0299,
    isOpen: true,
  },
  {
    id: 'f7',
    name: 'D2P Foods F-7',
    address: 'F-7 Markaz, Jinnah Super Market',
    city: 'Islamabad',
    phone: '+92 51 3571 3456',
    hours: { weekday: '11:30 AM – 11:00 PM', weekend: '11:30 AM – 12:00 AM' },
    lat: 33.7215,
    lng: 73.0682,
    isOpen: false,
  },
  {
    id: 'bahria',
    name: 'D2P Foods Bahria Town',
    address: 'Civic Centre, Phase 4, Bahria Town',
    city: 'Rawalpindi',
    phone: '+92 51 3571 7890',
    hours: { weekday: '12:00 PM – 11:00 PM', weekend: '12:00 PM – 12:00 AM' },
    lat: 33.5651,
    lng: 72.9779,
    isOpen: true,
  },
];

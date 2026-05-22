import { Vehicle } from '@/types';

// Reliable local images per category
const IMG = {
  economy:  '/images/car-economy.jpg',
  compact:  '/images/car-compact.jpg',
  sedan:    '/images/car-sedan.jpg',
  suv:      '/images/car-suv.jpg',
  luxury:   '/images/car-luxury.jpg',
  van:      '/images/car-van.jpg',
  sports:   '/images/car-sports.jpg',
  electric: '/images/car-electric.jpg',
};

export const VEHICLE_IMAGES: Record<string, string[]> = {
  economy:  [IMG.economy],
  compact:  [IMG.compact],
  sedan:    [IMG.sedan],
  suv:      [IMG.suv],
  luxury:   [IMG.luxury],
  van:      [IMG.van],
  sports:   [IMG.sports],
  electric: [IMG.electric],
};

function img(category: string): string[] {
  const key = category.toLowerCase();
  return VEHICLE_IMAGES[key] || [IMG.sedan];
}

export const initialVehicles: Vehicle[] = [
  // ── Economy ──────────────────────────────────────
  {
    id: 'v001', make: 'Toyota', model: 'Yaris', year: 2024, daily_rate: 35,
    category: 'Economy', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 2, ac: true, gps: false },
    image_urls: img('economy'), status: 'available', color: 'White', plate: 'ECO-001', mileage: 12400,
  },
  {
    id: 'v002', make: 'Honda', model: 'Fit', year: 2024, daily_rate: 32,
    category: 'Economy', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 2, ac: true, gps: false },
    image_urls: img('economy'), status: 'available', color: 'Silver', plate: 'ECO-002', mileage: 8700,
  },
  {
    id: 'v003', make: 'Kia', model: 'Rio', year: 2023, daily_rate: 30,
    category: 'Economy', specs: { fuel: 'Gasoline', transmission: 'Manual', seats: 5, doors: 4, luggage: 2, ac: true, gps: false },
    image_urls: img('economy'), status: 'available', color: 'Blue', plate: 'ECO-003', mileage: 21000,
  },
  {
    id: 'v004', make: 'Hyundai', model: 'Accent', year: 2024, daily_rate: 33,
    category: 'Economy', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 2, ac: true, gps: true },
    image_urls: img('economy'), status: 'available', color: 'Red', plate: 'ECO-004', mileage: 5300,
  },

  // ── Compact ──────────────────────────────────────
  {
    id: 'v005', make: 'Volkswagen', model: 'Golf', year: 2024, daily_rate: 45,
    category: 'Compact', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('compact'), status: 'available', color: 'Black', plate: 'CMP-001', mileage: 15600,
  },
  {
    id: 'v006', make: 'Toyota', model: 'Corolla', year: 2024, daily_rate: 48,
    category: 'Compact', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('compact'), status: 'available', color: 'Gray', plate: 'CMP-002', mileage: 9800,
  },
  {
    id: 'v007', make: 'Honda', model: 'Civic', year: 2024, daily_rate: 47,
    category: 'Compact', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('compact'), status: 'available', color: 'White', plate: 'CMP-003', mileage: 11200,
  },
  {
    id: 'v008', make: 'Mazda', model: '3', year: 2024, daily_rate: 50,
    category: 'Compact', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('compact'), status: 'maintenance', color: 'Red', plate: 'CMP-004', mileage: 18500,
  },

  // ── Sedan ────────────────────────────────────────
  {
    id: 'v009', make: 'Toyota', model: 'Camry', year: 2024, daily_rate: 65,
    category: 'Sedan', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('sedan'), status: 'available', color: 'Silver', plate: 'SDN-001', mileage: 7600,
  },
  {
    id: 'v010', make: 'Honda', model: 'Accord', year: 2024, daily_rate: 62,
    category: 'Sedan', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('sedan'), status: 'available', color: 'Black', plate: 'SDN-002', mileage: 13400,
  },
  {
    id: 'v011', make: 'Nissan', model: 'Altima', year: 2023, daily_rate: 58,
    category: 'Sedan', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('sedan'), status: 'available', color: 'Blue', plate: 'SDN-003', mileage: 25000,
  },
  {
    id: 'v012', make: 'Hyundai', model: 'Sonata', year: 2024, daily_rate: 60,
    category: 'Sedan', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('sedan'), status: 'available', color: 'White', plate: 'SDN-004', mileage: 6200,
  },

  // ── SUV ──────────────────────────────────────────
  {
    id: 'v013', make: 'Toyota', model: 'RAV4', year: 2024, daily_rate: 75,
    category: 'SUV', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 5, doors: 4, luggage: 5, ac: true, gps: true },
    image_urls: img('suv'), status: 'available', color: 'Green', plate: 'SUV-001', mileage: 8900,
  },
  {
    id: 'v014', make: 'Ford', model: 'Explorer', year: 2024, daily_rate: 85,
    category: 'SUV', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 7, doors: 4, luggage: 5, ac: true, gps: true },
    image_urls: img('suv'), status: 'available', color: 'Black', plate: 'SUV-002', mileage: 14500,
  },
  {
    id: 'v015', make: 'Jeep', model: 'Grand Cherokee', year: 2024, daily_rate: 90,
    category: 'SUV', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 5, ac: true, gps: true },
    image_urls: img('suv'), status: 'available', color: 'White', plate: 'SUV-003', mileage: 11000,
  },
  {
    id: 'v016', make: 'Chevrolet', model: 'Tahoe', year: 2024, daily_rate: 110,
    category: 'SUV', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 8, doors: 4, luggage: 6, ac: true, gps: true },
    image_urls: img('suv'), status: 'available', color: 'Gray', plate: 'SUV-004', mileage: 19200,
  },
  {
    id: 'v017', make: 'Hyundai', model: 'Tucson', year: 2024, daily_rate: 72,
    category: 'SUV', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('suv'), status: 'available', color: 'Red', plate: 'SUV-005', mileage: 3400,
  },

  // ── Luxury ───────────────────────────────────────
  {
    id: 'v018', make: 'BMW', model: '5 Series', year: 2024, daily_rate: 150,
    category: 'Luxury', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('luxury'), status: 'available', color: 'Black', plate: 'LUX-001', mileage: 5600,
  },
  {
    id: 'v019', make: 'Mercedes-Benz', model: 'E-Class', year: 2024, daily_rate: 160,
    category: 'Luxury', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('luxury'), status: 'available', color: 'Silver', plate: 'LUX-002', mileage: 8200,
  },
  {
    id: 'v020', make: 'Audi', model: 'A6', year: 2024, daily_rate: 155,
    category: 'Luxury', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('luxury'), status: 'available', color: 'White', plate: 'LUX-003', mileage: 4100,
  },
  {
    id: 'v021', make: 'Lexus', model: 'ES', year: 2024, daily_rate: 145,
    category: 'Luxury', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('luxury'), status: 'available', color: 'Blue', plate: 'LUX-004', mileage: 7800,
  },

  // ── Van ──────────────────────────────────────────
  {
    id: 'v022', make: 'Toyota', model: 'Sienna', year: 2024, daily_rate: 95,
    category: 'Van', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 8, doors: 4, luggage: 6, ac: true, gps: true },
    image_urls: img('van'), status: 'available', color: 'Silver', plate: 'VAN-001', mileage: 16800,
  },
  {
    id: 'v023', make: 'Chrysler', model: 'Pacifica', year: 2024, daily_rate: 90,
    category: 'Van', specs: { fuel: 'Hybrid', transmission: 'Automatic', seats: 7, doors: 4, luggage: 6, ac: true, gps: true },
    image_urls: img('van'), status: 'available', color: 'White', plate: 'VAN-002', mileage: 22100,
  },
  {
    id: 'v024', make: 'Honda', model: 'Odyssey', year: 2024, daily_rate: 92,
    category: 'Van', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 8, doors: 4, luggage: 6, ac: true, gps: true },
    image_urls: img('van'), status: 'available', color: 'Gray', plate: 'VAN-003', mileage: 19500,
  },

  // ── Sports ───────────────────────────────────────
  {
    id: 'v025', make: 'Ford', model: 'Mustang', year: 2024, daily_rate: 120,
    category: 'Sports', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 4, doors: 2, luggage: 2, ac: true, gps: true },
    image_urls: img('sports'), status: 'available', color: 'Red', plate: 'SPT-001', mileage: 6700,
  },
  {
    id: 'v026', make: 'Chevrolet', model: 'Camaro', year: 2024, daily_rate: 125,
    category: 'Sports', specs: { fuel: 'Gasoline', transmission: 'Manual', seats: 4, doors: 2, luggage: 2, ac: true, gps: true },
    image_urls: img('sports'), status: 'available', color: 'Yellow', plate: 'SPT-002', mileage: 4300,
  },
  {
    id: 'v027', make: 'Porsche', model: '718 Cayman', year: 2024, daily_rate: 220,
    category: 'Sports', specs: { fuel: 'Gasoline', transmission: 'Automatic', seats: 2, doors: 2, luggage: 1, ac: true, gps: true },
    image_urls: img('sports'), status: 'available', color: 'White', plate: 'SPT-003', mileage: 2100,
  },

  // ── Electric ─────────────────────────────────────
  {
    id: 'v028', make: 'Tesla', model: 'Model 3', year: 2024, daily_rate: 85,
    category: 'Electric', specs: { fuel: 'Electric', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('electric'), status: 'available', color: 'White', plate: 'ELC-001', mileage: 9200,
  },
  {
    id: 'v029', make: 'Tesla', model: 'Model Y', year: 2024, daily_rate: 95,
    category: 'Electric', specs: { fuel: 'Electric', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('electric'), status: 'available', color: 'Black', plate: 'ELC-002', mileage: 7500,
  },
  {
    id: 'v030', make: 'BMW', model: 'iX3', year: 2024, daily_rate: 130,
    category: 'Electric', specs: { fuel: 'Electric', transmission: 'Automatic', seats: 5, doors: 4, luggage: 4, ac: true, gps: true },
    image_urls: img('electric'), status: 'available', color: 'Blue', plate: 'ELC-003', mileage: 3800,
  },
  {
    id: 'v031', make: 'Nissan', model: 'Leaf', year: 2024, daily_rate: 55,
    category: 'Electric', specs: { fuel: 'Electric', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('electric'), status: 'available', color: 'Green', plate: 'ELC-004', mileage: 14200,
  },
  {
    id: 'v032', make: 'Chevrolet', model: 'Bolt', year: 2024, daily_rate: 60,
    category: 'Electric', specs: { fuel: 'Electric', transmission: 'Automatic', seats: 5, doors: 4, luggage: 3, ac: true, gps: true },
    image_urls: img('electric'), status: 'maintenance', color: 'Silver', plate: 'ELC-005', mileage: 18700,
  },
];

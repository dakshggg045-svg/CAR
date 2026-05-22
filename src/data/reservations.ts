import { Reservation } from '@/types';

export const initialReservations: Reservation[] = [
  {
    id: 'r001', vehicle_id: 'v009', user_id: 'u001', user_name: 'John Smith',
    user_email: 'john@example.com', pickup_date: '2025-07-15', return_date: '2025-07-20',
    pickup_location: 'Downtown Office', return_location: 'Downtown Office',
    total_price: 325, payment_status: 'paid', reservation_status: 'confirmed',
    created_at: '2025-07-10T10:30:00Z',
  },
  {
    id: 'r002', vehicle_id: 'v018', user_id: 'u002', user_name: 'Sarah Johnson',
    user_email: 'sarah@example.com', pickup_date: '2025-07-18', return_date: '2025-07-25',
    pickup_location: 'Airport Terminal', return_location: 'Airport Terminal',
    total_price: 1050, payment_status: 'paid', reservation_status: 'confirmed',
    created_at: '2025-07-12T14:20:00Z',
  },
  {
    id: 'r003', vehicle_id: 'v025', user_id: 'u003', user_name: 'Mike Davis',
    user_email: 'mike@example.com', pickup_date: '2025-07-20', return_date: '2025-07-22',
    pickup_location: 'Downtown Office', return_location: 'Downtown Office',
    total_price: 240, payment_status: 'unpaid', reservation_status: 'pending',
    created_at: '2025-07-14T09:15:00Z',
  },
  {
    id: 'r004', vehicle_id: 'v028', user_id: 'u004', user_name: 'Emily Chen',
    user_email: 'emily@example.com', pickup_date: '2025-07-22', return_date: '2025-07-28',
    pickup_location: 'Airport Terminal', return_location: 'Downtown Office',
    total_price: 510, payment_status: 'paid', reservation_status: 'confirmed',
    created_at: '2025-07-13T16:45:00Z',
  },
  {
    id: 'r005', vehicle_id: 'v013', user_id: 'u005', user_name: 'Robert Wilson',
    user_email: 'robert@example.com', pickup_date: '2025-07-10', return_date: '2025-07-14',
    pickup_location: 'Downtown Office', return_location: 'Downtown Office',
    total_price: 300, payment_status: 'paid', reservation_status: 'completed',
    created_at: '2025-07-05T11:00:00Z',
  },
  {
    id: 'r006', vehicle_id: 'v019', user_id: 'u006', user_name: 'Lisa Anderson',
    user_email: 'lisa@example.com', pickup_date: '2025-07-25', return_date: '2025-07-30',
    pickup_location: 'Airport Terminal', return_location: 'Airport Terminal',
    total_price: 800, payment_status: 'unpaid', reservation_status: 'pending',
    created_at: '2025-07-15T08:30:00Z',
  },
  {
    id: 'r007', vehicle_id: 'v005', user_id: 'u007', user_name: 'David Brown',
    user_email: 'david@example.com', pickup_date: '2025-07-16', return_date: '2025-07-19',
    pickup_location: 'Downtown Office', return_location: 'Downtown Office',
    total_price: 135, payment_status: 'cancelled', reservation_status: 'cancelled',
    created_at: '2025-07-11T13:00:00Z',
  },
];

'use client';

import { use } from 'react';
import { FridgeNotificationsForm } from 'features/fridge-notifications';

interface NotificationsPageProps {
  params: Promise<{ id: string }>;
}

export default function NotificationsPage({ params }: NotificationsPageProps) {
  const { id } = use(params);
  return <FridgeNotificationsForm fridgeId={id} />;
}

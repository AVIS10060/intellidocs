'use client'; // Required for client-side components

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right" // Customize the default position
      reverseOrder={false}
    />
  );
}
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Conscious Future',
    short_name: 'ConsciousFuture',
    description: 'AI-Powered Offline Growth & Emotion Coaching Parent App',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#F1E4D1',
    theme_color: '#F1E4D1',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

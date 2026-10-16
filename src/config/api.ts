/**
 * API Configuration for Alpha Encoders
 *
 * - In local dev: defaults to '' (Vite proxy forwards /api -> http://localhost:5000), or uses VITE_API_URL if configured.
 * - In production: defaults to '' (Vercel rewrites forward /api -> https://alpha-encoders-backend.onrender.com), or uses VITE_API_URL if configured.
 */
const rawEnvUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
  ? String(import.meta.env.VITE_API_URL).trim()
  : '';

export const API_BASE_URL = rawEnvUrl.replace(/\/+$/, '');

export const apiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

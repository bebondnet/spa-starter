// API service with environment switching
// Supports: mock, local, staging, production

import type { SearchRequest, SearchResponse, LocationResponse, Document } from '../types';

// API mode: 'mock' | 'local' | 'staging' | 'production'
const API_MODE = import.meta.env.VITE_API_MODE || 'mock';

// Organization key for multi-tenant API
const ORG_KEY = import.meta.env.VITE_ORG_KEY || 'demo';

// API base URLs per environment
const API_URLS: Record<string, string> = {
  local: 'http://localhost:8787',
  staging: 'https://api-staging.bebond.net',
  production: 'https://api.bebond.net',
};

export async function searchListings(
  params: Omit<SearchRequest, 'org_key'>
): Promise<SearchResponse<Document>> {
  if (API_MODE === 'mock') {
    const { mockSearch } = await import('./mock-api');
    return mockSearch({ ...params, org_key: ORG_KEY });
  }

  const apiUrl = API_URLS[API_MODE] || API_URLS.production;
  const response = await fetch(`${apiUrl}/v1/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...params, org_key: ORG_KEY }),
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getLocations(
  params: Record<string, string>
): Promise<LocationResponse> {
  if (API_MODE === 'mock') {
    const { mockGetLocations } = await import('./mock-api');
    return mockGetLocations(params);
  }

  const apiUrl = API_URLS[API_MODE] || API_URLS.production;
  const searchParams = new URLSearchParams({ ...params, org_key: ORG_KEY });
  const response = await fetch(`${apiUrl}/v1/locations?${searchParams}`);

  if (!response.ok) {
    throw new Error(`Failed to get locations: ${response.statusText}`);
  }

  return response.json();
}

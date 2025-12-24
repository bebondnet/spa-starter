// Mock API for local development
// Replace mock data with your actual data structure

import type { SearchRequest, SearchResponse, LocationResponse, Document } from '../types';

// Sample mock data - replace with your data
const mockDocuments: Document[] = [
  { id: '1', title: 'Sample Item 1' },
  { id: '2', title: 'Sample Item 2' },
  { id: '3', title: 'Sample Item 3' },
];

const mockLocations: {
  countries: string[];
  regions: Record<string, string[]>;
  cities: Record<string, string[]>;
} = {
  countries: ['United States'],
  regions: {
    'United States': ['California', 'New York', 'Texas'],
  },
  cities: {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    'New York': ['New York City', 'Buffalo', 'Albany'],
    Texas: ['Houston', 'Dallas', 'Austin'],
  },
};

export async function mockSearch(
  params: SearchRequest
): Promise<SearchResponse<Document>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let results = [...mockDocuments];

  // Apply text search
  if (params.query) {
    const query = params.query.toLowerCase();
    results = results.filter((doc) =>
      doc.title.toLowerCase().includes(query)
    );
  }

  // Pagination
  const page = params.pagination?.page || 1;
  const perPage = params.pagination?.per_page || 20;
  const start = (page - 1) * perPage;
  const paginatedResults = results.slice(start, start + perPage);

  return {
    results: paginatedResults,
    total: results.length,
    page,
    per_page: perPage,
    facets: {},
  };
}

export async function mockGetLocations(
  params: Record<string, string>
): Promise<LocationResponse> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const { country, region } = params;

  if (!country && !region) {
    return {
      level: 'country',
      options: mockLocations.countries.map((c) => ({ value: c })),
    };
  }

  if (country && !region) {
    const regions = mockLocations.regions[country] || [];
    return {
      level: 'region',
      options: regions.map((r: string) => ({ value: r })),
    };
  }

  if (region) {
    const cities = mockLocations.cities[region] || [];
    return {
      level: 'city',
      options: cities.map((c: string) => ({ value: c })),
    };
  }

  return { level: 'unknown', options: [] };
}

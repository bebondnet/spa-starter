// Base types for Bebond SPAs

export interface SearchRequest {
  org_key?: string;
  query?: string;
  filters?: Record<string, unknown>;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    per_page: number;
  };
}

export interface SearchResponse<T> {
  results: T[];
  total: number;
  page: number;
  per_page: number;
  facets: Record<string, FacetItem[]>;
}

export interface FacetItem {
  value: string;
  count: number;
}

export interface LocationOption {
  value: string;
  count?: number;
}

export interface LocationResponse {
  level: string;
  options: LocationOption[];
}

// Add your custom document type here
export interface Document {
  id: string;
  title: string;
  // Add fields specific to your content type
}

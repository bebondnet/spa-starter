import { useState, useEffect } from 'react';
import { searchListings } from '../services/api';
import type { Document } from '../types';

export function SearchPage() {
  const [results, setResults] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const doSearch = async () => {
      setLoading(true);
      try {
        const response = await searchListings({
          query: query || undefined,
          pagination: { page: 1, per_page: 20 },
        });
        setResults(response.results);
        setTotal(response.total);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };
    doSearch();
  }, [query]);

  return (
    <div className="search-page">
      <header className="header">
        <h1>SPA Starter</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <main className="results">
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <>
            <p>Found {total} results</p>
            <ul>
              {results.map((doc) => (
                <li key={doc.id}>{doc.title}</li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

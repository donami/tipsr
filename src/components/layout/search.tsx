import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';

import search from '@/queries/search';
import Input from '@/components/ui/input';
import { Link } from 'react-router-dom';

// Hook
function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

type Props = {};
const Search: React.SFC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Searching status (whether there is pending API request)
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <Input
        type="text"
        placeholder="Find movie"
        onChange={e => setSearchTerm(e.target.value)}
      />

      {debouncedSearchTerm && (
        <Query query={search} variables={{ term: debouncedSearchTerm }}>
          {({ data, loading }) => {
            if (loading) {
              return <em>Loading...</em>;
            }

            if (!data.search.length) {
              return <em>No movies found.</em>;
            }

            return (
              <div>
                {data.search.map((movie: any, index: number) => (
                  <div key={index}>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      )}
    </div>
  );
};

export default Search;

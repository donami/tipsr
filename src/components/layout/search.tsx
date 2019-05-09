import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import styled from '@/lib/styledComponents';
import search from '@/queries/search';
import Input from '@/components/ui/input';

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
  const inputRef = useRef<any>(null);
  // Searching status (whether there is pending API request)
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div className="search-field">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Find movie"
        onChange={e => setSearchTerm(e.target.value)}
      />

      {debouncedSearchTerm && (
        <Query query={search} variables={{ term: debouncedSearchTerm }}>
          {({ data, loading }) => {
            if (loading) {
              return (
                <Results>
                  <em>Loading...</em>
                </Results>
              );
            }

            return (
              <Results>
                {!data.search.length && <em>No movies found.</em>}
                {!!data.search.length && (
                  <Fragment>
                    {data.search.map((movie: any, index: number) => (
                      <div key={index}>
                        <Link
                          onClick={() => {
                            // Reset search
                            if (inputRef.current) {
                              inputRef.current.value = '';
                            }
                            setSearchTerm('');
                          }}
                          to={`/movie/${movie.id}`}
                        >
                          {movie.title}
                        </Link>
                      </div>
                    ))}
                  </Fragment>
                )}
              </Results>
            );
          }}
        </Query>
      )}
    </div>
  );
};

export default Search;

const Results = styled.div`
  position: absolute;
  background-color: #fff;
  padding: ${props => props.theme.spacing.normal};
  color: #555;
  min-width: 250px;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

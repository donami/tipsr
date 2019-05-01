import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import favorites from '../../../queries/favorites';
import Loader from '../../../components/ui/loader';
import { Link } from 'react-router-dom';

type Props = {};
const FavoritePage: React.SFC<Props> = () => {
  return (
    <div>
      <h3>FavoritePage</h3>

      <Query query={favorites}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          return (
            <Fragment>
              {data.favorites.length && (
                <ul>
                  {data.favorites.map((favorite: any) => (
                    <li key={favorite.id}>
                      <Link to={`/movie/${favorite.id}`}>{favorite.title}</Link>
                    </li>
                  ))}
                </ul>
              )}

              {!data.favorites.length && <em>No favorites added yet.</em>}
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
};

export default FavoritePage;

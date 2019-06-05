import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import styled from '@/lib/styledComponents';
import { BreadcrumbContext } from '@/components/ui/breadcrumbs/store';

type Props = {
  // className?: string;
  // separator?: any; // TODO: React.Element
  // wrapper?: any;
  // children?: any;
};

const Breadcrumbs: React.SFC<Props> = () => {
  {
    const { state } = useContext(BreadcrumbContext);

    let crumbs = state.breadcrumbs;

    crumbs = crumbs.sort((a: any, b: any) => {
      return a.pathname.length - b.pathname.length;
    });

    if (crumbs.length <= 1) {
      return null;
    }

    return (
      <WrapperClass>
        {crumbs.map((crumb: any, i) => (
          <li key={crumb.id}>
            <NavLink
              className="crumb"
              activeClassName={`crumb--active`}
              to={{
                pathname: crumb.pathname,
                search: crumb.search,
                state: crumb.state,
              }}
            >
              {crumb.title}
            </NavLink>
          </li>
        ))}
      </WrapperClass>
    );
  }
};

export default Breadcrumbs;

const blueGray = '#34495e';
const blueGrayDarken = '#2c3e50';
const blue = '#3498db';
const blueDarken = '#2980b9';
const greenDarken = '#16a085';
const green = '#1abc9c';

const WrapperClass = styled.ul`
  list-style: none;
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.normal};

  .icon {
    font-size: 14px;
  }

  li {
    float: left;
    a {
      color: #fff;
      display: block;
      background: ${blue};
      text-decoration: none;
      position: relative;
      height: 40px;
      line-height: 40px;
      padding: 0 10px 0 5px;
      text-align: center;
      margin-right: 23px;
    }
    &:nth-child(even) {
      a {
        background-color: ${blueDarken};

        &:before {
          border-color: ${blueDarken};
          border-left-color: transparent;
        }
        &:after {
          border-left-color: ${blueDarken};
        }
      }
    }
    &:first-child {
      a {
        padding-left: 15px;
        @include border-radius(4px 0 0 4px);
        &:before {
          border: none;
        }
      }
    }
    &:last-child {
      a {
        padding-right: 15px;
        @include border-radius(0 4px 4px 0);
        &:after {
          border: none;
        }
      }
    }

    a {
      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 0;
        border: 0 solid ${blue};
        border-width: 20px 10px;
        width: 0;
        height: 0;
      }
      &:before {
        left: -20px;
        border-left-color: transparent;
      }
      &:after {
        left: 100%;
        border-color: transparent;
        border-left-color: ${blue};
      }
      &:hover {
        background-color: ${green};

        &:before {
          border-color: ${green};
          border-left-color: transparent;
        }
        &:after {
          border-left-color: ${green};
        }
      }
      &:active {
        background-color: ${greenDarken};

        &:before {
          border-color: ${greenDarken};
          border-left-color: transparent;
        }
        &:after {
          border-left-color: ${greenDarken};
        }
      }
    }
  }
`;

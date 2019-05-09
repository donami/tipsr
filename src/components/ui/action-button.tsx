import styled from '@/lib/styledComponents';

const ActionButton = styled.div`
  display: inline-block;
  background-color: #262626;
  margin-right: ${props => props.theme.spacing.normal};
  color: #fff;
  padding: ${props => props.theme.spacing.small}
    ${props => props.theme.spacing.normal};
  cursor: pointer;
  transition: all 200ms ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    text-decoration: none !important;
  }
`;

export default ActionButton;

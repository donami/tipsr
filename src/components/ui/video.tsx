import React from 'react';
import styled from '../../lib/styledComponents';

type Props = {};
const Video: React.SFC<Props> = () => {
  return (
    <Wrapper>
      <Thumb>[Image]</Thumb>
      <Content>
        <Top>Marvel Studios' Avengers - Official Trailer</Top>
        <Meta>Trailer • 2:26 • December 7, 2018</Meta>
      </Content>
    </Wrapper>
  );
};

export default Video;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};
  border-radius: 4px;
  margin-bottom: ${props => props.theme.spacing.normal};
  display: flex;
`;
const Thumb = styled.div`
  flex: 1;
`;
const Content = styled.div`
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Meta = styled.div``;

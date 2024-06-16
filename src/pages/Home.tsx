import React from 'react'
import Select from '../components/Select'
import { Map } from 'react-kakao-maps-sdk'
import styled from '@emotion/styled'
import KakaoMap from '../components/KakaoMap'



const Home = () => {
  return (
    <>
      <Wrapper>
        <Select />
        <MapWrapper>
          <KakaoMap />
        </MapWrapper>

      </Wrapper>
    </>
  )
}

export default Home

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5%;
`

const MapWrapper = styled.div`
  margin-top: 150px;
`;

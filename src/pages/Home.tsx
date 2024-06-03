import React from 'react'
import Select from '../components/Select'
import { Map } from 'react-kakao-maps-sdk'
import styled from '@emotion/styled'



const Home = () => {
  return (
    <>
      <Wrapper>
        <Select />
        <MapWrapper>
          <Map // 지도를 표시할 Container
            id="map"
            center={{
              // 지도의 중심좌표
              lat: 33.450701,
              lng: 126.570667,
            }}
            style={{
              // 지도의 크기
              width: "700px",
              height: "600px",
            }}
            level={3} // 지도의 확대 레벨
            
          />
        </MapWrapper>

      </Wrapper>
    </>
  )
}

export default Home

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%;
`

const MapWrapper = styled.div`
  margin-top: 100px;
`;

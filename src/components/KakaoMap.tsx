import React, { useEffect, useState } from 'react'
import { useRecommendation } from "../context/RecomendationContext";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from '@emotion/styled';

const KakaoMap = () => {
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();
  const { recommendation } = useRecommendation(); // Context에서 추천된 음식 가져오기
  const [searchInput, setSearchInput] = useState("");
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (recommendation) {
      setSearchInput(recommendation); // 추천된 음식으로 검색어 설정
    }
  }, [recommendation]);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev: any) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev: any) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  const searchPlaces = () => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    // 현재 위치 정보 사용
    const { lat, lng } = state.center;

    ps.keywordSearch(searchInput, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const markers = [];
        const placeList = [];
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          placeList.push({
            name: data[i].place_name,
            address: data[i].road_address_name,
            phone: data[i].phone,
          });
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        setMarkers(markers);
        setPlaceList(placeList); // 새로 추가된 부분
        map.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }, {
      location: new window.kakao.maps.LatLng(lat, lng), // 현재 위치 정보 사용
      radius: 5000, // 5km 반경 내에서 검색
    });
  };

  const [placeList, setPlaceList] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(4); // 한 페이지에 4개씩 보여줌

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = placeList.slice(indexOfFirstPlace, indexOfLastPlace);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div style={{ display: 'flex' }}>
      <Map // 로드뷰를 표시할 Container
        center={state.center}
        style={{
          width: "600px",
          height: "600px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker: any) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={(e: any) => setSearchInput(e.target.value)}
        />
        <SearchButton onClick={searchPlaces}>주변 식당 검색하기</SearchButton>
        <ResultList>
          <h3>검색 결과</h3>
          <ul>
            {currentPlaces.map((place: any, index: number) => (
              <li
                key={index}
                onMouseEnter={() => {
                  const matchedMarker = markers.find((marker: any) => marker.content === place.name);
                  if (matchedMarker) {
                    setInfo(matchedMarker);
                  }
                }}
                onMouseLeave={() => setInfo(null)}
              >
                <h4>{place.name}</h4>
                <p>주소: {place.address}</p>
                <p>전화번호: {place.phone}</p>
              </li>
            ))}
          </ul>
          <Pagination
            placesPerPage={placesPerPage}
            totalPlaces={placeList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </ResultList>
      </SearchContainer>
    </div>
  );
};

const Pagination = ({
  placesPerPage,
  totalPlaces,
  paginate,
  currentPage,
}: {
  placesPerPage: number;
  totalPlaces: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{
              marginRight: '10px',
              cursor: 'pointer',
              fontWeight: currentPage === number ? 'bold' : 'normal',
            }}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMap;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const SearchButton = styled.button`
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ResultList = styled.div`
  h3 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;

    h4 {
      margin-top: 0;
    }

    p {
      margin: 5px 0;
    }
  }
`;

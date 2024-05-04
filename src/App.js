// import { Map, MapMarker } from "react-kakao-maps-sdk";

// const App = () => {
//   return (
//     <Map 
//           center={{ lat: 33.5563, lng: 126.79581 }} 
//           style={{ width: '800px', height: '600px' }}
//           level={3} 
//         >
// 			<MapMarker position={{ lat: 33.55635, lng: 126.795841 }}> </MapMarker>
// 		</Map>
//   );
// };


import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const App = () => {
	const { kakao } = window;
	const [address, setAddress] = useState(null); // 현재 좌표의 주소를 저장할 상태

	const getAddress = (lat, lng) => {
		const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
		const coord = new kakao.maps.LatLng(37.5566803113882, 126.904501286522); // 주소로 변환할 좌표 입력
		const callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setAddress(result[0].address);
			}
		};
		geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
	};

	return (
		<>
			<Map center={{ lat: 37.5566803113882, lng: 126.904501286522 }} style={{ width: '800px', height: '600px' }} level={3}>
				<MapMarker position={{ lat: 37.5566803113882, lng: 126.904501286522 }} />
				<button onClick={getAddress}>현재 좌표의 주소 얻기</button>
			</Map>


		
			{address && (
				<div>
					현재 좌표의 주소는..
					<p>address_name: {address.address_name}</p>
					<p>region_1depth_name: {address.region_1depth_name}</p>
					<p>region_2depth_name: {address.region_2depth_name}</p>
					<p>region_3depth_name: {address.region_3depth_name}</p>
				</div>
			)}
		</>
	);
};

export default App;

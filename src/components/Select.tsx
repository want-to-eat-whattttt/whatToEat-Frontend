import image1 from '../img/suggestMenu-1.png';
import image2 from '../img/suggestMenu-2.png';
import image3 from '../img/suggestMenu-3.png';
import image4 from '../img/suggestMenu-4.png';
import image5 from '../img/suggestMenu-5.png';
import image6 from '../img/suggestMenu-6.png';
import image7 from '../img/suggestMenu-7.png';
import image8 from '../img/suggestMenu-8.png';

import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { theme } from '../style/theme';
import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from '../style/globalStyle';
import Option from './Option';
import { useRecommendation } from '../context/RecomendationContext';

const Select = () => {

  // 각 OptionCategory의 선택된 Option을 관리하는 상태
  const [selectedOption, setSelectedOption] = useState({
    type: 'all',
    nation: 'allNation',
    state: 'allState',
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const {recommendation, setRecommendation} = useRecommendation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8
  ];


  // Option 선택 핸들러
  const handleSelect = (category: string, optionId: string) => {
    setSelectedOption((prev) => ({ ...prev, [category]: optionId }));
  };

  type RecommendationMap = {
    [type: string]: {
      [nation: string]: {
        [state: string]: string;
      };
    };
  };
  
  const recommendations: RecommendationMap = {
    all: {
      allNation: {
        allState: '떡국',
        solo: '뚝배기불고기',
        friend: '비빔막국수',
        couple: '마르게리따피자',
        family: '굴구이',
        gather: '소불고기',
      },
      kr: {
        allState: '산낙지',
        solo: '물냉면',
        friend: '알탕',
        couple: '떡볶이',
        family: '꼬리곰탕',
        gather: '조개구이',
      },
      cn: {
        allState: '난자완스',
        solo: '울면',
        friend: '마라롱샤',
        couple: '버섯탕수',
        family: '어향동고',
        gather: '팔보채',
      },
      jp: {
        allState: '규동',
        solo: '치킨까스',
        friend: '소유라멘',
        couple: '야끼소바',
        family: '메밀소바',
        gather: '사시미모리아와세',
      },
      us: {
        allState: '등심스테이크',
        solo: '토스트',
        friend: '햄버거',
        couple: '맥앤치즈',
        family: '빵',
        gather: '바베큐 플래터',
      },
      asia: {
        allState: '쌀국수',
        solo: '쌀국수',
        friend: '탄두리치킨',
        couple: '탄두리치킨',
        family: '월남쌈',
        gather: '월남쌈',
      },

    },
    meal: {
      allNation: {
        allState: '동태탕',
        solo: '라멘',
        friend: '삼게탕',
        couple: '함박스테이크',
        family: '생태탕',
        gather: '울면',
      },
      kr: {
        allState: '대구탕',
        solo: '순두부찌개',
        friend: '된장찌개',
        couple: '닭갈비',
        family: '순대',
        gather: '떡갈비',
      },
      cn: {
        allState: '짬뽕',
        solo: '마파두부덮밥',
        friend: '기스면',
        couple: '훠궈',
        family: '훠궈',
        gather: '중화냉면',
      },
      jp: {
        allState: '가라아게동',
        solo: '시오라멘',
        friend: '생선까스',
        couple: '야끼소바',
        family: '나베',
        gather: '스키야키',
      },
      us: {
        allState: '핫도그',
        solo: '햄버거',
        friend: '핫도그',
        couple: '브리또',
        family: '스테이크',
        gather: '바베큐 플래터',
      },
      asia: {
        allState: '탄두리치킨',
        solo: '쌀국수',
        friend: '월남쌈',
        couple: '나시고랭',
        family: '탄두리치킨',
        gather: '월남쌈',
      },

    },
    dish: {
      allNation: {
        allState: '마라탕',
        solo: '닭강정',
        friend: '일식튀김',
        couple: '사시미모리아와세',
        family: '메밀묵',
        gather: '동태전',
      },
      kr: {
        allState: '감자전',
        solo: '계란말이',
        friend: '삼겹살',
        couple: '대게',
        family: '아귀찜',
        gather: '두루치기',
      },
      cn: {
        allState: '마라롱샤',
        solo: '짜장면',
        friend: '라조기',
        couple: '깐쇼새우',
        family: '버섯탕수',
        gather: '멘보샤',
      },
      jp: {
        allState: '가라아게',
        solo: '타코야키',
        friend: '야키토리',
        couple: '나베',
        family: '나베',
        gather: '나베',
      },
      us: {
        allState: '찹스테이크',
        solo: '햄버거',
        friend: '소세지',
        couple: '하몽과 멜론',
        family: '소세지',
        gather: '바베큐 플래터',
      },
      asia: {
        allState: '월남쌈',
        solo: '쌀국수',
        friend: '탄두리치킨',
        couple: '탄두리치킨',
        family: '월남쌈',
        gather: '월남쌈',
      },

    },
    snack: {
      allNation: {
        allState: '팬케이크',
        solo: '베이글샌드위치',
        friend: '타코야키',
        couple: '쿠반샌드위치',
        family: '즉석떡볶이',
        gather: '도토리묵',
      },
      kr: {
        allState: '분식튀김',
        solo: '짜장면',
        friend: '메밀묵',
        couple: '떡볶이',
        family: '분식튀김',
        gather: '메밀묵',
      },
      cn: {
        allState: '군만두',
        solo: '군만두',
        friend: '군만두',
        couple: '딤섬',
        family: '딤섬',
        gather: '물만두',
      },
      jp: {
        allState: '일식튀김',
        solo: '타코야키',
        friend: '일식튀김',
        couple: '야키토리',
        family: '교자',
        gather: '야키토리',
      },
      us: {
        allState: '쿠반샌드위치',
        solo: '토스트',
        friend: '소세지',
        couple: '토스트',
        family: '핫도그',
        gather: '햄버거',
      },
      asia: {
        allState: '쏨땀',
        solo: '반미',
        friend: '반미',
        couple: '솜땀',
        family: '솜땀',
        gather: '반미',
      },

    },
  };

  const handlePost = () => {
    setIsSearching(true);
    setRecommendation(null);
    setCurrentImageIndex(0);

    const { type, nation, state } = selectedOption;

    setTimeout(() => {
      if (recommendations[type] && recommendations[type][nation] && recommendations[type][nation][state]) {
        const recommendation = recommendations[type][nation][state];
        setRecommendation(recommendation);
      } else {
        setRecommendation('추천 메뉴가 없습니다.');
      }
      setIsSearching(false);
    }, 2000); // 2.5초 후에 추천 결과 표시

    // 이미지 순환
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 150); // 0.5초 간격으로 이미지 변경

    setTimeout(() => {
      clearInterval(interval);
    }, 2000); // 2초 후에 이미지 순환 중지

  };


  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />

      <Wrapper>
        <ResultBox>
        {isSearching ? (
            <>
              <img src={images[currentImageIndex]} alt="Loading" width="100" height="100" />
              <p>메뉴 탐색중...</p>
            </>
          ) : (
            <>
              {!recommendation && (
                <>
                  <p>옵션을 선택하고</p>
                  <p>메뉴 추천받기를 눌러보세요</p>
                </>
              )}
              {recommendation && <h1>{recommendation}</h1>}
            </>
          )}
        </ResultBox>
        <SelectContainer>
          <OptionCategory>
            <Option id="all" label="전체" isSelected={selectedOption.type === 'all'} onSelect={() => handleSelect('type', 'all')} />
            <Option id="meal" label="식사" isSelected={selectedOption.type === 'meal'} onSelect={() => handleSelect('type', 'meal')} />
            <Option id="dish" label="요리" isSelected={selectedOption.type === 'dish'} onSelect={() => handleSelect('type', 'dish')} />
            <Option id="snack" label="간식" isSelected={selectedOption.type === 'snack'} onSelect={() => handleSelect('type', 'snack')} />
          </OptionCategory>
          <LineBox />
          <OptionCategory>
            <Option id="allNation" label="전체" isSelected={selectedOption.nation === 'allNation'} onSelect={() => handleSelect('nation', 'allNation')} />
            <Option id="kr" label="한식" isSelected={selectedOption.nation === 'kr'} onSelect={() => handleSelect('nation', 'kr')} />
            <Option id="cn" label="중식" isSelected={selectedOption.nation === 'cn'} onSelect={() => handleSelect('nation', 'cn')} />
            <Option id="jp" label="일식" isSelected={selectedOption.nation === 'jp'} onSelect={() => handleSelect('nation', 'jp')} />
            <Option id="us" label="양식" isSelected={selectedOption.nation === 'us'} onSelect={() => handleSelect('nation', 'us')} />
            <Option id="asia" label="아시아" isSelected={selectedOption.nation === 'asia'} onSelect={() => handleSelect('nation', 'asia')} />

          </OptionCategory>
          <LineBox />
          <OptionCategory>
            <Option id="allState" label="전체" isSelected={selectedOption.state === 'allState'} onSelect={() => handleSelect('state', 'allState')} />
            <Option id="solo" label="혼밥" isSelected={selectedOption.state === 'solo'} onSelect={() => handleSelect('state', 'solo')} />
            <Option id="friend" label="친구" isSelected={selectedOption.state === 'friend'} onSelect={() => handleSelect('state', 'friend')} />
            <Option id="couple" label="연인" isSelected={selectedOption.state === 'couple'} onSelect={() => handleSelect('state', 'couple')} />
            <Option id="family" label="가족" isSelected={selectedOption.state === 'family'} onSelect={() => handleSelect('state', 'family')} />
            <Option id="gather" label="모임" isSelected={selectedOption.state === 'gather'} onSelect={() => handleSelect('state', 'gather')} />

          </OptionCategory>
          <LineBox />
        </SelectContainer>
        {/* sleectedOption 값으로 출력해주는거 확인함. 서버에값도 이런 식으로 쏴주면 될듯한데...*/}
        <Button onClick={handlePost}>메뉴 추천받기</Button>
      </Wrapper>

    </ThemeProvider>

  )
}

export default Select;

const ResultBox = styled.div`
    width: 400px;
    height: 200px;
    margin: 15px 15px 0;
    background-color: var(--color-white-1);
    border: 2px solid ${({ theme }) => theme.color.black};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
  margin-left: 200px;
  max-width: 450px;
	display: flex;
	justify-content: center;
	align-items: center;
  flex-direction: column;
  height: 80vh; /* 전체 화면 높이를 차지하도록 설정 */
`
const LineBox = styled.div`
	border-bottom: 2px solid ${({ theme }) => theme.color.black};
`
const SelectContainer = styled.div`
    margin: 40px 15px;
    width: 400px;
    border-top: 2px solid ${({ theme }) => theme.color.black};
    `

const OptionCategory = styled.div`
		display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;	
`

const Button = styled.button`
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 70px;
    border: 2px solid ${({ theme }) => theme.color.black};
    background-color: ${({ theme }) => theme.color.main400};
    color: ${({ theme }) => theme.color.white};
    font-weight: 550;
    font-size: 22px;
    cursor: pointer;
    `


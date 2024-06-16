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
import axios from 'axios';

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

  const handlePost = async () => {
    setIsSearching(true);
    setRecommendation(null);
    setCurrentImageIndex(0);
  
    const { type, nation, state } = selectedOption;
  
    try {
      const response = await axios.post('http://localhost:8000/recommendation', {
        type,
        nation,
        state,
      });
  
      if (response.data.recommendation) {
        setRecommendation(response.data.recommendation);
      } else {
        setRecommendation('추천 메뉴가 없습니다.');
      }
    } catch (error) {
      setRecommendation('추천 메뉴를 불러오는 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  
    // 이미지 순환
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 150);
  
    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
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


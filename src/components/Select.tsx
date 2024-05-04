import React from 'react';
import styled from '@emotion/styled/macro';
import { theme } from '../style/theme';
import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from '../style/globalStyle';



const Select = () => {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyle} />
			<SelectContainer>
				<OptionCateogry>
					<OptionLabel>전체</OptionLabel>
					<OptionLabel>식사</OptionLabel>
					<OptionLabel>요리</OptionLabel>
					<OptionLabel>간식</OptionLabel>
				</OptionCateogry>
				<LineBox />
				<OptionCateogry>
					<OptionLabel>전체</OptionLabel>
					<OptionLabel>한식</OptionLabel>
					<OptionLabel>중식</OptionLabel>
					<OptionLabel>일식</OptionLabel>
					<OptionLabel>양식</OptionLabel>
					<OptionLabel>아시아</OptionLabel>
				</OptionCateogry>
				<LineBox />

				<OptionCateogry>
					<OptionLabel>전체</OptionLabel>
					<OptionLabel>혼밥</OptionLabel>
					<OptionLabel>친구</OptionLabel>
					<OptionLabel>연인</OptionLabel>
					<OptionLabel>가족</OptionLabel>
					<OptionLabel>모임</OptionLabel>
				</OptionCateogry>
				<LineBox />

			</SelectContainer>
		</ThemeProvider>
			
	)
}

export default Select;

// const Wrapper = styled.div`
// 	/* display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	height: 100vh;  */
	
// `

const LineBox = styled.div`
	border-bottom: 2px solid ;
`

const SelectContainer = styled.div`
		margin: 30px auto;
    width: 100%;
    border-top: 2px solid ;
`

const OptionCateogry = styled.div`
		display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;	
`

const OptionLabel = styled.label`
		white-space: nowrap;
    /* text-wrap: nowrap; 언노운 프로퍼티는 뭐냐,, */
    word-break: keep-all;
    padding: 12px;
    color: var(--color-black-1);
    font-size: 16px;
    cursor: pointer;
`

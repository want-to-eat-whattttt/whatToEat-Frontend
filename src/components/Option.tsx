import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../style/theme';

interface OptionProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const Option: React.FC<OptionProps> = ({ id, label, isSelected, onSelect }) => {
  return (
    <>
      <Input id={id} type="checkbox" checked={isSelected} readOnly />
      <OptionLabel htmlFor={id} onClick={onSelect} className={`OptionLabel ${isSelected ? 'clicked' : ''}`}>
        {label}
      </OptionLabel>
    </>
  );
};

export default Option;

const OptionLabel = styled.label`
    white-space: nowrap;
    word-break: keep-all;
    padding: 15px;
    color: ${theme.color.black};
    font-size: 16px;
    font-weight: 450;
    cursor: pointer;
    background-color: #ece8e2;

    &.clicked {
      background-color: ${theme.color.main400}; // 클릭된 항목의 배경색을 변경합니다.
      color: ${theme.color.white}; // 클릭된 항목의 글자색을 변경합니다.
    }
  `

const Input = styled.input`
  visibility: hidden;
  position: absolute;
`;


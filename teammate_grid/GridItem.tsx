// src/GridItem.tsx
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const GridItemContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
`;

const GridItemText = styled.Text`
  font-size: 20px;
`;

interface GridItemProps {
  item: string;
}

const GridItem: React.FC<GridItemProps> = ({ item }) => {
  return (
    <GridItemContainer>
      <GridItemText>{item}</GridItemText>
    </GridItemContainer>
  );
};

export default GridItem;

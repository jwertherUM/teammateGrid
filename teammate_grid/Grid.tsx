// src/Grid.tsx
import React from 'react';
import { FlatGrid } from 'react-native-super-grid';
import GridItem from './GridItem';

const data = [
  'Item 1', 'Item 2', 'Item 3',
  'Item 4', 'Item 5', 'Item 6',
  'Item 7', 'Item 8', 'Item 9',
];

const Grid: React.FC = () => {
  return (
    <FlatGrid
      itemDimension={100}
      data={data}
      renderItem={({ item }) => <GridItem item={item} />}
    />
  );
};

export default Grid;
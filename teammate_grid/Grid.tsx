import React , { useState }from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableHighlight } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

interface GridProps {
  dimensions: number;
  items: (string | number)[][];
}

const Grid: React.FC<GridProps& { onGridBoxSelect: (row: number, column: number) => void}> = ({ dimensions, items, onGridBoxSelect }) => {
  const itemNames = items.map(item => item[1]);
  const [activeRow, setAR] = useState<number | null>(null);
  const [activeCol, setAC] = useState<number | null>(null);

  //grid is a 1d list, have to calculate simulated 2d indices then set active row and column accordingly
  const handleGridBoxClick = (index: number) => {
    const row = Math.floor(index / 4);
    const column = index % 4;
    if(row >= 1 && column >= 1 && items[(row * 4) + column][0] == 0){
      onGridBoxSelect(row, column);
      setAR(row);
      setAC(column);
    }
  };

  return (
    <FlatGrid
      itemDimension={Dimensions.get('window').width / dimensions}
      data={itemNames}
      style={styles.gridView}
      spacing={0}
      renderItem={({ item, index }) => {
        const isTopRow = index < dimensions;
        const isFirstColumn = index % dimensions === 0;
        const isActiveRow = Math.floor(index / 4) === activeRow;
        const isActiveCol =  index % 4 === activeCol
      
        const itemStyle = {
          ...styles.itemContainer,
          borderWidth: (isFirstColumn  || isTopRow) ? 0 : 1,
          backgroundColor: (isActiveRow && isActiveCol) ? '#F8FBA9' : 'white' //turn selected square yellow
        };

        const handleClick = () => {
          handleGridBoxClick(index);
        };
      
        return (
        <TouchableHighlight style={itemStyle} onPress={handleClick} underlayColor="transparent">
          <View>
            <Text>{item}</Text>
          </View>
      </TouchableHighlight>);
      }}
    />
  );
};

const windowWidth = Dimensions.get('window').width;
const itemDimension = (windowWidth) / 4;

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    marginTop: 0,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 1,
    height: itemDimension,
    width: itemDimension,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default Grid;

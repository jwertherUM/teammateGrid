// src/MainScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
//import SearchBar from './SearchBar';
import Grid from './Grid';

      //<SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

const MainScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <SafeAreaView>

      <Grid />
    </SafeAreaView>
  );
};

export default MainScreen;

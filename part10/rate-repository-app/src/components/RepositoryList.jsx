import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword }) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Filter repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item label="Highest rated repositories" value="RATING_DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_ASC" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, onEndReach, selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(/repository/)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('CREATED_AT');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  let variables = { first: 8 };

  if (selectedOrder === 'CREATED_AT') {
    variables = { ...variables, orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  } else if (selectedOrder === 'RATING_DESC') {
    variables = { ...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  } else if (selectedOrder === 'RATING_ASC') {
    variables = { ...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  }

  if (debouncedSearchKeyword) {
    variables = { ...variables, searchKeyword: debouncedSearchKeyword };
  }

  const { repositories, fetchMore } = useRepositories(variables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={fetchMore}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;

import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    paddingLeft: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Repositories</Text>
    </View>
  );
};

export default AppBar;

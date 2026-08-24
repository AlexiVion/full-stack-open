import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 15,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
  },
});

const AppBarTab = ({ title, to }) => (
  <Link to={to} style={styles.tab}>
    <Text fontWeight="bold" fontSize="subheading" style={{ color: theme.colors.white }}>
      {title}
    </Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <AppBarTab title="Repositories" to="/" />
        <AppBarTab title="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;

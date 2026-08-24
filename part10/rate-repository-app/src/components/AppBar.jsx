import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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

const AppBarTab = ({ title, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text fontWeight="bold" fontSize="subheading" style={{ color: theme.colors.white }}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={{ color: theme.colors.white }}>
        {title}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  const me = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <AppBarTab title="Repositories" to="/" />
        {me ? (
          <>
            <AppBarTab title="Create a review" to="/create-review" />
            <AppBarTab title="Sign out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" to="/signin" />
            <AppBarTab title="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

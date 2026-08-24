import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  infoContainer: {
    flex: 1,
  },
  dateText: {
    marginVertical: 4,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('fi-FI');

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary" style={styles.dateText}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;

import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aab8c2',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
});

const TextInput = ({ style, error, ...props }) => {
  const inputStyle = [styles.input, error && styles.errorInput, style];
  return <NativeTextInput style={inputStyle} {...props} />;
};

export default TextInput;

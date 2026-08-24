import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username length must be between 3 and 30')
    .max(30, 'Username length must be between 3 and 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be between 5 and 50')
    .max(50, 'Password length must be between 5 and 50')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

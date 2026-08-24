import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId('usernameInput'), 'matti');
      fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'matti',
          password: 'password',
        });
      });
    });
  });
});

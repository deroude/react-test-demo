import { render, fireEvent, waitFor } from '@testing-library/react';

import App from './app';

global.fetch = jest.fn();

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  describe('App component', () => {
    it('renders the form elements', () => {
      const { getByTestId } = render(<App />);

      // Check if the form elements are rendered
      expect(getByTestId('login__field-username')).toBeTruthy();
      expect(getByTestId('login__field-password')).toBeTruthy();
      expect(getByTestId('login__button-submit')).toBeTruthy();
    });

    it('displays an error for invalid username', async () => {
      const { getByLabelText, getByText } = render(<App />);
      const usernameInput = getByLabelText('Username');
      const loginButton = getByText('Login');

      fireEvent.change(usernameInput, { target: { value: 'invalid_email' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(getByText('Not a valid email address')).toBeTruthy();
      });
    });

    it('displays an error for a too short password', async () => {
      const { getByLabelText, getByText } = render(<App />);
      const passwordInput = getByLabelText('Password');
      const loginButton = getByText('Login');

      fireEvent.change(passwordInput, { target: { value: '12' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(getByText('Password must be at least 3 characters')).toBeTruthy();
      });
    });

    it('displays login result on successful submission', async () => {

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ results: [{ mock: 'data' }] })
      })) as any;
      const { getByLabelText, getByText, getByTestId } = render(<App />);
      const usernameInput = getByLabelText('Username');
      const passwordInput = getByLabelText('Password');
      const loginButton = getByText('Login');

      fireEvent.change(usernameInput, { target: { value: 'valid_email@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(getByTestId('login__result-display')).toBeTruthy();
      });
    });
  });
});

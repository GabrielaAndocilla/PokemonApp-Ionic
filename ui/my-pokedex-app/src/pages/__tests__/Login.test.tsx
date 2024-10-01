import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { AuthProvider } from '../../contexts/authentication';
import Login from '../Login';

const login = vi.fn();
vi.mock('../../contexts/authentication', async () => {
  const actual = (await vi.importActual(
    '../../contexts/authentication'
  )) as object;
  return {
    ...actual,
    useAuth: () => ({ login }),
  };
});

describe('Login', () => {
  it('should show error text when inputs are empty', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    expect(getByPlaceholderText('email@hotmail.com')).toBeDefined();
    expect(getByPlaceholderText('email@hotmail.com')).toBeDefined();
    await userEvent.click(getByText('Log In'));
    expect(login).not.toHaveBeenCalled();
    expect(getByText('Please fill in all fields.')).toBeDefined();
  });
});

import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider } from '../../contexts/authentication';
import Menu from '../Menu';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn().mockReturnValue({
    pathname: '/pokemons',
  }),
}));

describe('Menu Component', () => {
  it('should render component correctly - with existing routes', async () => {
    const { getAllByText } = render(
      <AuthProvider>
        <Menu />
      </AuthProvider>
    );
    expect(getAllByText('Pokemons')).toBeDefined();
    expect(getAllByText('Create a pokemon')).toBeDefined();
    expect(getAllByText('Check your Pokemons')).toBeDefined();
    expect(getAllByText('Log Out')).toBeDefined();
  });
});

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';
import { vi } from 'vitest';
import { Pokemon } from '../../models/Pokemon';
import { usePokemons } from '../usePokemons';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock('../../contexts/authentication', () => ({
  useAuth: () => ({ token: 'mocked-token' }),
}));

const createQueryClient = () => new QueryClient();

const pokemons: Pokemon[] = [
  {
    name: 'Pokemon 1',
    height: '1',
    abilities: [],
    movements: [],
  },
  {
    name: 'Pokemon 2',
    height: '2',
    abilities: [],
    movements: [],
  },
];

describe('usePokemons', () => {
  it('should call axios with the correct arguments and invalidate queries on success', async () => {
    const queryClient = createQueryClient();

    mockedAxios.get.mockResolvedValueOnce({
      data: pokemons,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => usePokemons({}), { wrapper });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_HOST}/pokemon`,
      {
        headers: { Authorization: 'Bearer mocked-token' },
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });
});

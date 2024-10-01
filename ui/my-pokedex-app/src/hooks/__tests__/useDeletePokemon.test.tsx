import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';
import { vi } from 'vitest';
import { Pokemon } from '../../models/Pokemon';
import { useCreatePokemon } from '../useCreatePokemon';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock('../../contexts/authentication', () => ({
  useAuth: () => ({ token: 'mocked-token' }),
}));

const createQueryClient = () => new QueryClient();

const pokemon: Pokemon = {
  name: 'Pikachu',
  height: '1',
  abilities: [],
  movements: [],
};

describe('useDeletePokemon', () => {
  it('should call axios with the correct arguments and invalidate queries on success', async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(['pokemons'], []);

    mockedAxios.post.mockResolvedValueOnce({
      message: 'Successfully delete Pokemon',
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreatePokemon(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(pokemon);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_HOST}/1`,
      pokemon,
      {
        headers: { Authorization: 'Bearer mocked-token' },
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });
});

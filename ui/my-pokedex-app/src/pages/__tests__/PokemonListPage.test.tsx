import { IonReactRouter } from '@ionic/react-router';
import { render } from '@testing-library/react';
import { SpyInstance, vi } from 'vitest';
import * as usePokemonHook from '../../hooks/usePokemonsPokeApi';
import PokemonListPage from '../PokemonsListPage';

vi.mock('../../hooks/usePokemonsPokeApi', () => ({
  usePokemonsPokeApi: vi.fn(),
}));

describe('Pokemon List Page', () => {
  let querySpy: SpyInstance;

  beforeEach(() => {
    querySpy = vi.spyOn(usePokemonHook, 'usePokemonsPokeApi');
  });
  afterEach(() => {
    querySpy.mockRestore();
  });

  it('should show just one page when the content is short', async () => {
    querySpy.mockReturnValue({
      data: { data: { count: 2, results: [{ name: 'pokemon 1' }] } },
      isFetching: false,
    });
    const { getByText } = render(
      <IonReactRouter>
        <PokemonListPage />
      </IonReactRouter>
    );
    expect(getByText('pokemon 1')).toBeDefined();

    expect(getByText('1')).toBeDefined();
    expect(getByText('Next')).toBeDefined();
    expect(getByText('Previous')).toBeDefined();
  });
});

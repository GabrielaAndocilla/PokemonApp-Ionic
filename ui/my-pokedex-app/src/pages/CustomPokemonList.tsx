import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { create, heart, heartOutline, search, trash } from 'ionicons/icons';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { Button } from '../components/Button';
import VirtualizedList from '../components/VirtualizedList';
import { useDeletePokemon } from '../hooks/useDeletePokemon';
import { usePokemons } from '../hooks/usePokemons';
import { useSetFavoritePokemon } from '../hooks/useSetFavoritePokemon';
import { CustomPokemon } from '../models/Pokemon';

const CustomPokemonList: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState<string>('');
  const { mutate: setFavorite } = useSetFavoritePokemon();
  const { mutate: deletePokemon } = useDeletePokemon();
  const { data } = usePokemons({ name: searchText });
  const customsPokemons = data?.data?.data || [];

  const handleInputChange = useCallback(
    debounce((event) => {
      setSearchText(event.target.value);
    }, 500),
    []
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Check your own pokemons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>
          <h2
            className={css({
              marginTop: '16px',
              marginBottom: '16px',
              marginX: '8',
            })}
          >
            Thanks for creates this pokemons ...
          </h2>
        </IonTitle>
        <IonItem className={css({ w: '1/3' })}>
          <IonInput
            labelPlacement="stacked"
            label="Search"
            placeholder="Search by name"
            value={searchText}
            onIonInput={handleInputChange}
          >
            <IonIcon slot="start" icon={search} aria-hidden="true"></IonIcon>
          </IonInput>
        </IonItem>

        <div
          className={css({
            width: '90%',
            marginX: 'auto',
            marginTop: '16px',
            marginBottom: '16px',
            borderColor: 'primary',
            borderWidth: 2,
            borderStyle: 'dashed',
          })}
        >
          <VirtualizedList rowHeight={60}>
            {customsPokemons.map((pokemon: CustomPokemon) => (
              <IonItem key={pokemon.id}>
                <IonLabel>{pokemon.name}</IonLabel>
                <Button
                  type="button"
                  variant="secondary_outline"
                  onClickAction={() => {
                    history.push(`/pokemon/edit/${pokemon.id}`);
                  }}
                >
                  <IonIcon icon={create}></IonIcon>
                </Button>
                <Button
                  type="button"
                  variant="primary_outline"
                  onClickAction={() => setFavorite(pokemon.id!)}
                >
                  <IonIcon
                    icon={pokemon.isFavorite ? heart : heartOutline}
                  ></IonIcon>
                </Button>
                <Button
                  type="button"
                  variant="danger_outline"
                  onClickAction={() => deletePokemon(pokemon.id!)}
                >
                  <IonIcon icon={trash}></IonIcon>
                </Button>
              </IonItem>
            ))}
          </VirtualizedList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CustomPokemonList;

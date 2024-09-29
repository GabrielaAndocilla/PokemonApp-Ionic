import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { css } from '../../styled-system/css';
import VirtualizedList from '../components/VirtualizedList';
import { PokemonPokeApi, convertToPokemonModel } from '../models/Pokemon';

const getPokemon = async (name: string) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

const PokemonDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { data, isFetching } = useQuery({
    queryKey: ['detailPokemon', name],
    queryFn: () => getPokemon(name),
  });
  const pokemon: PokemonPokeApi = data && convertToPokemonModel(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pokemon : {name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className={css({ display: 'flex', justifyContent: 'center' })}>
            {pokemon && (
              <IonCard
                className={css({ width: 'xl', textAlign: 'center', mt: 8 })}
              >
                <IonCardHeader>
                  <IonCardTitle>
                    {pokemon.name.toLocaleUpperCase()}
                  </IonCardTitle>
                </IonCardHeader>
                <img
                  alt={`${pokemon.name} details`}
                  src={pokemon.imageUrl}
                  className={css({ marginX: 'auto' })}
                />
                <IonCardContent>
                  <h3>Abilities</h3>
                  <IonList inset={true}>
                    {pokemon.abilities.map((todo: any, i: number) => (
                      <IonItem key={i}>
                        <IonLabel>{todo}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                  <h3>Moves</h3>
                  <div
                    className={css({
                      marginBottom: 9,
                      borderColor: 'primary',
                      borderWidth: 2,
                      borderStyle: 'dashed',
                    })}
                  >
                    <VirtualizedList rowHeight={40}>
                      {pokemon.movements.map((todo: any, i: number) => (
                        <IonItem key={i}>
                          <IonLabel>{todo}</IonLabel>
                        </IonItem>
                      ))}
                    </VirtualizedList>
                  </div>
                </IonCardContent>
              </IonCard>
            )}
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetailPage;

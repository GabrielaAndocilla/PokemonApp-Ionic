import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { Button } from '../components/Button';
import { Show } from '../components/Show';
import { usePokemonsPokeApi } from '../hooks/usePokemonsPokeApi';

const offset = 20;
const PokemonListPage: React.FC = () => {
  const [fetchUrl, setFetchUrl] = useState(`https://pokeapi.co/api/v2/pokemon`);
  const [currentPage, setCurrent] = useState(1);
  const [startIndexPage, setStartIndexPage] = useState(1);
  const { data: res, isFetching } = usePokemonsPokeApi(fetchUrl);
  const pokemons = res?.data;
  const totalPages = Math.ceil((pokemons?.count || 0) / offset);
  const arrayPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const changePage = (page: number) => {
    setCurrent(page);
    const startIndex = (page - 1) * offset;
    setFetchUrl(
      `https://pokeapi.co/api/v2/pokemon?offset=${startIndex}&limit=${offset}`
    );
  };

  console.log({ startIndexPage, currentPage });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Check our pokemons</IonTitle>
          {isFetching && <IonProgressBar type="indeterminate"></IonProgressBar>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Show>
          <Show.When isTrue={!isFetching}>
            <>
              <IonList inset={true}>
                {pokemons?.results.map((todo: any, i: number) => (
                  <IonItem key={i}>
                    <IonLabel>{todo.name}</IonLabel>
                    <Link to={`/pokemon/${todo.name}`}> Read More</Link>
                  </IonItem>
                ))}
              </IonList>
              <div
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '100%',
                  justifyContent: 'center',
                })}
              >
                <Button
                  onClickAction={() => {
                    if (!pokemons.previous) return;
                    setStartIndexPage(startIndexPage - 1);
                    setCurrent(currentPage - 1);
                    setFetchUrl(pokemons.previous);
                  }}
                  variant="primary"
                >
                  Anterior
                </Button>
                {arrayPages
                  .slice(startIndexPage - 1, startIndexPage + 5)
                  .map((page) => (
                    <Button
                      key={`page_${page}`}
                      variant={currentPage === page ? 'secondary' : 'primary'}
                      onClickAction={() => changePage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                <Button
                  onClickAction={() => {
                    if (!pokemons.next) return;
                    setStartIndexPage(startIndexPage + 1);
                    setCurrent(currentPage + 1);
                    setFetchUrl(pokemons.next);
                  }}
                  variant="primary"
                >
                  Next
                </Button>
              </div>
            </>
          </Show.When>
        </Show>
      </IonContent>
    </IonPage>
  );
};

export default PokemonListPage;

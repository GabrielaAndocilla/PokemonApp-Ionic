import { IonContent, IonImg, IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { Button } from '../components/Button';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent
        className={css({
          p: '4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <div className={css({ textAlign: 'center' })}>
          <h1>Pokemon App</h1>
          <IonImg
            className={css({ width: '1/2', my: '0', mx: 'auto' })}
            src="assets/pokemonApp.jpg"
            alt="Pokemon App"
          ></IonImg>
          <Button
            onClickAction={() => history.push('/login')}
            variant="primary"
          >
            Login
          </Button>
          <Button
            onClickAction={() => history.push('/signUp')}
            variant="primary_outline"
          >
            Sign Up
          </Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

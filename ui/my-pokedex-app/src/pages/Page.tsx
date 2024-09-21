import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { css } from '../../styled-system/css';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        <div
          className={css({
            bg: 'blue',
            borderRadius: '9999px',
            fontSize: '13px',
            padding: '10px 15px',
          })}
        >
          Hello 🐼!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { create, listOutline, listSharp, logOut } from 'ionicons/icons';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authentication';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Pokemons',
    url: '/pokemons',
    iosIcon: listOutline,
    mdIcon: listOutline,
  },
  {
    title: 'Create a pokemon',
    url: '/pokemon/create',
    iosIcon: create,
    mdIcon: create,
  },
  {
    title: 'Check your Pokemons',
    url: '/pokemon/all',
    iosIcon: listSharp,
    mdIcon: listSharp,
  },
];

const Menu: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle autoHide={false}>
            <IonItem
              routerDirection="none"
              lines="none"
              detail={false}
              onClick={logout}
            >
              <IonIcon
                aria-hidden="true"
                slot="start"
                ios={logOut}
                md={logOut}
              />
              <IonLabel>Log Out</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

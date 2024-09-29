import { IonButton } from '@ionic/react';
import { MouseEventHandler, ReactNode } from 'react';
import { cva } from '../../styled-system/css';

const button = cva({
  base: {
    display: 'flex',
    margin: '3',
  },
  variants: {
    variant: {
      primary: { bg: 'primary', color: 'white' },
      primary_outline: {
        borderWidth: '1px',
        borderColor: 'primary',
        color: 'primary',
      },
      secondary: { bg: '#3B4CCA', color: 'white' },
      secondary_outline: {
        borderWidth: '1px',
        borderColor: '#3B4CCA',
        color: '#3B4CCA',
      },
      danger_outline: {
        borderWidth: '1px',
        borderColor: 'red.500',
        color: 'red.500',
      },
    },
    size: {
      sm: { fontSize: '12px' },
      lg: { fontSize: '24px' },
    },
  },
});

export const Button = ({
  children,
  variant,
  onClickAction,
  type,
  ...res
}: {
  children: ReactNode;
  variant:
    | 'primary'
    | 'primary_outline'
    | 'secondary'
    | 'secondary_outline'
    | 'danger_outline';
  onClickAction?: MouseEventHandler<HTMLIonButtonElement>;
  type?: 'submit' | 'reset' | 'button';
}) => {
  return (
    <IonButton
      type={type}
      className={button({ variant })}
      expand="block"
      color="transparent"
      onClick={onClickAction}
    >
      {children}
    </IonButton>
  );
};

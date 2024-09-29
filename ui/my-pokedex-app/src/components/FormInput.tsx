import { TextFieldTypes } from '@ionic/core';
import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { FocusEventHandler } from 'react';
import { css } from '../../styled-system/css';
import { Show } from './Show';

export const FormInput = ({
  label,
  value,
  onChangeAction,
  type = 'text',
  error,
  className,
  onFocus,
  placeholder = '',
}: {
  label: string;
  value: string;
  onChangeAction: Function;
  type: TextFieldTypes;
  error?: string;
  className?: string;
  onFocus?: FocusEventHandler<HTMLIonInputElement> | undefined;
  placeholder?: string;
}) => {
  const test = () => console.log('a');
  return (
    <div className={className}>
      <IonItem>
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput
          type={type}
          value={value}
          onFocus={onFocus}
          onIonInput={test}
          className={css({ mt: 4 })}
          placeholder={placeholder}
        />
      </IonItem>
      <Show>
        <Show.When isTrue={error != undefined}>
          <IonText
            className={css({ color: 'red.400', fontSize: 'xs', ml: '5' })}
          >
            {error}
          </IonText>
        </Show.When>
      </Show>
    </div>
  );
};

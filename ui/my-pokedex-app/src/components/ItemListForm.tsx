import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { arrowForwardCircle, trash } from 'ionicons/icons';
import { FC, FocusEventHandler, useState } from 'react';
import { css } from '../../styled-system/css';
import { Button } from './Button';
import { FormInput } from './FormInput';

const ItemListForm: FC<{
  label: string;
  items: string[];
  setItems: Function;
  error?: string;
  onFocus?: FocusEventHandler<HTMLIonInputElement> | undefined;
}> = ({ label, items, setItems, error, onFocus }) => {
  const [newItem, setNewItem] = useState<string>('');

  const removeItem = (items: string[], index: number): string[] => {
    const newItems = [...items];
    newItems.splice(index, 1);
    return newItems;
  };

  return (
    <>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        })}
      >
        <FormInput
          type="text"
          label={label}
          onChangeAction={setNewItem}
          onFocus={onFocus}
          value={newItem}
          error={error}
          className={css({ width: '2/3', display: 'block' })}
        />
        <Button
          variant="primary"
          type="button"
          onClickAction={(e) => {
            e.stopPropagation();
            if (newItem === '') return;
            items.push(newItem);
            setNewItem('');
          }}
        >
          Add
        </Button>
      </div>
      <IonList inset={true}>
        {items.map((item: string, i: number) => (
          <IonItem key={`${item}${i}`}>
            <IonIcon icon={arrowForwardCircle}></IonIcon>
            <IonLabel>{item}</IonLabel>
            <Button
              type="button"
              variant="primary_outline"
              onClickAction={() => setItems(removeItem(items, i))}
            >
              <IonIcon icon={trash}></IonIcon>
            </Button>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};
export default ItemListForm;

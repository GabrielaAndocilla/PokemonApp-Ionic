import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { bugOutline, saveOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import ItemListForm from '../components/ItemListForm';
import { useCreatePokemon } from '../hooks/useCreatePokemon';
import { usePokemon } from '../hooks/usePokemon';
import { useSavePokemon } from '../hooks/useSavePokemon';
import { CustomPokemon } from '../models/Pokemon';

export const CreatePokemonPage = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [abilities, setAbilities] = useState<string[]>([]);
  const [movements, setMovements] = useState<string[]>([]);
  const [errors, setErrors] = useState<GeneralObject<string>>({});
  const [toastStatus, setToastStatus] = useState({
    status: false,
    message: '',
    icon: saveOutline,
    color: 'primary',
  });
  const { data: res } = usePokemon(id);
  const { mutateAsync: createPokemon } = useCreatePokemon();
  const { mutateAsync: savePokemon } = useSavePokemon();

  const data = res?.data;

  useEffect(() => {
    if (!data) return;
    const { name, height, abilities, movements } = data.data;
    console.log({ name, height, abilities, movements });
    setName(name);
    setHeight(height);
    setAbilities(abilities);
    setMovements(movements);
  }, [data]);

  const validateErrors = (submit: Function): void => {
    let errors: GeneralObject<string> = {};
    if (!name) errors.name = 'A name is required';
    if (!height) errors['height'] = 'A height is required';
    if (!abilities.length) errors.abilities = 'Abilities are required';
    if (!movements.length) errors.movements = 'Movements are required';
    if (!Object.keys(errors).length) {
      return submit();
    }
    setErrors(errors);
  };

  const deleteError = (key: string) => {
    delete errors[key];
    setErrors({ ...errors });
  };

  const submit = async () => {
    try {
      const pokemon: CustomPokemon = { id, name, height, abilities, movements };
      const { status } = id
        ? await savePokemon(pokemon)
        : await createPokemon(pokemon);
      if (status !== 201)
        return setToastStatus({
          ...toastStatus,
          message: `We have a problem saving, please try later`,
          status: true,
          icon: bugOutline,
          color: 'red.400',
        });
      setToastStatus({
        ...toastStatus,
        message: `The pokemon ${name} has been saved`,
        status: true,
      });
      return history.push('/pokemon/all');
    } catch (error) {
      setToastStatus({
        ...toastStatus,
        message: `We have a problem saving, please try later`,
        status: true,
        icon: bugOutline,
        color: 'red.400',
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Create Your own Pokemon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg
          className={css({ width: '1/12', mt: '20px', mb: 0, mx: 'auto' })}
          src="assets/pokeball.png"
          alt="Pokemon ball"
        ></IonImg>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateErrors(submit);
          }}
        >
          <FormInput
            type="text"
            label="Pokemon Name"
            onChangeAction={setName}
            value={name}
            error={errors.name}
            onFocus={() => deleteError('name')}
          />
          <FormInput
            type="text"
            label="Pokemon Height"
            onChangeAction={setHeight}
            value={height}
            error={errors.height}
            onFocus={() => deleteError('height')}
          />
          <ItemListForm
            items={abilities}
            setItems={setAbilities}
            label={`Add some Abilities to ${name ? name : ' your pokemon'}`}
            error={errors.abilities}
            onFocus={() => deleteError('abilities')}
          />
          <ItemListForm
            items={movements}
            setItems={setMovements}
            label={`Add some Movements`}
            error={errors.movements}
            onFocus={() => deleteError('movements')}
          />
          <Button type="submit" variant="secondary">
            {id ? 'Edit Pokemon' : 'Create Pokemon'}
          </Button>
        </form>
        <IonToast
          className={css({ color: toastStatus.color })}
          isOpen={toastStatus.status}
          icon={toastStatus.icon}
          trigger="open-toast"
          message={toastStatus.message}
          duration={5000}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

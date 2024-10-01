// src/pages/Signup.tsx
import { IonContent, IonPage } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { status } = await axios.post(
      `${import.meta.env.VITE_BACKEND_HOST}/register`,
      {
        name: nickName,
        email,
        password,
      }
    );
    if (status === 201) return history.push('/login');
  };

  return (
    <IonPage>
      <IonContent className={css({ p: 4 })}>
        <h2>Sign Up</h2>
        <FormInput
          type="text"
          label="NickName"
          onChangeAction={setNickName}
          value={nickName}
        />
        <FormInput
          type="email"
          label="Email"
          onChangeAction={setEmail}
          value={email}
        />
        <FormInput
          type="password"
          label="Password"
          onChangeAction={setPassword}
          value={password}
        />
        <Button onClickAction={handleSignUp} variant="primary">
          Sign Up
        </Button>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;

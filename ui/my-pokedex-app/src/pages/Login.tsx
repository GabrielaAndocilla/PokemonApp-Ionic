import { IonContent, IonPage, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { useAuth } from '../contexts/authentication';
import {
  containerStyle,
  errorStyle,
  formContainerStyle,
  headerStyle,
  inputItemStyle,
} from './Login.styles';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const loginWasSuccess: boolean = await login(email, password);
    if (!loginWasSuccess)
      return setError('It was an issue trying, please try latter');
    setError(null);
    history.push('/pokemons');
  };

  return (
    <IonPage>
      <IonContent>
        <div className={containerStyle}>
          <div className={formContainerStyle}>
            <h2 className={headerStyle}>Login</h2>

            {error && (
              <IonText color="danger" className={errorStyle}>
                {error}
              </IonText>
            )}
            <FormInput
              type="email"
              label="Email"
              onChangeAction={setEmail}
              value={email}
              className={inputItemStyle}
            />
            <FormInput
              type="password"
              label="Password"
              onChangeAction={setPassword}
              value={password}
              className={inputItemStyle}
            />
            <Button onClickAction={handleLogin} variant="primary">
              Log In
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

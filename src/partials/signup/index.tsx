import { useState } from 'react';
import styles from './signUp.module.css';
import formStyles from '../../styles/forms.module.css';

// Firebase related
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Logo } from '../../components/Logo';

export default function SignUp({ onClickToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, credentials, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (credentials) {
    return (
      <div>
        <p>Registered User: {credentials.user.email}</p>
      </div>
    );
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <form className={styles.signUpForm} onSubmit={onSubmitForm}>
      <Logo />
      <div className={formStyles.field}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={formStyles.field}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? (
        <div className={formStyles.error}>
          Invalid Email or Password. Try again
        </div>
      ) : null}
      <button type="submit" className={formStyles.button}>
        Sign Up
      </button>
      <div className={formStyles.toogleLegend}>
        or{' '}
        <a href="#" onClick={onClickToggleForm}>
          Login
        </a>{' '}
        if you already have an account
      </div>
    </form>
  );
}

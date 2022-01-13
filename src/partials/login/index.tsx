import { useState } from 'react';
import styles from './login.module.css';
import formStyles from '../../styles/forms.module.css';

// Firebase related
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Logo } from '../../components/Logo';

export default function LogIn({ onClickToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, credentials, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (credentials) {
    location.href = '/';
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <form className={styles.loginForm} onSubmit={onSubmitForm}>
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
        Login
      </button>
      <div className={formStyles.toogleLegend}>
        or{' '}
        <a href="#" onClick={onClickToggleForm}>
          Sign Up
        </a>{' '}
        to create an account
      </div>
    </form>
  );
}

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

export const Auth = function ({ children }) {
  const [credentials] = useAuthState(auth);
  const isUser = !!credentials;

  if (isUser) {
    return children;
  }

  return null;
};

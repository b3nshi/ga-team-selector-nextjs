import styles from './logo.module.css';

interface LogoProps {
  size?: 'small';
}

export const Logo = ({ size }: LogoProps) => (
  <div className={size ? styles[`logo-${size}`] : styles.logo} />
);

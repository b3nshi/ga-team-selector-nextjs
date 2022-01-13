import { Button } from 'grommet';
import * as Icons from 'grommet-icons';
import styles from './FixedButton.module.css';

interface FixedButtonProps {
  onClick: (e) => void;
}
export const FixedButton = ({ onClick }: FixedButtonProps) => {
  return (
    <Button
      icon={<Icons.Add />}
      onClick={onClick}
      className={styles.fixedButton}
    />
  );
};

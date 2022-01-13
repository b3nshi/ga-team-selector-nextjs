import { Grommet } from 'grommet';
import { theme } from '../styles/theme';
import { Auth } from './Auth';

interface BasePageProps {
  privatePage?: boolean;
  children: any;
}
export const BasePage = ({ privatePage, children }: BasePageProps) => {
  return privatePage ? (
    <Auth>
      <Grommet theme={theme}>{children}</Grommet>
    </Auth>
  ) : (
    <Grommet theme={theme}>{children}</Grommet>
  );
};

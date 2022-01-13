import { BasePage } from '../../components/BasePage';
import { BaseApp } from '../../partials/app/baseApp';
import { Settings } from '../../partials/app/Settings';

const SettingsPage = function () {
  return (
    <BasePage privatePage={true}>
      <BaseApp>
        <Settings />
      </BaseApp>
    </BasePage>
  );
};

export default SettingsPage;

import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { BUILDER } from '@graasp/translations';

import { useBuilderTranslation } from '../../../config/i18n';
import {
  ITEM_SETTINGS_BUTTON_CLASS,
  buildSettingsButtonId,
} from '../../../config/selectors';
import { ItemActionTabs } from '../../../enums';
import { useLayoutContext } from '../../context/LayoutContext';

type Props = {
  id: string;
};

const ItemSettingsButton = ({ id }: Props): JSX.Element => {
  const { openedActionTabId, setOpenedActionTabId } = useLayoutContext();
  const { t: translateBuilder } = useBuilderTranslation();

  const onClickSettings = () => {
    setOpenedActionTabId(
      openedActionTabId === ItemActionTabs.Settings
        ? null
        : ItemActionTabs.Settings,
    );
  };

  return (
    <Tooltip title={translateBuilder(BUILDER.SETTINGS_TITLE)}>
      <IconButton
        onClick={onClickSettings}
        className={ITEM_SETTINGS_BUTTON_CLASS}
        id={buildSettingsButtonId(id)}
      >
        {openedActionTabId === ItemActionTabs.Settings ? (
          <CloseIcon />
        ) : (
          <SettingsIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ItemSettingsButton;

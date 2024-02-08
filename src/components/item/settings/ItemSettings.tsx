import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Link, useOutletContext } from 'react-router-dom';

import { Info } from '@mui/icons-material';
import {
  Alert,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { OutletType } from '@/components/pages/item/type';
import { buildItemInformationPath } from '@/config/paths';

import {
  DEFAULT_COLLAPSIBLE_SETTING,
  DEFAULT_PINNED_SETTING,
  DEFAULT_RESIZE_SETTING,
  DEFAULT_SAVE_ACTIONS_SETTING,
  DEFAULT_SHOW_CHATBOX_SETTING,
} from '../../../config/constants';
import { useBuilderTranslation } from '../../../config/i18n';
import { mutations } from '../../../config/queryClient';
import {
  SETTINGS_CHATBOX_TOGGLE_ID,
  SETTINGS_COLLAPSE_TOGGLE_ID,
  SETTINGS_PINNED_TOGGLE_ID,
  SETTINGS_RESIZE_TOGGLE_ID,
  SETTINGS_SAVE_ACTIONS_TOGGLE_ID,
} from '../../../config/selectors';
import { BUILDER } from '../../../langs/constants';
import AdminChatSettings from './AdminChatSettings';
import FileSettings from './FileSettings';
import LinkSettings from './LinkSettings';

const ItemSettings = (): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const { item } = useOutletContext<OutletType>();

  const { mutate: editItem } = mutations.useEditItem();

  const { settings } = item;

  const [settingLocal, setSettingLocal] =
    useState<DiscriminatedItem['settings']>(settings);

  useEffect(
    () => {
      if (settings) {
        // this is used because we get a response where the setting only contains the modified setting
        // so it make the toggles flicker.
        // by only overriding keys that changes we are able to remove the flicker effect

        setSettingLocal((previousSettings) => ({
          ...previousSettings,
          ...settings,
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings],
  );

  const handleOnToggle = (
    event: { target: { checked: boolean } },
    settingKey: string,
  ): void => {
    const newValue = event.target.checked;
    setSettingLocal({
      ...settingLocal,
      [settingKey]: newValue,
    });
    editItem({
      id: item.id,
      name: item.name,
      settings: {
        [settingKey]: newValue,
      },
    });
  };

  const renderPinSetting = () => {
    const control = (
      <Switch
        id={SETTINGS_PINNED_TOGGLE_ID}
        onChange={(e) => handleOnToggle(e, 'isPinned')}
        checked={settingLocal?.isPinned || DEFAULT_PINNED_SETTING}
        color="primary"
      />
    );
    return (
      <FormControlLabel
        label={translateBuilder(BUILDER.SETTINGS_PIN_ITEM_LABEL)}
        control={control}
      />
    );
  };

  const renderChatSetting = () => {
    const control = (
      <Switch
        id={SETTINGS_CHATBOX_TOGGLE_ID}
        onChange={(e) => handleOnToggle(e, 'showChatbox')}
        checked={settingLocal?.showChatbox || DEFAULT_SHOW_CHATBOX_SETTING}
        color="primary"
      />
    );
    return (
      <FormControlLabel
        label={translateBuilder(BUILDER.SETTINGS_SHOW_CHAT_LABEL)}
        control={control}
      />
    );
  };

  const renderResizeSetting = () => {
    const control = (
      <Switch
        id={SETTINGS_RESIZE_TOGGLE_ID}
        onChange={(e) => handleOnToggle(e, 'isResizable')}
        checked={settingLocal?.isResizable || DEFAULT_RESIZE_SETTING}
        color="primary"
      />
    );
    return (
      <FormControlLabel
        label={translateBuilder(BUILDER.SETTINGS_RESIZE_LABEL)}
        control={control}
      />
    );
  };

  const renderCollapseSetting = () => {
    const disabled = item.type === ItemType.FOLDER;
    const control = (
      <Switch
        id={SETTINGS_COLLAPSE_TOGGLE_ID}
        onChange={(e) => handleOnToggle(e, 'isCollapsible')}
        checked={settingLocal?.isCollapsible || DEFAULT_COLLAPSIBLE_SETTING}
        color="primary"
        disabled={disabled}
      />
    );
    const formLabel = (
      <FormControlLabel
        label={translateBuilder(BUILDER.SETTINGS_COLLAPSE_LABEL)}
        control={control}
      />
    );
    const tooltip = disabled ? (
      <Tooltip
        title={translateBuilder(BUILDER.SETTINGS_COLLAPSE_FOLDER_INFORMATION)}
        placement="right"
        sx={{ m: 0, p: 0 }}
      >
        <span>
          <Info htmlColor="gray" sx={{ mb: -0.5 }} fontSize="small" />
        </span>
      </Tooltip>
    ) : null;
    return (
      <div>
        {formLabel}
        {tooltip}
      </div>
    );
  };

  const renderSaveActionsSetting = () => {
    const control = (
      <Tooltip title={translateBuilder(BUILDER.SAVE_ACTIONS_TOGGLE_TOOLTIP)}>
        <span>
          <Switch
            id={SETTINGS_SAVE_ACTIONS_TOGGLE_ID}
            onChange={(e) => handleOnToggle(e, 'enableSaveActions')}
            checked={
              settingLocal?.enableSaveActions ?? DEFAULT_SAVE_ACTIONS_SETTING
            }
            color="primary"
            disabled
          />
        </span>
      </Tooltip>
    );
    return (
      <FormControlLabel
        label={translateBuilder(BUILDER.SETTINGS_SAVE_ACTIONS)}
        control={control}
      />
    );
  };

  const renderSettingsPerType = () => {
    switch (item.type) {
      case ItemType.LINK:
        return <LinkSettings item={item} />;
      case ItemType.S3_FILE:
      case ItemType.LOCAL_FILE:
        return <FileSettings item={item} />;
      default:
        return null;
    }
  };

  return (
    <Container disableGutters sx={{ mt: 2 }}>
      <Alert severity="warning" sx={{ marginBottom: 2 }}>
        <Trans
          t={translateBuilder}
          i18nKey={BUILDER.UPDATE_THUMBNAIL_AT_INFO_ALERT}
          components={{
            navigate: <Link to={buildItemInformationPath(item.id)} />,
          }}
        />
      </Alert>
      <Typography variant="h5">
        {translateBuilder(BUILDER.SETTINGS_TITLE)}
      </Typography>

      <FormGroup>
        {renderPinSetting()}
        {renderCollapseSetting()}
        {item.type === ItemType.APP && renderResizeSetting()}
        {renderChatSetting()}
        {renderSaveActionsSetting()}
      </FormGroup>
      {renderSettingsPerType()}
      <AdminChatSettings item={item} />
    </Container>
  );
};

export default ItemSettings;

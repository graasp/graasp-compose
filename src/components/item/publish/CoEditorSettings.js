import { Record } from 'immutable';
import PropTypes from 'prop-types';

import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MUTATION_KEYS } from '@graasp/query-client';
import { Loader } from '@graasp/ui';

import { DISPLAY_CO_EDITORS_OPTIONS } from '../../../config/constants';
import { useMutation } from '../../../config/queryClient';
import {
  CO_EDITOR_SETTINGS_RADIO_GROUP_ID,
  buildCoEditorSettingsRadioButtonId,
} from '../../../config/selectors';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const { EDIT_ITEM } = MUTATION_KEYS;

const CoEditorSettings = ({ item }) => {
  const { t } = useTranslation();
  const { mutate: updateDisplayCoEditors } = useMutation(EDIT_ITEM);

  // user
  const { isLoading: isMemberLoading } = useContext(CurrentUserContext);

  // current item
  const itemId = item?.id;
  const settings = item?.settings;
  const itemName = item?.name;

  // by default, co editors will not be displayed
  const [optionValue, setOptionValue] = useState(
    DISPLAY_CO_EDITORS_OPTIONS.NO.value,
  );

  useEffect(() => {
    if (settings?.displayCoEditors) {
      setOptionValue(settings.displayCoEditors);
    }
  }, [settings]);

  if (isMemberLoading) {
    return <Loader />;
  }

  const handleChange = (event) => {
    // value from radio button is string, convert to boolean
    const newValue = event.target.value === 'true';
    setOptionValue(newValue);
    updateDisplayCoEditors({
      id: itemId,
      name: itemName,
      settings: { displayCoEditors: newValue },
    });
  };

  return (
    <>
      <Typography variant="h6" mt={2}>
        {t('Co-Editors')}
      </Typography>
      <Typography variant="body1">
        {t(
          'Do you want to display co-editors on the publication page? All users with edit or admin permissions will be displayed.',
        )}
      </Typography>
      <RadioGroup
        id={CO_EDITOR_SETTINGS_RADIO_GROUP_ID}
        name={t('Display co-editors?')}
        value={optionValue}
        onChange={handleChange}
      >
        {Object.values(DISPLAY_CO_EDITORS_OPTIONS).map((option) => (
          <FormControlLabel
            key={option.value}
            id={buildCoEditorSettingsRadioButtonId(option.value)}
            value={option.value}
            control={<Radio color="primary" />}
            label={t(option.label)}
          />
        ))}
      </RadioGroup>
    </>
  );
};

CoEditorSettings.propTypes = {
  item: PropTypes.instanceOf(Record).isRequired,
};

export default CoEditorSettings;

import React from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import { MUTATION_KEYS } from '@graasp/query-client';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  ITEM_MENU_RECYCLE_BUTTON_CLASS,
  ITEM_RECYCLE_BUTTON_CLASS,
} from '../../config/selectors';
import { useMutation } from '../../config/queryClient';
import { BUTTON_TYPES } from '../../config/constants';

const RecycleButton = ({ itemIds, color, id, type, onClick }) => {
  const { t } = useTranslation();
  const { mutate: recycleItems } = useMutation(MUTATION_KEYS.RECYCLE_ITEMS);

  const handleClick = () => {
    recycleItems(itemIds);
    onClick?.();
  };

  const text = t('Recycle');

  switch (type) {
    case BUTTON_TYPES.MENU_ITEM:
      return (
        <MenuItem
          key={text}
          onClick={handleClick}
          className={ITEM_MENU_RECYCLE_BUTTON_CLASS}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
    case BUTTON_TYPES.ICON_BUTTON:
      return (
        <Tooltip title={text}>
          <IconButton
            id={id}
            color={color}
            className={ITEM_RECYCLE_BUTTON_CLASS}
            aria-label={text}
            onClick={handleClick}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
  }
};

RecycleButton.propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

RecycleButton.defaultProps = {
  color: 'default',
  id: '',
  type: BUTTON_TYPES.ICON_BUTTON,
  onClick: null,
};

export default RecycleButton;

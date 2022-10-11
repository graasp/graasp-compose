import PropTypes from 'prop-types';

import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useTranslation } from 'react-i18next';

import { MUTATION_KEYS } from '@graasp/query-client';

import { useMutation } from '../../config/queryClient';
import { RESTORE_ITEMS_BUTTON_CLASS } from '../../config/selectors';

const RestoreButton = ({ itemIds, color, id }) => {
  const { t } = useTranslation();
  const { mutate: restoreItems } = useMutation(MUTATION_KEYS.RESTORE_ITEMS);

  const onClick = () => {
    // restore items
    restoreItems(itemIds);
  };

  return (
    <Tooltip title={t('Restore')}>
      <span>
        <IconButton
          id={id}
          aria-label="restore"
          color={color}
          className={RESTORE_ITEMS_BUTTON_CLASS}
          onClick={onClick}
        >
          <RestoreFromTrashIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

RestoreButton.propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string,
  id: PropTypes.string,
};
RestoreButton.defaultProps = {
  color: 'default',
  id: null,
};

export default RestoreButton;

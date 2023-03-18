import { IconButtonProps } from '@mui/material/IconButton';

import { FC, useState } from 'react';

import { BUILDER } from '@graasp/translations';
import {
  ActionButtonVariant,
  DeleteButton as GraaspDeleteButton,
} from '@graasp/ui';

import { useBuilderTranslation } from '../../config/i18n';
import { ITEM_DELETE_BUTTON_CLASS } from '../../config/selectors';
import DeleteItemDialog from '../main/DeleteItemDialog';

type Props = {
  itemIds: string[];
  color?: IconButtonProps['color'];
  id?: string;
  type?: ActionButtonVariant;
  onClick?: () => void;
};

/**
 * Delete Button Component
 * This button opens a dialog to confirm the action
 */
const DeleteButton: FC<Props> = ({ itemIds, color, id, type, onClick }) => {
  const { t: translateBuilder } = useBuilderTranslation();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onClick?.();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const text = translateBuilder(BUILDER.DELETE_BUTTON);

  return (
    <>
      <GraaspDeleteButton
        key={text}
        onClick={handleClickOpen}
        text={text}
        aria-label={text}
        id={id}
        color={color}
        type={type as ActionButtonVariant}
        className={ITEM_DELETE_BUTTON_CLASS}
      />
      <DeleteItemDialog
        open={open}
        handleClose={handleClose}
        itemIds={itemIds}
      />
    </>
  );
};

export default DeleteButton;

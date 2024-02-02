import { useEffect, useState } from 'react';

import { IconButtonProps } from '@mui/material';

import {
  ActionButtonVariant,
  CopyButton as GraaspCopyButton,
} from '@graasp/ui';

import { hooks, mutations } from '@/config/queryClient';
import { computButtonText, computeTitle } from '@/utils/itemSelection';

import { useBuilderTranslation } from '../../config/i18n';
import {
  ITEM_COPY_BUTTON_CLASS,
  ITEM_MENU_COPY_BUTTON_CLASS,
} from '../../config/selectors';
import { BUILDER } from '../../langs/constants';
import { NavigationElement } from './itemSelectionModal/Breadcrumbs';
import ItemSelectionModal, {
  ItemSelectionModalProps,
} from './itemSelectionModal/ItemSelectionModal';

export type Props = {
  color?: IconButtonProps['color'];
  id?: string;
  onClick?: () => void;
  type?: ActionButtonVariant;
  itemIds: string[];
};

const CopyButton = ({
  itemIds: defaultItemsIds,
  color,
  id,
  type,
  onClick,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const { mutate: copyItems } = mutations.useCopyItems();
  const [open, setOpen] = useState<boolean>(false);
  const [itemIds, setItemIds] = useState<string[]>(defaultItemsIds || []);

  const { data: items } = hooks.useItems(itemIds);

  const openCopyModal = (newItemIds: string[]) => {
    setOpen(true);
    setItemIds(newItemIds);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm: ItemSelectionModalProps['onConfirm'] = (payload) => {
    // change item's root id to null
    const newPayload = {
      ids: itemIds,
      to: payload,
    };
    copyItems(newPayload);
    onClose();
  };

  useEffect(() => {
    // necessary to sync prop with a state because move-many-items' targets are updated dynamically with the table
    setItemIds(defaultItemsIds);
  }, [defaultItemsIds]);

  const handleCopy = () => {
    openCopyModal(itemIds);
    onClick?.();
  };

  // The copy button is never disabled
  const isDisabled = (_item: NavigationElement, _homeId: string) => false;

  const title = computeTitle({
    items,
    count: itemIds.length - 1,
    translateBuilder,
    translateKey: BUILDER.COPY_ITEM_MODAL_TITLE,
  });

  const buttonText = (name?: string) =>
    computButtonText({
      translateBuilder,
      translateKey: BUILDER.COPY_BUTTON,
      name,
    });

  return (
    <>
      <GraaspCopyButton
        type={type}
        id={id}
        text={translateBuilder(BUILDER.COPY_BUTTON)}
        color={color}
        iconClassName={ITEM_COPY_BUTTON_CLASS}
        menuItemClassName={ITEM_MENU_COPY_BUTTON_CLASS}
        onClick={handleCopy}
      />

      {items?.data && open && (
        <ItemSelectionModal
          title={title}
          isDisabled={isDisabled}
          buttonText={buttonText}
          onClose={onClose}
          open={open}
          onConfirm={onConfirm}
          items={Object.values(items.data)}
        />
      )}
    </>
  );
};

export default CopyButton;

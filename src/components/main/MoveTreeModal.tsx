import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Breadcrumbs, Button, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DiscriminatedItem } from '@graasp/sdk';

import { useBuilderTranslation } from '../../config/i18n';
import { hooks } from '../../config/queryClient';
import {
  TREE_MODAL_CONFIRM_BUTTON_ID,
  TREE_MODAL_MY_ITEMS_ID,
} from '../../config/selectors';
import { BUILDER } from '../../langs/constants';
import CancelButton from '../common/CancelButton';
import MoveMenuRow from './RowMenu';

const dialogId = 'simple-dialog-title';

export type TreeModalProps = {
  onConfirm: (args: { ids: string[]; to?: string }) => void;
  onClose: (args: { id: string | null; open: boolean }) => void;
  title: string;
  itemIds?: string[];
  open?: boolean;
};

interface OwnedItemsProps {
  setPaths: Dispatch<SetStateAction<DiscriminatedItem[]>>;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
  defaultSelectedSubItem: DiscriminatedItem | null;
  itemIds: string[];
}

const OwnedItemsTree = ({
  setPaths,
  setSelectedId,
  selectedId,
  defaultSelectedSubItem,
  itemIds,
}: OwnedItemsProps) => {
  const { data: ownItems } = hooks.useOwnItems();
  const { t: translateBuilder } = useBuilderTranslation();

  const [selectedSubItem, setSubSelectedItem] = useState(
    defaultSelectedSubItem,
  );

  const [isHome, setIsHome] = useState(true);
  const { data } = hooks.useChildren(selectedSubItem?.id || '');

  const selectSubItems = (ele: DiscriminatedItem) => {
    setSubSelectedItem(ele);
    setPaths((paths: DiscriminatedItem[]) => [...paths, ele]);
  };

  useEffect(() => {
    if (defaultSelectedSubItem) {
      if (defaultSelectedSubItem.name === 'Home') {
        setSubSelectedItem(null);
      } else {
        setSubSelectedItem(defaultSelectedSubItem);
      }
      setPaths((prevPaths) => {
        const trimmedIndex = prevPaths.indexOf(defaultSelectedSubItem);

        return prevPaths.slice(0, trimmedIndex - 1);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelectedSubItem?.id]);

  const rootMenuItem = {
    name: translateBuilder(BUILDER.HOME_TITLE),
    id: TREE_MODAL_MY_ITEMS_ID,
    extra: { folder: { childrenOrder: [''] } },
  } as DiscriminatedItem;
  return (
    <div id={`${TREE_MODAL_MY_ITEMS_ID}`}>
      {/* Home or Root */}
      {isHome && (
        <MoveMenuRow
          key={rootMenuItem.name}
          ele={rootMenuItem}
          fetchSubItems={() => {
            setIsHome(false);
            setPaths((paths: DiscriminatedItem[]) => [...paths, rootMenuItem]);
          }}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          itemIds={[]}
        />
      )}
      {/* end of home */}
      {!isHome &&
        (selectedSubItem ? data : ownItems)?.map((ele) => (
          <MoveMenuRow
            key={ele.id}
            ele={ele}
            fetchSubItems={() => selectSubItems(ele)}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            itemIds={itemIds}
          />
        ))}
    </div>
  );
};

const TreeModal = ({
  title,
  onClose,
  onConfirm,
  open = false,
  itemIds = [],
}: TreeModalProps): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const [defaultSelectedSubItem, setDefaultSelectedSubItem] =
    useState<DiscriminatedItem | null>(null);

  const [selectedId, setSelectedId] = useState<string>('');

  const [paths, setPaths] = useState<DiscriminatedItem[]>([]);
  const handleClose = () => {
    onClose({ id: null, open: false });
  };

  const onClickConfirm = () => {
    onConfirm({ ids: itemIds, to: selectedId });
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={dialogId}
      open={open}
      scroll="paper"
    >
      <DialogTitle id={dialogId}>{title}</DialogTitle>
      <DialogContent sx={{ height: '250px' }}>
        <Stack spacing={2} mb={2}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {paths.map((ele) => (
              <Button
                variant="text"
                color="inherit"
                sx={{
                  padding: 0,
                  '&:hover': {
                    textDecoration: 'underline',
                    background: 'none',
                  },
                }}
                key={ele.id}
                onClick={() => setDefaultSelectedSubItem(ele)}
              >
                {ele.name}
              </Button>
            ))}
          </Breadcrumbs>
        </Stack>

        <OwnedItemsTree
          setPaths={setPaths}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
          defaultSelectedSubItem={defaultSelectedSubItem}
          itemIds={itemIds}
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose} />
        <Button
          onClick={onClickConfirm}
          disabled={!selectedId}
          id={TREE_MODAL_CONFIRM_BUTTON_ID}
        >
          {translateBuilder(BUILDER.TREE_MODAL_CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TreeModal;
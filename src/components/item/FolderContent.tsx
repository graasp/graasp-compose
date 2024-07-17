import { Alert, Box, Stack, Typography } from '@mui/material';

import {
  PackedItem,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';
import { Loader } from '@graasp/ui';

import { useBuilderTranslation, useEnumsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  ITEM_SCREEN_ERROR_ALERT_ID,
  buildItemsTableId,
} from '@/config/selectors';
import { ItemLayoutMode, Ordering } from '@/enums';
import { BUILDER } from '@/langs/constants';

import ErrorAlert from '../common/ErrorAlert';
import SelectTypes from '../common/SelectTypes';
import { useFilterItemsContext } from '../context/FilterItemsContext';
import { useLayoutContext } from '../context/LayoutContext';
import FileUploader from '../file/FileUploader';
import NewItemButton from '../main/NewItemButton';
import ItemsTable from '../main/list/ItemsTable';
import {
  SelectionContextProvider,
  useSelectionContext,
} from '../main/list/SelectionContext';
import { DesktopMap } from '../map/DesktopMap';
import NoItemFilters from '../pages/NoItemFilters';
import SortingSelect from '../table/SortingSelect';
import { SortingOptionsForFolder } from '../table/types';
import { useSorting } from '../table/useSorting';
import FolderDescription from './FolderDescription';
import FolderToolbar from './FolderSelectionToolbar';
import { useItemSearch } from './ItemSearch';
import ModeButton from './header/ModeButton';

type Props = {
  item: PackedItem;
  searchText: string;
  items?: PackedItem[];
  sortBy: SortingOptionsForFolder;
};

const Content = ({ item, searchText, items, sortBy }: Props) => {
  const { mode } = useLayoutContext();
  const { itemTypes } = useFilterItemsContext();
  const { selectedIds, toggleSelection } = useSelectionContext();

  const enableEditing = item.permission
    ? PermissionLevelCompare.lte(PermissionLevel.Write, item.permission)
    : false;

  if (mode === ItemLayoutMode.Map) {
    return (
      <>
        <Stack direction="row" justifyContent="right">
          <ModeButton />
        </Stack>
        <DesktopMap parentId={item.id} />
      </>
    );
  }

  if (items?.length) {
    return (
      <>
        <ItemsTable
          selectedIds={selectedIds}
          enableMoveInBetween={sortBy === SortingOptionsForFolder.Order}
          id={buildItemsTableId(item.id)}
          items={items ?? []}
          onCardClick={toggleSelection}
        />
        {Boolean(enableEditing && !searchText && !itemTypes?.length) && (
          <Stack alignItems="center" mb={2}>
            <NewItemButton
              type="icon"
              key="newButton"
              // add new items at the end of the list
              previousItemId={items ? items[items.length - 1]?.id : undefined}
            />
          </Stack>
        )}
      </>
    );
  }

  // no items to show because of filters
  if (!items?.length && (searchText.length || itemTypes.length)) {
    return <NoItemFilters searchText={searchText} />;
  }

  // no items show drop zone
  if (
    item.permission &&
    PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
  ) {
    return (
      <Box mt={1}>
        <FileUploader buttons={<NewItemButton key="newButton" />} />
      </Box>
    );
  }

  return null;
};

/**
 * Helper component to render typed folder items
 */
const FolderContent = ({ item }: { item: PackedItem }): JSX.Element => {
  const { t: translateEnums } = useEnumsTranslation();
  const { shouldDisplayItem } = useFilterItemsContext();
  const { t: translateBuilder } = useBuilderTranslation();
  const { selectedIds } = useSelectionContext();

  const {
    data: children,
    isLoading,
    isError,
  } = hooks.useChildren(item.id, {
    ordered: true,
  });

  const itemSearch = useItemSearch();

  const { ordering, setOrdering, setSortBy, sortBy, sortFn } =
    useSorting<SortingOptionsForFolder>({
      sortBy: SortingOptionsForFolder.Order,
      ordering: Ordering.ASC,
    });

  // TODO: use hook's filter when available
  const folderChildren = children
    ?.filter(
      (f) =>
        shouldDisplayItem(f.type) &&
        f.name.toLowerCase().includes(itemSearch.text.toLowerCase()),
    )
    .sort(sortFn);

  if (children) {
    return (
      <>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ wordWrap: 'break-word' }}
          >
            {item.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            {itemSearch.input}
            <NewItemButton
              key="newButton"
              size="medium"
              // add new items at the end of the list
              previousItemId={children[children.length - 1]?.id}
            />
          </Stack>
        </Stack>
        <FolderDescription itemId={item.id} />

        <Stack
          alignItems="space-between"
          direction="column"
          mt={2}
          gap={1}
          width="100%"
        >
          {selectedIds.length && folderChildren?.length ? (
            <FolderToolbar items={folderChildren} />
          ) : (
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <SelectTypes />
              <Stack direction="row" gap={1}>
                {sortBy && setSortBy && (
                  <SortingSelect
                    ordering={ordering}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    options={Object.values(SortingOptionsForFolder).sort(
                      (t1, t2) =>
                        translateEnums(t1).localeCompare(translateEnums(t2)),
                    )}
                    setOrdering={setOrdering}
                  />
                )}
                <ModeButton />
              </Stack>
            </Stack>
          )}
        </Stack>
        <Content
          sortBy={sortBy}
          item={item}
          items={folderChildren}
          searchText={itemSearch.text}
        />
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }

  return (
    <Alert severity="info">
      {translateBuilder(BUILDER.ITEMS_TABLE_EMPTY_MESSAGE)}
    </Alert>
  );
};

export const FolderContentWrapper = ({
  item,
}: {
  item: PackedItem;
}): JSX.Element => (
  <SelectionContextProvider>
    <FolderContent item={item} />
  </SelectionContextProvider>
);

export default FolderContentWrapper;

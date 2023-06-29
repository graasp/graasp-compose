import { ColDef } from 'ag-grid-community';

import { Typography } from '@mui/material';

import { useMemo } from 'react';

import { ItemMembership, PermissionLevel } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { BUILDER } from '@graasp/translations';
import { Table as GraaspTable } from '@graasp/ui/dist/table';

import {
  MEMBERSHIP_TABLE_HEIGHT,
  MEMBERSHIP_TABLE_ROW_HEIGHT,
} from '../../../config/constants';
import { useBuilderTranslation } from '../../../config/i18n';
import { mutations } from '../../../config/queryClient';
import {
  buildItemMembershipRowDeleteButtonId,
  buildItemMembershipRowId,
} from '../../../config/selectors';
import TableRowDeleteButtonRenderer from './TableRowDeleteButtonRenderer';
import TableRowPermissionRenderer from './TableRowPermissionRenderer';

const rowStyle = {
  display: 'flex',
  alignItems: 'center',

  '& > div': {
    width: '100%',
  },
};

const NameRenderer = () => {
  const ChildComponent = ({
    data: membership,
  }: {
    data: Pick<ItemMembership, 'member'>;
  }) => <Typography noWrap>{membership?.member?.name ?? ''}</Typography>;
  return ChildComponent;
};

const EmailRenderer = () => {
  const ChildComponent = ({
    data: membership,
  }: {
    data: Pick<ItemMembership, 'member'>;
  }) => <Typography noWrap>{membership?.member?.email ?? ''}</Typography>;
  return ChildComponent;
};

const getRowId = ({ data }: { data: ItemMembership }) =>
  buildItemMembershipRowId(data.id);

type Props = {
  item: ItemRecord;
  memberships: ItemMembership[];
  emptyMessage?: string;
  showEmail?: boolean;
  readOnly?: boolean;
};

const ItemMembershipsTable = ({
  memberships,
  item,
  emptyMessage,
  showEmail = true,
  readOnly = false,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();

  const { mutate: deleteItemMembership } = mutations.useDeleteItemMembership();
  const { mutate: editItemMembership } = mutations.useEditItemMembership();
  const { mutate: shareItem } = mutations.usePostItemMembership();

  const onDelete = ({ instance }: { instance: ItemMembership }) => {
    deleteItemMembership({ id: instance.id, itemId: item.id });
  };

  // never changes, so we can use useMemo
  const columnDefs = useMemo(() => {
    const ActionRenderer = TableRowDeleteButtonRenderer({
      item,
      onDelete,
      buildIdFunction: buildItemMembershipRowDeleteButtonId,
      tooltip: translateBuilder(
        BUILDER.ITEM_MEMBERSHIPS_TABLE_CANNOT_DELETE_PARENT_TOOLTIP,
      ),
    });
    const PermissionRenderer = TableRowPermissionRenderer({
      item,
      editFunction: ({
        value,
        instance,
      }: {
        value: PermissionLevel;
        instance: ItemMembership;
      }) => {
        editItemMembership({
          id: instance.id,
          permission: value,
          itemId: item.id,
        });
      },
      createFunction: ({
        value,
        instance,
      }: {
        value: PermissionLevel;
        instance: ItemMembership;
      }) => {
        const { email } = instance.member;
        shareItem({
          id: item.id,
          email,
          permission: value,
        });
      },
      readOnly,
    });
    const NameCellRenderer = NameRenderer();

    const columns: ColDef[] = [];
    if (showEmail) {
      const EmailCellRenderer = EmailRenderer();
      columns.push({
        headerCheckboxSelection: !readOnly,
        checkboxSelection: !readOnly,
        headerName: translateBuilder(
          BUILDER.ITEM_MEMBERSHIPS_TABLE_EMAIL_HEADER,
        ),
        cellRenderer: EmailCellRenderer,
        field: 'email',
        // bug: force width 100% of child div
        cellStyle: rowStyle as any,
        flex: 2,
        tooltipField: 'email',
        resizable: true,
      });
    }

    return columns.concat([
      {
        headerName: translateBuilder(
          BUILDER.ITEM_MEMBERSHIPS_TABLE_NAME_HEADER,
        ),
        cellRenderer: NameCellRenderer,
        field: 'memberId', // TODO: CHANGE?
        // bug: force width 100% of child div
        cellStyle: rowStyle as any,
        flex: 2,
        tooltipField: 'name',
      },
      {
        headerName: translateBuilder(
          BUILDER.ITEM_MEMBERSHIPS_TABLE_PERMISSION_HEADER,
        ),
        cellRenderer: PermissionRenderer,
        comparator: GraaspTable.textComparator,
        type: 'rightAligned',
        field: 'permission',
        flex: 1,
        cellStyle: readOnly
          ? {
              display: 'flex',
              justifyContent: 'right',
            }
          : {
              overflow: 'visible',
              textAlign: 'right',
            },
      },
      {
        field: readOnly ? undefined : 'actions',
        cellRenderer: readOnly ? null : ActionRenderer,
        headerName: readOnly
          ? undefined
          : translateBuilder(BUILDER.ITEM_MEMBERSHIPS_TABLE_ACTIONS_HEADER),
        colId: 'actions',
        type: 'rightAligned',
        sortable: false,
        cellStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        flex: 1,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, showEmail, readOnly]);

  const countTextFunction = (selected: string[]) =>
    translateBuilder(BUILDER.ITEMS_TABLE_SELECTION_TEXT, {
      count: selected.length,
    });

  return (
    <GraaspTable
      columnDefs={columnDefs}
      tableHeight={MEMBERSHIP_TABLE_HEIGHT}
      rowData={memberships}
      getRowId={getRowId}
      rowHeight={MEMBERSHIP_TABLE_ROW_HEIGHT}
      isClickable={false}
      emptyMessage={emptyMessage}
      countTextFunction={countTextFunction}
    />
  );
};

export default ItemMembershipsTable;

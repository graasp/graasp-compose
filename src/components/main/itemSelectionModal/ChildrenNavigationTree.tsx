import { Box } from '@mui/material';

import { ItemType } from '@graasp/sdk';

import { useBuilderTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { BUILDER } from '@/langs/constants';

import { NavigationElement } from './Breadcrumbs';
import RowMenu, { RowMenuProps } from './RowMenu';

interface ChildrenNavigationTreeProps {
  isDisabled?: RowMenuProps['isDisabled'];
  selectedId?: string;
  selectedNavigationItem: NavigationElement;
  onClick: RowMenuProps['onClick'];
  onNavigate: RowMenuProps['onNavigate'];
}

const ChildrenNavigationTree = ({
  onClick,
  selectedId,
  selectedNavigationItem,
  onNavigate,
  isDisabled,
}: ChildrenNavigationTreeProps): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const { data: children } = hooks.useChildren(selectedNavigationItem.id);

  const childrenFolders = children?.filter(
    ({ type }) => type === ItemType.FOLDER,
  );
  return (
    <>
      {childrenFolders?.map((ele) => (
        <RowMenu
          key={ele.id}
          item={ele}
          onNavigate={onNavigate}
          selectedId={selectedId}
          onClick={onClick}
          isDisabled={isDisabled}
        />
      ))}
      {!childrenFolders?.length && (
        <Box sx={{ color: 'darkgrey', pt: 1 }}>
          {translateBuilder(BUILDER.EMPTY_FOLDER_CHILDREN_FOR_THIS_ITEM)}
        </Box>
      )}
    </>
  );
};

export default ChildrenNavigationTree;

import React, { Dispatch, SetStateAction, useState } from 'react';

import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, IconButton } from '@mui/material';

import { DiscriminatedItem, FolderItemExtra } from '@graasp/sdk';

import { useBuilderTranslation } from '@/config/i18n';
import { BUILDER } from '@/langs/constants';

interface MenuRowProps {
  ele: DiscriminatedItem;
  fetchSubItems: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}
const MoveMenuRow = ({
  ele,
  fetchSubItems,
  setSelectedId,
  selectedId,
}: MenuRowProps): JSX.Element => {
  const [isHoverActive, setIsHoverActive] = useState(false);

  const { t: translateBuilder } = useBuilderTranslation();

  const handleHover = () => {
    setIsHoverActive(true);
  };
  const handleUnhover = () => {
    setIsHoverActive(false);
  };

  return (
    <Button
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
      onClick={() => {
        setSelectedId(ele?.id);
      }}
      sx={{
        display: 'flex',
        color: 'black',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '12px',
        background: selectedId === ele.id ? 'rgba(80, 80, 210, 0.08)' : 'none',
      }}
    >
      <Box display="flex" gap="4px">
        <FolderIcon />
        {ele.name}
      </Box>
      {(isHoverActive || selectedId === ele.id) && (
        <Box display="flex">
          <Button sx={{ padding: '0' }}>
            {translateBuilder(BUILDER.MOVE_BUTTON)}
          </Button>
          {Boolean(
            (ele.extra as FolderItemExtra).folder.childrenOrder.length,
          ) && (
            <IconButton
              sx={{ padding: '0' }}
              onClick={(e) => {
                e.stopPropagation();
                fetchSubItems();
                setSelectedId('');
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Button>
  );
};

export default MoveMenuRow;

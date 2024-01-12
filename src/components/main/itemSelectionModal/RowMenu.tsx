import { useState } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, IconButton, Stack, Typography, styled } from '@mui/material';

import { ItemType } from '@graasp/sdk';
import { ItemIcon } from '@graasp/ui';

import {
  buildItemRowArrowId,
  buildNavigationModalItemId,
} from '@/config/selectors';

import { NavigationElement } from './Breadcrumbs';

export interface RowMenuProps {
  item: NavigationElement;
  onNavigate: (item: NavigationElement) => void;
  selectedId?: string;
  onClick: (item: NavigationElement) => void;
  isDisabled?: (item: NavigationElement) => boolean;
}

const StyledButton = styled(Button)<{ isSelected: boolean }>(
  ({ theme, isSelected }) => ({
    color: theme.palette.text.primary,
    width: '100%',
    justifyContent: 'start',
    background: isSelected ? theme.palette.grey[200] : 'none',
    textTransform: 'none',
    pl: 1,
  }),
);

const RowMenu = ({
  item,
  onNavigate,
  onClick,
  selectedId,
  isDisabled,
}: RowMenuProps): JSX.Element | null => {
  const [isHoverActive, setIsHoverActive] = useState(false);

  const handleHover = () => {
    setIsHoverActive(true);
  };
  const handleUnhover = () => {
    setIsHoverActive(false);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
    >
      <Stack direction="row" alignItems="center" width="100%">
        <StyledButton
          onClick={() => {
            onClick(item);
          }}
          id={buildNavigationModalItemId(item.id)}
          isSelected={selectedId === item.id}
          disabled={isDisabled?.(item)}
          startIcon={
            <ItemIcon
              sx={{ width: 20 }}
              alt={`${item.name} icon`}
              type={ItemType.FOLDER}
            />
          }
        >
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            variant="body1"
          >
            {item.name}
          </Typography>
        </StyledButton>
      </Stack>
      {(isHoverActive || selectedId === item.id) && (
        <IconButton
          sx={{ p: 0 }}
          onClick={() => onNavigate(item)}
          id={buildItemRowArrowId(item.id)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default RowMenu;

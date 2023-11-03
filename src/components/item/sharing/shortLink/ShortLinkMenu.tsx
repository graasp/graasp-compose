import React, { useState } from 'react';

import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';

import { ShortLinkPayload } from '@graasp/sdk';
import { FAILURE_MESSAGES, SUCCESS_MESSAGES } from '@graasp/translations';

import QRCode from '@/components/common/QRCode';
import { useBuilderTranslation, useMessagesTranslation } from '@/config/i18n';
import notifier from '@/config/notifier';
import {
  buildShortLinkDeleteBtnId,
  buildShortLinkEditBtnId,
  buildShortLinkMenuBtnId,
  buildShortLinkShortenBtnId,
} from '@/config/selectors';
import { BUILDER } from '@/langs/constants';
import { COPY_ITEM_LINK_TO_CLIPBOARD } from '@/types/clipboard';
import { copyToClipboard } from '@/utils/clipboard';
import { ShortLinkPlatform } from '@/utils/shortLink';

type Props = {
  shortLink: ShortLinkPayload;
  url: string;
  isShorten: boolean;
  canAdminShortLink: boolean;
  onCreate: (platform: ShortLinkPlatform) => void;
  onUpdate: () => void;
  onDelete: () => void;
};

const ShortLinkMenu = ({
  shortLink,
  url,
  isShorten,
  canAdminShortLink,
  onCreate,
  onUpdate,
  onDelete,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const { t: translateMessages } = useMessagesTranslation();

  const { alias, platform, itemId } = shortLink;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    handleMenuClose();
    onUpdate();
  };

  const handleCopy = () => {
    if (url) {
      copyToClipboard(url, {
        onSuccess: () => {
          notifier({
            type: COPY_ITEM_LINK_TO_CLIPBOARD.SUCCESS,
            payload: {
              message: translateMessages(
                SUCCESS_MESSAGES.COPY_LINK_TO_CLIPBOARD,
              ),
            },
          });
        },
        onError: () => {
          notifier({
            type: COPY_ITEM_LINK_TO_CLIPBOARD.FAILURE,
            payload: {
              message: translateMessages(
                FAILURE_MESSAGES.COPY_LINK_TO_CLIPBOARD_ERROR,
              ),
            },
          });
        },
      });
    }
  };

  const handleClickDelete = () => {
    handleMenuClose();
    onDelete();
  };

  return (
    <Stack direction="row">
      <Tooltip title={translateBuilder(BUILDER.SHARE_ITEM_LINK_COPY_TOOLTIP)}>
        <span>
          <IconButton onClick={handleCopy}>
            <FileCopyIcon />
          </IconButton>
        </span>
      </Tooltip>

      <QRCode value={url} />

      {canAdminShortLink && (
        <>
          {isShorten && (
            <>
              <IconButton
                id={buildShortLinkMenuBtnId(alias)}
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={buildShortLinkMenuBtnId(alias)}
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleUpdate}
                  id={buildShortLinkEditBtnId(alias)}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    {translateBuilder(BUILDER.EDIT_SHORT_LINK_TITLE)}
                  </ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={handleClickDelete}
                  id={buildShortLinkDeleteBtnId(alias)}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    {translateBuilder(BUILDER.DELETE_SHORT_LINK_TITLE)}
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}

          {!isShorten && (
            <Tooltip title={translateBuilder(BUILDER.SHORTEN_LINK_TOOLTIP)}>
              <span>
                <IconButton
                  id={buildShortLinkShortenBtnId(itemId, platform)}
                  onClick={() => onCreate(platform)}
                >
                  <AddLinkIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </>
      )}
    </Stack>
  );
};

export default ShortLinkMenu;

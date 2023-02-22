import { isList } from 'immutable';

import { Box, Typography } from '@mui/material';

import { ItemType, getEmbeddedLinkExtra } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { ItemIcon, Thumbnail } from '@graasp/ui';

import { hooks } from '../../config/queryClient';
import { buildNameCellRendererId } from '../../config/selectors';

type ChildProps = { data: ItemRecord };

const ItemNameCellRenderer = (
  showThumbnails: boolean,
): ((props: ChildProps) => JSX.Element) => {
  const Component = ({ data: item }: ChildProps): JSX.Element => {
    const linkExtra =
      item.type === ItemType.LINK
        ? getEmbeddedLinkExtra(item.extra)
        : undefined;

    const alt = item.name;
    const iconSrc = isList(linkExtra?.icons)
      ? linkExtra?.icons?.first()
      : linkExtra?.icons?.[0];
    const thumbnailSrc = isList(linkExtra?.thumbnails)
      ? linkExtra?.thumbnails?.first()
      : linkExtra?.thumbnails?.[0];
    const defaultValueComponent = (
      <ItemIcon type={item.type} iconSrc={iconSrc} alt={alt} />
    );

    return (
      <Box
        display="flex"
        alignItems="center"
        id={buildNameCellRendererId(item.id)}
      >
        {showThumbnails && (
          <Thumbnail
            id={item.id}
            thumbnailSrc={thumbnailSrc}
            maxWidth={30}
            maxHeight={30}
            alt={alt}
            defaultValue={defaultValueComponent}
            useThumbnail={hooks.useItemThumbnail}
          />
        )}
        <Typography noWrap ml={1}>
          {item.name}
        </Typography>
      </Box>
    );
  };

  return Component;
};

export default ItemNameCellRenderer;
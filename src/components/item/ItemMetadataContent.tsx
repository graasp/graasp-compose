import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { ItemType, getFileExtra, getS3FileExtra } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { BUILDER, COMMON } from '@graasp/translations';

import i18n, {
  useBuilderTranslation,
  useCommonTranslation,
} from '../../config/i18n';
import { hooks } from '../../config/queryClient';
import {
  ITEM_PANEL_NAME_ID,
  ITEM_PANEL_TABLE_ID,
} from '../../config/selectors';
import { formatDate } from '../../utils/date';
import { useLayoutContext } from '../context/LayoutContext';
import ItemMemberships from './ItemMemberships';

const { useMember } = hooks;

type Props = {
  item: ItemRecord;
};

const ItemMetadataContent = ({ item }: Props): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const { t: translateCommon } = useCommonTranslation();

  const { setIsItemMetadataMenuOpen } = useLayoutContext();
  const { data: creator } = useMember(item.creator);

  const onClick = () => {
    setIsItemMetadataMenuOpen(true);
  };

  let size = null;
  let mimetype = null;
  if (item.type === ItemType.S3_FILE) {
    // todo: improve type of itemRecord with extras
    const extra = getS3FileExtra(item.extra);
    ({ mimetype, size } = extra);
  } else if (item.type === ItemType.LOCAL_FILE) {
    // todo: improve type of itemRecord with extras
    const extra = getFileExtra(item.extra);
    ({ mimetype, size } = extra);
  }

  const renderLink = () => {
    const buildTableRow = (link) => (
      <TableRow>
        <TableCell align="left">
          {translateBuilder(BUILDER.ITEM_METADATA_LINK_TITLE)}
        </TableCell>
        <TableCell align="right">{link}</TableCell>
      </TableRow>
    );
    if (item.type === ItemType.APP) {
      return buildTableRow(item.extra[ItemType.APP].url);
    }
    if (item.type === ItemType.LINK) {
      return buildTableRow(item.extra[ItemType.LINK].url);
    }
    return null;
  };

  return (
    <>
      <TableContainer sx={{ p: 2, boxSizing: 'border-box' }}>
        <Typography variant="h5" id={ITEM_PANEL_NAME_ID} noWrap>
          {item.name}
        </Typography>
        <Table
          id={ITEM_PANEL_TABLE_ID}
          size="small"
          aria-label={translateBuilder(BUILDER.ITEM_METADATA_TITLE)}
        >
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {translateBuilder(BUILDER.ITEM_METADATA_TYPE_TITLE)}
              </TableCell>
              <TableCell align="right">{mimetype ?? item.type}</TableCell>
            </TableRow>
            {size && (
              <TableRow>
                <TableCell component="th" scope="row">
                  {translateBuilder(BUILDER.ITEM_METADATA_SIZE_TITLE)}
                </TableCell>
                <TableCell align="right">{size}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="left">
                {translateBuilder(BUILDER.ITEM_METADATA_CREATOR_TITLE)}
              </TableCell>
              <TableCell align="right">{creator?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                {translateBuilder(BUILDER.ITEM_METADATA_CREATED_AT_TITLE)}
              </TableCell>
              <TableCell align="right">
                {formatDate(item.createdAt, {
                  locale: i18n.language,
                  defaultValue: translateCommon(COMMON.UNKNOWN_DATE),
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                {translateBuilder(BUILDER.ITEM_METADATA_UPDATED_AT_TITLE)}
              </TableCell>
              <TableCell align="right">
                {formatDate(item.updatedAt, {
                  locale: i18n.language,
                  defaultValue: translateCommon(COMMON.UNKNOWN_DATE),
                })}
              </TableCell>
            </TableRow>
            {renderLink()}
          </TableBody>
        </Table>
      </TableContainer>
      <ItemMemberships id={item.id} maxAvatar={5} onClick={onClick} />
    </>
  );
};

export default ItemMetadataContent;
import { useOutletContext, useParams } from 'react-router-dom';

import { Container, Divider, Grid, Typography } from '@mui/material';

import { AccountType, isPseudoMember } from '@graasp/sdk';

import { OutletType } from '@/components/pages/item/type';
import { selectHighestMemberships } from '@/utils/membership';

import { useBuilderTranslation } from '../../../config/i18n';
import { hooks } from '../../../config/queryClient';
import { BUILDER } from '../../../langs/constants';
import CreateItemMembershipForm from './CreateItemMembershipForm';
import InvitationsTable from './InvitationsTable';
import ItemLoginMembershipsTable from './ItemLoginMembershipsTable';
import ItemMembershipsTable from './ItemMembershipsTable';
import VisibilitySelect from './VisibilitySelect';
import ImportUsersWithCSVButton from './csvImport/ImportUsersWithCSVButton';
import ShortLinksRenderer from './shortLink/ShortLinksRenderer';

const ItemSharingTab = (): JSX.Element => {
  const { t: translateBuilder } = useBuilderTranslation();
  const { item, canWrite, canAdmin } = useOutletContext<OutletType>();
  const { itemId } = useParams();

  const { data: memberships } = hooks.useItemMemberships(itemId);

  const { data: invitations } = hooks.useItemInvitations(item?.id);

  const renderMembershipSettings = () => {
    // do not display settings if cannot access memberships
    if (!memberships || !canWrite) {
      return null;
    }

    return (
      <>
        <Divider sx={{ my: 3 }} />

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" m={0} p={0}>
            {translateBuilder(BUILDER.SHARING_AUTHORIZED_MEMBERS_TITLE)}
          </Typography>
          {canAdmin && <ImportUsersWithCSVButton item={item} />}
        </Grid>
        {canAdmin && (
          <CreateItemMembershipForm item={item} memberships={memberships} />
        )}
        <ItemMembershipsTable
          item={item}
          emptyMessage={translateBuilder(
            BUILDER.SHARING_AUTHORIZED_MEMBERS_EMPTY_MESSAGE,
          )}
          memberships={selectHighestMemberships(memberships)
            ?.filter((m) => m.account.type === AccountType.Individual)
            ?.sort((im1, im2) => {
              if (im1.account.type !== AccountType.Individual) {
                return 1;
              }
              if (im2.account.type !== AccountType.Individual) {
                return -1;
              }
              return im1.account.email > im2.account.email ? 1 : -1;
            })}
          readOnly={!canAdmin}
        />
        <ItemLoginMembershipsTable
          memberships={memberships?.filter((m) => isPseudoMember(m.account))}
          item={item}
        />

        {invitations && Boolean(invitations?.length) && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">
              {translateBuilder(BUILDER.SHARING_INVITATIONS_TITLE)}
            </Typography>
            <InvitationsTable
              item={item}
              invitations={invitations}
              emptyMessage={translateBuilder(
                BUILDER.SHARING_INVITATIONS_EMPTY_MESSAGE,
              )}
              readOnly={!canAdmin}
            />
            <Divider sx={{ my: 3 }} />
          </>
        )}
      </>
    );
  };

  return (
    <Container disableGutters component="div">
      <Typography variant="h5">
        {translateBuilder(BUILDER.SHARING_TITLE)}
      </Typography>
      <ShortLinksRenderer
        itemId={item.id}
        canAdminShortLink={Boolean(memberships && canAdmin)}
      />
      <Typography variant="h6">
        {translateBuilder(BUILDER.ITEM_SETTINGS_VISIBILITY_TITLE)}
      </Typography>
      <VisibilitySelect item={item} edit={canAdmin} />
      {renderMembershipSettings()}
    </Container>
  );
};

export default ItemSharingTab;

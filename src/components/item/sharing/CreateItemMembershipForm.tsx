import { List } from 'immutable';
import validator from 'validator';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';

import { Invitation, MUTATION_KEYS, routines } from '@graasp/query-client';
import { PermissionLevel } from '@graasp/sdk';
import { ItemRecord, MemberRecord } from '@graasp/sdk/frontend';
import { BUILDER } from '@graasp/translations';
import { Button } from '@graasp/ui';

import { useBuilderTranslation } from '../../../config/i18n';
import notifier from '../../../config/notifier';
import { useMutation } from '../../../config/queryClient';
import {
  CREATE_MEMBERSHIP_FORM_ID,
  SHARE_ITEM_EMAIL_INPUT_ID,
  SHARE_ITEM_SHARE_BUTTON_ID,
} from '../../../config/selectors';
import ItemMembershipSelect from './ItemMembershipSelect';

const { shareItemRoutine } = routines;
type InvitationFieldInfoType = Pick<Invitation, 'email' | 'permission'>;
type Props = {
  item: ItemRecord;
  members: List<MemberRecord>;
};

// todo: handle multiple invitations
const CreateItemMembershipForm = ({ item, members }: Props): JSX.Element => {
  const itemId = item.id;
  const [error, setError] = useState<string>('');

  const { mutateAsync: shareItem } = useMutation<
    { failure?: { message: string }[] },
    unknown,
    {
      itemId: string;
      data: { id: string; email: string; permission: PermissionLevel }[];
    }
  >(MUTATION_KEYS.SHARE_ITEM);
  const { t: translateBuilder } = useBuilderTranslation();

  // use an array to later allow sending multiple invitations
  const [invitation, setInvitation] = useState<InvitationFieldInfoType>({
    email: '',
    permission: PermissionLevel.Read,
  });

  const checkForInvitationError = ({
    email,
  }: {
    email: string;
  }): string | null => {
    // check mail validity
    if (!email) {
      return translateBuilder(
        BUILDER.SHARE_ITEM_FORM_INVITATION_EMPTY_EMAIL_MESSAGE,
      );
    }
    if (!validator.isEmail(email)) {
      return translateBuilder(
        BUILDER.SHARE_ITEM_FORM_INVITATION_INVALID_EMAIL_MESSAGE,
      );
    }
    // check mail does not already exist
    if (members.find(({ email: thisEmail }) => thisEmail === email)) {
      return translateBuilder(
        BUILDER.SHARE_ITEM_FORM_INVITATION_EMAIL_EXISTS_MESSAGE,
      );
    }
    return null;
  };

  const onChangePermission = (e) => {
    setInvitation({ ...invitation, permission: e.target.value });
  };

  const handleShare = async () => {
    // not good to check email for multiple invitations at once
    const invitationError = checkForInvitationError(invitation);

    if (invitationError) {
      return setError(invitationError);
    }

    let returnedValue;
    try {
      const result = await shareItem({
        itemId,
        data: [
          {
            id: itemId,
            email: invitation.email,
            permission: invitation.permission,
          },
        ],
      });

      // manually notify error
      if (result?.failure?.length) {
        notifier({
          type: shareItemRoutine.FAILURE,
          payload: {
            error: {
              response: { data: { message: result?.failure?.[0].message } },
            },
          },
        });
      } else {
        // reset email input
        setInvitation({
          ...invitation,
          email: '',
        });
      }
    } catch (e) {
      console.error(e);
    }
    return returnedValue;
  };

  const onChangeEmail = (event) => {
    const newInvitation = {
      ...invitation,
      email: event.target.value,
    };
    setInvitation(newInvitation);
    if (error) {
      const isInvalid = checkForInvitationError(newInvitation);
      setError(isInvalid);
    }
  };

  const renderInvitationStatus = () => (
    <Tooltip
      title={translateBuilder(BUILDER.SHARE_ITEM_FORM_INVITATION_TOOLTIP)}
    >
      <IconButton aria-label="status">
        <ErrorOutlineIcon />
      </IconButton>
    </Tooltip>
  );

  const renderButton = () => {
    const disabled = Boolean(error);
    return (
      <Button
        onClick={handleShare}
        disabled={disabled}
        id={SHARE_ITEM_SHARE_BUTTON_ID}
      >
        {translateBuilder(BUILDER.SHARE_ITEM_FORM_CONFIRM_BUTTON)}
      </Button>
    );
  };

  return (
    <Grid container id={CREATE_MEMBERSHIP_FORM_ID}>
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item xs={5}>
          <TextField
            value={invitation.email}
            sx={{
              width: '100%',
              marginTop: 1,
            }}
            id={SHARE_ITEM_EMAIL_INPUT_ID}
            variant="outlined"
            label={translateBuilder(BUILDER.SHARE_ITEM_FORM_EMAIL_LABEL)}
            error={Boolean(error)}
            helperText={error}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item>
          <ItemMembershipSelect
            value={invitation.permission}
            onChange={onChangePermission}
          />
        </Grid>
        <Grid item>{renderButton()}</Grid>
        <Grid item>{renderInvitationStatus()}</Grid>
      </Grid>
    </Grid>
  );
};

export default CreateItemMembershipForm;
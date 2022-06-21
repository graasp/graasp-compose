import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@graasp/ui';
import IconButton from '@material-ui/core/IconButton';
import { List } from 'immutable';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import { MUTATION_KEYS, Api } from '@graasp/query-client';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useMutation } from '../../../config/queryClient';
import { API_HOST } from '../../../config/constants';
import {
  SHARE_ITEM_EMAIL_INPUT_ID,
  CREATE_MEMBERSHIP_FORM_ID,
  SHARE_ITEM_SHARE_BUTTON_ID,
} from '../../../config/selectors';
import ItemMembershipSelect from './ItemMembershipSelect';
import { buildInvitation } from '../../../utils/invitation';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  shortInputField: {
    width: '50%',
  },
  addedMargin: {
    marginTop: theme.spacing(2),
  },
  emailInput: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

// todo: handle multiple invitations
const CreateItemMembershipForm = ({ itemId, members }) => {
  const [error, setError] = useState(false);

  const { mutateAsync: postInvitations } = useMutation(
    MUTATION_KEYS.POST_INVITATIONS,
  );
  const { mutateAsync: share } = useMutation(
    MUTATION_KEYS.POST_ITEM_MEMBERSHIP,
  );
  const { t } = useTranslation();
  const classes = useStyles();

  // use an array to later allow sending multiple invitations
  const [invitation, setInvitation] = useState(buildInvitation());

  const isInvitationInvalid = ({ email }) => {
    // check mail validity
    if (!email) {
      return t('The mail cannot be empty');
    }
    if (!validator.isEmail(email)) {
      return t('This mail is not valid');
    }
    // check mail does not already exist
    if (members.find(({ email: thisEmail }) => thisEmail === email)) {
      return t('This user already has access to this item');
    }
    return false;
  };

  const onChangePermission = (e) => {
    setInvitation({ ...invitation, permission: e.target.value });
  };

  const handleInvite = async () => {
    // not good to check email for multiple invitations at once
    const isInvalid = isInvitationInvalid(invitation);

    if (isInvalid) {
      return setError(isInvalid);
    }

    let returnedValue;
    try {
      // check email has an associated account
      const accounts = await Api.getMemberBy(
        { email: invitation.email },
        {
          API_HOST,
        },
      );

      // if yes, create a membership
      if (accounts.length) {
        returnedValue = await share({
          id: itemId,
          email: invitation.email,
          permission: invitation.permission,
        });
      }
      // otherwise create invitation
      else {
        returnedValue = await postInvitations({
          itemId,
          invitations: [invitation],
        });
      }

      // reset email input
      const newInvitation = {
        ...invitation,
        email: '',
      };
      setInvitation(newInvitation);
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
      const isInvalid = isInvitationInvalid(newInvitation);
      setError(isInvalid);
    }
  };

  const renderInvitationStatus = () => (
    <Tooltip
      title={t(
        'Non-registered users will receive a personal link to register on the platform.',
      )}
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
        onClick={handleInvite}
        disabled={disabled}
        id={SHARE_ITEM_SHARE_BUTTON_ID}
      >
        {t('Invite')}
      </Button>
    );
  };

  return (
    <Grid container spacing={1} id={CREATE_MEMBERSHIP_FORM_ID}>
      <Grid container alignItems="center" justify="center" key={invitation.id}>
        <Grid item xs={5}>
          <TextField
            value={invitation.email}
            className={classes.emailInput}
            id={SHARE_ITEM_EMAIL_INPUT_ID}
            variant="outlined"
            label={t('Email')}
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

CreateItemMembershipForm.propTypes = {
  itemId: PropTypes.string.isRequired,
  members: PropTypes.instanceOf(List),
};
CreateItemMembershipForm.defaultProps = {
  members: List(),
};

export default CreateItemMembershipForm;

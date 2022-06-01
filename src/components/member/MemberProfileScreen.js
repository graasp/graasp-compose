import React, { useContext } from 'react';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Loader } from '@graasp/ui';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Card from '@material-ui/core/Card';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './LanguageSwitch';
import { formatDate } from '../../utils/date';
import { DEFAULT_LANG } from '../../config/constants';
import { copyToClipboard } from '../../utils/clipboard';
import {
  MEMBER_PROFILE_MEMBER_ID_ID,
  MEMBER_PROFILE_EMAIL_ID,
  MEMBER_PROFILE_MEMBER_NAME_ID,
  MEMBER_PROFILE_INSCRIPTION_DATE_ID,
  MEMBER_PROFILE_LANGUAGE_SWITCH_ID,
  MEMBER_PROFILE_MEMBER_ID_COPY_BUTTON_ID,
} from '../../config/selectors';
import notifier from '../../config/notifier';
import { COPY_MEMBER_ID_TO_CLIPBOARD } from '../../types/clipboard';
import Main from '../main/Main';
import { CurrentUserContext } from '../context/CurrentUserContext';
import AvatarSetting from './AvatarSetting';
import DeleteMemberDialog from './DeleteMemberDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  profileTable: {
    margin: theme.spacing(1, 1),
  },
}));

const MemberProfileScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { data: member, isLoading } = useContext(CurrentUserContext);

  if (isLoading) {
    return <Loader />;
  }

  const copyIdToClipboard = () => {
    copyToClipboard(member.get('id'), {
      onSuccess: () => {
        notifier({ type: COPY_MEMBER_ID_TO_CLIPBOARD.SUCCESS, payload: {} });
      },
      onError: () => {
        notifier({ type: COPY_MEMBER_ID_TO_CLIPBOARD.FAILURE, payload: {} });
      },
    });
  };

  return (
    <Main>
      <Card className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Grid item xs={12}>
              <Typography variant="h4" id={MEMBER_PROFILE_MEMBER_NAME_ID}>
                {member.get('name')}
              </Typography>
            </Grid>
            {/* todo: display only as light user */}
            <Grid
              container
              className={classes.profileTable}
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography>{t('Member ID')}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography id={MEMBER_PROFILE_MEMBER_ID_ID}>
                  {member.get('id')}
                  <IconButton
                    id={MEMBER_PROFILE_MEMBER_ID_COPY_BUTTON_ID}
                    onClick={copyIdToClipboard}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.profileTable}
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography>{t('Email')}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography id={MEMBER_PROFILE_EMAIL_ID}>
                  {member.get('email')}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.profileTable}
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography>{t('Member Since')}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography id={MEMBER_PROFILE_INSCRIPTION_DATE_ID}>
                  {formatDate(member.get('createdAt'))}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.profileTable}
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography>{t('Language')}</Typography>
              </Grid>
              <Grid item xs={8}>
                <LanguageSwitch
                  id={MEMBER_PROFILE_LANGUAGE_SWITCH_ID}
                  memberId={member.get('id')}
                  lang={member.get('extra')?.lang || DEFAULT_LANG}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <AvatarSetting user={member} />
        <DeleteMemberDialog id={member?.get('id')} />
      </Card>
    </Main>
  );
};

export default MemberProfileScreen;

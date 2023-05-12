import { Grid, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';

import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MentionButton } from '@graasp/chatbox';
import { Context } from '@graasp/sdk';
import {
  GraaspLogo,
  Main as GraaspMain,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import {
  APP_NAME,
  GRAASP_LOGO_HEADER_HEIGHT,
  HOST_MAP,
} from '../../config/constants';
import { HOME_PATH } from '../../config/paths';
import { hooks, mutations } from '../../config/queryClient';
import {
  APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS,
  APP_NAVIGATION_PLATFORM_SWITCH_ID,
  HEADER_APP_BAR_ID,
} from '../../config/selectors';
import CookiesBanner from '../common/CookiesBanner';
import UserSwitchWrapper from '../common/UserSwitchWrapper';
import { useLayoutContext } from '../context/LayoutContext';
import MainMenu from './MainMenu';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));
type Props = { children: JSX.Element | (JSX.Element & string) };

// small converter for HOST_MAP into a usePlatformNavigation mapper
export const platformsHostsMap = defaultHostsMapper({
  [Platform.Player]: HOST_MAP.player,
  [Platform.Library]: HOST_MAP.library,
});

const Main: FC<Props> = ({ children }) => {
  const { isMainMenuOpen, setIsMainMenuOpen } = useLayoutContext();
  const { data: currentMember } = hooks.useCurrentMember();
  const memberId = currentMember?.get('id');
  // mutations to handle the mentions
  const { mutate: patchMentionMutate } = mutations.usePatchMention();
  const patchMentionFunction = ({
    id,
    status,
  }: {
    id: string;
    status: string;
  }) => patchMentionMutate({ memberId, id, status });
  const { mutate: deleteMentionMutate } = mutations.useDeleteMention();
  const deleteMentionFunction = (mentionId: string) =>
    deleteMentionMutate(mentionId);
  const { mutate: clearAllMentionsMutate } = mutations.useClearMentions();
  const clearAllMentionsFunction = () => clearAllMentionsMutate();

  const { itemId } = useParams();
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, itemId);
  const platformProps = {
    [Platform.Builder]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Builder],
    },
    [Platform.Player]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Player],
      ...getNavigationEvents(Platform.Player),
    },
    [Platform.Library]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Library],
      ...getNavigationEvents(Platform.Library),
    },
    [Platform.Analytics]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Analytics],
      disabled: true,
    },
  };

  const leftContent = (
    <Box display="flex" ml={2}>
      <StyledLink to={HOME_PATH}>
        <GraaspLogo height={GRAASP_LOGO_HEADER_HEIGHT} sx={{ fill: 'white' }} />
        <Typography variant="h6" color="inherit" mr={2} ml={1}>
          {APP_NAME}
        </Typography>
      </StyledLink>
      <PlatformSwitch
        id={APP_NAVIGATION_PLATFORM_SWITCH_ID}
        selected={Platform.Builder}
        platformsProps={platformProps}
        disabledColor="#999"
      />
    </Box>
  );

  const rightContent = (
    <Grid container>
      <Grid item>
        <MentionButton
          color="secondary"
          badgeColor="primary"
          useMentions={hooks.useMentions}
          patchMentionFunction={patchMentionFunction}
          deleteMentionFunction={deleteMentionFunction}
          clearAllMentionsFunction={clearAllMentionsFunction}
        />
      </Grid>
      <Grid item>
        <UserSwitchWrapper />
      </Grid>
    </Grid>
  );

  return (
    <GraaspMain
      context={Context.Builder}
      handleDrawerOpen={() => {
        setIsMainMenuOpen(true);
      }}
      handleDrawerClose={() => {
        setIsMainMenuOpen(false);
      }}
      headerId={HEADER_APP_BAR_ID}
      headerLeftContent={leftContent}
      headerRightContent={rightContent}
      sidebar={<MainMenu />}
      open={isMainMenuOpen}
    >
      <CookiesBanner />
      {children}
    </GraaspMain>
  );
};

export default Main;

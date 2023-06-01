import {
  Context,
  EmailFrequency,
  ItemLoginSchemaType,
  ItemType,
  PermissionLevel,
  buildSignInPath,
} from '@graasp/sdk';

import ITEM_LAYOUT_MODES from '../enums/itemLayoutModes';

export const APP_NAME = 'Graasp';

export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const NODE_ENV =
  process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || ENV.DEVELOPMENT;

export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;

export const APP_VERSION = process.env.REACT_APP_VERSION || 'latest';

export const HOST = process.env.REACT_APP_HOST || 'http://localhost:3111';

export const API_HOST =
  process.env.REACT_APP_API_HOST || 'http://localhost:3111';

export const SHOW_NOTIFICATIONS =
  process.env.REACT_APP_SHOW_NOTIFICATIONS === 'true' || false;

export const AUTHENTICATION_HOST =
  process.env.REACT_APP_AUTHENTICATION_HOST || 'http://localhost:3001';

export const GRAASP_PERFORM_HOST =
  process.env.REACT_APP_GRAASP_PERFORM_HOST || 'http://localhost:3112';
export const GRAASP_LIBRARY_HOST =
  process.env.REACT_APP_GRAASP_EXPLORE_HOST || 'http://localhost:3005';

export const H5P_INTEGRATION_URL =
  process.env.REACT_APP_H5P_INTEGRATION_URL || `${API_HOST}/p/h5p-integration`;

export const GRAASP_ANALYZER_HOST =
  process.env.REACT_APP_GRAASP_ANALYZER_HOST || 'http://localhost:3113';

export const buildGraaspAnalyzerLink = (id: string): string =>
  `${GRAASP_ANALYZER_HOST}/embedded/${id}`;

export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost';

export const DESCRIPTION_MAX_LENGTH = 30;

// time to be considered between 2 clicks for a double-click (https://en.wikipedia.org/wiki/Double-click#Speed_and_timing)
export const DOUBLE_CLICK_DELAY_MS = 500;

export const TREE_VIEW_MAX_WIDTH = 400;
export const UUID_LENGTH = 36;

export const DRAWER_WIDTH = 240;
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_LANG = 'en';
export const DEFAULT_EMAIL_FREQUENCY = 'always';

export const emailFrequency = {
  [EmailFrequency.Always]: 'Always receive email notifications',
  // todo: schedule a digest of the notifications
  // daily: 'Receive email notifications once per day',
  [EmailFrequency.Never]: 'Disable email notifications',
};

export const DEFAULT_SHOW_CHATBOX_SETTING = false;
export const DEFAULT_PINNED_SETTING = false;
export const DEFAULT_COLLAPSIBLE_SETTING = false;
export const DEFAULT_RESIZE_SETTING = false;
export const DEFAULT_SAVE_ACTIONS_SETTING = true;

export const DEFAULT_MEMBER_PROFILE_SAVE_ACTIONS_SETTING = true;

export const DEFAULT_PERMISSION_LEVEL = PermissionLevel.Read;

export const DEFAULT_ANALYZER_HEIGHT = 2300;

export const PERMISSIONS_EDITION_ALLOWED = [
  PermissionLevel.Write,
  PermissionLevel.Admin,
];

export const DEFAULT_ITEM_LAYOUT_MODE = ITEM_LAYOUT_MODES.LIST;

export const ROWS_PER_PAGE_OPTIONS = [10, 25];

export const LEFT_MENU_WIDTH = 250;
export const RIGHT_MENU_WIDTH = 300;
export const HEADER_HEIGHT = 64;

export const FILE_UPLOAD_MAX_FILES = 15;
export const ITEMS_TABLE_ROW_ICON_COLOR = '#333333';

export const ITEM_NAME_MAX_LENGTH = 15;

export const LOADING_CONTENT = '…';
export const SETTINGS = {
  ITEM_LOGIN: {
    name: 'item-login',
    SIGN_IN_MODE: {
      PSEUDONYM: 'pseudonym',
      MEMBER_ID: 'memberId',
      USERNAME_AND_PASSWORD: 'username+password',
    },
  },
  ITEM_PUBLIC: {
    name: 'public-item',
  },
  // this tag doesn't exist but is used if none of the visiblity tag is set
  ITEM_PRIVATE: {
    name: 'private-item',
  },
};

export const SETTINGS_ITEM_LOGIN_DEFAULT = ItemLoginSchemaType.Username;
export const SETTINGS_ITEM_LOGIN_SIGN_IN_MODE_DEFAULT =
  SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYM;

export const USER_ITEM_ORDER = 'user_order';

export const ITEM_TYPES_WITH_CAPTIONS: string[] = [
  ItemType.FOLDER,
  ItemType.S3_FILE,
  ItemType.LOCAL_FILE,
  ItemType.APP,
  ItemType.LINK,
  ItemType.DOCUMENT,
];

export const MIN_SCREEN_WIDTH = 1000;
export const SHARE_MODAL_AVATAR_GROUP_MAX_AVATAR = 8;

/**
 * @deprecated use ui constant
 */
export const FLAG_LIST_MAX_HEIGHT = 250;

export const SHARE_LINK_COLOR = 'black';
export const SHARE_LINK_CONTAINER_BORDER_WIDTH = 1;
export const SHARE_LINK_CONTAINER_BORDER_STYLE = 'dotted';

/* possible choices for number of items per page in grid,
   (must be common multiple for possible row counts of 1,2,3,4,6) */
export const GRID_ITEMS_PER_PAGE_CHOICES: number[] = [12, 24, 36, 48];

export const ITEM_DEFAULT_HEIGHT = '70vh';
export const GRAASP_LOGO_HEADER_HEIGHT = 40;

export const ITEMS_TABLE_CONTAINER_HEIGHT = '65vh';

export const THUMBNAIL_ASPECT = 1;
export const THUMBNAIL_EXTENSION = 'image/jpeg';
export const THUMBNAIL_SETTING_MAX_WIDTH = 200;
export const THUMBNAIL_SETTING_MAX_HEIGHT = 200;

export const H5P_FILE_DOT_EXTENSION = '.h5p';

export const CC_LICENSE_ADAPTION_OPTIONS = {
  ALLOW: 'allow',
  ALIKE: 'alike',
  NONE: '',
};

export const CC_LICENSE_ABOUT_URL =
  'https://creativecommons.org/about/cclicenses/';

export const ADMIN_CONTACT = 'admin@graasp.org';

export const HOST_MAP = {
  [Context.Builder]: '/',
  [Context.Library]: GRAASP_LIBRARY_HOST,
  [Context.Player]: GRAASP_PERFORM_HOST,
  [Context.Analytics]: '',
};

export const MEMBERSHIP_TABLE_HEIGHT = 400;
export const MEMBERSHIP_TABLE_ROW_HEIGHT = 75;

// signin page path from auth host
export const SIGN_IN_PATH = buildSignInPath({ host: AUTHENTICATION_HOST });

export const DISPLAY_CO_EDITORS_OPTIONS = {
  YES: {
    value: true,
    label: 'Yes',
  },
  NO: {
    value: false,
    label: 'No',
  },
};

export const ITEM_HEADER_ICON_HEIGHT = 24;
export const AVATAR_ICON_HEIGHT = 30;
export const DEFAULT_LINK_SHOW_IFRAME = false;
export const DEFAULT_LINK_SHOW_BUTTON = true;

export const GRAASP_ASSETS_URL = process.env.REACT_APP_GRAASP_ASSETS_URL;
export const EXPORT_CSV_HEADERS = [
  { label: 'message_id', key: 'id' },
  { label: 'item_id', key: 'chatId' },
  { label: 'created_at', key: 'createdAt' },
  { label: 'updated_at', key: 'updatedAt' },
  { label: 'creator_id', key: 'creator' },
  { label: 'creator_name', key: 'creatorName' },
  { label: 'message_content', key: 'body' },
];

// TODO: refer from specific endpoint /tutorials?
export const TUTORIALS_LINK =
  'https://player.graasp.org/9d80d81f-ec9d-4bfb-836a-1c6b125aef2f';

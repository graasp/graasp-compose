// todo: this makes tests slow because it compiles ui everytime
// import { Platform } from '@graasp/ui';
import { ShortLinkPlatform } from '@/utils/shortLink';

export const HEADER_APP_BAR_ID = 'headerAppBar';
export const ITEM_DELETE_BUTTON_CLASS = 'itemDeleteButton';
export const ITEM_COPY_BUTTON_CLASS = 'itemCopyButton';
export const ITEM_MOVE_BUTTON_CLASS = 'itemMoveButton';
export const CONFIRM_DELETE_BUTTON_ID = 'confirmDeleteButton';
export const buildItemCard = (id: string): string => `itemCard-${id}`;
export const CREATE_ITEM_BUTTON_ID = 'createItemButton';
export const ITEM_FORM_NAME_INPUT_ID = 'newItemNameInput';
export const ITEM_FORM_CONFIRM_BUTTON_ID = 'newItemConfirmButton';
export const ITEM_SCREEN_ERROR_ALERT_ID = 'itemScreenErrorAlert';
export const buildItemLink = (id: string): string => `itemLink-${id}`;
export const NAVIGATION_HOME_LINK_ID = 'navigationHomeLink';
export const buildNavigationLink = (id: string): string =>
  `navigationLink-${id}`;
export const ITEM_MENU_MOVE_BUTTON_CLASS = 'itemMenuMoveButton';
export const ITEM_MENU_BUTTON_CLASS = 'itemMenuButton';
export const ITEM_MENU_COPY_BUTTON_CLASS = 'itemMenuCopyButton';
export const ITEM_MENU_RECYCLE_BUTTON_CLASS = 'itemMenuRecycleButton';
export const buildItemMenu = (id: string): string => `itemMenu-${id}`;
export const TREE_MODAL_MY_ITEMS_ID = 'treeModalMyItems';
export const TREE_MODAL_SHARED_ITEMS_ID = 'treeModalSharedItems';
export const buildTreeItemId = (id: string, treeRootId: string): string =>
  `${treeRootId}-${id}`;
export const TREE_MODAL_CONFIRM_BUTTON_ID = 'treeModalConfirmButton';
export const ITEMS_GRID_NO_ITEM_ID = 'itemsGridNoItem';
export const EDIT_ITEM_BUTTON_CLASS = 'editButton';
export const FAVORITE_ITEM_BUTTON_CLASS = 'favoriteButton';
export const PIN_ITEM_BUTTON_CLASS = 'pinButton';
export const COLLAPSE_ITEM_BUTTON_CLASS = 'collapseButton';
export const HIDDEN_ITEM_BUTTON_CLASS = 'hideButton';
export const buildHideButtonId = (hidden: boolean): string =>
  `hideButton-${hidden ? 'hidden' : 'visible'}`;
export const SHARE_ITEM_BUTTON_CLASS = 'itemMenuShareButton';
export const PUBLISH_ITEM_BUTTON_CLASS = 'publishItemButton';
export const RESTORE_ITEMS_BUTTON_CLASS = 'itemMenuRestoreButton';
export const SHARE_ITEM_EMAIL_INPUT_ID = 'shareItemModalEmailInput';
export const buildPermissionOptionId = (id: string): string =>
  `permission-${id}`;
export const SHARE_ITEM_SHARE_BUTTON_ID = 'shareItemModalShareButton';
export const MODE_LIST_BUTTON_ID = 'modeListButton';

export const MODE_GRID_BUTTON_ID = 'modeCardButton';
export const SHARED_ITEMS_ID = 'sharedItems';
export const PUBLISHED_ITEMS_ID = 'publishedItems';
export const FAVORITE_ITEMS_ID = 'favoriteItems';
export const RECYCLED_ITEMS_ID = 'recycledItems';
export const OWNED_ITEMS_ID = 'ownedItems';
export const ITEMS_TABLE_BODY = 'itemsTableBody';
export const ITEMS_TABLE_ROW = '.ag-row';
export const buildItemsTableRowId = (id: string): string =>
  `itemsTableRow-${id}`;
export const buildItemsTableRowSelector = (id: string): string =>
  `[row-id="${buildItemsTableRowId(id)}"]`;
export const buildItemsTableRowIdAttribute = (id: string): string =>
  `.ag-center-cols-container [row-id="${buildItemsTableRowId(id)}"]`;
export const ITEMS_TABLE_EMPTY_ROW_ID = 'itemsTableEmptyRow';
export const ITEMS_TABLE_DELETE_SELECTED_ITEMS_ID =
  'itemsTableDeleteSelectedItems';
export const ITEMS_TABLE_RECYCLE_SELECTED_ITEMS_ID =
  'itemsTableDeleteSelectedItems';
export const ITEMS_TABLE_COPY_SELECTED_ITEMS_ID = 'itemsTableCopySelectedItems';
export const ITEMS_TABLE_MOVE_SELECTED_ITEMS_ID = 'itemsTableMoveSelectedItems';
export const ITEMS_TABLE_ROW_CHECKBOX_CLASS = 'itemsTableRowCheckbox';
export const UPLOADER_ID = 'uploader';
export const UPLOADER_DROP_ZONE_ITEMS_CLASS = 'uppy-Root';
export const buildFileItemId = (id: string): string => `file-${id}`;
export const ITEM_PANEL_ID = 'itemPanelMetadata';
export const ITEM_PANEL_NAME_ID = 'itemPanelName';
export const ITEM_PANEL_TABLE_ID = 'itemPanelTable';
export const CREATE_ITEM_FOLDER_ID = 'createItemSpace';
export const CREATE_ITEM_LINK_ID = 'createItemLink';
export const CREATE_ITEM_FILE_ID = 'createItemFile';
export const ITEM_FORM_LINK_INPUT_ID = 'itemFormLinkInput';
export const DASHBOARD_UPLOADER_ID = 'dashboardUploader';
export const CREATE_ITEM_CLOSE_BUTTON_ID = 'createItemCloseButton';
export const USER_MENU_SIGN_OUT_OPTION_ID = 'userMenuSignOutOption';
export const ITEM_LOGIN_SCREEN_ID = 'itemLoginScreen';
export const ITEM_LOGIN_SIGN_IN_USERNAME_ID = 'itemLoginSignInUsername';
export const ITEM_LOGIN_SIGN_IN_PASSWORD_ID = 'itemLoginSignInPassword';
export const ITEM_LOGIN_SIGN_IN_BUTTON_ID = 'itemLoginSignInButton';
export const ITEM_SCREEN_MAIN_ID = 'itemScreenMain';
export const ITEM_LOGIN_SCREEN_FORBIDDEN_ID = 'itemLoginScreenForbidden';
export const ITEM_LOGIN_SIGN_IN_MEMBER_ID_ID = 'itemLoginSignInMemberId';
export const ITEM_LOGIN_SIGN_IN_MODE_ID = 'itemLoginSignInMode';
export const ITEM_MAIN_CLASS = 'itemMain';
export const HOME_ERROR_ALERT_ID = 'homeErrorAlert';
export const SHARED_ITEMS_ERROR_ALERT_ID = 'sharedItemsErrorAlert';
export const PUBLISHED_ITEMS_ERROR_ALERT_ID = 'publishedItemsErrorAlert';
export const FAVORITE_ITEMS_ERROR_ALERT_ID = 'favoriteItemsErrorAlert';
export const ITEM_MENU_SHORTCUT_BUTTON_CLASS = 'itemMenuShortcutButton';
export const ITEM_MENU_DUPLICATE_BUTTON_CLASS = 'itemMenuDuplicateButton';
export const ITEM_MENU_FAVORITE_BUTTON_CLASS = 'itemMenuFavoriteButton';
export const ITEM_MENU_FLAG_BUTTON_CLASS = 'itemMenuFlagButton';
export const buildFlagListItemId = (type: string): string =>
  `flagListItem-${type}`;
export const CREATE_ITEM_DOCUMENT_ID = 'createItemDocument';
export const ITEM_FORM_DOCUMENT_TEXT_ID = 'itemFormDocumentText';
export const ITEM_FORM_DOCUMENT_TEXT_SELECTOR = `#${ITEM_FORM_DOCUMENT_TEXT_ID} .ql-editor`;
export const DOCUMENT_ITEM_TEXT_EDITOR_ID = 'documentItemTextEditor';
export const DOCUMENT_ITEM_TEXT_EDITOR_SELECTOR = `#${DOCUMENT_ITEM_TEXT_EDITOR_ID} .ql-editor`;
export const CREATE_ITEM_APP_ID = 'createItemApp';
export const CREATE_ITEM_ZIP_ID = 'createItemZip';
export const CREATE_ITEM_H5P_ID = 'createItemH5P';
export const CREATE_ITEM_ETHERPAD_ID = 'createItemEtherpad';
export const ITEM_FORM_ETHERPAD_NAME_INPUT_ID = 'itemFormEtherpadNameInputId';
export const ITEM_FORM_APP_URL_ID = 'itemFormAppUrl';
export const buildItemFormAppOptionId = (id?: string): string =>
  `app-option-${id}`;
export const TEXT_EDITOR_CLASS = 'ql-editor';
export const buildSaveButtonId = (id: string): string => `saveButton-${id}`;
export const buildCancelButtonId = (id: string): string => `cancelButton-${id}`;
export const CUSTOM_APP_CYPRESS_ID = 'custom-app';

export const REDIRECTION_CONTENT_ID = 'redirectionContent';
export const ITEM_MEMBERSHIPS_CONTENT_ID = 'itemMembershipsContent';
export const buildMemberAvatarClass = (id?: string): string =>
  `memberAvatar-${id}`;
export const ITEM_SETTINGS_BUTTON_CLASS = 'itemSettingsButton';
export const buildItemMembershipRowId = (id: string): string =>
  `itemMembershipRow-${id}`;
export const buildItemMembershipRowSelector = (id: string): string =>
  `[row-id="${buildItemMembershipRowId(id)}"]`;
export const ITEM_MEMBERSHIP_PERMISSION_SELECT_CLASS =
  'itemMembershipPermissionSelect';
export const buildItemMembershipRowDeleteButtonId = (id: string): string =>
  `itemMembershipRowDeleteButtonId-${id}`;
export const ITEM_INFORMATION_ICON_IS_OPEN_CLASS = 'itemInformationIconIsOpen';
export const ITEM_INFORMATION_BUTTON_ID = 'itemInformationButton';
export const ITEM_SEARCH_INPUT_ID = 'itemSearchInput';
export const ITEMS_GRID_NO_SEARCH_RESULT_ID = 'itemsGridNoSearchResult';
export const ITEMS_GRID_ITEMS_PER_PAGE_SELECT_ID =
  'itemsGridItemsPerPageSelect';
export const ITEMS_GRID_ITEMS_PER_PAGE_SELECT_LABEL_ID =
  'itemsGridItemsPerPageSelectLabel';
export const ITEMS_GRID_PAGINATION_ID = 'itemsGridPagination';
export const buildItemsGridPaginationButton = (page: number): string =>
  `button[aria-label="page ${page}"].MuiPaginationItem-page`;
export const buildItemsGridPaginationButtonSelected = (page: number): string =>
  `${buildItemsGridPaginationButton(page)}.Mui-selected`;
export const ITEM_HEADER_ID = 'itemHeader';
export const ROW_DRAGGER_CLASS = `drag-cell-class-name`;
export const buildShareButtonId = (id: string): string => `shareButton-${id}`;
export const buildPublishButtonId = (id: string): string =>
  `publishButton-${id}`;
export const buildDeleteButtonId = (id: string): string => `deleteButton-${id}`;
export const buildItemMenuButtonId = (id: string): string =>
  `itemMenuButton-${id}`;
export const buildPlayerButtonId = (id: string): string => `playerButton-${id}`;
export const buildEditButtonId = (id: string): string => `editButton-${id}`;
export const buildSettingsButtonId = (id: string): string =>
  `settingsButton-${id}`;
export const PUBLIC_SETTING_SWITCH_ID = 'publicSettingSwitch';
export const INVITE_ITEM_EMAIL_INPUT_ID = 'inviteItemEmailInput';
export const INVITE_ITEM_BUTTON_ID = 'inviteItemButton';
export const SHARE_ITEM_DIALOG_ID = 'shareItemDialog';
export const SHARE_ITEM_DIALOG_LINK_SELECT_ID = 'shareItemDialogLinkSelect';
export const SHARE_ITEM_QR_BTN_ID = 'shareItemQRBtn';
export const SHARE_ITEM_QR_DIALOG_ID = 'shareItemQRDialog';
export const ACCESS_INDICATION_ID = 'accessIndication';
export const ITEM_CHATBOX_BUTTON_ID = 'itemChatboxButton';
export const CHATBOX_ID = 'chatbox';
export const CHATBOX_INPUT_BOX_ID = 'chatboxInputBox';
export const CONFIRM_RECYCLE_BUTTON_ID = 'confirmRecycleButton';
export const SHARE_ITEM_VISIBILITY_SELECT_ID = 'shareItemVisiblitySelect';
export const buildCategorySelectionTitleId = (title: string): string =>
  `itemCategoryTitle-${title}`;
export const buildCategorySelectionId = (title: string): string =>
  `itemCategoryDropdown-${title}`;
export const buildCategoryDropdownParentSelector = (title: string): string =>
  `itemCategoryDropdownParent-${title}`;
export const SHARE_ITEM_PSEUDONYMIZED_SCHEMA_ID =
  'shareItemPseudonymizedSchema';
export const ITEM_RECYCLE_BUTTON_CLASS = 'itemRecycleButton';
export const buildItemsTableId = (id: string): string => `itemsTable-${id}`;

export const ITEM_FORM_IMAGE_ALT_TEXT_EDIT_FIELD_ID =
  'imageEditAltTextTextField';

export const SETTINGS_PINNED_TOGGLE_ID = 'settingsPinnedToggle';
export const SETTINGS_CHATBOX_TOGGLE_ID = 'settingsChatboxToggle';
export const SETTINGS_COLLAPSE_TOGGLE_ID = 'settingsCollapseToggle';
export const SETTINGS_RESIZE_TOGGLE_ID = 'settingsResizeToggle';
export const SETTINGS_SAVE_ACTIONS_TOGGLE_ID = 'settingsSaveActionsToggle';

export const ITEMS_TABLE_RESTORE_SELECTED_ITEMS_ID =
  'itemsTableRestoreSelectedItems';
export const FOLDER_FORM_DESCRIPTION_ID = 'folderFormDescription';
export const buildNameCellRendererId = (id: string): string =>
  `nameCellRenderer-${id}`;
export const ITEM_CARD_MEDIA_CLASSNAME = 'itemCardMedia';
export const ITEM_CARD_HEADER_CLASSNAME = 'itemCardHeader';
export const THUMBNAIL_SETTING_UPLOAD_BUTTON_CLASSNAME =
  'thumbnailSettingUploadButton';
export const CLEAR_CHAT_SETTING_ID = 'clearChatSettingButton';
export const CLEAR_CHAT_DIALOG_ID = 'clearChatDialog';
export const CLEAR_CHAT_CANCEL_BUTTON_ID = 'clearChatCancelButton';
export const CLEAR_CHAT_CONFIRM_BUTTON_ID = 'clearChatConfirmButton';
export const DOWNLOAD_CHAT_BUTTON_ID = 'downloadChatButton';
export const CROP_MODAL_CONFIRM_BUTTON_CLASSNAME = 'cropModalConfirmButton';
export const ZIP_DASHBOARD_UPLOADER_ID = 'zipDashboardUploader';
export const H5P_DASHBOARD_UPLOADER_ID = 'h5pDashboardUploader';

export const ITEM_TAGS_EDIT_INPUT_ID = 'itemTagsEditInput';
export const ITEM_TAGS_EDIT_SUBMIT_BUTTON_ID = 'itemTagsEditSubmitButton';
export const buildCustomizedTagsSelector = (index: number): string =>
  `customizedTagsPreview-${index}`;

export const buildCategoriesSelectionValueSelector = (title: string): string =>
  `#${buildCategorySelectionTitleId(title)}+div span`;

export const buildCategoryMenuOptionSelector = (
  menuName: string,
  _optionIndex: number,
): string => `#${menuName} .MuiAutocomplete-option`;
export const buildDashboardButtonId = (id: string): string =>
  `dashboard-button-${id}`;
export const buildPlayerTabName = (id: string): string => `builder-tab-${id}`;

export const ITEM_PUBLISH_SECTION_TITLE_ID = 'itemPublishSectionTitle';
export const ITEM_VALIDATION_BUTTON_ID = 'itemValidationButton';
export const ITEM_VALIDATION_REFRESH_BUTTON_ID = 'itemValidationRefreshButton';
export const APP_NAVIGATION_PLATFORM_SWITCH_ID = 'appNavigationPlatformSwitch';
// cannot use graasp ui because it slows down a lot cypress
export const APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS = {
  Builder: 'appNavigationPlatformSwitchButtonBuilder',
  Player: 'appNavigationPlatformSwitchButtonPlayer',
  Library: 'appNavigationPlatformSwitchButtonLibrary',
  Analytics: 'appNavigationPlatformSwitchButtonAnalytics',
};

export const ITEM_PUBLISH_BUTTON_ID = 'itemPublishButton';
export const ITEM_UNPUBLISH_BUTTON_ID = 'itemUnpublishButton';
export const buildItemInvitationRowDeleteButtonId = (id: string): string =>
  `itemInvitationRowDeleteButton-${id}`;
export const buildInvitationEmailTableRowId = (id: string): string =>
  `invitationEmailTableRow-${id}`;
export const buildInvitationTableRowId = (id: string): string =>
  `invitationTableRow-${id}`;
export const buildInvitationTableRowSelector = (id: string): string =>
  `[row-id="${buildInvitationTableRowId(id)}"]`;
export const ITEM_RESEND_INVITATION_BUTTON_CLASS = 'itemResendInvitationButton';
export const CREATE_MEMBERSHIP_FORM_ID = 'createMembershipFormId';
export const NAVIGATION_ROOT_ID = 'navigationRoot';
export const HEADER_MEMBER_MENU_BUTTON_ID = 'headerMemberMenuButton';
export const HEADER_MEMBER_MENU_SEE_PROFILE_BUTTON_ID =
  'headerMemberMenuSeeProfileButton';
export const HEADER_MEMBER_MENU_SIGN_IN_BUTTON_ID =
  'headerMemberMenuSignInButton';

export const HEADER_MEMBER_MENU_SIGN_OUT_BUTTON_ID =
  'headerMemberMenuSignOutButton';
export const buildMemberMenuItemId = (id: string): string =>
  `memberMenuItem-${id}`;
export const CO_EDITOR_SETTINGS_RADIO_GROUP_ID = 'coEditorSettingsRadioGroup';
export const buildCoEditorSettingsRadioButtonId = (
  id: string | boolean,
): string => `coEditorSettingsRadioButton-${id}`;
export const EMAIL_NOTIFICATION_CHECKBOX = 'emailNotificationCheckbox';

export const MEMBER_CURRENT_PASSWORD_ID = 'memberCurrentPassword';
export const MEMBER_NEW_PASSWORD_ID = 'memberNewPassword';
export const MEMBER_NEW_PASSWORD_CONFIRMATION_ID =
  'memberNewPasswordConfirmation';
export const CONFIRM_CHANGE_PASSWORD_BUTTON_ID = 'confirmChangePasswordButton';
export const CONFIRM_RESET_PASSWORD_BUTTON_ID = 'confirmResetPasswordButton';
export const USER_CURRENT_PASSWORD_INPUT_ID = 'currentPasswordInput';
export const USER_NEW_PASSWORD_INPUT_ID = 'newPasswordInput';
export const USER_CONFIRM_PASSWORD_INPUT_ID = 'confirmPasswordInput';
export const SHARE_ITEM_CSV_PARSER_BUTTON_ID = 'shareItemCsvParserButton';
export const SHARE_ITEM_CSV_PARSER_INPUT_BUTTON_ID =
  'shareItemCsvParserInputButton';
export const SHARE_ITEM_CSV_PARSER_INPUT_BUTTON_SELECTOR = `${SHARE_ITEM_CSV_PARSER_INPUT_BUTTON_ID} input`;
export const SHARE_ITEM_FROM_CSV_ALERT_ERROR_ID = 'shareITemFromCsvAlertError';
export const SHARE_ITEM_FROM_CSV_RESULT_FAILURES_ID =
  'shareItemFromCsvResultFailures';
export const SETTINGS_LINK_SHOW_IFRAME_ID = 'settingsLinkShowIframe';
export const SETTINGS_LINK_SHOW_BUTTON_ID = 'settingsLinkShowButton';
export const buildCategorySelectionOptionId = (
  typeId: string,
  id: string,
): string => `category-${typeId}-option-${id}`;
export const LIBRARY_SETTINGS_CATEGORIES_ID = 'librarySettingsCategories';
export const buildLanguageOptionId = (value: string): string =>
  `languageOption-${value}`;
export const buildEmailFrequencyOptionId = (value: string): string =>
  `emailFrequencyOption-${value}`;

export const CC_ALLOW_COMMERCIAL_CONTROL_ID = 'allowCommercialCCSelector';
export const CC_DISALLOW_COMMERCIAL_CONTROL_ID = 'disallowCommercialCCSelector';
export const CC_REQUIRE_ATTRIBUTION_CONTROL_ID = 'requireAttributionSelector';
export const CC_CC0_CONTROL_ID = 'cc0Selector';
export const CC_SHARE_ALIKE_CONTROL_ID = 'shareAlikeSelector';
export const CC_NO_DERIVATIVE_CONTROL_ID = 'noDerivativeSelector';
export const CC_DERIVATIVE_CONTROL_ID = 'derivativeSelector';
export const EDIT_MODAL_ID = 'editModal';
export const EDIT_ITEM_MODAL_CANCEL_BUTTON_ID = 'editModalCancelButton';
export const FILE_SETTING_MAX_WIDTH_ID = 'fileSettingMaxWidth';

export const CONFIRM_MEMBERSHIP_DELETE_BUTTON_ID =
  'confirmDeleteMembershipButton';
export const buildDownloadButtonId = (itemId: string): string =>
  `download-button-id-${itemId}`;
export const CUSTOM_APP_URL_ID = 'customAppURLId';

export const DOWNGRADE_OWN_PERMISSION_DIALOG_TITLE_ID = 'downgradeTitleID';
export const DOWNGRADE_OWN_PERMISSION_DIALOG_DESC_ID = 'downgradeDescID';

export const SHORT_LINK_COMPONENT = 'shortLinkComponent';
export const SHORT_LINK_SAVE_BUTTON_ID = 'shortLinkSaveButtonID';
export const SHORT_LINK_RANDOMIZE_BUTTON_ID = 'shortLinkRandomizeButtonID';
export const SHORT_LINK_ALIAS_INPUT_ID = 'shortLinkAliasInputID';
export const SHORT_LINK_PLATFORM_SELECT_ID = 'shortLinkPlatformSelectID';
export const SHORT_LINK_MENU_START_ID = 'shortLinkMenuBtn';
export const SHORT_LINK_SHORTEN_START_ID = 'shortLinkShortenBtn';

export const buildShortLinkMenuBtnId = (alias: string): string =>
  `${SHORT_LINK_MENU_START_ID}-${alias}`;
export const buildShortLinkCancelBtnId = (alias: string): string =>
  `shortLinkCancelBtn-${alias}`;
export const buildShortLinkSaveBtnId = (alias: string): string =>
  `shortLinkSaveBtn-${alias}`;
export const buildShortLinkDeleteBtnId = (alias: string): string =>
  `shortLinkDeleteBtn-${alias}`;
export const buildShortLinkConfirmDeleteBtnId = (alias: string): string =>
  `shortLinkConfirmDeleteBtn-${alias}`;
export const buildShortLinkEditBtnId = (alias: string): string =>
  `shortLinkEditBtn-${alias}`;
export const buildShortLinkShortenBtnId = (
  itemId: string,
  platform: ShortLinkPlatform,
): string => `${SHORT_LINK_SHORTEN_START_ID}-${platform}-${itemId}`;
export const buildShortLinkPlatformTextId = (
  platform: ShortLinkPlatform,
): string => `shortLinkPlatformText-${platform}`;
export const buildShortLinkUrlTextId = (platform: ShortLinkPlatform): string =>
  `shortLinkUrlText-${platform}`;
export const ACCESSIBLE_ITEMS_ONLY_ME_ID = 'accessibleItemsOnlyMe';
export const ACCESSIBLE_ITEMS_TABLE_ID = 'accessibleItemsTable';
export const ACCESSIBLE_ITEMS_NEXT_PAGE_BUTTON_SELECTOR = `#${ACCESSIBLE_ITEMS_TABLE_ID} [data-testid="KeyboardArrowRightIcon"]`;

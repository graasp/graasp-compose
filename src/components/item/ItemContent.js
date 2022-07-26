import { Api, MUTATION_KEYS } from '@graasp/query-client';
import { AppItem, DocumentItem, FileItem, H5PItem, LinkItem } from '@graasp/ui';
import { makeStyles } from '@material-ui/core';
import { Record } from 'immutable';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  API_HOST,
  CONTEXT_BUILDER,
  H5P_INTEGRATION_URL,
  ITEM_DEFAULT_HEIGHT,
} from '../../config/constants';
import { hooks, useMutation } from '../../config/queryClient';
import {
  buildFileItemId,
  buildItemsTableId,
  buildSaveButtonId,
  DOCUMENT_ITEM_TEXT_EDITOR_ID,
  ITEM_SCREEN_ERROR_ALERT_ID,
} from '../../config/selectors';
import { buildDocumentExtra, getDocumentExtra } from '../../utils/itemExtra';
import { ITEM_TYPES } from '../../enums';
import ErrorAlert from '../common/ErrorAlert';
import Loader from '../common/Loader';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { LayoutContext } from '../context/LayoutContext';
import ItemActions from '../main/ItemActions';
import Items from '../main/Items';
import NewItemButton from '../main/NewItemButton';

const { useChildren, useFileContent } = hooks;

const useStyles = makeStyles(() => ({
  fileWrapper: {
    textAlign: 'center',
    height: '80vh',
    flexGrow: 1,
  },
}));

const ItemContent = ({ item, enableEditing, permission }) => {
  const classes = useStyles();
  const { id: itemId, type: itemType } = item;
  const { mutate: editItem, mutateAsync: editItemAsync } = useMutation(
    MUTATION_KEYS.EDIT_ITEM,
  );
  const { editingItemId, setEditingItemId } = useContext(LayoutContext);

  // provide user to app
  const { data: member, isLoading: isLoadingUser } =
    useContext(CurrentUserContext);

  // display children
  const { data: children, isLoading: isLoadingChildren } = useChildren(itemId, {
    ordered: true,
    enabled: item?.type === ITEM_TYPES.FOLDER,
  });

  const { data: content, isLoading: isLoadingFileContent } = useFileContent(
    itemId,
    {
      enabled:
        item &&
        (itemType === ITEM_TYPES.FILE || itemType === ITEM_TYPES.S3_FILE),
    },
  );
  const isEditing = enableEditing && editingItemId === itemId;

  if (isLoadingFileContent || isLoadingUser || isLoadingChildren) {
    return <Loader />;
  }

  if (!item || !itemId) {
    return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }

  const onSaveCaption = (caption) => {
    // edit item only when description has changed
    if (caption !== item.description) {
      editItem({ id: itemId, description: caption });
    }
    setEditingItemId(null);
  };

  const onSaveDocument = (text) => {
    // edit item only when description has changed
    if (text !== getDocumentExtra(item?.extra).content) {
      editItem({ id: itemId, extra: buildDocumentExtra({ content: text }) });
    }
    setEditingItemId(null);
  };

  const onCancel = () => {
    setEditingItemId(null);
  };

  const saveButtonId = buildSaveButtonId(itemId);

  switch (itemType) {
    case ITEM_TYPES.FILE:
    case ITEM_TYPES.S3_FILE:
      return (
        <div className={classes.fileWrapper}>
          <FileItem
            id={buildFileItemId(itemId)}
            editCaption={isEditing}
            item={item}
            content={content}
            onSaveCaption={onSaveCaption}
            saveButtonId={saveButtonId}
          />
        </div>
      );
    case ITEM_TYPES.LINK:
      return (
        <div className={classes.fileWrapper}>
          <LinkItem
            item={item}
            editCaption={isEditing}
            onSaveCaption={onSaveCaption}
            saveButtonId={saveButtonId}
            height={ITEM_DEFAULT_HEIGHT}
          />
        </div>
      );
    case ITEM_TYPES.DOCUMENT:
      return (
        <div className={classes.fileWrapper}>
          <DocumentItem
            id={DOCUMENT_ITEM_TEXT_EDITOR_ID}
            item={item}
            edit={isEditing}
            onSave={onSaveDocument}
            onCancel={onCancel}
            saveButtonId={saveButtonId}
            maxHeight="70vh"
          />
        </div>
      );
    case ITEM_TYPES.APP:
      return (
        <AppItem
          item={item}
          apiHost={API_HOST}
          editCaption={isEditing}
          onSaveCaption={onSaveCaption}
          saveButtonId={saveButtonId}
          onSettingsUpdate={editItemAsync}
          member={member}
          height={ITEM_DEFAULT_HEIGHT}
          permission={permission}
          requestApiAccessToken={Api.requestApiAccessToken}
          context={CONTEXT_BUILDER}
        />
      );
    case ITEM_TYPES.FOLDER:
      return (
        <>
          <Items
            parentId={itemId}
            id={buildItemsTableId(itemId)}
            title={item.name}
            items={children}
            isEditing={isEditing}
            onSaveCaption={onSaveCaption}
            headerElements={
              enableEditing
                ? [<NewItemButton key="newButton" fontSize="small" />]
                : undefined
            }
            ToolbarActions={ItemActions}
          />
        </>
      );
    case ITEM_TYPES.H5P: {
      const contentId = item.get('extra')?.h5p?.contentId;
      if (!contentId) {
        return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
      }

      return (
        <H5PItem
          itemId={itemId}
          contentId={contentId}
          integrationUrl={H5P_INTEGRATION_URL}
        />
      );
    }

    default:
      return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }
};

ItemContent.propTypes = {
  item: PropTypes.instanceOf(Record).isRequired,
  enableEditing: PropTypes.bool,
  permission: PropTypes.string.isRequired,
};

ItemContent.defaultProps = {
  enableEditing: false,
};

export default ItemContent;

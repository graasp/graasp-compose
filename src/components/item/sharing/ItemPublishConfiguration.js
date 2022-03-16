/* eslint-disable react/forbid-prop-types */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Loader } from '@graasp/ui';
import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import UpdateIcon from '@material-ui/icons/Update';
import { MUTATION_KEYS } from '@graasp/query-client';
import { useMutation, hooks } from '../../../config/queryClient';
import CategorySelection from './CategorySelection';
import CustomizedTagsEdit from './CustomizedTagsEdit';
import CCLicenseSelection from './CCLicenseSelection';
import { SETTINGS, SUBMIT_BUTTON_WIDTH } from '../../../config/constants';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const { DELETE_ITEM_TAG, POST_ITEM_TAG, POST_ITEM_VALIDATION } = MUTATION_KEYS;
const {
  useItemValidationAndReviews,
  useItemValidationStatuses,
  useItemValidationReviewStatuses,
} = hooks;

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(3),
  },
  heading: {
    marginTop: theme.spacing(2),
  },
  subtitle: {
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  config: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(1),
    width: 'auto',
    minWidth: SUBMIT_BUTTON_WIDTH,
  },
}));

const ItemPublishConfiguration = ({
  item,
  edit,
  tagValue,
  itemTagValue,
  publishedTag,
  publicTag,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // current user
  const { data: user } = useContext(CurrentUserContext);
  // current item
  const { itemId } = useParams();

  const { mutate: deleteItemTag } = useMutation(DELETE_ITEM_TAG);
  const { mutate: postItemTag } = useMutation(POST_ITEM_TAG);
  const { mutate: validateItem } = useMutation(POST_ITEM_VALIDATION);

  // get map of item validation and review statuses
  const { data: ivStatuses } = useItemValidationStatuses();
  const { data: ivrStatuses } = useItemValidationReviewStatuses();
  const statusMap = new Map(
    ivStatuses?.concat(ivrStatuses)?.map((entry) => [entry?.id, entry?.name]),
  );

  // get item validation data
  const { data: itemValidationData, isLoading } =
    useItemValidationAndReviews(itemId);
  // remove iv records before the item is last updated
  const validItemValidation = itemValidationData?.filter(
    (entry) =>
      new Date(entry.validationUpdatedAt) >= new Date(item?.get('updatedAt')),
  );

  // group iv records by item validation status
  const ivByStatus = validItemValidation?.groupBy(({ validationStatusId }) =>
    statusMap?.get(validationStatusId),
  );

  const [isValidated, setIsValidated] = useState(false);
  const [isPending, setIsPending] = useState(false); // true if there exists pending item validation or review
  const [isSuspicious, setIsSuspicious] = useState(false); // true if item fails validation

  const processFailureValidations = (records) => {
    // first try to find successful validations, where ivrStatus is 'rejected'
    const successfulRecord = records?.find(
      (record) => statusMap.get(record.reviewStatusId) === 'rejected',
    );
    if (successfulRecord) {
      setIsValidated(true);
    } else {
      // try to find pending review
      const pendingRecord = records?.find(
        (record) => statusMap.get(record.reviewStatusId) === 'pending',
      );
      if (pendingRecord) {
        setIsPending(true);
      } else {
        setIsSuspicious(true); // only failed records
      }
    }
  };

  useEffect(() => {
    // process when we fetch the item validation and review records
    if (ivByStatus) {
      // first check if there exist any valid successful record
      if (ivByStatus.get('success')) {
        setIsValidated(true);
        // then check if there exist any pending item validation or review
      } else if (ivByStatus.get('pending')) {
        setIsPending(true);
      } else {
        const failureValidations = ivByStatus.get('failure');
        // only process when there is failed item validation records
        if (failureValidations) {
          processFailureValidations(failureValidations);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ivByStatus]);

  if (isLoading) {
    return <Loader />;
  }

  const handleValidate = () => {
    // prevent re-send request if the item is already successfully validated, or a validation is already pending
    if (!isValidated && !isPending) validateItem({ itemId });
  };

  const publishItem = () => {
    // post published tag
    postItemTag({
      id: itemId,
      tagId: publishedTag.id,
      itemPath: item?.get('path'),
      creator: user?.get('id'),
    });

    // if previous is public, not necessary to delete/add the public tag
    if (tagValue?.name !== SETTINGS.ITEM_PUBLIC.name) {
      // post public tag
      postItemTag({
        id: itemId,
        tagId: publicTag.id,
        itemPath: item?.get('path'),
        creator: user?.get('id'),
      });
      // delete previous tag
      if (tagValue && tagValue.name !== SETTINGS.ITEM_PRIVATE.name) {
        deleteItemTag({ id: itemId, tagId: itemTagValue?.id });
      }
    }
  };

  // display icon indicating current status of given item
  const displayItemValidationIcon = () => {
    if (isValidated) return <CheckCircleIcon color="primary" />;
    if (isPending) return <UpdateIcon color="primary" />;
    if (isSuspicious) return <CancelIcon color="primary" />;
    return null;
  };

  const displayItemValidationMessage = () => {
    if (isValidated) {
      return null;
    }
    if (isPending) {
      return (
        <Typography variant="body1">
          {t(
            'Your item is pending validation. Once the validation succeeds, you will be able to publish your item. ',
          )}
        </Typography>
      );
    }
    if (isSuspicious) {
      return (
        <Typography variant="body1">
          {
            // update contact info
            t(
              'Your item might contain inappropriate content. Please remove them and re-validate it. If you have any problem, please contact graasp@epfl.ch',
            )
          }
        </Typography>
      );
    }
    return null;
  };

  return (
    <>
      <Divider className={classes.divider} />
      <Typography variant="h6" className={classes.heading}>
        {t('Publication On Explorer')}
      </Typography>
      <Typography variant="body1">
        {t(
          'You can publish your collection to Graasp Explorer, our open educational resource library.',
        )}
        <br />
        {t('Published collections are accessible by the public.')}
        <br />
        {t('To publish your collection, please follow the three steps below.')}
      </Typography>
      <Typography variant="h6" className={classes.subtitle}>
        <LooksOneIcon color="primary" className={classes.icon} />
        {t('Validation')}
      </Typography>
      <Typography variant="body1">
        {t('You need to validate your item before publish it.')}
      </Typography>
      <Button
        variant="outlined"
        onClick={handleValidate}
        color="primary"
        disabled={!edit}
        className={classes.button}
        endIcon={displayItemValidationIcon()}
      >
        {t('Validate')}
      </Button>
      {displayItemValidationMessage()}
      <Typography variant="h6" className={classes.subtitle}>
        <LooksTwoIcon color="primary" className={classes.icon} />
        {t('Publication')}
      </Typography>
      <Typography variant="body1">
        {t(
          'Once your item is validated, you can set your item to published by clicking the button.',
        )}
      </Typography>
      <Button
        variant="outlined"
        onClick={publishItem}
        color="primary"
        disabled={!edit || !isValidated}
        className={classes.button}
        endIcon={
          tagValue?.name === SETTINGS.ITEM_PUBLISHED.name && (
            <CheckCircleIcon color="primary" />
          )
        }
      >
        {t('Publish')}
      </Button>
      <Typography variant="h6" className={classes.subtitle}>
        <Looks3Icon color="primary" className={classes.icon} />
        {t('Configuration')}
      </Typography>
      <Typography variant="body1">
        {t(
          'Set the options for your resource to make it easily accessible by the public.',
        )}
      </Typography>
      <div className={classes.config}>
        <CategorySelection item={item} edit={edit} />
        <CustomizedTagsEdit item={item} edit={edit} />
        <CCLicenseSelection item={item} edit={edit} />
      </div>
    </>
  );
};

// define types for propType only
const Tag = {
  id: string,
  name: string,
  nested: string,
  createdAt: string,
};

const ItemTag = {
  id: string,
  tagId: string,
  itemPath: string,
  creator: string,
  createdAt: string,
};

ItemPublishConfiguration.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  edit: PropTypes.bool.isRequired,
  tagValue: PropTypes.instanceOf(Tag).isRequired,
  itemTagValue: PropTypes.instanceOf(ItemTag).isRequired,
  publishedTag: PropTypes.instanceOf(Tag).isRequired,
  publicTag: PropTypes.instanceOf(Tag).isRequired,
};

export default ItemPublishConfiguration;

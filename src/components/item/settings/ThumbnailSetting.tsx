import { FormEventHandler, useEffect, useRef, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Dialog, Stack, Typography, styled, useTheme } from '@mui/material';

import { DiscriminatedItem, ItemType, ThumbnailSize } from '@graasp/sdk';
import { Thumbnail } from '@graasp/ui';

import Uppy from '@uppy/core';

import {
  THUMBNAIL_SETTING_MAX_HEIGHT,
  THUMBNAIL_SETTING_MAX_WIDTH,
} from '../../../config/constants';
import { useBuilderTranslation } from '../../../config/i18n';
import { hooks, mutations } from '../../../config/queryClient';
import { THUMBNAIL_SETTING_UPLOAD_BUTTON_CLASSNAME } from '../../../config/selectors';
import { BUILDER } from '../../../langs/constants';
import defaultImage from '../../../resources/avatar.png';
import { configureThumbnailUppy } from '../../../utils/uppy';
import CropModal, { MODAL_TITLE_ARIA_LABEL_ID } from '../../common/CropModal';
import StatusBar from '../../file/StatusBar';

type Props = { item: DiscriminatedItem };

const ThumbnailSetting = ({ item }: Props): JSX.Element | null => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uppy, setUppy] = useState<Uppy>();
  const [showCropModal, setShowCropModal] = useState(false);
  const [fileSource, setFileSource] = useState<string>();
  const [openStatusBar, setOpenStatusBar] = useState(false);
  const { t: translateBuilder } = useBuilderTranslation();
  const { mutate: onFileUploadComplete } = mutations.useUploadFiles();
  const itemId = item.id;
  const { data: thumbnailUrl, isLoading } = hooks.useItemThumbnailUrl({
    id: itemId,
    size: ThumbnailSize.Medium,
  });
  const theme = useTheme();

  useEffect(() => {
    setUppy(
      configureThumbnailUppy({
        itemId,
        onUpload: () => {
          setOpenStatusBar(true);
        },
        onError: (error: Error) => {
          onFileUploadComplete({ id: itemId, error });
        },
        onComplete: (result: {
          successful: { response: { body: unknown } }[];
        }) => {
          if (result?.successful?.length) {
            const data = result.successful[0].response.body;
            onFileUploadComplete({ id: itemId, data });
          }

          return false;
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  if (!uppy) {
    return null;
  }

  const handleClose = () => {
    setOpenStatusBar(false);
  };

  const onSelectFile: FormEventHandler<HTMLInputElement> = (e) => {
    const t = e.target as HTMLInputElement;
    if (t.files && t.files?.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setFileSource(reader.result as string),
      );
      reader.readAsDataURL(t.files?.[0]);
      setShowCropModal(true);
    }
  };

  const onClose = () => {
    setShowCropModal(false);
    if (inputRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      inputRef.current.value = null;
    }
  };

  const onConfirmCrop = (croppedImage: Blob | null) => {
    onClose();

    if (!croppedImage) {
      return console.error('croppedImage is not defined');
    }
    // submit cropped image
    try {
      // remove waiting files
      uppy.cancelAll();
      uppy.addFile({
        type: croppedImage.type,
        data: croppedImage,
      });
    } catch (error) {
      console.error(error);
    }

    return true;
  };

  const alt = translateBuilder(BUILDER.THUMBNAIL_SETTING_MY_THUMBNAIL_ALT);
  const imgUrl = thumbnailUrl ?? defaultImage;

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <>
      {uppy && (
        <StatusBar uppy={uppy} handleClose={handleClose} open={openStatusBar} />
      )}
      <Stack spacing={2} mb={3} alignItems="center">
        <div
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
            borderRadius: '50%',
          }}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              inputRef.current?.click();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="change folder avatar"
        >
          <Thumbnail
            id={itemId}
            isLoading={isLoading}
            // TODO: fix type
            url={
              imgUrl ??
              (item.type === ItemType.LINK ? item.extra[ItemType.LINK] : {})
                ?.thumbnails?.[0]
            }
            alt={alt}
            maxWidth={THUMBNAIL_SETTING_MAX_WIDTH}
            maxHeight={THUMBNAIL_SETTING_MAX_HEIGHT}
            sx={{
              borderRadius: '50%',
            }}
          />
          <EditIcon
            fontSize="large"
            style={{
              position: 'absolute',
              bottom: '10',
              right: '10',
              borderRadius: '50%',
              color: 'white',
              backgroundColor: theme.palette.primary.main,
              padding: 2,
            }}
          />
        </div>
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onInput={onSelectFile}
          onChange={onSelectFile}
          ref={inputRef}
          className={THUMBNAIL_SETTING_UPLOAD_BUTTON_CLASSNAME}
        />
        <Typography variant="caption">
          {translateBuilder(BUILDER.SETTINGS_THUMBNAIL_SETTINGS_INFORMATIONS)}
        </Typography>
      </Stack>
      {fileSource && (
        <Dialog
          open={showCropModal}
          onClose={onClose}
          aria-labelledby={MODAL_TITLE_ARIA_LABEL_ID}
        >
          <CropModal
            onClose={onClose}
            src={fileSource}
            onConfirm={onConfirmCrop}
          />
        </Dialog>
      )}
    </>
  );
};

export default ThumbnailSetting;

import { LoadingButton } from '@mui/lab';

import { PackedItem } from '@graasp/sdk';

import { useBuilderTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import { buildItemPublicationButton } from '@/config/selectors';
import { BUILDER } from '@/langs/constants';
import { PublicationStatus } from '@/types/publication';

import PublicationButton from './PublicationButton';

type Props = {
  item: PackedItem;
  isLoading: boolean;
};

const { usePostItemValidation } = mutations;

export const OutdatedButton = ({ item, isLoading }: Props): JSX.Element => {
  const { t } = useBuilderTranslation();
  const { id: itemId } = item;

  const { mutate: validateItem, isLoading: isValidating } =
    usePostItemValidation();

  const handleValidateItem = () => validateItem({ itemId });

  const description = t(BUILDER.LIBRARY_SETTINGS_VALIDATION_STATUS_OUTDATED);
  const elements = (
    <LoadingButton
      variant="contained"
      onClick={handleValidateItem}
      loading={isValidating}
      data-cy={buildItemPublicationButton(PublicationStatus.Outdated)}
    >
      {t(BUILDER.LIBRARY_SETTINGS_VALIDATION_VALIDATE_BUTTON)}
    </LoadingButton>
  );

  return (
    <PublicationButton
      isLoading={isLoading}
      description={description}
      elements={elements}
    />
  );
};

export default OutdatedButton;

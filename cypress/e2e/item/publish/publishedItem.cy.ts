import { buildItemPath } from '../../../../src/config/paths';
import {
  EMAIL_NOTIFICATION_CHECKBOX,
  ITEM_PUBLISH_BUTTON_ID,
  ITEM_UNPUBLISH_BUTTON_ID,
  ITEM_VALIDATION_BUTTON_ID,
  buildPublishButtonId,
} from '../../../../src/config/selectors';
import {
  PUBLISHED_ITEM,
  PUBLISHED_ITEM_VALIDATIONS,
  SAMPLE_ITEMS,
  SAMPLE_PUBLIC_ITEMS,
} from '../../../fixtures/items';
import { VALIDATED_ITEM, VALIDATED_ITEM_CONTEXT } from '../../../fixtures/validations';

const openPublishItemTab = (id) => {
  cy.get(`#${buildPublishButtonId(id)}`).click();
};

// eslint-disable-next-line import/prefer-default-export
export const publishItem = (): void => {
  cy.get(`#${ITEM_PUBLISH_BUTTON_ID}`).click();
};

describe('Public Item', () => {
  it('Validate item', () => {
    cy.setUpApi(SAMPLE_PUBLIC_ITEMS);
    const item = SAMPLE_ITEMS.items[0];
    cy.visit(buildItemPath(item.id));
    openPublishItemTab(item.id);

    // click validate item button
    cy.get(`#${ITEM_VALIDATION_BUTTON_ID}`).click();

    cy.wait('@postItemValidation').then((data) => {
      const {
        request: { url },
      } = data;
      expect(url.split('/')).contains(item.id);
    });
  });
});

describe('Published Item', () => {
  const item = PUBLISHED_ITEM;
  beforeEach(() => {
    cy.setUpApi({ items: [item], itemValidationGroups: PUBLISHED_ITEM_VALIDATIONS });
    cy.visit(buildItemPath(item.id));
    openPublishItemTab(item.id);
  });
  it('Show published state on button', () => {
    // click validate item button
    cy.get(`#${ITEM_PUBLISH_BUTTON_ID} > span`)
      .children()
      .children()
      .should('exist');
  });
  it('Unpublish item', () => {
    cy.get(`#${ITEM_UNPUBLISH_BUTTON_ID}`).click();
    cy.wait('@unpublishItem').then(({ request: { url } }) => {
      // should contain published tag id
      expect(url).to.contain(item.id);
    });
  });
});

// BUG: does not work in ci
// describe('Validated Item', () => {
//   it('Publish item', () => {
//     cy.setUpApi(VALIDATED_ITEM_CONTEXT);
//     const item = VALIDATED_ITEM;
//     cy.visit(buildItemPath(item.id));
//     openPublishItemTab(item.id);

//     // click publish item button
//     cy.get(`#${ITEM_PUBLISH_BUTTON_ID}`).click();

//     cy.wait('@publishItem').then((data) => {
//       const {
//         request: { url },
//       } = data;
//       expect(url.includes(VALIDATED_ITEM.id));
//       expect(!url.includes('notification'));
//     });
//   });

//   it('Publish item with notification', () => {
//     cy.setUpApi(VALIDATED_ITEM_CONTEXT);
//     const item = VALIDATED_ITEM;
//     cy.visit(buildItemPath(item.id));
//     openPublishItemTab(item.id);

//     // click validate item button
//     cy.get(`#${EMAIL_NOTIFICATION_CHECKBOX}`).check();
//     cy.get(`#${ITEM_PUBLISH_BUTTON_ID}`).click();

//     cy.wait('@publishItem').then((data) => {
//       const {
//         request: { url },
//       } = data;
//       expect(url.includes(VALIDATED_ITEM.id));
//       expect(url.includes('notification'));
//     });
//   });
// });

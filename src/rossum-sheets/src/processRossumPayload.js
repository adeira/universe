// @flow

import {
  createAutomationBlocker,
  createMessage,
  createReplaceOperation,
  findBySchemaId,
} from '@adeira/rossum-utils';
import type { WebhookPayload, WebhookResponse } from '@adeira/rossum-flow-types';

import createHyperFormulaInstance from './createHyperFormulaInstance';
import isMetaField from './isMetaField';
import type { ExtensionUserConfig } from './validateUserConfig';

export default function processRossumPayload(
  payload: WebhookPayload<ExtensionUserConfig>,
): WebhookResponse {
  const hfInstance = createHyperFormulaInstance(payload);

  const messages = [];
  const operations = [];
  const automationBlockers = [];

  // For each defined worksheet
  for (const [sheetName, sheetConfig] of Object.entries(payload.settings.sheets)) {
    const formulas = sheetConfig.formulas ?? [];

    // And for each defined formula
    for (let i = 0; i < formulas.length; i++) {
      // We iterate over all occurrences of the target datapoint
      if (isMetaField(formulas[i].target)) {
        throw new Error(
          `Meta fields are not supported as a target: ${formulas[i].target}. Please check your configuration.`,
        );
      }
      const targetDatapoints = findBySchemaId(payload.annotation.content, formulas[i].target);
      if (targetDatapoints.length === 0) {
        throw new Error(
          `Target datapoint does not exist: ${formulas[i].target}. Please check your configuration.`,
        );
      }
      for (let j = 0; j < targetDatapoints.length; j++) {
        const targetDatapoint = targetDatapoints[j];
        const cellAddress = {
          col: Object.values(sheetConfig.columns).length + i, // length of "columns" + position in "formulas"
          row: j,
          sheet: hfInstance.getSheetId(sheetName),
        };
        const cellType = hfInstance.getCellValueDetailedType(cellAddress);
        const cellValue = hfInstance.getCellValue(cellAddress);
        if (formulas[i].ifTruthy != null) {
          const { showAutomationBlocker, showInfo, showWarning, showError, hide } =
            formulas[i].ifTruthy;

          // Validate if user cares about validations (truthy check of the cell value)
          if (cellValue) {
            if (showAutomationBlocker != null) {
              automationBlockers.push(
                createAutomationBlocker(targetDatapoint, showAutomationBlocker),
              );
            }
            if (showInfo != null) {
              messages.push(createMessage('info', showInfo, targetDatapoint));
            }
            if (showWarning != null) {
              messages.push(createMessage('warning', showWarning, targetDatapoint));
            }
            if (showError != null) {
              messages.push(createMessage('error', showError, targetDatapoint));
            }
            if (hide != null) {
              operations.push(createReplaceOperation(targetDatapoint, null, true));
            }
          } else if (hide != null) {
            operations.push(createReplaceOperation(targetDatapoint, null, false));
          }
        } else if (cellType === 'NUMBER_DATE') {
          // Otherwise replace date value (as an ISO string)
          // TODO: support other cell types as well?
          const { year, month, day } = hfInstance.numberToDate(cellValue);
          operations.push(createReplaceOperation(targetDatapoint, `${year}-${month}-${day}`));
        } else {
          // Otherwise just replace the value (as a string)
          operations.push(
            createReplaceOperation(targetDatapoint, cellValue == null ? '' : String(cellValue)),
          );
        }
      }
    }
  }

  const rossumResponse = {
    messages,
    operations,
    automation_blockers: automationBlockers,
  };

  if (payload.settings.debug === true) {
    messages.push(
      createMessage(
        'info',
        JSON.stringify({
          allSheetsSerialized: hfInstance.getAllSheetsSerialized(),
          allSheetsValues: hfInstance.getAllSheetsValues(),
          rossumResponse,
        }),
      ),
    );
  }

  hfInstance.destroy();

  return rossumResponse;
}

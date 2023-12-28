// @flow

import createMessage from '../utils/createMessage';
import createReplaceOperation from '../utils/createReplaceOperation';
import findBySchemaId from '../utils/findBySchemaId';
import createHyperFormulaInstance, { type ExtensionUserConfig } from './createHyperFormulaInstance';
import type { WebhookResponse } from '../flowTypes';

export function rossum_hook_request_handler({
  settings,
  annotation: {
    content, // Annotation content tree (see https://elis.rossum.ai/api/docs/#annotation-data)
  },
}: {
  +settings: ExtensionUserConfig,
  +annotation: {
    +content: $ReadOnlyArray<$FlowFixMe>,
    ...
  },
  ...
}): WebhookResponse {
  const hfInstance = createHyperFormulaInstance(content, settings);

  const messages = [];
  const operations = [];
  const automationBlockers = [];

  // For each defined worksheet
  for (const [sheetName, sheetConfig] of Object.entries(settings.sheets)) {
    // And for each defined formula
    for (let i = 0; i < sheetConfig.formulas.length; i++) {
      // We iterate over all occurrences of the target datapoint
      const targetDatapoint = findBySchemaId(content, sheetConfig.formulas[i].target);
      for (let j = 0; j < targetDatapoint.length; j++) {
        const cellValue = hfInstance.getCellValue({
          col: Object.values(sheetConfig.columns).length + i, // length of "columns" + position in "formulas"
          row: j,
          sheet: hfInstance.getSheetId(sheetName),
        });
        if (sheetConfig.formulas[i].validation != null) {
          // Validate if user cares about validations (truthy check)
          if (cellValue) {
            if (sheetConfig.formulas[i].validation.automation_blocker === true) {
              automationBlockers.push({
                id: targetDatapoint[j].id,
                content: sheetConfig.formulas[i].validation.message,
              });
            } else {
              messages.push(
                createMessage(
                  sheetConfig.formulas[i].validation.type ?? 'info',
                  sheetConfig.formulas[i].validation.message,
                  targetDatapoint[j].id,
                ),
              );
            }
          }
        } else {
          // Otherwise just replace the value (as a string)
          operations.push(
            createReplaceOperation(
              targetDatapoint[j],
              // TODO: do not use String() here, but rather use the correct datapoint type (?)
              String(cellValue),
            ),
          );
        }
      }
    }
  }

  if (settings.debug === true) {
    messages.push(
      createMessage(
        'info',
        JSON.stringify({
          allSheetsSerialized: hfInstance.getAllSheetsSerialized(),
          allSheetsValues: hfInstance.getAllSheetsValues(),
        }),
      ),
    );
  }

  return {
    messages,
    operations,
    automation_blockers: automationBlockers,
  };
}

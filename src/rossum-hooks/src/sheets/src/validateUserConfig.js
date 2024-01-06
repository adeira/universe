// @flow

export type ExtensionUserConfig = {
  +debug?: boolean,
  +sheets: {
    +[sheetName: string]: {
      +columns: {
        +[columnName: string]: string,
      },
      +formulas?: Array<{
        +fx: string,
        +target: string,
        +ifTruthy?: {
          // Blocks automation additionally accompanied by a message if present:
          +showAutomationBlocker?: string,

          // Show info/warning/error messages:
          +showInfo?: string,
          +showWarning?: string,
          +showError?: string,

          // Hide field (show if the `fx` evaluates to falsy):
          +hide?: boolean,
        },
      }>,
    },
  },
};

export default function validateUserConfig<T: ExtensionUserConfig>(userConfig: T): T {
  // Check that the first column is "A":
  for (const sheet of Object.values(userConfig.sheets)) {
    const firstColumn = Object.keys(sheet.columns)[0];
    if (firstColumn && firstColumn !== 'A') {
      throw new Error(`First column must be "A". Please check your configuration.`);
    }
  }

  // Check that the next column is following the previous one in order:
  for (const sheet of Object.values(userConfig.sheets)) {
    const columns = Object.keys(sheet.columns);
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const nextColumn = columns[i + 1];

      if (nextColumn) {
        const columnIndex = columnLabelToIndex(column);
        const nextColumnIndex = columnLabelToIndex(nextColumn);

        if (columnIndex !== nextColumnIndex - 1) {
          throw new Error(
            `Column ${nextColumn} is not following the previous column ${column} in order. All columns must be in order starting with "A". Please check your configuration.`,
          );
        }
      }
    }
  }

  return userConfig;
}

// https://github.com/handsontable/hyperformula/blob/9981e1b08c9ea9461ac5a2e6d776099fefec5e6c/src/parser/addressRepresentationConverters.ts#L189
function columnLabelToIndex(columnStringRepresentation: string): number {
  if (columnStringRepresentation.length === 1) {
    return columnStringRepresentation.toUpperCase().charCodeAt(0) - 65;
  }

  return (
    columnStringRepresentation.split('').reduce((currentColumn, nextLetter) => {
      return currentColumn * 26 + (nextLetter.toUpperCase().charCodeAt(0) - 64);
    }, 0) - 1
  );
}

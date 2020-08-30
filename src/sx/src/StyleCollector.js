// @flow

import hashStyle from './hashStyle';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';

function hashStylePair(
  styleName: string,
  styleValue?: string | number = '',
  pseudo?: string = '',
): string {
  return hashStyle(`${styleName}${styleValue}${pseudo}`);
}

export class StyleNode {
  propertyName: string;
  styleValue: string;
  pseudo: string;

  constructor(propertyName: string, styleValue: string, pseudo: string = '') {
    this.propertyName = propertyName;
    this.styleValue = styleValue;
    this.pseudo = pseudo;
  }
}

class StyleCollector {
  styles: Map<string, StyleNode | StyleCollector>;
  mediaName: ?string;

  constructor(mediaName?: string) {
    this.styles = new Map();
    this.mediaName = mediaName;
  }

  addStyles: ({ ... }, { ... }, ?string) => void = (
    styles,
    hashedSheetDefinitions,
    className = '',
  ) => {
    const addToSheetDefinitions = (className: string, property, hash, pseudo = '') => {
      if (hashedSheetDefinitions[className] === undefined) {
        hashedSheetDefinitions[className] = {};
      }
      hashedSheetDefinitions[className][`${property}${this.mediaName ?? pseudo}`] = hash;
    };

    const iterateEntries = (entries, pseudo = '', className = '') => {
      if (entries.length === 0) {
        return;
      }
      const [property, styleValue] = entries.shift();
      if (
        typeof property === 'string' &&
        (typeof styleValue === 'number' || typeof styleValue === 'string')
      ) {
        const hash = hashStylePair(property, styleValue, pseudo);

        addToSheetDefinitions(className ?? '', property, hash, pseudo);

        this.styles.set(
          hash,
          new StyleNode(transformStyleName(property), transformValue(property, styleValue), pseudo),
        );
      } else if (typeof styleValue === 'object' && styleValue != null) {
        if (property.startsWith('@media')) {
          // Media queries are represented by their own style collector, this way we can have as
          // many nested levels as needed
          const collector =
            ((this.styles.get(property): any): StyleCollector) ?? new StyleCollector(property);
          this.styles.set(property, collector);
          collector.addStyles(styleValue, hashedSheetDefinitions, className);
        } else {
          const isPseudo = property.startsWith(':');
          iterateEntries(
            Object.entries(styleValue),
            isPseudo ? property : pseudo,
            isPseudo ? className : property,
          );
        }
      }
      iterateEntries(entries, pseudo, className);
    };

    iterateEntries(Object.entries(styles), '', className);
  };
}

const styleCollector = new StyleCollector();

export default (styleCollector: StyleCollector);

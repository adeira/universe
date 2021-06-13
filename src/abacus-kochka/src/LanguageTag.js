// @flow

type Bcp47LanguageTagType = 'en-US' | 'es-MX';
type UrlLanguageTagType = 'en-us' | 'es-mx';

export type LanguageTagType = {
  +bcp47: Bcp47LanguageTagType,
  +url: UrlLanguageTagType,
};

const SUPPORTED_PRIMARY_LANGUAGE_SUBTAGS = ['en', 'es'];
const SUPPORTED_REGION_SUBTAGS = ['US', 'MX'];

class LanguageTag {
  // https://tools.ietf.org/html/bcp47#section-2.2.1
  #defaultPrimaryLanguageSubtag: string = 'es';

  // https://tools.ietf.org/html/bcp47#section-2.2.4
  #defaultRegionSubtag: string = 'MX';

  // 2.1.1.  Formatting of Language Tags
  // https://tools.ietf.org/html/bcp47#section-2.1.1
  getDefaultLanguageTag(): LanguageTagType {
    return this.__formatLanguageTag(this.#defaultPrimaryLanguageSubtag, this.#defaultRegionSubtag);
  }

  detectLanguageTag(languageTag: ?string): LanguageTagType {
    // accepts pretty much anything and falls back to the default values
    const match = languageTag?.match(/^(?<pls>[a-z]+)(?:[-_])(?<rs>[a-z]+)$/i);
    const pls = match?.groups?.pls.toLowerCase();
    const rs = match?.groups?.rs.toUpperCase();
    return this.__formatLanguageTag(
      pls != null && SUPPORTED_PRIMARY_LANGUAGE_SUBTAGS.includes(pls)
        ? pls
        : this.#defaultPrimaryLanguageSubtag,
      rs != null && SUPPORTED_REGION_SUBTAGS.includes(rs) ? rs : this.#defaultRegionSubtag,
    );
  }

  isDefaultLanguageTag(languageTag: ?string): boolean {
    const defaultLanguageTag = this.getDefaultLanguageTag().bcp47;
    const detectedLanguageTag = this.detectLanguageTag(languageTag).bcp47;
    return defaultLanguageTag === detectedLanguageTag;
  }

  __formatLanguageTag(primaryLanguageSubtag: string, regionSubtag: string): LanguageTagType {
    return {
      bcp47:
        ((`${primaryLanguageSubtag.toLowerCase()}-${regionSubtag.toUpperCase()}`: any): Bcp47LanguageTagType),
      url: ((`${primaryLanguageSubtag}-${regionSubtag}`.toLowerCase(): any): UrlLanguageTagType),
    };
  }
}

export default (new LanguageTag(): LanguageTag);

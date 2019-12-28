// @flow strict

export default function isValidLicense(license: string): boolean %checks {
  return mitLicenseRegexp.test(license);
}

// TODO: Should we report this? Seems like the rule doesn't allow multiline RegExps but regex
//  literal doesn't feel right in this case.
// eslint-disable-next-line prefer-regex-literals
const mitLicenseRegexp = new RegExp(
  `MIT License

Copyright \\(c\\) [0-9]{4}-present, Adeira(?:\nCopyright \\(c\\) .+)*?

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files \\(the "Software"\\), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,
);

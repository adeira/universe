// @flow strict

type Diff = {
  +path: string,
  +body: string,
};

export default function createMockDiff(filename: string): Diff {
  return {
    path: filename,
    body:
      'new file mode 100644\n' +
      'index 0000000000000000000000000000000000000000..1111111111111111111111111111111111111111\n' +
      '--- /dev/null\n' +
      `+++ b/${filename}\n` +
      '@@ -0,0 +1 @@\n' +
      `+fake content`,
  };
}

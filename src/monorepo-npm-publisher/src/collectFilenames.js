// @flow

import Arborist from '@npmcli/arborist';
import packlist from 'npm-packlist';

export async function collectFilenames(packageFolderPath: string): Promise<$ReadOnlyArray<string>> {
  const arborist = new Arborist({ path: packageFolderPath });
  const arboristTree = await arborist.loadActual();
  return packlist(arboristTree);
}

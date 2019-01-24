// @flow

import fetch from '@mrtnzlml/fetch';
import ENV from '@kiwicom/environment';

const PROJECT_ID = 1419; // https://gitlab.skypicker.com/incubator/universe

export default async function openMergeRequest(
  sourceBranch: string,
  commitMessage: string,
) {
  const response = await fetch(
    `https://gitlab.skypicker.com/api/v4/projects/${PROJECT_ID}/merge_requests`,
    {
      method: 'POST',
      body: JSON.stringify({
        id: PROJECT_ID,
        source_branch: sourceBranch,
        target_branch: 'master',
        title: commitMessage,
        labels: 'automator',
        remove_source_branch: true,
      }),
      headers: {
        'Private-Token': ENV.AUTOMATOR_GITLAB_PRIVATE_TOKEN,
        'Content-Type': 'application/json',
      },
    },
  );

  // eslint-disable-next-line no-console
  console.warn(await response.json());
}

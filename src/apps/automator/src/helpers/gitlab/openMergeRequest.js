// @flow

import fetch from '@kiwicom/fetch';
import ENV from '@kiwicom/environment';

const PROJECT_ID = 1419; // https://gitlab.skypicker.com/incubator/universe
const ASSIGNEE_ID = 202; // https://gitlab.skypicker.com/api/v4/users?username=martin.zlamal

export default async function openMergeRequest(
  sourceBranch: string,
  commitMessage: string,
): Promise<void> {
  const apiURL = `https://gitlab.skypicker.com/api/v4/projects/${PROJECT_ID}/merge_requests`;

  const response = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify({
      id: PROJECT_ID,
      source_branch: sourceBranch,
      target_branch: 'master',
      title: commitMessage,
      labels: 'automator',
      remove_source_branch: true,
      assignee_id: ASSIGNEE_ID,
      allow_collaboration: true,
      squash: false,
    }),
    headers: {
      'Private-Token': ENV.AUTOMATOR_GITLAB_PRIVATE_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  // eslint-disable-next-line no-console
  console.warn(await response.json());
}

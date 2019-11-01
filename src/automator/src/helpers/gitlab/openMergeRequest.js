// @flow

import fetch, { ResponseError } from '@adeira/fetch';
import { invariant } from '@adeira/js';

const PROJECT_ID = 1419; // https://gitlab.skypicker.com/incubator/universe
const ASSIGNEE_ID = 202; // https://gitlab.skypicker.com/api/v4/users?username=martin.zlamal

export default async function openMergeRequest(
  sourceBranch: string,
  commitMessage: string,
  commitDescription?: string,
): Promise<void> {
  // https://docs.gitlab.com/ee/api/merge_requests.html#create-mr
  const apiURL = `https://gitlab.skypicker.com/api/v4/projects/${PROJECT_ID}/merge_requests`;
  const token = process.env.AUTOMATOR_GITLAB_PRIVATE_TOKEN;

  invariant(
    token != null,
    'Env variable AUTOMATOR_GITLAB_PRIVATE_TOKEN cannot be null or undefined.',
  );

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        id: PROJECT_ID,
        source_branch: sourceBranch,
        target_branch: 'master',
        title: commitMessage,
        description: commitDescription ?? '',
        labels: 'automator',
        remove_source_branch: true,
        assignee_id: ASSIGNEE_ID,
        allow_collaboration: true,
        squash: false,
      }),
      headers: {
        'Private-Token': token,
        'Content-Type': 'application/json',
      },
    });

    // eslint-disable-next-line no-console
    console.warn(await response.json());
  } catch (error) {
    if (error instanceof ResponseError && error.response.status === 409) {
      // noop - 409 (Conflict) means the MR already exist
      // see: https://docs.gitlab.com/ee/api/
      console.warn('Merge request already exists.'); // eslint-disable-line no-console
    } else {
      throw error;
    }
  }
}

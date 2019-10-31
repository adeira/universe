Automator is our little friend to help us with repetitive task that has to be done but can be automated. So far it only updated the information about our public NPM packages in our documentation. It can perform the changes, commit & push these changes and open merge request in GitLab.

Automator works with these environment variables:

- `CI_NODE_INDEX` (GitLab specific)
- `CI_NODE_TOTAL` (GitLab specific)
- `AUTOMATOR_GITLAB_PRIVATE_TOKEN` - private token necessary for API calls (https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)

Thanks for contributing to this repository.

We want to push changes to the `master` branch as soon as possible and we consider `master` branch to be a stable branch (with continuous deployments from this branch). Every change should go through Merge Request (MR) and code review and we prefer smaller MRs even though the feature is not completely finished yet.

Please read our [documentation](https://kiwi.wiki/incubator/universe/) for more detailed info about how to write code or test it. This project is a monorepo so please consult documentation for your project. However, these simple rules apply in general:

- add your code and if you think it should be tested then do so (unit tests for non-trivial code, integration tests for business critical things)
- update the documentation if needed
- ensure the test suite passes (`yarn test-ci`)
- make sure it actually works by trying it
- submit a merge request and wait for the code review (do not let it die)

Every change is automatically deployed from the `master` if the tests are green.

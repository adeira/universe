# TODO

- We should run Shipit as a service. Currently it runs on CI (because we wanted to make it work fast) but it's not correct. The service should clone the repositories only once and keep them there (we currently clone the repos every time). This would significantly improve the performance.
- Investigate how to ship the repositories in parallel. We currently ship them one by one which is by design since I was not sure how would Git process behave when I'd try to run it many times on one repository (Universe). There are some situations when Git creates a lock file and is not very happy.
- UI for Shipit. Also, study [Configerator](https://research.fb.com/wp-content/uploads/2016/11/holistic-configuration-management-at-facebook.pdf) approach (Facebook doesn't use configs in the code anymore - we still do).
- ...

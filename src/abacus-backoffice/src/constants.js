// @flow strict

export default {
  graphqlServerURL: ((__DEV__
    ? 'http://0.0.0.0:5000/graphql'
    : 'http://abacus.kochka.com.mx/graphql'): string), // TODO: HTTPS, better "abacus" domain
  googleClientID: '245356693889-63qeuc6183hab6be342blikbknsvqrhk.apps.googleusercontent.com',
};

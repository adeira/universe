// @flow strict

const getDataByTypename = data => (data?.__typename != null ? { [data.__typename]: data } : {});

export default getDataByTypename;

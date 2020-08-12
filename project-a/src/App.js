import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IntlVariations, init } from "fbt";

import Home from './Home';
import './App.css';

const viewerContext = {
  GENDER: IntlVariations.GENDER_UNKNOWN,
  locale: "es_LA", // "en_US",
};

init({
  translations: require("../translatedFbts.json"),
  fbtEnumManifest: require("../.enum_manifest.json"),
  hooks: {
    getViewerContext: () => viewerContext,
  },
});

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;

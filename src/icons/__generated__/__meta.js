// @flow strict

import React, { type AbstractComponent } from 'react';

export type IconNames = 'backward' | 'question_circle';

export const ComponentsMap = {
  backward: (React.lazy(() => import('./Backward')): AbstractComponent<{}>),
  question_circle: (React.lazy(() => import('./QuestionCircle')): AbstractComponent<{}>),
};

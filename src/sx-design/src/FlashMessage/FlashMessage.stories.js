/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import FlashMessage, { FlashMessageTint } from './FlashMessage';
import LayoutInline from '../Layout/LayoutInline';
import useFlashMessages from './useFlashMessages';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/FlashMessage',
  component: FlashMessage,
};

initFbt();

// 👇 We create a "template" of how args map to rendering
const TemplateToast = () => {
  const [displayFleshMessage] = useFlashMessages();
  return (
    <LayoutInline>
      <Button
        tint="success"
        onClick={() =>
          displayFleshMessage(
            <fbt desc="bread" doNotExtract={true}>
              Bread 👍
            </fbt>,
            { tint: FlashMessageTint.Success },
          )
        }
      >
        <fbt desc="short message" doNotExtract={true}>
          Short success message
        </fbt>
      </Button>

      <Button
        tint="warning"
        onClick={() =>
          displayFleshMessage(
            <fbt desc="bread" doNotExtract={true}>
              Bread 👍
            </fbt>,
            { tint: FlashMessageTint.Warning },
          )
        }
      >
        <fbt desc="short message" doNotExtract={true}>
          Short warning message
        </fbt>
      </Button>

      <Button
        tint="error"
        onClick={() =>
          displayFleshMessage(
            <fbt desc="bread" doNotExtract={true}>
              Bread 👍
            </fbt>,
            { tint: FlashMessageTint.Error },
          )
        }
      >
        <fbt desc="short message" doNotExtract={true}>
          Short error message
        </fbt>
      </Button>

      <Button
        onClick={() =>
          displayFleshMessage(
            <fbt desc="not a bread" doNotExtract={true}>
              Awesome! Your message was displayed successfully and as you can see it preserves its
              great styles without breaking anything.
            </fbt>,
          )
        }
      >
        <fbt desc="long message" doNotExtract={true}>
          Long message
        </fbt>
      </Button>
    </LayoutInline>
  );
};

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof FlashMessage> = TemplateToast.bind({});
Default.storyName = 'Default';

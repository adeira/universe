// @flow

import * as React from 'react';
import { Text, View, StyleSheet, PlatformColor } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import type { TextLayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes';

import type { FragmentContainerType } from '../relay/relayTypes';
import type { DescriptionFragment } from './__generated__/DescriptionFragment.graphql';

type Props = {|
  +data: DescriptionFragment,
|};

const LINES_LENGTH_COLLAPSED = 5;

function Description(props: Props): React.Node {
  const [hasMoreLines, setHasMoreLines] = React.useState(false);
  const [showMoreLines, setShowMoreLines] = React.useState(false);

  const onTextLayout = (event: TextLayoutEvent) => {
    // TODO: this won't work well when there is exactly the right number of lines (5)
    if (event.nativeEvent.lines.length >= LINES_LENGTH_COLLAPSED) {
      setHasMoreLines(true);
    }
  };

  const handleShowMoreLines = () => {
    setShowMoreLines(true);
  };

  const handleShowLessLines = () => {
    setShowMoreLines(false);
  };

  return (
    <View style={styles.textContainer}>
      <Text
        numberOfLines={showMoreLines === false ? LINES_LENGTH_COLLAPSED : undefined}
        ellipsizeMode="tail"
        onTextLayout={onTextLayout}
      >
        {props.data.text}
      </Text>
      {hasMoreLines === true &&
        (showMoreLines === true ? (
          <Text onPress={handleShowLessLines} style={styles.showMoreLink}>
            Show less
          </Text>
        ) : (
          <Text onPress={handleShowMoreLines} style={styles.showMoreLink}>
            Show more
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    margin: 20,
  },
  showMoreLink: {
    color: PlatformColor('link'),
  },
});

export default (createFragmentContainer(Description, {
  data: graphql`
    fragment DescriptionFragment on DescriptionBlock {
      text
    }
  `,
}): FragmentContainerType<Props>);

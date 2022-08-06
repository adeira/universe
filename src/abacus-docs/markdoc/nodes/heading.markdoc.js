// @flow

import { Tag } from '@markdoc/markdoc';

import { Heading } from '../../components/Heading';

function generateID(children: $FlowFixMe, attributes: $FlowFixMe) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export default {
  render: Heading,
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node: $FlowFixMe, config: $FlowFixMe): $FlowFixMe {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);

    // $FlowFixMe[object-this-reference]
    return new Tag(this.render, { ...attributes, id }, children);
  },
};

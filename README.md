[![npm version](https://badge.fury.io/js/react-on-visible.svg)](https://badge.fury.io/js/react-on-visible)
# React OnVisible component

## Live demo

Live example: https://dazld.github.io/react-on-visible/demo/

## Description

This is a higher order react component that applies the css class `visible` to the container when the element becomes more than 50% visible in the browser viewport.

The user can override the percentage via the `percent={50}` prop (50% in this case), or the class used when becoming visible via the `visibleClassName="show"` (show in this case).

It only attaches to browser events on the client, so is also safe to use for server rendering.

Viewport visibility is calculated by listening to a debounced window scroll event (10ms), and once the element has been found to be visible, no further changes are applied.

## Example

```js

import React from 'react';
import OnVisible from 'react-on-visible';

export default function someComponent(props) {
  return (
    <OnVisible className="my-container">
      <h1>I will be rendered inside a div that has class 'my-container' only until I become visible, at which point the container will have the classes 'my-container visible'</h1>
    </OnVisible>
  );
}

```

A further example is available in the `demos` folder of this project.

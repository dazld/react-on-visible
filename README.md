[![npm version](https://badge.fury.io/js/react-on-visible.svg)](https://badge.fury.io/js/react-on-visible)
# React OnVisible component

This is a higher order react component that applies the css class `visible` to the container when the element becomes more than 50% visible in the browser viewport.

It only attaches to browser events on the client, so is also safe to use for server rendering.

Viewport visibility is calculated by listening to a debounced window scroll event (10ms), and once the element has been found to be visible, no further changes are applied.

The scope of this component is intentionally quite limited. A future version may provide an option for the visible class to be toggled as the container moves in and out of the viewport. Another option might be the ability to provide a callback.

## Example

Live example: https://dazld.github.io/react-on-visible/demo/

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

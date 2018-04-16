import React, { ReactChildren } from 'react';
import { render } from 'react-testing-library';
import Compose from './index';

interface Props {
  children: ReactChildren;
}

const Div = ({ children, ...rest }: Props) => <div {...rest}>{children}</div>;
const Li = ({ children }: Props) => <li>{children}</li>;

it('should compose components and attach props with children', () => {
  const { container } = render((
    <Compose
      components={[
        [Div, { className: 'foo' }],
        'ul',
        Li,
      ]}
    >
      Bar
    </Compose>
  ));
  // Explitly manual testing
  const div = container.children[0];
  expect(div.tagName).toBe('DIV');
  expect(div.className).toBe('foo');
  expect(div.children).toHaveLength(1);
  const ul = div.children[0];
  expect(ul.tagName).toBe('UL');
  expect(ul.className).toBe('');
  expect(ul.children).toHaveLength(1);
  const li = ul.children[0];
  expect(li.tagName).toBe('LI');
  expect(li.className).toBe('');
  expect(li.children).toHaveLength(0);
  expect(li.textContent).toBe('Bar');
  // Extra safety
  expect(div).toMatchSnapshot();
});

it('should compose components without children', () => {
  const { container } = render((
    <Compose
      components={[
        ['div', { className: 'foo' }],
        ['i', { className: 'icon-bar' }],
      ]}
    />
  ));
  // Explicitly manual testing
  const div = container.children[0];
  expect(div.tagName).toBe('DIV');
  expect(div.className).toBe('foo');
  expect(div.children).toHaveLength(1);
  const i = div.children[0];
  expect(i.tagName).toBe('I');
  expect(i.className).toBe('icon-bar');
  expect(i.children).toHaveLength(0);
  // Extra safety
  expect(div).toMatchSnapshot();
});

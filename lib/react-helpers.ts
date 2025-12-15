/**
 * React helpers for using React without JSX
 * Provides utility functions to make React.createElement more ergonomic
 */

import { createElement, ReactNode, ComponentType, ReactElement, Fragment } from 'react';

// Export Fragment for use in other files
export { Fragment };

/**
 * Type for element props (including children)
 */
type Props = Record<string, any> & { children?: ReactNode };

/**
 * Helper function similar to Preact's h()
 * Creates React elements without JSX
 *
 * @example
 * h('div', { className: 'container' }, 'Hello World')
 * h(Button, { onClick: handler }, 'Click me')
 */
export function h(
  type: string | ComponentType<any>,
  props?: Props | null,
  ...children: ReactNode[]
): ReactElement {
  const finalProps = props || {};

  if (children.length > 0) {
    finalProps.children = children.length === 1 ? children[0] : children;
  }

  return createElement(type, finalProps);
}

/**
 * Fragment helper
 * @example
 * fragment(child1, child2, child3)
 */
export function fragment(...children: ReactNode[]): ReactElement {
  return createElement(Fragment, null, ...children);
}

/**
 * Common HTML element helpers
 */
export const div = (props?: Props, ...children: ReactNode[]) =>
  h('div', props, ...children);

export const span = (props?: Props, ...children: ReactNode[]) =>
  h('span', props, ...children);

export const p = (props?: Props, ...children: ReactNode[]) =>
  h('p', props, ...children);

export const h1 = (props?: Props, ...children: ReactNode[]) =>
  h('h1', props, ...children);

export const h2 = (props?: Props, ...children: ReactNode[]) =>
  h('h2', props, ...children);

export const h3 = (props?: Props, ...children: ReactNode[]) =>
  h('h3', props, ...children);

export const h4 = (props?: Props, ...children: ReactNode[]) =>
  h('h4', props, ...children);

export const h5 = (props?: Props, ...children: ReactNode[]) =>
  h('h5', props, ...children);

export const h6 = (props?: Props, ...children: ReactNode[]) =>
  h('h6', props, ...children);

export const a = (props?: Props, ...children: ReactNode[]) =>
  h('a', props, ...children);

export const button = (props?: Props, ...children: ReactNode[]) =>
  h('button', props, ...children);

export const input = (props?: Props) =>
  h('input', props);

export const section = (props?: Props, ...children: ReactNode[]) =>
  h('section', props, ...children);

export const article = (props?: Props, ...children: ReactNode[]) =>
  h('article', props, ...children);

export const header = (props?: Props, ...children: ReactNode[]) =>
  h('header', props, ...children);

export const footer = (props?: Props, ...children: ReactNode[]) =>
  h('footer', props, ...children);

export const nav = (props?: Props, ...children: ReactNode[]) =>
  h('nav', props, ...children);

export const ul = (props?: Props, ...children: ReactNode[]) =>
  h('ul', props, ...children);

export const li = (props?: Props, ...children: ReactNode[]) =>
  h('li', props, ...children);

export const img = (props?: Props) =>
  h('img', props);

export const svg = (props?: Props, ...children: ReactNode[]) =>
  h('svg', props, ...children);

export const path = (props?: Props) =>
  h('path', props);

/**
 * Helper to create arrays of elements
 * @example
 * map(items, (item) => h('li', { key: item.id }, item.name))
 */
export function map<T>(
  items: readonly T[],
  fn: (item: T, index: number) => ReactNode
): ReactNode[] {
  return items.map(fn);
}

/**
 * Conditional rendering helper
 * @example
 * when(isVisible, () => h('div', null, 'Visible'))
 */
export function when(
  condition: boolean,
  render: () => ReactNode
): ReactNode {
  return condition ? render() : null;
}

/**
 * Switch case helper for conditional rendering
 * @example
 * switchCase(type, {
 *   'line': () => h(LineChart, props),
 *   'bar': () => h(BarChart, props),
 *   default: () => h('div', null, 'Unknown')
 * })
 */
export function switchCase<T extends string>(
  value: T,
  cases: Record<string, () => ReactNode> & { default?: () => ReactNode }
): ReactNode {
  const caseHandler = cases[value] || cases.default;
  return caseHandler ? caseHandler() : null;
}

// Re-export commonly used React types
export type { ReactNode, ComponentType, ReactElement, FC, PropsWithChildren } from 'react';

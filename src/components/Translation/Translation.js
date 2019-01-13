// @flow

import { Component } from 'react';
import type { Languages } from '../../types/lang';

type Props = {
  name: string,
  ns: string,
  placeholders: {},
};

/**
 * Returns the correct translation from the translations object.
 */
export function trans(name: string, ns: string, placeholders: {} = {}, lang: Languages = 'EN') {
  const { translations, current } = window.app;

  if (translations !== undefined) {
    if (translations[current] !== undefined) {
      if (translations[current][ns] !== undefined) {
        if (translations[current][ns][name] !== undefined) {
          let trans = translations[current][ns][name].trim();

          for (const [k, v] of Object.entries(placeholders)) {
            trans = trans.replace(`%${k}%`, v);
          }

          return trans;
        }
      }
    }
  }

  return `?${name.trim()}:${ns.trim()}`;
}

/**
 * Translation component that renders a text string.
 */
export default class Translation extends Component<Props> {
  static defaultProps = {
    placeholders: {},
  };

  props: Props;
  prevLang: string = '';

  componentWillMount() {
    if (window.app && window.app.current) {
      this.prevLang = window.app.current;
    }
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    if (this.prevLang !== window.app.current) {
      return true;
    }
    if (this.props.name !== nextProps.name) {
      return true;
    }
    if (this.props.ns !== nextProps.ns) {
      return true;
    }
    if (JSON.stringify(this.props.placeholders) !== JSON.stringify(nextProps.placeholders)) {
      return true;
    }

    return false;
  }

  componentWillUpdate() {
    if (window.app && window.app.current) {
      this.prevLang = window.app.current;
    }
  }

  render() {
    return trans(this.props.name, this.props.ns, this.props.placeholders);
  }
}

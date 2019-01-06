// @flow

import { Component } from 'react';

type Props = {
  name: string,
  ns: string,
  placeholders: {},
};

/**
 * Returns the correct translation from the translations object.
 *
 * @param string name The name/key of the translation.
 * @param string ns The namespace that the name belongs to.
 * @param mixed placeholders An optional object of replacement texts: {search: replace}
 * @return string The translation or the name if no translation is found.
 */
export function trans(name: string, ns: string, placeholders: {} = {}) {
  const { translations, curLang } = window.app;

  if (translations !== undefined) {
    if (translations[curLang] !== undefined) {
      if (translations[curLang][ns] !== undefined) {
        if (translations[curLang][ns][name] !== undefined) {
          let trans = translations[curLang][ns][name].trim();

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
    if (window.app && window.app.curLang) this.prevLang = window.app.curLang;
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    if (this.prevLang !== window.app.curLang) return true;
    if (this.props.name !== nextProps.name) return true;
    if (this.props.ns !== nextProps.ns) return true;
    if (
      JSON.stringify(this.props.placeholders) !==
      JSON.stringify(nextProps.placeholders)
    )
      return true;

    return false;
  }

  componentWillUpdate() {
    if (window.app && window.app.curLang) this.prevLang = window.app.curLang;
  }

  render() {
    return trans(this.props.name, this.props.ns, this.props.placeholders);
  }
}

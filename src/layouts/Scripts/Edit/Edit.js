// @flow

import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import ActionSets from '../../../components/ActionSets/ActionSets';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import ParsingMessage from '../../../components/ParsingMessage/ParsingMessage';
import type { Aiscript } from '../../../types/aiscript';
import { PARSE_STATE_ERROR, PARSE_STATE_QUICK } from '../../../constants/misc';
import { ROUTE_SCRIPTS_EDIT } from '../../../constants/routes';
import { setTitle } from '../../../utils';
import { TextInput } from '../../../components/Ui';
import { trans } from '../../../components/Translation/Translation';

const NS = 'Edit';

type Props = { ...RouteComponentProps, fullParseScript: (aiScript: Aiscript) => void, item: Aiscript };
type State = {
  editTitle: boolean,
};

class Edit extends Component<Props, State> {
  props: Props;
  state: State = {
    editTitle: false,
  };

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
    this.loadScript();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS_EDIT) {
      setTitle(trans('WinTitle', NS));
    }
    this.loadScript();
  }

  loadScript() {
    const { fullParseScript, item } = this.props;
    if (item.parseState === PARSE_STATE_QUICK && !item.parsing) {
      fullParseScript([item]);
    }
  }

  toggleEditTitle = () => this.setState({ editTitle: !this.state.editTitle });
  handleTitlechange = () => {
    console.log('title updated');
  };

  render() {
    if (this.props.item.parseState === PARSE_STATE_ERROR) {
      return <Redirect to={this.props.item.getUrl()} />;
    }

    const { item } = this.props;
    const { editTitle } = this.state;

    let title = item.getLabel();
    if (editTitle) {
      title = <TextInput onChange={this.handleTitlechange} value={item.getLabel()} />;
    } else {
    }

    return (
      <EditPanel>
        <EditPanelHeader title={item.getLabel()}>
          {title}
          <span>test</span>
        </EditPanelHeader>
        {item.parsing ? <ParsingMessage /> : <ActionSets sets={item.byteStructure.ConditionalActionSets} />}
      </EditPanel>
    );
  }
}

export default Edit;

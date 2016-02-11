import React, { PropTypes, Component } from 'react';
import Icon from 'react-fa';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';
//Components
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionDashboard from 'material-ui/lib/svg-icons/action/dashboard';
import SocialGroup from 'material-ui/lib/svg-icons/social/group';
import ActionDateRange from 'material-ui/lib/svg-icons/action/date-range';
import TurnedInNot from 'material-ui/lib/svg-icons/action/turned-in-not';

import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import SocialPublic from 'material-ui/lib/svg-icons/social/public';

import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';


import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

function wrapState(ComposedComponent) {
  class StateWrapper extends Component {  
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: props.pathname
      };
    }

    handleUpdateSelectedIndex(e, index) {
      this.props.push(index);
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{
            value: this.state.selectedIndex,
            requestChange: this.handleUpdateSelectedIndex.bind(this)
          }}
        />
      );
    }
  }

  StateWrapper.propTypes = {
    myProfile: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

class MainSidebar extends Component {
  render() {
    const { pathname, push } = this.props;
    const styles = {
      innerDiv: {
        paddingLeft: 50,
        fontSize: '1.5rem',
        textAlign: 'left'  
      },
      icon: {
        height: 17,
        margin: 16
      },
    }
    const path = {
      dashboard: `${_ADMIN_DOMAIN_NAME}dashboard`,
      access: `${_ADMIN_DOMAIN_NAME}access/users`,
      flightTest1: `${_ADMIN_DOMAIN_NAME}flight`,
      flightTest2: `${_ADMIN_DOMAIN_NAME}flight/test`,
      pinList: `${_ADMIN_DOMAIN_NAME}pins/list`,
      pinGenerate: `${_ADMIN_DOMAIN_NAME}pins/generate`,
    }
    return(
      <SelectableList pathname={pathname} push={push}>
        <ListItem
          disabled={true}
          primaryText="shiichi saito"
          leftAvatar={<Avatar src="images/ok-128.jpg" />}/>
        <Divider />
        <ListItem
          value={path.dashboard}
          primaryText="Dashboard"
          innerDivStyle={styles.innerDiv}
          leftIcon={<ContentInbox style={styles.icon}/>}/>

        <ListItem
          value={path.access}
          primaryText="Access Management"
          innerDivStyle={styles.innerDiv}
          leftIcon={<ContentInbox style={styles.icon}/>}/>

        <ListItem
          autoGenerateNestedIndicator={false}
          nestedListStyle={{margin: 0}}
          primaryText="Flight Management"
          innerDivStyle={styles.innerDiv}
          leftIcon={<ContentInbox style={styles.icon}/>}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              value={path.flightTest1}
              primaryText="test"
              innerDivStyle={styles.innerDiv}
              leftIcon={<ContentInbox style={styles.icon}/>}/>,
            <ListItem
              value={path.flightTest2}
              primaryText="test"
              innerDivStyle={styles.innerDiv}
              leftIcon={<ContentInbox style={styles.icon}/>}/>
          ]}
        />
        <ListItem
          value={path.pinList}
          primaryText="Access Management"
          innerDivStyle={styles.innerDiv}
          leftIcon={<ContentInbox style={styles.icon}/>}/>
      </SelectableList>  
    )  
  }
}

MainSidebar.propTypes = {
  myProfile: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
};

export default MainSidebar;

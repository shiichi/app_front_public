import React, { PropTypes, Component } from 'react';
import {Treebeard} from 'react-treebeard';
import { trans } from '../../../utils/TransUtils';
//components
//import AssociatedPermissions from './AssociatedPermissions';

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
};



class AssociatedPermissions extends Component {
  constructor(props, context) {
    super(props, context);
    //const { name } = this.props.user;
    this.state = {};
    //.bind(this)をいちいち書かなくて良くなる
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  render() {
    return (
      <div className="form-group">
        <label className="col-xs-2 control-label">Associated Permissions</label>
        <div className="col-xs-10">
          <select className="form-control" name="associated-permissions">
            <option value="all" selected="selected">All</option>
            <option value="custom">Custom</option>
          </select>
          <div id="available-permissions">
            <div class="row">
              <div className="col-xs-12">
                <div className="alert alert-info">
                  <i className="fa fa-info-circle" />
                  {trans('en','alertMessage.access.roles.associatedPermissionsPxplanation')}
                </div>
              </div>

              <div className="col-xs-6">
                <Treebeard　data={data}　onToggle={this.onToggle}/>
              </div>
              <div className="col-xs-6">
                <p><strong>Ungrouped Permissions</strong></p>
                <p>There are no ungrouped permissions.</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AssociatedPermissions.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default AssociatedPermissions;

/*
            <div id="permission-tree" className="jstree jstree-1 jstree-default jstree-checkbox-selection" role="tree" aria-multiselectable="true" tabIndex={0} aria-activedescendant={16} aria-busy="false" aria-selected="false">
              <ul className="jstree-container-ul jstree-children jstree-no-icons" role="group">
              <li role="treeitem" aria-selected="false" aria-level={1} aria-labelledby="j1_1_anchor" aria-expanded="true" id="j1_1" className="jstree-node  jstree-open jstree-last">
              <i className="jstree-icon jstree-ocl" role="presentation" />
              <a className="jstree-anchor" href="#" tabIndex={-1} id="j1_1_anchor">
              <i className="jstree-icon jstree-checkbox" role="presentation" />
              <i className="jstree-icon jstree-themeicon" role="presentation" />Access
                </a>
                <ul role="group" className="jstree-children">
                <li role="treeitem" data-dependencies="[]" aria-selected="false" aria-level={2} aria-labelledby="1_anchor" id={1} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} id="1_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />
                      View Backend
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={2} aria-labelledby="2_anchor" id={2} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title id="2_anchor" data-original-title="<strong>Dependencies:</strong> View Backend">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />View Access Management <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" aria-selected="false" aria-level={2} aria-labelledby="j1_4_anchor" aria-expanded="true" id="j1_4" className="jstree-node jstree-open">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} id="j1_4_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Permission
                </a>
                <ul role="group" className="jstree-children" style={{}}>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="15_anchor" id={15} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title id="15_anchor" data-original-title="<strong>Dependencies:</strong> View Backend, View Access Management">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Create Permission Groups <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="16_anchor" id={16} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title id="16_anchor" data-original-title="<strong>Dependencies:</strong> View Backend, View Access Management">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Edit Permission Groups <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="17_anchor" id={17} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title="<strong>Dependencies:</strong> View Backend, View Access Management" id="17_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Delete Permission Groups <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="18_anchor" id={18} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title="<strong>Dependencies:</strong> View Backend, View Access Management" id="18_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Sort Permission Groups <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="19_anchor" id={19} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title="<strong>Dependencies:</strong> View Backend, View Access Management" id="19_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Create Permissions <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="20_anchor" id={20} className="jstree-node  jstree-leaf">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title="<strong>Dependencies:</strong> View Backend, View Access Management" id="20_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Edit Permissions <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                <li role="treeitem" data-dependencies="[" aria-selected="false" aria-level={3} aria-labelledby="21_anchor" id={21} className="jstree-node  jstree-leaf jstree-last">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} data-toggle="tooltip" data-html="true" title="<strong>Dependencies:</strong> View Backend, View Access Management" id="21_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Delete Permissions <small>
                <strong>(D)</strong>
                </small>
                </a>
                </li>
                </ul>
                </li>
                <li role="treeitem" aria-selected="false" aria-level={2} aria-labelledby="j1_12_anchor" aria-expanded="false" id="j1_12" className="jstree-node jstree-closed">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} id="j1_12_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />Role
                </a>
                </li>
                <li role="treeitem" aria-selected="false" aria-level={2} aria-labelledby="j1_16_anchor" aria-expanded="false" id="j1_16" className="jstree-node  jstree-last jstree-closed">
                <i className="jstree-icon jstree-ocl" role="presentation" />
                <a className="jstree-anchor" href="#" tabIndex={-1} id="j1_16_anchor">
                <i className="jstree-icon jstree-checkbox" role="presentation" />
                <i className="jstree-icon jstree-themeicon" role="presentation" />User
                </a>
                </li>
                </ul>
                </li>
              </ul>
            </div>
*/
// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { deleteSection, openImagePanel, changeLayout } from 'actions/post';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import { ToolbarIcon } from '.';
import { grey600, grey500, red500 } from 'material-ui/styles/colors';
import {
  SmallLeftIcon,
  SmallCenterIcon,
  SmallRightIcon,
  NormalIcon,
  BigIcon
} from './lib/svgIcons';

const DELETE_KEY_CODE = 46;
const ESC_KEY_CODE = 27;

type Props = {
  handleDelete: () => void,
  handleEdit: () => void,
  openImagePanel: (actionName: string) => void,
  closeImageToolbar: () => void,
  deleteSection: (index: number, id: number) => void,
  changeLayout: (index: number, layout: string, align: string) => void,
  index: number,
  selectedKey: string,
  maxId: number
};

class ImageToolbar extends React.PureComponent<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (DELETE_KEY_CODE === e.keyCode) {
      this.handleDelete();
      return;
    }
    if (ESC_KEY_CODE === e.keyCode) {
      this.props.closeImageToolbar();
      return;
    }
  };

  handleDelete = () => {
    const { deleteSection, index, maxId } = this.props;
    deleteSection(index, maxId);
  };

  handleEdit = () => {
    this.props.openImagePanel('edit');
    this.props.closeImageToolbar();
  };

  changeLayout(layout, align = 'center') {
    const { index, changeLayout } = this.props;
    changeLayout(index, layout, align);
  }

  getClassName(layout, align = 'center') {
    if (this.props.selectedKey === `${layout}-${align}`) {
      return 'active';
    }
    return '';
  }

  render() {
    return (
      <React.Fragment>
        <ToolbarIcon
          ActionIcon={SmallLeftIcon}
          handleClick={() => this.changeLayout('small', 'left')}
          className={this.getClassName('small', 'left')}
          tooltip="Pequeño, a la izquierda"
        />
        <ToolbarIcon
          ActionIcon={SmallCenterIcon}
          handleClick={() => this.changeLayout('small', 'small_center')}
          className={this.getClassName('small', 'small_center')}
          tooltip="Pequeño, centrado"
        />
        <ToolbarIcon
          ActionIcon={SmallRightIcon}
          handleClick={() => this.changeLayout('small', 'right')}
          className={this.getClassName('small', 'right')}
          tooltip="Pequeño, a la derecha"
        />
        <ToolbarIcon
          ActionIcon={NormalIcon}
          handleClick={() => this.changeLayout('normal')}
          className={this.getClassName('normal')}
          tooltip="Normal"
        />
        <ToolbarIcon
          ActionIcon={BigIcon}
          handleClick={() => this.changeLayout('large')}
          className={this.getClassName('large')}
          tooltip="Grande"
        />
        <ToolbarSeparator style={{ backgroundColor: grey500 }} key="seprator" />
        <ToolbarIcon
          ActionIcon={<EditorModeEdit color={grey600} />}
          handleClick={this.handleEdit}
          className=""
          tooltip="Editar"
        />
        <ToolbarIcon
          ActionIcon={<ActionDelete color={red500} />}
          handleClick={this.handleDelete}
          className=""
          tooltip="Quitar"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  deleteSection,
  openImagePanel,
  changeLayout
})(ImageToolbar);

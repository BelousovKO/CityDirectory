import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as DeleteIcon} from './delete.svg';
import {ReactComponent as PatchIcon} from './patch.svg';
import './comment.scss';

class Comment extends React.Component {

  openModalEdit = () => {
    this.props.modalEditOpen(this.props.id, this.props.userName, this.props.text);
  }

  openModalDell = () => {
    this.props.modalDellOpen(this.props.id)
  }

  render() {
    return (
      <div className='comment'>
        <div
          className={'comment_text'}
          data-id={this.props.id}
          data-text={this.props.text}>
          <span className={'comment_userName'}>{this.props.userName}:</span> {this.props.text}
        </div>
        {this.props.admin && <div className={'comment_container-icon'}>
          <PatchIcon className='comment_patch-icon' onClick={this.openModalEdit}/>
          <DeleteIcon className='comment_delete-icon' onClick={this.openModalDell}/>
        </div>}
      </div>
    );
  };
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onPatch: PropTypes.func,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Comment;

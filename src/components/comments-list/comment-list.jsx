import React from 'react';
import Locale from '../../locale';
import Comment from "../comment/comment";
import CommentForm from "../comment-form";
import './comment-list.scss';
import tomorrowRequest from "../../api/tomorrow";
import classNames from 'classnames';
import Message from "../message";
import Button from "../button";

class CommentList extends React.Component {
  state = {
    comments: [],
    loading: false,
    message: null,
    textInCommentForm: '',
    modalEdit: false,
    idEditComment: '',
    editText: '',
    authorComment: '',
    modalDell: false,
    idDellComment: ''
  };

  addComment = text => {
    const city = this.props.cityNames;
    const userName = this.props.userNames;
    const userId = this.props.userId;
    if (text) {
      this.setState({loading: true});
      tomorrowRequest
        .post('./comments', {text, city, userName, userId})
        .then(response => {
          response.data.status === 'OK' ?
            this.loadCityComments() :
            this.setState({message: response.data.message, loading: false});
        });
    }
  };

  getTextInCommentForm = (text) => {
    this.setState({textInCommentForm: text});
  }

  patchComment = () => {
    const text = this.state.editText;
    const cityName = this.props.cityNames;
    tomorrowRequest
      .patch(`./comments/${this.state.idEditComment}`, {
        text, cityName
      })
      .then(response => {
        if (response.data.status === 'OK') {
          this.setState({modalEdit: false});
          this.loadCityComments();
        } else {
          this.setState({message: response.data.message});
        }
      });
  };

  loadCityComments() {
    this.setState({loading: true});
    tomorrowRequest.get(`/comments/byCity/${this.props.cityNames}`).then(response => {
      const comments = response.data.data;
      this.setState({comments, loading: false});
    })
      .catch(() => this.setState({message: 'NETWORK_ERROR', loading: false}));
  }

  componentDidMount() {
    this.loadCityComments();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cityNames !== this.props.cityNames) {
      this.loadCityComments();
    }
    if (prevState.idDellComment !== this.state.idDellComment) {
      this.setState({loading: false})
    }
  }

  deleteComment= () => {
    this.setState({loading: true});
    tomorrowRequest
      .delete(`./comments/${this.state.idDellComment}`)
      .then(response => {
        response.data.status === 'OK' ?
          this.loadCityComments() :
          this.setState({message: response.data.message, loading: false, modalDell: false});
      });
    this.setState({idDellComment: '', loading: false, modalDell: false})
  }

  modalEditOpen = (id, userName, textComment) => {
    this.setState({modalEdit: true, idEditComment: id, authorComment: userName, editText: textComment})
  }

  modalEditClose = () => {
    this.setState({modalEdit: false})
  }

  modalDellOpen = (id) => {
    this.setState({modalDell: true, idDellComment: id})
  }

  modalDellClose = () => {
    this.setState({modalDell: false})
  }

  handleInputEdit = event => {
    if (event.target.value.length === 1) {
      let tempValue = event.target.value;
      if (tempValue.search(/\s/) !== -1) {
        event.target.value = '';
      }
    }
    this.setState({editText: event.target.value});
  };

  render() {
    const locale = Locale.commentsList;
    const {loading, message} = this.state;
    return (
      <div className={classNames('comments-list', {'comments-list__loading': loading})}>

        {message && <Message message={message}/>}

        {this.state.comments.length === 0 && <div>{locale.emptyMessage}</div>}
        <div className={'comments-list_comments-container'}>
          {this.state.comments.length > 0 &&
          this.state.comments.map(({
                                     text,
                                     id,
                                     userId,
                                     userName,
                                     city
                                   }) => (
            <Comment
              admin={this.props.admin}
              text={text}
              userId={userId}
              userName={userName}
              id={id}
              city={city}
              key={id}
              onPatch={this.patchComment.bind(this)}
              modalEditOpen={this.modalEditOpen}
              modalDellOpen={this.modalDellOpen}
            />
          ))}
        </div>

        <div className={this.state.modalEdit ? 'modal modal_edit visible' : 'modal modal_edit invisible'}>
          <div className={'modal_edit__info'}>
            <div>Автор: <span className={'modal_edit__author'}>{this.state.authorComment}</span></div>
            <div>ID комментария: <span className={'modal_edit__idComment'}>{this.state.idEditComment}</span></div>
          </div>
          <textarea value={this.state.editText} onChange={this.handleInputEdit} className={'modal_edit__textarea'}/>
          <Button className={'modal_edit__edit'} label={'Изменить'} onClick={this.patchComment}/>
          <Button className={'modal_edit__cancel'} label={'Отмена'} onClick={this.modalEditClose}/>
        </div>

        <div className={this.state.modalDell ? 'modal modal_dell visible' : 'modal modal_dell invisible'}>
          <div className={'modal_dell__text'}>
            Удалить этот комментарий?
          </div>
          <Button className={'modal_dell__ok'} label={'Да'} onClick={this.deleteComment}/>
          <Button className={'modal_dell__cancel'} label={'Нет'} onClick={this.modalDellClose}/>
        </div>

        <CommentForm addComment={this.addComment} getTextInCommentForm={this.getTextInCommentForm}/>

      </div>
    );
  }
}

export default CommentList;

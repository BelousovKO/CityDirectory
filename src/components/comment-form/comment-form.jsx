import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './comment-form.scss';
import Locale from '../../locale';

class CommentForm extends React.Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
  };

  state = {text: ''};

  handleInput = event => {
    if (event.target.value.length === 1) {
      let tempValue = event.target.value;
      if (tempValue.search(/\s/) !== -1) {
        event.target.value = '';
      }
    }
    this.setState({text: event.target.value});
    this.props.getTextInCommentForm(event.target.value);
  };

  addComment = () => {
    const {addComment} = this.props;
    const {text} = this.state;

    addComment(text);
    this.setState({text: ''});
  };

  render() {
    const {text} = this.state;
    const locale = Locale.taskForm;

    return (
      <div className='comment-form'>
        <textarea value={text} onChange={this.handleInput} className={'comment-form_textarea'}/>
        <Button onClick={this.addComment} label={locale.addButtonLabel} className={'comment-form-button'}/>
      </div>
    );
  }
}

export default CommentForm;

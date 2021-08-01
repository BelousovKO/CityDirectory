import React from 'react';
import './forgot-password-form.scss';

class ForgotPasswordForm extends React.Component {

  render() {
    return (
      <div className={this.props.openForgotForm ? 'forgotShadow' : ''}
           onClick={this.props.forgotFormClos}>
        <div className={this.props.openForgotForm ? 'forgotForm-display' : ''}>
          <ul className={this.props.openForgotForm ? 'forgotForm' : 'forgotFormClos'}
              onClick={e => e.stopPropagation()}>
            {!this.props.successfullyRestored ||
            <li className={'visible-text'}>Письмо с паролем отправлено наш email</li>}
            {this.props.successfullyRestored || <>
              <li>
                <input type={'text'}
                       className={'input-in-forms loginForgot'}
                       placeholder={'Введите логин'}
                       value={this.props.enteredUserName}
                       autoComplete={"username"}
                       onChange={this.props.handleInputUserName}/>
                <div className={this.props.recoveryPas &&
                this.props.enteredUserName &&
                !this.props.userNameIsTaken ?
                  'visible-text' :
                  'hidden-text'}>
                  Пользователь с таким логином не регистрировался...
                </div>
                <div className={this.props.recoveryPas &&
                this.props.enteredUserName &&
                this.props.userNameIsTaken &&
                !this.props.userMail ?
                  'visible-text' :
                  'hidden-text'}>
                  Пользователь с таким логином не указал email...
                </div>
              </li>
              <li className={'text-in-forget-form'}>или</li>
              <li>
                <input type={'text'}
                       className={'mailForgot input-in-forms'}
                       placeholder={'Введите ваш email'}
                       value={this.props.enteredUserMail}
                       onChange={this.props.handleInputUserMail}/>
                <div className={this.props.recoveryPas &&
                this.props.enteredUserMail &&
                !this.props.validEmail ?
                  'visible-text' :
                  'hidden-text'}>
                  Введён некорректный email...
                </div>
                <div className={this.props.recoveryPas &&
                this.props.enteredUserMail &&
                this.props.emailNotFound &&
                this.props.validEmail ?
                  'visible-text' :
                  'hidden-text'}>
                  Пользователь с таким email не регистрировался...
                </div>

              </li>
              <li>
                <button className={this.props.enteredUserMail || this.props.enteredUserName ?
                  'item-submit item-submit__enabled' :
                  'item-submit item-submit__disabled'}
                        disabled={!this.props.enteredUserMail && !this.props.enteredUserName}
                        onClick={this.props.passwordRecovery}>Восстановить
                </button>
              </li>
            </>}
          </ul>
        </div>
      </div>
    );
  };
}

export default ForgotPasswordForm;

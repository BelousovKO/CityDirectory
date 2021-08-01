import React from 'react';
import './registration-form.scss';

class RegistrationForm extends React.Component {

  render() {
    return (
      <div className={this.props.openRegForm ? 'regShadow' : ''}
           onClick={this.props.registrationFormClos}>
        <div className={this.props.openRegForm ? 'registrationForm-display' : ''}>
          <ul className={this.props.openRegForm ? 'registrationForm' : 'registrationFormClos'}
              onClick={e => e.stopPropagation()}>
            <li className={'registrationForm__item'}>
              <i className={'footnote footnote-asterisk'}>*</i>
              <input type={'text'}
                     className={this.props.smallLengthName || this.props.userNameIsTaken ?
                       'shadow-error loginReg input-in-forms' : 'loginReg input-in-forms'}
                     placeholder={'Введите логин'}
                     value={this.props.enteredUserName}
                     autoComplete={"username"}
                     onChange={this.props.handleInputUserName}
                     onBlur={this.props.checkLogin}/>
            </li>
            <li className={this.props.smallLengthName ? 'message-error input-legend' : ' input-legend'}>
              {this.props.userNameIsTaken ? '- этот логин уже занят...' : '- логин должен содержать от 4 до 20 символов'}
            </li>
            <li className={'registrationForm__item item-password'}>
              <i className={'footnote footnote-asterisk'}>*</i>
              <input type={'password'}
                     className={this.props.errorInPassword ?
                       'passwordReg shadow-error input-in-forms' :
                       'passwordReg input-in-forms'}
                     placeholder={'Введите пароль'}
                     value={this.props.enteredUserPass}
                     autoComplete={"current-password"}
                     onChange={this.props.handleInputUserPass}
                     onBlur={this.props.checkPassword}/>
              <meter id={'password-meter'}
                     className={'item-password__meter'}
                     min={'0'}
                     max={'9'}
                     low={'6'}
                     high={'8'}
                     optimum={'9'}
                     value={this.props.enteredUserPass.length}>
                Количество символов в пароле
              </meter>
            </li>
            <li className={'input-legend'}>- пароль <span className={this.props.smallLengthPass ? 'message-error' : ''}>
                 должен содержать от 6 до 20 символов, </span>
              должен состоять из
              <span className={this.props.noLetters ? 'message-error' : ''}> латинских символов </span>
              и
              <span className={this.props.noNumbers ? 'message-error' : ''}> цифр</span>
            </li>
            <li className={'registrationForm__item item-password-check'}>
              <i className={'footnote footnote-asterisk'}>*</i>
              <input type={'password'}
                     className={this.props.passwordCorrected ?
                       'passwordReg shadow-correct input-in-forms' :
                       `passwordReg input-in-forms ${this.props.passwordVerificationError ? 'shadow-error' : ''}`}
                     placeholder={'Подтвердите пароль'}
                     value={this.props.enteredUserCheckPass}
                     onChange={this.props.handleInputUserCheckPass}
                     onBlur={this.props.checkPasswordRe_entry}/>
            </li>
            <li>
              {this.props.passwordCorrected ?
                <b className={'checkPassOk'}>Ok</b> :
                <span className={this.props.passwordVerificationError ?
                  'message-error input-legend' :
                  'input-legend'}>- введите пароль еще раз</span>}
            </li>
            <li className={'registrationForm__item'}>
              <input type={'text'}
                     className={'mailReg input-in-forms'}
                     placeholder={'Введите ваш email'}
                     value={this.props.enteredUserMail}
                     onChange={this.props.handleInputUserMail}
                     onBlur={this.props.checkMail}/>
            </li>
            <li className={this.props.validEmail ? 'input-legend' : 'input-legend message-error'}>
              {this.props.validEmail ?
                '- укажите email, и мы сможем помочь вам востановить ваш пароль' :
                '- вы ввели некорректный email'}</li>
            <li className={'warning'}>
              <i className={'footnote footnote-asterisk'}>*</i>
              <label className={"warning__label"}>
                <input type={"checkbox"}
                       className={"warning__checkbox"}
                       onChange={this.props.totalCheckForm}
                       checked={this.props.warningChecked}/>
                <span className={"warning__fake-checkbox"}>{}</span>
                <span className={"warning__consent_label"}>Все введенные вами данные будут общедоступны!
                  НЕ ВВОДИТЕ пароль, который вы используете в других приложениях!!!</span>
              </label>
            </li>
            <li className={'registrationForm__item registrationForm__item_wrapper'}>
              <button className={this.props.formIsCompleted ?
                'item-submit item-submit__enabled' :
                'item-submit item-submit__disabled'}
                      onClick={this.props.userRegistration}
                      disabled={!this.props.formIsCompleted}>Зарегистрироваться
              </button>
            </li>
            <li className={'registrationForm__item item-footnote'}>
              <i className={'footnote input-legend'}>* - обязательно для заполнения</i>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}

export default RegistrationForm;

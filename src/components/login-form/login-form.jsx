import React from 'react';
import Button from "../button";
import Locale from '../../locale';
import tomorrowRequest from "../../api/tomorrow";
import InfoCity from "../info-city/Info-city";
import './login-form.scss';
import RegistrationForm from "../registration-form/registration-form";
import ForgotPasswordForm from "../forgot-password-form/forgot-password-form";

class LoginForm extends React.Component {

  state = {
    admin: Boolean(localStorage.getItem('admin')),
    userId: '',
    user: [],
    userName: localStorage.getItem('userName'),
    userMail: '',
    password: '',
    enteredUserName: '',
    smallLengthName: false,
    userNameIsTaken: false,
    enteredUserPass: '',
    smallLengthPass: false,
    noLetters: false,
    noNumbers: false,
    errorInPassword: false,
    enteredUserCheckPass: '',
    passwordCorrected: false,
    passwordVerificationError: false,
    enteredUserMail: '',
    validEmail: true,
    emailNotFound: false,
    warningChecked: false,
    formIsCompleted: false,
    recoveryPas: false,
    successfullyRestored: false,
    message: localStorage.getItem('message') || "Вам необходимо авторизоваться",
    authentication: Boolean(localStorage.getItem('authentication')),
    openRegForm: false,
    openForgotForm: false,
  };

  handleInputUserName = event => {
    if (event.target.value.length + 1 < 22) {
      this.setState({
        enteredUserName: event.target.value.replace(/\s/g, ''),
        smallLengthName: false,
        userNameIsTaken: false,
        formIsCompleted: false,
        warningChecked: false,
        recoveryPas: false,
        userMail: ''
      });
    }
  };

  checkLogin = () => {
    if (this.state.enteredUserName.length < 4) {
      this.setState({smallLengthName: true})
    } else {
      tomorrowRequest.get(`/users/${this.state.enteredUserName}`)
        .then(response => {
          if (response.data.status === 'OK') {
            this.setState({userNameIsTaken: true, userMail: response.data.data.userMail})
          }
        })
    }
  }

  validationEntered = event => {
    let tempValue = event.target.value;
    if (tempValue.search(/\s/) !== -1) {
      tempValue = event.target.value.replace(/\s/g, '');
    }
    if (tempValue.search(/[а-я]/) !== -1) {
      tempValue = event.target.value.replace(/[а-я]/g, '');
    }
    if (tempValue.search(/[А-Я]/) !== -1) {
      tempValue = event.target.value.replace(/[А-Я]/g, '');
    }
    if (tempValue.search(/[!@|,)\\#`ё~$(Ё^%.&*_+="№/;:-?<>']/) !== -1) {
      tempValue = event.target.value.replace(/[!@|,)\\#`ё~$(Ё^%.&*_+="№/;:-?<>']/g, '');
    }
    return tempValue
  }

  handleInputUserPass = event => {
    this.setState({
      errorInPassword: false,
      noLetters: false,
      noNumbers: false,
      smallLengthPass: false,
      formIsCompleted: false,
      warningChecked: false
    });
    if (event.target.value.length + 1 < 22) {
      let tempValue = this.validationEntered(event)
      this.setState({enteredUserPass: tempValue.toLowerCase()});
      if (this.state.enteredUserCheckPass.length > 0) {
        if (this.state.enteredUserCheckPass !== tempValue) {
          this.setState({passwordCorrected: false, passwordVerificationError: true})
        } else {
          this.setState({passwordCorrected: true, passwordVerificationError: false})
        }
      }
    }
  };

  checkPassword = (event) => {
    let tempValue = event.target.value;
    if (tempValue.search(/[a-z]/) === -1) {
      this.setState({errorInPassword: true, noLetters: true})
    }
    if (tempValue.search(/[0-9]/) === -1) {
      this.setState({errorInPassword: true, noNumbers: true})
    }
    if (this.state.enteredUserPass.length < 6) {
      this.setState({errorInPassword: true, smallLengthPass: true})
    }
  }

  handleInputUserCheckPass = event => {
    if (event.target.value.length + 1 < 22) {
      this.setState({passwordVerificationError: false, formIsCompleted: false, warningChecked: false})
      let tempValue = this.validationEntered(event)
      this.setState({enteredUserCheckPass: tempValue.toLowerCase()});
      if (tempValue !== this.state.enteredUserPass || tempValue < 5) {
        this.setState({passwordCorrected: false, passwordVerificationError: true})
      } else {
        this.setState({passwordCorrected: true, passwordVerificationError: false})
      }
    }
  };

  checkPasswordRe_entry = () => {
    if (this.state.enteredUserCheckPass !== this.state.enteredUserPass || this.state.enteredUserCheckPass < 5) {
      this.setState({passwordCorrected: false, passwordVerificationError: true})
    } else if (!this.state.errorInPassword) {
      this.setState({passwordCorrected: true, passwordVerificationError: false})
    }
  }

  handleInputUserMail = event => {
    this.setState({
      enteredUserMail: event.target.value,
      formIsCompleted: false,
      warningChecked: false,
      recoveryPas: false,
      userMail: ''
    })
  };

  checkMail = () => {
    if (this.state.enteredUserMail.length > 0) {
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      re.test(String(this.state.enteredUserMail).toLowerCase()) ?
        this.setState({validEmail: true}) :
        this.setState({validEmail: false, enteredUserMail: ''});
    } else {
      this.setState({validEmail: true})
    }
  }

  totalCheckForm = (e) => {

    if (this.state.warningChecked) {
      this.setState({warningChecked: false, formIsCompleted: false})
    } else {
      this.state.enteredUserName.length < 4 ?
        this.setState({smallLengthName: true}) :
        this.setState({smallLengthName: false});

      this.state.enteredUserPass.length < 5 ?
        this.setState({errorInPassword: true, smallLengthPass: true}) :
        this.setState({smallLengthPass: false});

      this.state.enteredUserCheckPass === this.state.enteredUserPass && this.state.enteredUserCheckPass.length > 5 ?
        this.setState({passwordCorrected: true}) :
        this.setState({passwordVerificationError: true, passwordCorrected: false});

      if (e.target.checked &&
        !this.state.smallLengthName &&
        !this.state.userNameIsTaken &&
        !this.state.smallLengthPass &&
        !this.state.errorInPassword &&
        this.state.passwordCorrected
      ) {
        this.setState({formIsCompleted: true, warningChecked: true})
      } else {
        this.setState({formIsCompleted: false, warningChecked: false})
      }
    }
  }

  userAuthentication = () => {
    tomorrowRequest.get(`/users/${this.state.enteredUserName}`)
      .then(response => {
        const user = response.data.data;
        this.setState({user});
        if (!user) {
          this.setState({
            message: response.data.message,
            enteredUserName: '',
            enteredUserPass: ''
          });
          localStorage.setItem('message', 'Такой пользователь не зарегистрирован. Хотите зарегистрироваться?');
        }
        if (this.state.enteredUserName === user.userName && this.state.enteredUserPass === user.password) {
          if (user.userName === 'admin') {
            localStorage.setItem('admin', 'true');
            this.setState({admin: true});
          } else {
            localStorage.setItem('admin', '');
            this.setState({admin: false});
          }
          localStorage.setItem('authentication', 'true');
          localStorage.setItem('userName', user.userName);
          localStorage.setItem('message', `Привет ${user.userName}!`);
          this.setState({
            message: `Привет ${user.userName}!`,
            enteredUserName: '',
            enteredUserPass: '',
            authentication: true,
            userName: user.userName,
            userId: user.id,
          });
        } else {
          localStorage.setItem('authentication', '');
          localStorage.setItem('userName', '');
          localStorage.setItem('admin', '');
          localStorage.setItem('message', 'Неверный логин или пароль');
          this.setState({
            message: 'Неверный логин или пароль',
            enteredUserName: '',
            enteredUserPass: '',
            authentication: false
          });
        }
      })
      .catch(() => this.setState({
        message: 'Такой пользователь не зарегистрирован. Хотите зарегистрироваться?',
        enteredUserName: '',
        enteredUserPass: ''
      }));
  };

  registrationForm = () => {
    this.setState({openRegForm: true});
  };

  registrationFormClos = () => {
    this.setState({openRegForm: false});
  }

  userRegistration = () => {
    const userName = this.state.enteredUserName;
    const password = this.state.enteredUserPass;
    const userMail = this.state.enteredUserMail.toLowerCase();
    tomorrowRequest.get(`/users/${this.state.enteredUserName}`)
      .then(response => {
        const user = response.data.data;
        if (user) {
          this.setState({
            message: "Извините, но пользователь с таким именем уже зарегистрирован...",
            enteredUserName: '',
            enteredUserCheckPass: '',
            enteredUserMail: '',
            passwordCorrected: false,
            warningChecked: false,
            formIsCompleted: false,
            enteredUserPass: ''
          });
          localStorage.setItem('message', 'Извините, но пользователь с таким именем уже зарегистрирован...');
        } else {
          tomorrowRequest
            .post('./users/m', {userName, password, userMail})
            .then(response => {
              if (response.data.status === 'OK') {
                localStorage.setItem('authentication', 'true');
                localStorage.setItem('userName', response.data.data.userName);
                localStorage.setItem('admin', '');
                localStorage.setItem('message', `Привет ${response.data.data.userName}!`);
                this.setState({
                  message: `Привет ${response.data.data.userName}!`,
                  enteredUserName: '',
                  enteredUserPass: '',
                  enteredUserCheckPass: '',
                  enteredUserMail: '',
                  passwordCorrected: false,
                  warningChecked: false,
                  formIsCompleted: false,
                  authentication: true,
                  userName: response.data.data.userName,
                  userId: response.data.data.id,
                });
              } else {
                this.setState({
                  message: "К сожалению регистрация не удалась, попробуйте повторить позже...",
                  enteredUserName: '',
                  enteredUserPass: '',
                  enteredUserCheckPass: '',
                  passwordCorrected: false,
                  warningChecked: false,
                  formIsCompleted: false,
                  enteredUserMail: ''
                });
              }
            });
        }
      })
      .catch(() => this.setState({
        message: 'Такой пользователь не зарегистрирован. Хотите зарегистрироваться?',
        enteredUserName: '',
        enteredUserPass: '',
        enteredUserCheckPass: '',
        passwordCorrected: false,
        warningChecked: false,
        formIsCompleted: false,
        enteredUserMail: ''
      }));
    this.registrationFormClos();
  }

  forgotForm = () => {
    this.setState({openForgotForm: true, recoveryPas: false});
  }

  forgotFormClos = () => {
    this.setState({openForgotForm: false, successfullyRestored: false});
  }

  passwordRecovery = () => {
    if (this.state.enteredUserName) {
      tomorrowRequest.get(`/users/${this.state.enteredUserName}`)
        .then(response => {
          if (response.data.status === 'OK') {
            this.setState({
              userNameIsTaken: true,
              userMail: response.data.data.userMail
            })
            if (response.data.data.userMail) {
              tomorrowRequest.get(`/users/sendTo/${response.data.data.userMail}`)
                .then(() => {
                  if (response.data.status === 'OK') {
                    this.setState({successfullyRestored: true, enteredUserMail: ''})
                  }
                })
            }
          }
        })
    }
    if (this.state.enteredUserMail) {
      this.checkMail()
      tomorrowRequest.get(`/users/pasEmail/${this.state.enteredUserMail.toLowerCase()}`)
        .then(response => {
          if (response.data.status === 'OK') {
            tomorrowRequest.get(`/users/sendTo/${response.data.data.userMail}`)
              .then(() => {
                if (response.data.status === 'OK') {
                  this.setState({
                    successfullyRestored: true,
                    recoveryPas: true,
                    userMail: response.data.data.userMail,
                    enteredUserMail: ''
                  })
                }
              })
          } else {
            this.setState({emailNotFound: true})
          }
        })
    }
    this.setState({userMail: '', recoveryPas: true})
  }

  exit = () => {
    localStorage.setItem('userName', '');
    localStorage.setItem('authentication', '');
    localStorage.setItem('admin', '');
    localStorage.setItem('message', '');
    this.setState({
      userName: '',
      password: '',
      userId: '',
      authentication: false,
      message: 'Вам необходимо авторизоваться',
      admin: false
    })
  }

  render() {
    const {
      enteredUserName, smallLengthName, userNameIsTaken, enteredUserPass, smallLengthPass, enteredUserCheckPass,
      passwordCorrected, passwordVerificationError, enteredUserMail, formIsCompleted, authentication, userName, userId,
      admin, errorInPassword, noLetters, noNumbers, warningChecked, validEmail, openForgotForm, openRegForm,
      recoveryPas, successfullyRestored, emailNotFound, userMail
    } = this.state;
    const locale = Locale.loginForm;

    return (
      <div>
        {authentication ||
        <div className={'start-page'}>
          <ForgotPasswordForm forgotFormClos={this.forgotFormClos}
                              handleInputUserName={this.handleInputUserName}
                              handleInputUserMail={this.handleInputUserMail}
                              passwordRecovery={this.passwordRecovery}
                              openForgotForm={openForgotForm}
                              enteredUserName={enteredUserName}
                              enteredUserMail={enteredUserMail}
                              recoveryPas={recoveryPas}
                              userNameIsTaken={userNameIsTaken}
                              validEmail={validEmail}
                              successfullyRestored={successfullyRestored}
                              emailNotFound={emailNotFound}
                              userMail={userMail}/>
          <RegistrationForm registrationFormClos={this.registrationFormClos}
                            userRegistration={this.userRegistration}
                            handleInputUserName={this.handleInputUserName}
                            checkLogin={this.checkLogin}
                            handleInputUserPass={this.handleInputUserPass}
                            checkPassword={this.checkPassword}
                            handleInputUserCheckPass={this.handleInputUserCheckPass}
                            checkPasswordRe_entry={this.checkPasswordRe_entry}
                            handleInputUserMail={this.handleInputUserMail}
                            checkMail={this.checkMail}
                            totalCheckForm={this.totalCheckForm}
                            openRegForm={openRegForm}
                            enteredUserName={enteredUserName}
                            enteredUserPass={enteredUserPass}
                            enteredUserMail={enteredUserMail}
                            smallLengthName={smallLengthName}
                            userNameIsTaken={userNameIsTaken}
                            errorInPassword={errorInPassword}
                            noLetters={noLetters}
                            noNumbers={noNumbers}
                            smallLengthPass={smallLengthPass}
                            enteredUserCheckPass={enteredUserCheckPass}
                            passwordCorrected={passwordCorrected}
                            passwordVerificationError={passwordVerificationError}
                            validEmail={validEmail}
                            warningChecked={warningChecked}
                            formIsCompleted={formIsCompleted}/>
          <div className={'login-message'}>{this.state.message}</div>
          <div className={'loginForm'}>
            <input type={'text'}
                   placeholder={locale.loginPlaceholder}
                   className={'login'}
                   value={enteredUserName}
                   autoComplete={"username"}
                   onChange={this.handleInputUserName}/>
            <input type={'password'}
                   placeholder={locale.passwordPlaceholder}
                   className={'password'}
                   value={enteredUserPass}
                   autoComplete={"current-password"}
                   onChange={this.handleInputUserPass}/>
            <Button label={locale.loginButtonLabel} onClick={this.userAuthentication}/>
            <Button label={locale.regButtonLabel} onClick={this.registrationForm}/>
            <div className={'restore-password'} onClick={this.forgotForm}>Восстановить пароль</div>
          </div>
          <div className={'start-page_h1__container'}>
            <h1>{locale.bigTitle}</h1>
          </div>
          <p className={'start-page_small-title'}>{locale.smallTitle}</p>
        </div>}
        {authentication &&
        <div className={'authentication-page'}>
          <div className={'authentication-page_content'}>
            <div className={'exit-button-container'}>
              <span className={'login-message'}>{this.state.message}</span>
              <Button label={locale.exitButtonLabel} onClick={this.exit}/>
            </div>
            <div className={'info-city-container'}>
              <InfoCity userNames={userName} userId={userId} admin={admin} cityName={this.props.match.params.cityName}/>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default LoginForm;

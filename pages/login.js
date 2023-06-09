import React, { useEffect } from "react";
import Head from "next/head";
import GlobalLayout from "../layouts/global-layout";
import StartPageLayout from "../layouts/start-page-layout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUserAsync, statusReset } from "../stores/loginSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "../components/loading";

function Login() {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginSlice.value);
  const registerStatus = useSelector((state) => state.loginSlice.status);
  const registerError = useSelector((state) => state.loginSlice.errors);

  const [passwordView, setPasswordView] = useState(false);
  const [registerErrors, setRegisterErrors] = useState([{}]);

  const [loadingAcitve, setLoadingAcitve] = useState(false);

  const [userLogin, setUserLogin] = useState({
    eMail: "",
    password: "",
  });

  async function loginUser() {

    await dispatch(
      loginUserAsync({
        eMail: userLogin.eMail,
        password: userLogin.password,
      })
    );
  }
  



  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginUser();
    }
  };



  useEffect(() => {
    if (registerStatus == "success") {
      const cardLogin = localStorage.getItem("cardUrlLinksId");
      if (!cardLogin) {
        //console.log(registerStatus)
        router.push("/select-profile");

        dispatch(statusReset());
      } else if (cardLogin) {
        router.push("/verification-code");
        dispatch(statusReset());
      }
    } else if (registerStatus == "error") {
      setLoadingAcitve(false);
    }
  }, [registerStatus]);

  

  useEffect(() => {
    if (registerError) {
      setRegisterErrors({
        requiredEmail:
          registerError.errorLogin && registerError.errorLogin.eMail
            ? true
            : false,
        requiredPassword:
          registerError.errorLogin && registerError.errorLogin.password
            ? true
            : false,
        emailFormatError: registerError.err ? true : false,
        loginError: registerError.error ? true : false,
      });
    }
  }, [registerError]);

  function requiredEmailController() {
    setRegisterErrors((prevState) => ({
      ...prevState,
      requiredEmail: userLogin.eMail == "" ? true : false,
    }));
  }

  function requiredPasswordController() {
    setRegisterErrors((prevState) => ({
      ...prevState,
      requiredPassword: userLogin.password == "" ? true : false,
    }));
  }

  function loginChangeErrorController() {
    setRegisterErrors((prevState) => ({
      ...prevState,
      loginError: false,
    }));
  }

  function emailFormatController() {
    const pattern2 =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;

      const pattern= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const result = pattern.test(userLogin.eMail);
    setRegisterErrors((prevState) => ({
      ...prevState,
      emailFormatError: !result ? true : false,
    }));
  }

  return (
    <>
      <Head>
        <title> Create Next App </title>{" "}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <GlobalLayout>
        <StartPageLayout
          imagePath={"/images/hibritcard-white-logo.svg"}
          headerTitle="Giriş Yap"
        >
          {registerStatus == "error" || !loadingAcitve ? "" : <Loading />}{" "}
          <div className="content-input">
            <input
              autocomplete="email"
              name="email"
              onKeyDown={_handleKeyDown}
              className={
                registerErrors.requiredEmail ||
                registerErrors.emailFormatError ||
                registerErrors.loginError
                  ? "error"
                  : ""
              }
              onBlur={() => {
                requiredEmailController();
                emailFormatController();
              }}
              value={userLogin.eMail}
              onChange={(x) => {
                setUserLogin((e) => ({ ...e, eMail: x.target.value }));
                loginChangeErrorController();
              }}
              type="email"
              placeholder="E-posta"
            />{" "}
            {registerErrors.requiredEmail && (
              <div className="error-text"> Lütfen e postanızı giriniz. </div>
            )}{" "}
            {registerErrors.emailFormatError && (
              <div className="error-text">
                {" "}

                Lütfen e postanızı doğru giriniz.{" "}

              </div>
            )}
            <div className="input-password">
              <input
                onKeyDown={_handleKeyDown}
                className={
                  registerErrors.requiredPassword || registerErrors.loginError
                    ? "error"
                    : ""
                }
                onBlur={() => requiredPasswordController()}
                value={userLogin.password}
                onChange={(x) => {
                  setUserLogin((e) => ({ ...e, password: x.target.value }));
                  loginChangeErrorController();
                }}
                type={passwordView ? "text" : "password"}
                placeholder="Şifre"
              />
              <div
                autocomplete="password"
                name="password"
                className="view-password"
                onClick={() => setPasswordView((e) => !e)}
              >
                {" "}
                <img src="icons/Eye-black.svg" />{" "}
              </div>
              
            </div>{" "}

            {registerErrors.requiredPassword && (
              <div className="error-text"> Lütfen şifrenizi giriniz. </div>
            )}

            {registerErrors.loginError && (
              <div className="error-text"> E posta veya şifre hatalı. </div>
            )}

          </div>
          <div className="content-min-link-one">
            {" "}
            <Link href="/forget-password">Şifreni mi unuttun ?</Link>{" "}
          </div>{" "}
          <div className="content-buttons-row">
            <button
              onClick={() => {
                loginUser();
                setLoadingAcitve(true);
              }}
              className="global-button content-buttons-item secondary-button"
            >
              Giriş Yap{" "}
            </button>{" "}
            <div className="content-buttons-space"> </div>{" "}
            {/* <Link href="/register">
                                                                        <a className='global-button content-buttons-item primary-button'>
                                                                            KAYDOL
                                                                        </a>
                                                                    </Link> */}{" "}
          </div>{" "}
          {/* kaydol buttonu burada olacak */}
          <div className="content-input">
            <div className="content-min-link">
              <Link href="/register">Kaydol </Link>{" "}
            </div>
          </div>
          {/*  <div className='content-or'>
                                                                        <span className='content-bar'></span>
                                                                        <div className='content-text'>VEYA</div>
                                                                        <span className='content-bar'></span>
                                                                    </div>
                                                                    <div className='social-login-buttons'>

                                                                        <div className='social-login-button'><i className="fa-brands fa-google-plus-g"></i></div>
                                                                        <div className='social-login-button'><i className="fa-brands fa-facebook-f"></i></div>
                                                                        <div className='social-login-button'><i className="fa-brands fa-apple"></i></div>

                                                    </div>*/}{" "}
        </StartPageLayout>{" "}
      </GlobalLayout>{" "}
    </>
  );
}

export default Login;

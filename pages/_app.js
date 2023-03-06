import GlobalLayout from "../layouts/global-layout";
import "../styles/globals.scss";
import "../styles/particular.css";

import { Provider } from "react-redux";
import store from "../stores/";
import jwtDecode from "jwt-decode"; //jwt time install

import Head from "next/head";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




if (typeof window !== "undefined") {

//redirect url from here

// var currentUrl= window.location.href

// if(currentUrl.includes("#") ){

//   if (currentUrl.indexOf("#") > 0) {

//     var clean_uri = currentUrl.replace(/#/g, '');
    
//      // replace("$","");

//  // window.location.replace(clean_uri);
//  window.location = clean_uri


// }

// }



  const newTokenLocal = localStorage.GZIToken;
  //console.log("datafromthere: ", localStorage.GZIToken)

  if (newTokenLocal) {
    const decodedToken = jwtDecode(newTokenLocal);
    //   console.log("veriler:", decodedToken)

    const TokenTime = decodedToken.exp * 1000;

    const TokenTimeCalculate = new Date(TokenTime).getTime();

    const secondTo = Date.now();

    const secondTimeCalculate = new Date(secondTo).getTime();

    const timeDifference = TokenTimeCalculate - secondTimeCalculate;

    //Dialog will be here

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("GZIToken");

      delete axios.defaults.headers.common["Authorization"];
      window.location.href = "/login";

      //router.push("/login");
    } else {
      // console.log("süre:", decodedToken.exp * 1000)
      // console.log("authenticated is true")
      
    }
  }
} else {
  // console.log("You are on the server");
  // 👉️ can't use localStorage
}

///remove Url and


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale = 1.0,"
        />
        <title> HibritCard-HibritMedya </title>{" "}
      </Head>{" "}
      <GlobalLayout>
        <Provider store={store}>
          <Component {...pageProps} />{" "}
        </Provider>{" "}
        <ToastContainer />
      </GlobalLayout>{" "}
    </>
  );
}

export default MyApp;

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GlobalLayout from "../layouts/global-layout";
import StartPageLayout from "../layouts/start-page-layout";



export default function Home() {

  const router = useRouter();

  useEffect(() => {


    if(router.asPath.startsWith("/#")){



 var currentUrl = router.asPath

  var clean_uri = currentUrl.replace("/#",'');

  
 router.replace("" + clean_uri);

    }else{

      if(router.pathname != "/register" &&
      router.pathname != "/login" &&
      router.pathname != "/forget-password" &&
      router.pathname != "/forget-password-success" &&
      !router.pathname.startsWith("/id")){

        router.push("/select-profile/");

      }
    }


    
  }, []);

  return <> </>;
}

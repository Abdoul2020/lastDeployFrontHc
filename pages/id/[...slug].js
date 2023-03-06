import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ImageLoader from "react-imageloader";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading";
import { clickProfileAsync } from "../../stores/analysisSlice";
import {
  geturlcardRandomAsync,
  getUseridAsync,
} from "../../stores/publicProfileSlice";

import PublicSelectProfile from "../../components/public-profile-select";
import PublicProfilePage from "../../components/public-profile-page";
import WelcomeProfilePage from "../../components/welcomeProfilePage";
import { textAlign } from "@mui/system";

function PublicProfile() {

  const [selectProfileActive, setSelectProfileActive] = useState(false);
  const [profilePageActive, setProfilePageActive] = useState(false);

  const publicProfile = useSelector(
    (state) => state.publicProfileSlice.publicProfile
  );

  const allProfile = useSelector(
    (state) => state.publicProfileSlice.allProfile
  );

  const firsReadCard = useSelector(
    (state) => state.publicProfileSlice.firstRead
  );

  const status = useSelector((state) => state.publicProfileSlice.status);
  const readCardStatus = useSelector((state) => state.userSlice.readCardstatus);

  const [allProfileSort, setAllProfileSort] = useState([]);
  const allPanel = useSelector((state) => state.publicProfileSlice.allPanel);
  const allSocial = useSelector((state) => state.publicProfileSlice.allSocial);

  const [allSocialSelectProfieId, setAllSocialSelectProfieId] = useState([]);
  const [allPanelSelectProfieId, setAllPanelSelectProfieId] = useState([]);

  const [allSocialSort, setAllSocialSort] = useState([]);
  const [allPanelSort, setAllPanelSort] = useState([]);

  const [welcomePage, setwelcomePage] = useState(false);

  const [selectedProfileData, setSelectedProfileData] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const slug = router.query.slug || [];

  useEffect(() => {

    if (readCardStatus === "success") {
      // dispatch(geturlcardRandomAsync(slug[0]));

      setwelcomePage(false);
      setSelectProfileActive(true);
      setProfilePageActive(false);
    }
  }, [readCardStatus]);

  useEffect(() => {


  }, [allSocialSort]);


  //Default Profile ProfileId
  const [defautlProfileId, setdefautlProfileId]= useState("")

  const [checkProfileFirst, setcheckProfileFirst]= useState(false)

  useEffect(() => {

   


   if(allProfileSort && allProfile && slug.length == 1 && allProfile.length > 0 && allProfileSort[0] ){

    if(allProfileSort[0]){
      setSelectedProfileData(allProfile.find((s) => s.profileId === allProfileSort[0].profileId ));
      setdefautlProfileId(allProfileSort[0].profileId);
      setcheckProfileFirst(false)
    }
      

    
      

     

     }else if(allProfileSort && allProfile && slug.length == 2 && allProfile.length > 0 && allProfileSort[0]){


      setcheckProfileFirst(false)

     }
     else{


      setcheckProfileFirst(true)
      

     }

  }, [allProfileSort]);


  //useEffect

  useEffect(() => {

   


    if(slug.length==1 && slug[1]=== undefined && defautlProfileId!=="" ){

     

      setAllSocialSelectProfieId(
        allSocial != undefined 
          ? allSocial.filter((x) => x.profileId == defautlProfileId )
          : []
      );

      setAllPanelSelectProfieId(
        allPanel != undefined
          ? allPanel.filter((x) => x.profileId == defautlProfileId)
          : []
      );
      
    }
  
  }, [defautlProfileId])



  useEffect(() => {
    if (slug[0]) {
      dispatch(geturlcardRandomAsync(slug[0]));

     //dispatch(clickProfileAsync( allProfile[0].profileId))

    }
    if (slug.length == 2) {
      dispatch(clickProfileAsync(slug[1]));
    }

  }, [slug]);



  useEffect(() => {


    localStorage.removeItem("cardUrlLinksId");
    if (publicProfile) {
      if (publicProfile.startDateCount) {

        dispatch(getUseridAsync(publicProfile.generalUserId));

        if (slug.length == 1) {
          
          //  setSelectProfileActive(true);
          //   setProfilePageActive(false);


             setProfilePageActive(true);
              setSelectProfileActive(false);


          
        } else if (slug.length == 2) {

          setSelectProfileActive(false);
          setProfilePageActive(true);
          

        }
      } else {

        localStorage.setItem("cardUrlLinksId", publicProfile.urlRandomId);

        if(publicProfile.startDateCount=="" || publicProfile.startDateCount){

          router.push("/register");
          
        }else{

          setwelcomePage(true);
          setcheckProfileFirst(false);
          

        }

      }
    }

  }, [publicProfile]);


  useEffect(() => {

    if (allProfile && slug.length == 2) {
      setSelectedProfileData(allProfile.find((s) => s.profileId == slug[1]));
      
    }

    setAllProfileSort(
      allProfile != undefined
        ? [...allProfile].sort((a, b) =>
            a.orderOfProfile < b.orderOfProfile ? -1 : 1
          )
        : []
    );

  }, [allProfile]);

  useEffect(() => {

    
    if (
      allSocial !== undefined &&
      allSocial.length > 0 &&
      allSocial[0].statuMode
    ) {

      if(slug[1]){

        setAllSocialSelectProfieId(
          allSocial != undefined 
            ? allSocial.filter((x) => x.profileId == slug[1])
            : []
        );
        
      }

      

    }

  }, [allSocial]);


  useEffect(() => {


    if(slug[1]){

      setAllPanelSelectProfieId(
        allPanel != undefined
          ? allPanel.filter((x) => x.profileId == slug[1])
          : []
      )

    }

   

   


  }, [allPanel]);



  useEffect(() => {

    if (allSocialSelectProfieId) {



      setAllSocialSort(
        [...allSocialSelectProfieId].sort((a, b) =>
          a.socialOrder < b.socialOrder ? -1 : 1
        )
      );

    }
  }, [allSocialSelectProfieId]);

  useEffect(() => {
    if (allPanelSelectProfieId) {
      setAllPanelSort(
        [...allPanelSelectProfieId].sort((a, b) =>
          a.OrderId < b.OrderId ? -1 : 1
        )
      );
    }
  }, [allPanelSelectProfieId]);

  return (
    <>
      {" "}
      {status == "loading" || readCardStatus == "loading" ? <Loading /> : ""}


      {

checkProfileFirst=== true && (

    <div className='popup-global-center'>
<div  className='popup-top'></div>
<div className='popup' style={{
  top:"30%"
}}>

<div  className='close-button'>
</div>

<div style={{

    textAlign:"center",
    color:"red"


}}>
<i class="fa-solid fa-circle-exclamation"></i>


</div>

<div className='header-text'>
 Bilgilendirme
</div>



<div style={{
    paddingLeft:"50px",
    paddingRight:"50px",
   paddingBottom:"20px",
   color: "rgba(0, 0, 0, 0.5)",
   textAlign:"center"

}}>

Gösterilecek Profil Yok.


</div>

</div>

</div>
)

}


      {welcomePage && <WelcomeProfilePage parentUrl={slug[0]} />}
      {selectProfileActive && (
        <PublicSelectProfile
          allProfileSort={allProfileSort}
          parentUrl={slug[0]}
          selectedProfileData={selectedProfileData}
          allSocialSort={allSocialSort}
          allPanelSort={allPanelSort}
        />
      )}
      {profilePageActive && (
        <PublicProfilePage
        allProfileSort={allProfileSort}
          selectedProfileData={selectedProfileData}
          allSocialSort={allSocialSort}
          allPanelSort={allPanelSort}
          parentUrl={slug[0]}
        />
      )}{" "}
    </>
  );
}

export default PublicProfile;

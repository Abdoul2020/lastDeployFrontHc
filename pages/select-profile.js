import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { Grid, Hidden } from "@mui/material";
import Button from "@mui/material/Button";
import ReactCodeInput from "react-verification-code-input";

import userSlice, {
  deleteProfileAsync,
  getUserAsync,
  selectedProfile,
  changeAccountTypeNormalToPremium,
  newProfileAddAsync,
  updateOrderProfileAsync,
  updateDenemeToisDenemeTrue,
  updateDenemeToiPremiumTrue,
  updateDenemeToisStandartTrue,
} from "../stores/userSlice";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import ImageLoader from "react-imageloader";

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

function preloader() {
  return <img className="loader" src="/images/Spin-1s-200px.svg" />;
}

const Handle = SortableHandle(({ tabIndex }) => (
  <div className="profile-handle" tabIndex={tabIndex}>
    {/*} <i class="fa-solid fa-bars"></i>*/}
  </div>
));

const SortableItem = SortableElement((props) => {
  const [selectedEditProfile, setSelectedEditProfile] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);

  const [deleteTagController, setDeleteTagController] = useState({
    value: "",
    error: false,
  });

  const dispatch = useDispatch();
  const { value: item } = props;

  async function profileDelete() {
    // if (deleteTagController.value == selectedEditProfile.profileTag) {

    await dispatch(deleteProfileAsync(selectedEditProfile.profileId));

    await dispatch(getUserAsync());

    setDeletePopup(false);
    setDeleteTagController({ value: "", error: false });

    // }
    // else {
    //     setDeleteTagController(v => ({ ...v, error: true }));
    // }
  }

  const [profileTagEditEditText, setProfileTagEditEditText] = useState("");

  const [profileTagEditInput, setProfileTagEditInput] = useState(false);

  return (
    <>
      {deletePopup ? (
        <div className="popup-global">
          <div
            onClick={() => setDeletePopup(false)}
            className="popup-top"
          ></div>
          <div className="popup">
            <div onClick={() => setDeletePopup(false)} className="close-button">
              <i
                className="fa-solid fa-xmark"
                style={{
                  color: "#D9D9D9",
                }}
              ></i>
            </div>
            <div className="header-text">Profili Sil</div>

            {/* NEW İMPORTED */}

            <div className="panel-inner-content">
              <div
                className="panel-inner-content-info"
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "11px",
                  lineHeight: "13px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Silmek istediğinizden emin misiniz ?
              </div>{" "}
              <div className="yes-no-buttons">
                <div
                  className="global-button yes-button"
                  //onClick={delteContactData}
                  onClick={() => profileDelete()}
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "16px",
                    textAlign: "center",
                    color: "#FFFFFF",
                    backgroundColor: " #D9D9D9",
                  }}
                >
                  Evet{" "}
                </div>
                <div className="yes-no-space "> </div>{" "}
                <div
                  className="global-button no-button"
                  onClick={() => setDeletePopup(false)}
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "16px",
                    textAlign: "center",
                    color: "#FFFFFF",
                    backgroundColor: "#9ed5ff",
                  }}
                >
                  Hayır
                </div>
              </div>{" "}
            </div>

            {/* END OF NEW iMPORTED */}

            {/* <div className='description-text'>
                          Profil silmek istediğinizden Emin misiniz?   */}
            {/* "{selectedEditProfile && <span style={{ color: "red" }}>{selectedEditProfile.profileTag}</span>}" */}

            {/* </div> */}

            {/* <div className='popup-input '>

                            <div className="content-input"><input value={deleteTagController.value} onChange={(e) => setDeleteTagController(v => ({ ...v, value: e.target.value, error: false }))} type="text" placeholder="Porfil Etiketi" /></div>

                        </div> */}

            {/* <div className='description-text'>
                            {deleteTagController.error && <div style={{

                                marginBottom: "20px",
                                color: "red",

                            }}>Lütfen profil etiketini doğru giriniz.</div>}
                        </div> */}

            {/* <div className='popup-button' >
                            <button onClick={() => profileDelete()} className='profile-save-button'>Profili Sil</button>
                        </div> */}
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        style={{
          float: "left",
        }}
      >
        <div className="select-profile-item">
          <div
            className="select-profile-item-in"
            key={item.profileId}
            onClick={() => dispatch(selectedProfile(item.profileId))}
          >
            <div className="select-profile-image">
              <div className="select-profile-item-top"></div>

              <ImageLoader
                src={item.profileUrl}
                wrapper={React.createFactory("div")}
                preloader={preloader}
              >
                Image load failed!
              </ImageLoader>
              <Handle />
            </div>
            <div className="select-profile-text">
              {profileTagEditInput ? (
                <input type="text"></input>
              ) : (
                item.profileTag
              )}
            </div>

            <div className="profile-edit-icons">
              <div
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedEditProfile(item);
                }}
                className="delete-profile"
              >
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

const SortableList = SortableContainer((props) => {
  const { items, ...restProps } = props;
  return (
    <div
      style={{
        flex: "1",
        display: "grid",
        gridTemplateColumns: "33.3% 33.3% 33.3%",
      }}
    >
      {items.map((item, index) => (
        <SortableItem
          key={`item-${item.id}`}
          index={index}
          value={item}
          {...restProps}
        />
      ))}
    </div>
  );
});

function SelectProfile() {
  const [profileEditActive, setProfileEditActive] = useState(false);
  const [newProfileError, setNewProfileError] = useState("");
  const [newProfile, setNewProfile] = useState({
    profileTag: "",
    orderOfProfile: 0,
  });
  const [newProfilePopup, setNewProfilePopup] = useState(false);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.userSlice.status);
  const userData = useSelector((state) => state.userSlice.user);
  const allProfile = useSelector((state) => state.userSlice.profiles);
  const router = useRouter();

  const [profileDataLocal, setProfileDataLocal] = React.useState([]);

  useEffect(() => {
    setProfileDataLocal(
      [...allProfile].sort((a, b) =>
        a.orderOfProfile < b.orderOfProfile ? -1 : 1
      )
    );
    setNewProfile((v) => ({ ...v, orderOfProfile: allProfile.length }));
  }, [allProfile]);

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    setProfileDataLocal(
      arrayMoveImmutable(profileDataLocal, oldIndex, newIndex)
    );
    profileOrderUpdate(
      arrayMoveImmutable(profileDataLocal, oldIndex, newIndex)
    );
  };

  useEffect(() => {}, [userStatus]);

  useEffect(() => {
    if (localStorage.getItem("GZIToken")) {
      dispatch(getUserAsync());
    } else {
      router.push("/login");
    }
  }, [dispatch]);

  async function newProfileAdd() {
    setNewProfileError("");

    if (newProfile.profileTag != "") {
      await dispatch(newProfileAddAsync(newProfile));
      await dispatch(getUserAsync());

      setNewProfile((v) => ({
        ...v,
        profileTag: "",
        orderOfProfile: allProfile.length,
      }));

      setNewProfilePopup(false);
    } else {
      setNewProfileError("Profil etiketi boş olamaz lütfen doldurunuz.");
    }
  }

  function editActiveChange() {
    setProfileEditActive(!profileEditActive);
  }

  function profileOrderUpdate(array) {
    array.map((v, i) => {
      dispatch(updateOrderProfileAsync({ ...v, orderOfProfile: i }));
    });
  }

  //calculate the date between account setup and card pairing

  const [cardNotPermission, setcardNotPermission] = useState(false);
  const [cardtwoWeeksRemain, setcardtwoWeeksRemain] = useState(false);

  const [standartRemainTwoWeeks, setstandartRemainTwoWeeks]= useState(false);
  const [stanadartHediyeBitti, setstanadartHediyeBitti]= useState(false);

  const [accountFirstTwoMonth, setaccountFirstTwoMonth] = useState(false);

  const [accoutTypeNormal, setaccoutTypeNormal] = useState(false);
  const [accountTypePremium, setaccountTypePremium] = useState(false);

  const [normalAccountOneYear, setnormalAccountOneYear] = useState(true);
  const [premiumAccountOneYear, setpremiumAccountOneYear] = useState(true);
  //check kod verification to Premium
  const [code, setCode] = useState([]);

  const [newDateget, setnewDateget] = useState("");

  const [verificationCode, setverificationCode] = useState("");

  // finish date get form here
  function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }
  const startDateFrom =
    userData && userData !== null && userData.startDateCount;

  const transformToDate = new Date(startDateFrom != "" && startDateFrom);

  const newDate = addDays(transformToDate, 60);

  const FinishExactDate = newDate.toLocaleDateString();


  //STandart finish date
  // finish date get form here
  function standartFinishDate(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }

  const premiumHediyeStartDate= userData && userData !== null && userData.accountTypeStartDate;
  const transformToDateStandart = new Date(premiumHediyeStartDate != "" && premiumHediyeStartDate);
  const newDateStandartTofinish = standartFinishDate(transformToDateStandart, 60);

  const FinishExactDateStandart = newDateStandartTofinish.toLocaleDateString();

  





var Difference_In_Days=0;
var Diffrence_In_Days_StartDateCount= 0;
var currentDate = new Date().toJSON();
var date2 = new Date(currentDate);


  useEffect(() => {

    var StartAccoutDate =
      userData && userData !== null && userData.startDateCount;
    var carverificationCode =
      userData && userData !== null && userData.verificationCode
        ? userData.verificationCode
        : "";
    var accountType =
      userData && userData !== null && userData.accountType
        ? userData.accountType
        : "";
   

    console.log("startDate::", StartAccoutDate);
    console.log("cuurentDate::", currentDate);

    var accountTypeStartDate =
      userData && userData !== null ? userData.accountTypeStartDate : "";

      console.log("hjdsfuyoo",  accountTypeStartDate)


if(StartAccoutDate && StartAccoutDate!== null){

  var date1 = new Date(StartAccoutDate);
  

  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();

   Difference_In_Days = Math.round(diffInTime / oneDay);


  console.log("differenceDuasH", Difference_In_Days);

  if (Difference_In_Days >= 60 && carverificationCode === "") {
      
    setcardNotPermission(true);
    // setcardtwoWeeksRemain(true);
  } else if (Difference_In_Days >= 45  && Difference_In_Days <=59 && carverificationCode === "") {

    setcardtwoWeeksRemain(true);

  }


}



if(accountTypeStartDate && accountTypeStartDate!==null){

  var typeStartDate = new Date(accountTypeStartDate);

  const oneDaytWO = 1000 * 60 * 60 * 24;
  const diffInTimetWO = date2.getTime() - typeStartDate.getTime();

   Diffrence_In_Days_StartDateCount = Math.round(diffInTimetWO / oneDaytWO);

  console.log("okwhatary",Diffrence_In_Days_StartDateCount )

  if (Diffrence_In_Days_StartDateCount <= 60) {

    console.log("howmanydays", Diffrence_In_Days_StartDateCount)
    setaccountFirstTwoMonth(true);
    setcardNotPermission(false);
    setcardtwoWeeksRemain(false);
  }

  if(Diffrence_In_Days_StartDateCount >= 45 && Diffrence_In_Days_StartDateCount <=59 ){
    setstandartRemainTwoWeeks(true);
  }

  if(Diffrence_In_Days_StartDateCount >= 60 && accountType === "Normal" ){

    setstandartRemainTwoWeeks(false);
    setstanadartHediyeBitti(true);

  }



  if (Diffrence_In_Days_StartDateCount >= 364 && accountType === "Normal") {

    setnormalAccountOneYear(false);
    setstanadartHediyeBitti(false);
    setstandartRemainTwoWeeks(false);

  }
  if (Diffrence_In_Days_StartDateCount >= 364 && accountType === "Premium") {

    setpremiumAccountOneYear(false);

    dispatch(
      changeAccountTypeNormalToPremium({
        secretKod: userData !== null ? userData.secretKod : "",
        accountType: "Normal",
      })
    );
  }


}

    //   set Normal and Premium account

    if (accountType === "Normal") {
      setaccoutTypeNormal(true);
    } else if (accountType === "Premium") {
      setaccountTypePremium(true);
    }

    if (userData !== null && userData.accountNormalTo) {

      setverificationCode(userData.accountNormalTo);
      
    }


  }, [userData]);

  // start count from here when nromal card remain here

  //gap from center
  //if array is 1
  const [arrayisOne, setarrayisOne] = useState(false);
  const [arrayisTwo, setarrayisTwo] = useState(false);
  const [arrayisThree, setarrayisThree] = useState(false);
  const [arrayisFour, setarrayisFour] = useState(false);
  const [arrayisFive, setarrayisFive] = useState(false);
  const [arrayisSix, setarrayisSix] = useState(false);

  useEffect(() => {
    if (profileDataLocal.length === 1) {
      setarrayisOne(true);
    } else if (profileDataLocal.length === 2) {
      setarrayisTwo(true);
      setarrayisOne(false);
    } else if (profileDataLocal.length === 3) {
      setarrayisThree(true);
      setarrayisTwo(false);
      setarrayisOne(false);
    } else if (profileDataLocal.length === 4) {
      setarrayisFour(true);
      setarrayisThree(false);
      setarrayisTwo(false);
      setarrayisOne(false);
    } else if (profileDataLocal.length === 5) {
      setarrayisFive(true);
      setarrayisFour(false);
      setarrayisThree(false);
      setarrayisTwo(false);
      setarrayisOne(false);
    } else if (profileDataLocal.length === 6) {
      setarrayisSix(true);
      setarrayisFive(false);
      setarrayisFour(false);
      setarrayisThree(false);
      setarrayisTwo(false);
      setarrayisOne(false);
    }

    console.log("whatawe", profileDataLocal);
  }, [profileDataLocal]);

  const [codeVerificationSuccess, setcodeVerificationSuccess] = useState(false);
  const [codeVeririficationFail, setcodeVeririficationFail] = useState(false);

  function recallUserData() {
    dispatch(getUserAsync()).then(() => {
      setcodeVerificationSuccess(false);
      setcodeVeririficationFail(false);
      setkodValueExist(false);
    });
  }

  const NormalToPremiumStatus = useSelector(
    (state) => state.userSlice.accountTypeChangeStatus
  );

  const successNormalToPro=useSelector((state)=> state.userSlice.successUpdateToPro); 


  useEffect(() => {

    if(successNormalToPro !== null && successNormalToPro !== undefined){

      console.log("okkkko", successNormalToPro)

      if(successNormalToPro.Successfully){
        setcodeVerificationSuccess(true);
      }else{
        console.log("okkhu")
        setcodeVeririficationFail(true);
      }
    }
  
  }, [successNormalToPro])


  function verification() {
    let codeValue = "";
    for (let i = 0; i < code.length; i++) {
      codeValue += code[i];
    }

    if (codeValue + "P" === verificationCode) {
      //her will be Kontrol from here
      dispatch(
        changeAccountTypeNormalToPremium({
          secretKod: userData.secretKod,
          accountType: "Premium",
        })
      );

      //dispatch will be here
    }

    //setverificationCode
    // const data = {
    ///secretKod: localStorage.getItem("cardUrlLinksId"),
    //   verificationCode: codeValue

    // }
    //dispatch(loginWithCardUrlAsync(data));
  }

  const [kontrolcheckFromFirstRegis, setkontrolcheckFromFirstRegis] =
    useState(false);

  const [kontrolCheckFirstStandart, setkontrolCheckFirstStandart] =
    useState(false);

  const [checkRight, setcheckRight] = useState(false);

  const [bankPopup, setbankPopup] = useState(false);
  const [laterCreditCard, setlaterCreditCard] = useState(false);

  const [bankInfoPopup, setbankInfoPopup] = useState(false);
  const [kodValueExist, setkodValueExist] = useState(false);

  //First load Premium Page
  const [firstLoadPremiumPopup, setfirstLoadPremiumPopup] = useState(false);

  //deneme bu
  function updateDenemeTrue() {
    dispatch(updateDenemeToisDenemeTrue());
  }

  //standart bu here
  function upateStandartTrue() {
    dispatch(updateDenemeToisStandartTrue());
  }

  //premium bu heer
  function upatePremiumTrue() {
    dispatch(updateDenemeToiPremiumTrue());
  }

  return (
    <>
      {userStatus == "loading" ? <Loading /> : ""}

      {checkRight === true ? (
        <div className="popup-global" style={{zIndex:"9999"}}>
          <div
            onClick={() => setcheckRight(!checkRight)}
            className="popup-top"
          ></div>
          <div className="popup">
            <div
              onClick={() => setcheckRight(!checkRight)}
              className="close-button"
            >
              <i
                className="fa-solid fa-xmark"
                style={{
                  color: "#D9D9D9",
                }}
              ></i>
            </div>
            <div className="header-text">Premium Hesap</div>

            {/* new imported div */}

            <div className="panel-inner-content">
              <div
                className="panel-inner-content-info"
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "11px",
                  lineHeight: "13px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <Grid container>
                  <Grid xs={12} sm={12} md={12} lg={12} style={{}}>
                    <div
                      onClick={() => {
                        setbankPopup(true);
                        setcheckRight(false);
                      }}
                    >
                      <div>
                        <img
                          style={{
                            maxWidth: "60px",
                            borderRadius: "100%",
                            objectFit: "cover",
                            padding: "0px",
                            margin: "0px",
                          }}
                          src="/images/hibritcard-vip-icon.png"
                          alt="Premium-Icon"
                        />
                      </div>

                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        Standart Hesaba Ek
                      </div>

                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        Yıllık / 50 TL
                      </div>

                      <Button
                        style={{
                          backgroundColor: "#8b8dff",
                          marginTop: "10px",
                          color: "#FFF",
                        }}
                      >
                        Premium'a Geç
                      </Button>
                    </div>
                  </Grid>

                  <Grid
                    style={{
                      textAlign: "center",
                      width: "100%",
                      margin: "20px",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "12px",
                      textDecorationLine: "underline",
                      color: " #9ED5FF",
                      // color:"rgb(139, 141, 255)"
                    }}
                    onClick={() => {
                      setkodValueExist(true);
                      setcheckRight(false);
                    }}
                  >
                    Zaten Lisans Kodum var
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {bankPopup === true ? (
        <div className="popup-global">
          <div
            onClick={() => setbankPopup(!bankPopup)}
            className="popup-top"
          ></div>
          <div className="popup">
            <div
              onClick={() => setbankPopup(!bankPopup)}
              className="close-button"
            >
              <i
                className="fa-solid fa-xmark"
                style={{
                  color: "#D9D9D9",
                }}
              ></i>
            </div>
            <div className="header-text"> Hesap Yükselt</div>

            <span style={{ fontSize: "14px", textAlign: "center" }}>
              {" "}
              Ödeme türünü aşağıdan seçebilirsiniz
            </span>

            {/* new imported div */}

            <div className="panel-inner-content">
              <div
                className="panel-inner-content-info"
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "11px",
                  lineHeight: "13px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <Grid container>
                  <Grid xs={12} sm={12} md={12} lg={12} style={{}}>
                    <div
                      style={{
                        padding: "20px",
                      }}
                    >
                      <Grid container>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                          <Grid
                            container
                            style={{
                              justifyContent: "space-between",
                            }}
                          >
                            <Grid
                              item
                              xs={5}
                              sm={5}
                              md={5}
                              lg={5}
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                                borderRadius: "14px",
                                padding: "20px",
                              }}
                              onClick={() => {
                                setbankInfoPopup(true);
                                setbankPopup(false);
                              }}
                            >
                              <Grid
                                style={{
                                  fontFamily: "Montserrat",
                                  fontStyle: "normal",
                                  fontWeight: "700",
                                  fontSize: "11px",
                                  lineHeight: "13px",
                                  color: "rgba(0, 0, 0, 0.5)",
                                }}
                              >
                                Havale/EFT
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              xs={5}
                              sm={5}
                              md={5}
                              lg={5}
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                                borderRadius: "14px",
                                padding: "20px",
                              }}
                              onClick={() => setlaterCreditCard(true)}
                            >
                              <Grid
                                style={{
                                  fontFamily: "Montserrat",
                                  fontStyle: "normal",
                                  fontWeight: "700",
                                  fontSize: "11px",
                                  lineHeight: "13px",
                                  color: "rgba(0, 0, 0, 0.5)",
                                }}
                              >
                                Kredi Kartı
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* <img  style={{
                                            maxWidth:"150px"
                                         }}
                                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ziraat_Bankas%C4%B1_logo.svg/2560px-Ziraat_Bankas%C4%B1_logo.svg.png" alt="" /> */}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {bankInfoPopup === true ? (
        <div className="popup-global">
          <div
            onClick={() => setbankInfoPopup(!bankInfoPopup)}
            className="popup-top"
          ></div>
          <div className="popup">
            <div
              onClick={() => {
                setbankInfoPopup(!bankInfoPopup);
                setbankInfoPopup(!bankInfoPopup);
              }}
              className="close-button"
            >
              <i
                className="fa-solid fa-xmark"
                style={{
                  color: "#D9D9D9",
                }}
              ></i>
            </div>
            <div className="header-text">Ziraat Bankası</div>

            {/* new imported div */}

            <div className="panel-inner-content">
              <div
                className="panel-inner-content-info"
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "11px",
                  lineHeight: "13px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <Grid container>
                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{
                      margin: "10px",
                      padding: "10px 20px",
                    }}
                  >
                    Havale/EFT işlemleriniz için Hibrit Card hesap bilgilerine
                    aşağıdan ulaşabilirsiniz.
                  </Grid>

                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{
                      margin: "20px",
                    }}
                  >
                    <Grid container>
                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <div
                          style={{
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Hesap Aktivasyon Süresi
                          </div>

                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Bir Saat
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <div
                          style={{
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Hesap Tipi
                          </div>

                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Türk Lırası
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <div
                          style={{
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            IBAN
                          </div>

                          <div
                            style={{
                              display: "flex",
                            }}
                            onClick={() =>
                              copy("TR 5400 0100 2101 9748 8785 5006", {
                                debug: true,
                                message: "iban Kopyalandı.",
                              })
                            }
                          >
                            <div
                              style={{
                                fontFamily: "Montserrat",
                                fontStyle: "normal",
                                fontWeight: "700",
                                fontSize: "11px",
                                lineHeight: "13px",
                                color: "#8b8dff",
                              }}
                            >
                              TR 5400 0100 2101 9748 8785 5006
                            </div>

                            <div
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <i
                                class="far fa-copy"
                                style={{
                                  color: "#8b8dff",
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <div
                          style={{
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Alıcı
                          </div>

                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Hibritart Medya Reklam A.Ş
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <div
                          style={{
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "11px",
                              lineHeight: "13px",
                            }}
                          >
                            Açıklama Kodu
                          </div>

                          <div
                            style={{
                              display: "flex",
                            }}
                            onClick={() =>
                              copy(userData !== null ? userData.eMail : "", {
                                debug: true,
                                message: "iban Kopyalandı.",
                              })
                            }
                          >
                            <div
                              style={{
                                fontFamily: "Montserrat",
                                fontStyle: "normal",
                                fontWeight: "700",
                                fontSize: "11px",
                                lineHeight: "13px",
                                color: "#8b8dff",
                              }}
                            >
                              {userData !== null ? userData.eMail : ""}
                            </div>

                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {/* <i class="fa-light fa-copy"></i> */}
                              {/* <i class="fa-brands fa-copy"></i> */}

                              {/* <i class="fas fa-copy"></i> */}
                              <i
                                class="far fa-copy"
                                style={{
                                  color: "#8b8dff",
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <div
                          style={{
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            style={{
                              padding: "20px",
                              backgroundColor: "#C2e5ff",
                              borderRadius: "14px",
                              lineHeight: "1.5",
                            }}
                          >
                            Ödeme işlemin başarıyla tamamlanabilmesi için
                            kırmızı ile yazılmış
                            <br />"
                            <span style={{ color: "red" }}>
                              <strong>
                                {userData !== null ? userData.eMail : ""}
                              </strong>
                            </span>
                            " <br /> mail adresini, banka uygulamanızın ödeme
                            ekranındaki Açıklama bölümüne kopyalayınız.
                            {/* Yukarıda yer Alan "Açıklama" Kodunu para transfer açıklaması olarak yazmanız gerekiyor. */}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {laterCreditCard === true && (
        <div className="popup-global-center">
          <div className="popup-top"></div>
          <div className="popup">
            {/* <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='close-button'>
    <i className="fa-solid fa-xmark"></i>
</div> */}

            <div
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              <i class="fa-solid fa-circle-exclamation"></i>
            </div>

            <div className="header-text">Bilgilendirme</div>

            <div
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                paddingBottom: "20px",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              Kredi Card ödeme sistemi yakında aktive edilecektir.
            </div>

            <div
              className="popup-button"
              onClick={() => {
                setlaterCreditCard(false);
              }}
            >
              <button className="profile-save-buttonn">Tamam</button>
            </div>


          </div>
        </div>
      )}

      {kodValueExist && (
        <div className="popup-global" style={{zIndex:"9999"}}>
          <div className="popup-top"></div>

          <div className="popup">
            {codeVerificationSuccess === false &&
              codeVeririficationFail === false && (
                <div>
                  <div
                    className="close-button"
                    onClick={() => {
                      setkodValueExist(false);
                    }}
                  >
                    <i
                      className="fa-solid fa-xmark"
                      style={{
                        color: "#D9D9D9",
                      }}
                    ></i>
                  </div>

                  <div className="header-text">
                    Lütfen 6 haneli Lisans kodu giriniz.
                  </div>

                  <div className="sms-code-area">
                    <ReactCodeInput
                      onChange={(e) => setCode(e)}
                      onComplete={() => {
                        verification();
                      }}
                      values={code}
                      type="text"
                      className="box"
                      autoFocus={true}
                      fieldWidth="35px"
                      fieldHeight="50px"
                    />
                  </div>

                  {/* {verificationCodeError && <div className='error-text'>Girdiğiniz kod hatalı tekrar giriniz.</div>}

{verificationCodeSuccess && <div className='success-text'>Kartınız ile profiliniz başarılı bir şekilde eşleştirildi.</div>} */}

                  {/* onClick={() => verification()} */}

                  <div className="content-buttons-row profile-save-buttonn">
                    <div
                      className="global-button content-buttons-item primary-button"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "0px",
                        padding: "5px",
                      }}
                      onClick={() => verification()}
                    >
                      Doğrula
                    </div>
                  </div>
                </div>
              )}

            {codeVerificationSuccess && (
              <div className="sms-code-area">
                <div className="close-button" onClick={() => recallUserData()}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{
                      color: "#D9D9D9",
                    }}
                  ></i>
                </div>
                <div>
                  <img
                    src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png"
                    alt=""
                    style={{ maxWidth: "80px" }}
                  />
                </div>
              </div>
            )}

            {codeVeririficationFail && (
              <div className="sms-code-area">
                <div className="close-button" onClick={() => recallUserData()}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{
                      color: "#D9D9D9",
                    }}
                  ></i>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4436/4436559.png"
                    alt=""
                    style={{ maxWidth: "40px" }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <span>Hatalı Aktivasyon Kodu</span>
                  </div>{" "}
                  <br />
                  <div
                    className="content-buttons-row profile-save-buttonn"
                    style={{
                      padding: "0px",
                      borderRadius: "0px",
                      margin: "0px",
                    }}
                  >
                    <div
                      className="global-button content-buttons-item primary-button"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "0px",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{ justifyContent: "space-around" }}
                        onClick={() => {
                          setcodeVerificationSuccess(false);
                          setcodeVeririficationFail(false);
                        }}
                      >
                        <span>Tekrar Dene</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {

        stanadartHediyeBitti===true && (

          <div className="popup-global-center">
          <div className="popup-top"></div>
          <div className="popup">
            {/* <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='close-button'>
        <i className="fa-solid fa-xmark"></i>
        </div> */}

            <div
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              <i class="fa-solid fa-circle-exclamation"></i>
            </div>

            <div className="header-text">Bilgilendirme</div>

            <div
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "20px",
                color: "rgba(0, 0, 0, 0.5)",
                textAlign: "center",
              }}
            >
              <strong>
               Premium  Hediye Süresi dolmuştur. <br />
            
              </strong>
              <br />
              8 ay boyunca 1 profil Kullanabilirsiniz <br />
              <br /> <br />
              <span
                style={{
                  width: "100%",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "12px",
                }}
              >
                Premium hesap ile 6 adete kadar Profil oluşturabilir ve
                gelişmiş arayüz özelliklerini deneyimleyebilisiniz. <br />
                Premium Hesap avantajlarından faydalanmak için şimdi satın
                alabilirsiniz.
              </span>
              <br />
              <br />
              <span
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "20px",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "12px",
                  textDecorationLine: "underline",
                  color: " #9ED5FF",
                  // color:"rgb(139, 141, 255)",
                }}
                onClick={() => {
                  setcheckRight(true);
                  setstanadartHediyeBitti(false);
                }}
              >
                Yükselt
              </span>
            </div>

            {/* <div className='popup-input '>
        <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
        </div> */}
            {/* <div className='error-text' >
        {newProfileError}
        </div> */}

            <div
              className="popup-button"
              onClick={() => {
                setstanadartHediyeBitti(false);
              }}
            >

              <button
                className="profile-save-buttonn"
              >
                Tamam
              </button>


            </div>
          </div>
        </div>


        )


      }

      {userData &&
        userData !== null &&
        userData.isStanadrtTrue === undefined &&
        accoutTypeNormal === true &&
        kontrolCheckFirstStandart === false && (
          <div className="popup-global-center">
            <div className="popup-top"></div>
            <div className="popup">
              {/* <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='close-button'>
          <i className="fa-solid fa-xmark"></i>
          </div> */}

              <div
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                <i class="fa-solid fa-circle-exclamation"></i>
              </div>

              <div className="header-text">Bilgilendirme</div>

              <div
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingBottom: "20px",
                  color: "rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                }}
              >
                <strong>
                  Standart hesabınız aktive edilmiştir. <br />
                  Güzel günlerde kullanmanızı dileriz. <br />
                </strong>
                <br />
                2 ay süre ile Premium Hesap <br /> Hibrit Card'dan Hediye
                <br /> <br />
                <span
                  style={{
                    width: "100%",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "12px",
                  }}
                >
                  Premium hesap ile 6 adete kadar Profil oluşturabilir ve
                  gelişmiş arayüz özelliklerini deneyimleyebilisiniz. <br />
                  Premium Hesap avantajlarından faydalanmak için şimdi satın
                  alabilirsiniz.
                </span>
                <br />
                <br />
                {/* <span
                  style={{
                    textAlign: "center",
                    width: "100%",
                    margin: "20px",
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "12px",
                    textDecorationLine: "underline",
                    color: " #9ED5FF",
                    // color:"rgb(139, 141, 255)",
                  }}
                  onClick={() => {
                    setcheckRight(true);
                    setkontrolCheckFirstStandart(true);
                  }}
                >
                  Yükselt
                </span> */}
              </div>

              {/* <div className='popup-input '>
          <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
          </div> */}
              {/* <div className='error-text' >
          {newProfileError}
          </div> */}

              <div
                className="popup-button"
                onClick={() => {
                  setkontrolcheckFromFirstRegis(true);
                }}
              >
                <button
                  className="profile-save-buttonn"
                  onClick={(e) => {
                    e.preventDefault();
                    setkontrolCheckFirstStandart(true);
                    upateStandartTrue();
                  }}
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        )}

      {userData &&
        userData !== null &&
        userData.isPremiumTrue === undefined &&
        accountTypePremium === true &&
        firstLoadPremiumPopup === false && (
          <div className="popup-global-center">
            <div className="popup-top"></div>
            <div className="popup">
              {/* <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='close-button'>
<i className="fa-solid fa-xmark"></i>
</div> */}

              <div
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                <i class="fa-solid fa-circle-exclamation"></i>
              </div>

              <div className="header-text">Bilgilendirme</div>

              <div
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingBottom: "20px",
                  color: "rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                }}
              >
                <strong>
                  Premium hesabınız aktive edilmiştir. <br />
                  Güzel günlerde kullanmanızı dileriz. <br />
                </strong>

                <br />

                <span
                  style={{
                    width: "100%",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "12px",
                  }}
                >
                  Premium hesap ile 6 adete kadar Profil oluşturabilir ve
                  gelişmiş arayüz özelliklerini deneyimleyebilisiniz. <br />
                </span>

                <br />
                <br />
              </div>

              {/* <div className='popup-input '>
<div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
</div> */}
              {/* <div className='error-text' >
{newProfileError}
</div> */}

              <div
                className="popup-button"
                onClick={() => {
                  setkontrolcheckFromFirstRegis(true);
                }}
              >
                <button
                  className="profile-save-buttonn"
                  onClick={(e) => {
                    e.preventDefault();
                    setfirstLoadPremiumPopup(true);
                    upatePremiumTrue();
                  }}
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        )}

      {userData &&
        userData !== null &&
        userData.isDenemeTrue === undefined &&
        accountTypePremium === false &&
        accoutTypeNormal === false &&
        kontrolcheckFromFirstRegis === false && (
          <div className="popup-global-center">
            <div className="popup-top"></div>
            <div className="popup">
              {/* <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='close-button'>
          <i className="fa-solid fa-xmark"></i>
          </div> */}

              <div
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                <i class="fa-solid fa-circle-exclamation"></i>
              </div>

              <div className="header-text">Bilgilendirme</div>

              <div
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingBottom: "20px",
                  color: "rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                }}
              >
                <strong>
                  Deneme hesabınız aktive edilmiştir. <br />
                  Güzel günlerde kullanmanızı dileriz. <br />
                </strong>
                <br />
                Hibrit Card tarafından hediye edilen Deneme hesabınızı 2 ay süre
                ile kullanabilirsiniz.
                <br /> <br />
                <span
                  style={{
                    width: "100%",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "12px",
                  }}
                >
                  Deneme Hesabınızda sadece 1 adet Profil aktive edebilirsiniz.
                  Standart veya Premium Hesap avantajlarından faydalanmak için
                  şimdi satın alabilirsiniz.
                </span>
                <br />
                <br />

                <Link  href={`/view/${
                    profileDataLocal.length > 0
                      ? profileDataLocal[0].profileId
                      : ""
                  }`}>


                  <span
                    style={{
                      textAlign: "center",
                      width: "100%",
                      margin: "20px",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "12px",
                      textDecorationLine: "underline",
                      color: " #9ED5FF",
                      // color:"rgb(139, 141, 255)",
                    }}

                    onClick={() => dispatch(selectedProfile(profileDataLocal.length > 0
                      && profileDataLocal[0].profileId))}
                  >
                    Şimdi Satın Al
                  </span>
                
                
                </Link>



                
              </div>

              {/* <div className='popup-input '>
          <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
          </div> */}
              {/* <div className='error-text' >
          {newProfileError}
          </div> */}

              <div
                className="popup-button"
                onClick={() => {
                  setkontrolcheckFromFirstRegis(true);
                  updateDenemeTrue();
                }}
              >
                <button
                  className="profile-save-buttonn"
                  onClick={(e) => {
                    e.preventDefault();
                    setkontrolcheckFromFirstRegis(true);
                  }}
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        )}

      {newProfilePopup ? (
        <div className="popup-global">
          <div
            onClick={() => {
              setNewProfilePopup(false);
              setNewProfileError();
            }}
            className="popup-top"
          ></div>

          <div className="popup">
            <div
              onClick={() => {
                setNewProfilePopup(false);
                setNewProfileError();
              }}
              className="close-button"
            >
              <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="header-text">Yeni Profile Ekle</div>

            <div className="popup-input ">
              <div className="content-input">
                <input
                  value={newProfile.profileTag}
                  onChange={(e) =>
                    setNewProfile((v) => ({ ...v, profileTag: e.target.value }))
                  }
                  type="text"
                  placeholder="Porfil Etiketi"
                />
              </div>
            </div>
            <div className="error-text">{newProfileError}</div>

            <div className="popup-button" onClick={() => newProfileAdd()}>
              <button className="profile-save-buttonn">Profil Ekle</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="gradient-bg select-profile">
        <div className="select-profile-header">
          <div className="select-profile-left"></div>
          <div className="select-profile-center ">
            <img src="images/hibritcard-white-logo.svg" />
          </div>

          <div className="select-profile-right">
            <div
              className="select-profile-edit-icon"
              onClick={() => editActiveChange()}
            >
              {
                !profileEditActive ? (
                  <img src="icons/Edit_circle-White.svg" />
                ) : (
                  /*<div onClick={() => profileOrderUpdate()}> */ <img src="icons/folder_check.svg" />
                ) /*</div>*/
              }
            </div>

            <Link href="/user-settings">
              <a>
                <img src="icons/Setting-white.svg" />
              </a>
            </Link>
          </div>
        </div>

        <div className="select-profile-content">
          <div className="select-profile-title">Profil Seç</div>

          <div className="select-profile-items">
            {profileEditActive && (
              <SortableList
                shouldUseDragHandle={true}
                useDragHandle
                axis="xy"
                items={profileDataLocal}
                onSortEnd={onSortEnd}
              />
            )}
          </div>


          {

normalAccountOneYear===false && (

  <div className="popup-global-center">
              <div
                onClick={() => {
                  setNewProfilePopup(false);
                  setNewProfileError();
                }}
                className="popup-top"
              ></div>
              <div className="popup">
                {/* <div
                  onClick={() => {
                    setcardNotPermission(false);
                  }}
                  className="close-button"
                >
                  <i className="fa-solid fa-xmark"></i>
                </div> */}

                <div className="header-text">
                  {" "}
                  Hibrit Card'ı kullandığınız için Teşekkür ederiz! <br /> <br />
                  Standart 1 Yıl süreniz dolmuştur. <br /> <br />
                  Kullanmaya devam etmek için lütfen hesabınızı yükseltin.
                </div>

                <div
                  className="popup-button"
                >
                 
                    <a
                      style={{
                        textDecoration: "none",

                        width: "100%",
                        display: "flex",
                        justifyContent: "stretch",
                        alignItems: "center",
                      }}
                    >
                      <button className="profile-save-buttonn" onClick={()=> setcheckRight(true)}> Yükselt</button>
                    </a>
              
                </div>
              </div>
            </div>
)


          }

          {cardNotPermission === true && (
            <div className="popup-global-center">
              <div
                onClick={() => {
                  setNewProfilePopup(false);
                  setNewProfileError();
                }}
                className="popup-top"
              ></div>
              <div className="popup">
                {/* <div
                  onClick={() => {
                    setcardNotPermission(false);
                  }}
                  className="close-button"
                >
                  <i className="fa-solid fa-xmark"></i>
                </div> */}

                <div className="header-text">
                  {" "}
                  Hibrit Card'ı denediğiniz için Teşekkür ederiz! <br /> <br />
                  Deneme süreniz dolmuştur. <br /> <br />
                  Kullanmaya devam etmek için lütfen hesabınızı yükseltin.
                </div>

                {/* <div className='popup-input '>
                            <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
                        </div> */}
                {/* <div className='error-text' >
                            {newProfileError}
                        </div> */}

                <div
                  className="popup-button"
                  onClick={() =>
                    dispatch(selectedProfile(profileDataLocal[0].profileId))
                  }
                >
                  <Link
                    href={`/view/${
                      profileDataLocal.length > 0
                        ? profileDataLocal[0].profileId
                        : ""
                    }`}
                  >
                    <a
                      style={{
                        textDecoration: "none",

                        width: "100%",
                        display: "flex",
                        justifyContent: "stretch",
                        alignItems: "center",
                      }}
                    >
                      <button className="profile-save-buttonn"> Yükselt</button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* standart remain two weeks from here */}





          {

standartRemainTwoWeeks===true && (

  <div className="popup-global-center">
  <div
    onClick={() => {
      setstandartRemainTwoWeeks(false);
    }}
    className="popup-top"
  ></div>
  <div className="popup">
    {/* <div
      onClick={() => {
        setstandartRemainTwoWeeks(false);
      }}
      className="close-button"
    >
      <i className="fa-solid fa-xmark"></i>
    </div> */}

    <div className="header-text">
      {" "}
      Hibrit Card'ı Kullandığınız için Teşekkür ederiz! <br /> <br />
      Premium Hediye süreniz &nbsp;
      <strong>{FinishExactDateStandart}</strong>
      &nbsp; tarihinde dolacaktır. <br /> <br />
      Kullanmaya devam etmek için lütfen hesabınızı yükseltin.
    </div>

    {/* <div className='popup-input '>
                <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
            </div> */}
    {/* <div className='error-text' >
                {newProfileError}
            </div> */}

    <div
      className="popup-button"
    >



<div
              className="popup-button"
              onClick={() => {
                setstandartRemainTwoWeeks(false);
              }} 
              style={{width:"100%"}}
            >
              <button className="profile-save-buttonn">Tamam</button>
            </div>

    </div>

   




  </div>
</div>
)
}

          {cardtwoWeeksRemain === true && (
            <div className="popup-global-center">
              <div
                onClick={() => {
                  setNewProfilePopup(false);
                  setNewProfileError();
                }}
                className="popup-top"
              ></div>
              <div className="popup">
                <div
                  onClick={() => {
                    setcardtwoWeeksRemain(false);
                  }}
                  className="close-button"
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>

                <div className="header-text">
                  {" "}
                  Hibrit Card'ı denediğiniz için Teşekkür ederiz! <br /> <br />
                  Deneme süreniz &nbsp;
                  <strong>{FinishExactDate}</strong>
                  &nbsp; tarihinde dolacaktır. <br /> <br />
                  Kullanmaya devam etmek için lütfen hesabınızı yükseltin.
                </div>

                {/* <div className='popup-input '>
                            <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
                        </div> */}
                {/* <div className='error-text' >
                            {newProfileError}
                        </div> */}

                <div
                  className="popup-button"
                  onClick={() =>
                    dispatch(selectedProfile(profileDataLocal[0].profileId))
                  }
                >
                  <Link
                    href={`/view/${
                      profileDataLocal.length > 0
                        ? profileDataLocal[0].profileId
                        : ""
                    }`}
                  >
                    <a
                      style={{
                        textDecoration: "none",

                        width: "100%",
                        display: "flex",
                        justifyContent: "stretch",
                        alignItems: "center",
                      }}
                    >
                      <button className="profile-save-buttonn"> Yükselt</button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!profileEditActive &&
            normalAccountOneYear === true &&
            premiumAccountOneYear === true &&
            (arrayisOne === true ? (
              <div
                className="select-profile-items select-profile-items-noedit"
                style={{
                  alignContent: "center",
                  justifyContent: "center ",
                  gap: "20px",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "none",
                }}
              >
                {accountFirstTwoMonth === false ? (
                  <div
                    onClick={() =>
                      dispatch(selectedProfile(profileDataLocal[0].profileId))
                    }
                  >
                    <Link
                      href={`/view/${
                        profileDataLocal.length > 0
                          ? profileDataLocal[0].profileId
                          : ""
                      }`}
                    >
                      <a className="select-profile-item">
                        <div className="select-profile-item-in">
                          <div className="select-profile-image-noedit">
                            <div className="select-profile-item-top"></div>

                            <ImageLoader
                              src={
                                profileDataLocal.length > 0
                                  ? profileDataLocal[0].profileUrl
                                  : ""
                              }
                              wrapper={React.createFactory("div")}
                              preloader={preloader}
                            >
                              Image load failed!
                            </ImageLoader>
                          </div>
                          <div className="select-profile-text">
                            {profileDataLocal.length > 0
                              ? profileDataLocal[0].profileTag
                              : ""}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  profileDataLocal.map((v) => (
                    <div
                      key={v.profileId}
                      onClick={() => dispatch(selectedProfile(v.profileId))}
                    >
                      <Link href={`/view/${v.profileId}`}>
                        <a className="select-profile-item">
                          <div className="select-profile-item-in">
                            <div className="select-profile-image-noedit">
                              <div className="select-profile-item-top"></div>

                              <ImageLoader
                                src={v.profileUrl}
                                wrapper={React.createFactory("div")}
                                preloader={preloader}
                              >
                                Image load failed!
                              </ImageLoader>
                            </div>
                            <div className="select-profile-text">
                              {v.profileTag}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))
                )}

                {/*    <Link href="/panel">
                              <a className='select-profile-item'>
  
                                  <div className='select-profile-image'>
                                      <div className='select-profile-item-top'></div>
                                      <img src='images/profile-example.png' />
                                  </div>
                                  <div className='select-profile-text'>
                                      aysylmz
                                  </div>
                              </a>
                          </Link>
                          <div className='select-profile-item'>
  
                              <div className='select-profile-image'>
                                  <div className='select-profile-item-top'></div>
                                  <img src='images/profile-example.png' />
                              </div>
                              <div className='select-profile-text'>
                                  aysylmz
                              </div>
                          </div>*/}

                {/* {allProfile.length < 6  && 
                              
                              <div onClick={() => setNewProfilePopup(true)} className='select-profile-item-new'>
                                  <div className='select-profile-add'>
                                      <i className="fa-solid fa-plus"></i>
                                  </div>
                                  <div className='select-profile-text'>
                                      Profil ekle
                                  </div>
                              </div>

                              } */}

                {accoutTypeNormal === true &&
                accountFirstTwoMonth === true &&
                allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : accountTypePremium === true && allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : arrayisTwo === true ? (
              <div className="select-profile-items select-profile-items-noedit">
                {accountFirstTwoMonth === false ? (
                  <div
                    onClick={() =>
                      dispatch(selectedProfile(profileDataLocal[0].profileId))
                    }
                  >
                    <Link
                      href={`/view/${
                        profileDataLocal.length > 0
                          ? profileDataLocal[0].profileId
                          : ""
                      }`}
                    >
                      <a className="select-profile-item">
                        <div className="select-profile-item-in">
                          <div className="select-profile-image-noedit">
                            <div className="select-profile-item-top"></div>

                            <ImageLoader
                              src={
                                profileDataLocal.length > 0
                                  ? profileDataLocal[0].profileUrl
                                  : ""
                              }
                              wrapper={React.createFactory("div")}
                              preloader={preloader}
                            >
                              Image load failed!
                            </ImageLoader>
                          </div>
                          <div className="select-profile-text">
                            {profileDataLocal.length > 0
                              ? profileDataLocal[0].profileTag
                              : ""}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  profileDataLocal.map((v) => (
                    <div
                      key={v.profileId}
                      onClick={() => dispatch(selectedProfile(v.profileId))}
                    >
                      <Link href={`/view/${v.profileId}`}>
                        <a className="select-profile-item">
                          <div className="select-profile-item-in">
                            <div className="select-profile-image-noedit">
                              <div className="select-profile-item-top"></div>

                              <ImageLoader
                                src={v.profileUrl}
                                wrapper={React.createFactory("div")}
                                preloader={preloader}
                              >
                                Image load failed!
                              </ImageLoader>
                            </div>
                            <div className="select-profile-text">
                              {v.profileTag}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))
                )}

                

                {accoutTypeNormal === true &&
                accountFirstTwoMonth === true &&
                allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : accountTypePremium === true && allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : arrayisThree === true ? (
              <div className="select-profile-items select-profile-items-noedit">
                {accountFirstTwoMonth === false ? (
                  <div
                    onClick={() =>
                      dispatch(selectedProfile(profileDataLocal[0].profileId))
                    }
                  >
                    <Link
                      href={`/view/${
                        profileDataLocal.length > 0
                          ? profileDataLocal[0].profileId
                          : ""
                      }`}
                    >
                      <a className="select-profile-item">
                        <div className="select-profile-item-in">
                          <div className="select-profile-image-noedit">
                            <div className="select-profile-item-top"></div>

                            <ImageLoader
                              src={
                                profileDataLocal.length > 0
                                  ? profileDataLocal[0].profileUrl
                                  : ""
                              }
                              wrapper={React.createFactory("div")}
                              preloader={preloader}
                            >
                              Image load failed!
                            </ImageLoader>
                          </div>
                          <div className="select-profile-text">
                            {profileDataLocal.length > 0
                              ? profileDataLocal[0].profileTag
                              : ""}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  profileDataLocal.map((v, i, row) => (
                    <div
                      key={v.profileId}
                      onClick={() => dispatch(selectedProfile(v.profileId))}
                    >
                      <Link href={`/view/${v.profileId}`}>
                        <a className="select-profile-item">
                          <div className="select-profile-item-in">
                            <div className="select-profile-image-noedit">
                              <div className="select-profile-item-top"></div>

                              <ImageLoader
                                src={v.profileUrl}
                                wrapper={React.createFactory("div")}
                                preloader={preloader}
                              >
                                Image load failed!
                              </ImageLoader>
                            </div>
                            <div className="select-profile-text">
                              {v.profileTag}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))
                )}

                

                

                {accoutTypeNormal === true &&
                accountFirstTwoMonth === true &&
                allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                    style={{
                      gridColumnStart: "2",
                    }}
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : accountTypePremium === true && allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                    style={{
                      gridColumnStart: "2",
                    }}
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : arrayisFour === true ? (
              <div className="select-profile-items select-profile-items-noedit">
                {accountFirstTwoMonth === false ? (
                  <div
                    onClick={() =>
                      dispatch(selectedProfile(profileDataLocal[0].profileId))
                    }
                  >
                    <Link
                      href={`/view/${
                        profileDataLocal.length > 0
                          ? profileDataLocal[0].profileId
                          : ""
                      }`}
                    >
                      <a className="select-profile-item">
                        <div className="select-profile-item-in">
                          <div className="select-profile-image-noedit">
                            <div className="select-profile-item-top"></div>

                            <ImageLoader
                              src={
                                profileDataLocal.length > 0
                                  ? profileDataLocal[0].profileUrl
                                  : ""
                              }
                              wrapper={React.createFactory("div")}
                              preloader={preloader}
                            >
                              Image load failed!
                            </ImageLoader>
                          </div>
                          <div className="select-profile-text">
                            {profileDataLocal.length > 0
                              ? profileDataLocal[0].profileTag
                              : ""}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  profileDataLocal.map((v, i, row) => {
                    if (i + 1 === row.length) {
                      return (
                        <>
                          <div
                            key={v.profileId}
                            onClick={() =>
                              dispatch(selectedProfile(v.profileId))
                            }
                            style={{
                              gridColumnStart: "2",
                            }}
                          >
                            <Link href={`/view/${v.profileId}`}>
                              <a className="select-profile-item">
                                <div className="select-profile-item-in">
                                  <div className="select-profile-image-noedit">
                                    <div className="select-profile-item-top"></div>

                                    <ImageLoader
                                      src={v.profileUrl}
                                      wrapper={React.createFactory("div")}
                                      preloader={preloader}
                                    >
                                      Image load failed!
                                    </ImageLoader>
                                  </div>
                                  <div className="select-profile-text">
                                    {v.profileTag}
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div
                            key={v.profileId}
                            onClick={() =>
                              dispatch(selectedProfile(v.profileId))
                            }
                          >
                            <Link href={`/view/${v.profileId}`}>
                              <a className="select-profile-item">
                                <div className="select-profile-item-in">
                                  <div className="select-profile-image-noedit">
                                    <div className="select-profile-item-top"></div>

                                    <ImageLoader
                                      src={v.profileUrl}
                                      wrapper={React.createFactory("div")}
                                      preloader={preloader}
                                    >
                                      Image load failed!
                                    </ImageLoader>
                                  </div>
                                  <div className="select-profile-text">
                                    {v.profileTag}
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </>
                      );
                    }
                  })
                )}

                {/*    <Link href="/panel">
                              <a className='select-profile-item'>
  
                                  <div className='select-profile-image'>
                                      <div className='select-profile-item-top'></div>
                                      <img src='images/profile-example.png' />
                                  </div>
                                  <div className='select-profile-text'>
                                      aysylmz
                                  </div>
                              </a>
                          </Link>
                          <div className='select-profile-item'>
  
                              <div className='select-profile-image'>
                                  <div className='select-profile-item-top'></div>
                                  <img src='images/profile-example.png' />
                              </div>
                              <div className='select-profile-text'>
                                  aysylmz
                              </div>
                          </div>*/}

                {/* {allProfile.length < 6  && 
                              
                              <div onClick={() => setNewProfilePopup(true)} className='select-profile-item-new'>
                                  <div className='select-profile-add'>
                                      <i className="fa-solid fa-plus"></i>
                                  </div>
                                  <div className='select-profile-text'>
                                      Profil ekle
                                  </div>
                              </div>
  
  
                              } */}

                {accoutTypeNormal === true &&
                accountFirstTwoMonth === true &&
                allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : accountTypePremium === true && allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : arrayisFive === true ? (
              <div className="select-profile-items select-profile-items-noedit">
                {accountFirstTwoMonth === false ? (
                  <div
                    onClick={() =>
                      dispatch(selectedProfile(profileDataLocal[0].profileId))
                    }
                  >
                    <Link
                      href={`/view/${
                        profileDataLocal.length > 0
                          ? profileDataLocal[0].profileId
                          : ""
                      }`}
                    >
                      <a className="select-profile-item">
                        <div className="select-profile-item-in">
                          <div className="select-profile-image-noedit">
                            <div className="select-profile-item-top"></div>

                            <ImageLoader
                              src={
                                profileDataLocal.length > 0
                                  ? profileDataLocal[0].profileUrl
                                  : ""
                              }
                              wrapper={React.createFactory("div")}
                              preloader={preloader}
                            >
                              Image load failed!
                            </ImageLoader>
                          </div>
                          <div className="select-profile-text">
                            {profileDataLocal.length > 0
                              ? profileDataLocal[0].profileTag
                              : ""}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  profileDataLocal.map((v, i, row) => (
                    <div
                      key={v.profileId}
                      onClick={() => dispatch(selectedProfile(v.profileId))}
                    >
                      <Link href={`/view/${v.profileId}`}>
                        <a className="select-profile-item">
                          <div className="select-profile-item-in">
                            <div className="select-profile-image-noedit">
                              <div className="select-profile-item-top"></div>

                              <ImageLoader
                                src={v.profileUrl}
                                wrapper={React.createFactory("div")}
                                preloader={preloader}
                              >
                                Image load failed!
                              </ImageLoader>
                            </div>
                            <div className="select-profile-text">
                              {v.profileTag}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))
                )}

                {/*    <Link href="/panel">
                              <a className='select-profile-item'>
  
                                  <div className='select-profile-image'>
                                      <div className='select-profile-item-top'></div>
                                      <img src='images/profile-example.png' />
                                  </div>
                                  <div className='select-profile-text'>
                                      aysylmz
                                  </div>
                              </a>
                          </Link>
                          <div className='select-profile-item'>
  
                              <div className='select-profile-image'>
                                  <div className='select-profile-item-top'></div>
                                  <img src='images/profile-example.png' />
                              </div>
                              <div className='select-profile-text'>
                                  aysylmz
                              </div>
                          </div>*/}

                {/* {allProfile.length < 6  && 
                              
                              <div onClick={() => setNewProfilePopup(true)} className='select-profile-item-new'>
                                  <div className='select-profile-add'>
                                      <i className="fa-solid fa-plus"></i>
                                  </div>
                                  <div className='select-profile-text'>
                                      Profil ekle
                                  </div>
                              </div>
  
  
                              } */}

                {accoutTypeNormal === true &&
                accountFirstTwoMonth === true &&
                allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : accountTypePremium === true && allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : arrayisSix === true ? (
              <div 
               className={`select-profile-items ${accountFirstTwoMonth===false ? "" : "select-profile-items-noedit"}`}
              >
                {accountFirstTwoMonth === false ? (
                  <div
                    onClick={() =>
                      dispatch(selectedProfile(profileDataLocal[0].profileId))
                    }
                  >
                    <Link
                      href={`/view/${
                        profileDataLocal.length > 0
                          ? profileDataLocal[0].profileId
                          : ""
                      }`}
                    >
                      <a className="select-profile-item">
                        <div className="select-profile-item-in">
                          <div className="select-profile-image-noedit">
                            <div className="select-profile-item-top"></div>

                            <ImageLoader
                              src={
                                profileDataLocal.length > 0
                                  ? profileDataLocal[0].profileUrl
                                  : ""
                              }
                              wrapper={React.createFactory("div")}
                              preloader={preloader}
                            >
                              Image load failed!
                            </ImageLoader>
                          </div>
                          <div className="select-profile-text">
                            {profileDataLocal.length > 0
                              ? profileDataLocal[0].profileTag
                              : ""}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  profileDataLocal.map((v, i, row) => (
                    <div
                      key={v.profileId}
                      onClick={() => dispatch(selectedProfile(v.profileId))}
                    >
                      <Link href={`/view/${v.profileId}`}>
                        <a className="select-profile-item">
                          <div className="select-profile-item-in">
                            <div className="select-profile-image-noedit">
                              <div className="select-profile-item-top"></div>

                              <ImageLoader
                                src={v.profileUrl}
                                wrapper={React.createFactory("div")}
                                preloader={preloader}
                              >
                                Image load failed!
                              </ImageLoader>
                            </div>
                            <div className="select-profile-text">
                              {v.profileTag}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))
                )}

                {/*    <Link href="/panel">
                              <a className='select-profile-item'>
  
                                  <div className='select-profile-image'>
                                      <div className='select-profile-item-top'></div>
                                      <img src='images/profile-example.png' />
                                  </div>
                                  <div className='select-profile-text'>
                                      aysylmz
                                  </div>
                              </a>
                          </Link>
                          <div className='select-profile-item'>
  
                              <div className='select-profile-image'>
                                  <div className='select-profile-item-top'></div>
                                  <img src='images/profile-example.png' />
                              </div>
                              <div className='select-profile-text'>
                                  aysylmz
                              </div>
                          </div>*/}

                {/* {allProfile.length < 6  && 
                              
                              <div onClick={() => setNewProfilePopup(true)} className='select-profile-item-new'>
                                  <div className='select-profile-add'>
                                      <i className="fa-solid fa-plus"></i>
                                  </div>
                                  <div className='select-profile-text'>
                                      Profil ekle
                                  </div>
                              </div>
  
  
                              } */}

                {accoutTypeNormal === true &&
                accountFirstTwoMonth === true &&
                allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : accountTypePremium === true && allProfile.length < 6 ? (
                  <div
                    onClick={() => setNewProfilePopup(true)}
                    className="select-profile-item-new"
                  >
                    <div className="select-profile-add">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="select-profile-text">Profil ekle</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="select-profile-items select-profile-items-noedit">
                <div
                  onClick={() => setNewProfilePopup(true)}
                  className="select-profile-item-new"
                  style={{
                    gridColumnStart: "2",
                  }}
                >
                  <div className="select-profile-add">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="select-profile-text">Profil ekle</div>
                </div>
              </div>
            ))}

          {/*    <div className='select-profile-bar'></div>
                    <div className='select-profile-items'>
                        <div className='select-profile-item'>

                            <div className='select-profile-image'>
                                <div className='select-profile-item-top'></div>
                                <img src='images/profile-example.png' />
                            </div>

                            <div className='select-profile-text'>
                                Kurumsal Profil
                            </div>
                        </div>

                        <div className='select-profile-item-new'>
                            <div className='select-profile-add'>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                            <div className='select-profile-text'>
                                Kurumsal
                                profil ekle
                            </div>
                        </div>
                    </div>
                    */}
        </div>
      </div>
    </>
  );
}

export default SelectProfile;

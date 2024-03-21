import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import LoginAstro from "../assets/Images/LoginAstronaut.png";
import { jwtDecode } from "jwt-decode";
import { redirect } from 'react-router-dom';


const GoogleAuth = () => {

  
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  console.log(clientID)

  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse)
    let decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    if (decoded){
      redirect('/login')
    }

  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="bg-EventBG h-fit flex justify-center pt-8">
      <div className="hidden sm:flex flex-col justify-end w-5/12">
        <img src={LoginAstro} alt="Astronaut" className="w-9/12"/>
      </div>
      <div className="sm:w-6/12 my-24 sm:mr-20 mx-2 rounded-3xl bg-cover bg-center bg-no-repeat text-white  bg-LoginBG">
        <h1 className="font-cuda text-3xl flex justify-center py-8">USER SIGNUP</h1>
        <h1 className="font-cuda text-xl flex justify-center">Google Sign up</h1>
        <div className="p-10">
          <GoogleOAuthProvider clientId={clientID}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;

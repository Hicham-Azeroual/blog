import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSclice.js";
import { useNavigate } from "react-router-dom";
function QAuth() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleGoogleClick=async ()=>{
        const auth =getAuth(app);
        const provider= new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultsFormGoogle=await signInWithPopup(auth,provider)
            const res = await fetch ('/api/auth/google',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:resultsFormGoogle.user.displayName,
                    email:resultsFormGoogle.user.email,
                    googlePhotoURL:resultsFormGoogle.user.photoURL
                })
            })
            const data=await res.json()
            if(res.ok){
              dispatch(signInSuccess(data))
              navigate('/')
            }
        } catch (error) {
            console.log(error);
            
        }

    }
  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"></AiFillGoogleCircle>
        Contine With Google
    </Button>
  
)  
}

export default QAuth

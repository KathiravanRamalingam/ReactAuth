import React , {useContext , useState , useEffect} from 'react'
import { auth } from '../firebase'

let SignUpContext=React.createContext()

export function UseAuthP(){
    return useContext(SignUpContext)
}

export default function AuthcontextProvider({ children}) {
    let [currentUser,setCurrentUser]=useState()
    const[loading,setLoading]=useState(true)


    function signup(email,password){
       return auth.createUserWithEmailAndPassword(email,password)
    }

    function signin(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function forgotpassword(email){
        return auth.sendPasswordResetEmail(email)

    }

    function updateEmail(email){
        return currentUser.updateEmail(email)

    }
    function updatePassword(password){
        return currentUser.updatePassword(password)

    }

    useEffect(() => {
        let undo=auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
        setLoading(false)
    
    }) 
    return undo
    }, [])



    let value={
        currentUser,
        signup ,
        signin ,
        logout ,
        forgotpassword,
        updateEmail,
        updatePassword
    
    }
    return (
        <SignUpContext.Provider value={value}>
            {!loading && children}
        </SignUpContext.Provider>
        
    )
}

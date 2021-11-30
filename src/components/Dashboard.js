import React , {useState} from 'react'
import {Card , Button , Alert} from 'react-bootstrap'
import { Link , useHistory} from 'react-router-dom'
import { UseAuthP } from '../contexts/auth'

export default function Dashboard() {
    const [err, setErr] =useState("")
    const{currentUser,logout} =UseAuthP()
    const history=useHistory()


    async function handleLogout(){
        setErr('')
        try{
            await logout()
            history.push('/login')

        }
        catch{
            setErr("Failed to Logout from your account")
        }
      

    }
    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Your Profile</h2>
                {err && <Alert variant="danger">{err}</Alert>}
                <strong>Email:</strong> {currentUser.email}

            <Link to="/update-profile" className="mt-4 btn btn-primary w-100">Update Profile</Link>

            </Card.Body>


        </Card>
        <div className="w-100 text-center mt-4">
            <Button variant="link"  onClick={handleLogout}>Log Out</Button>
        </div>
        </>
    )
}

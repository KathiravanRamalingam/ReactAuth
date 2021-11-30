import React , {useRef , useState} from 'react'
import { Card ,Form,Button, Alert} from 'react-bootstrap'
import { UseAuthP } from '../contexts/auth'
import { Link ,useHistory} from 'react-router-dom'

export default function Update() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const confirmpasswordRef = useRef()
    const {currentUser , updateEmail , updatePassword } =UseAuthP()

    const [err, setErr] =useState("")
    const [loading,setLoading] =useState(false)
    const history=useHistory()


    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== confirmpasswordRef.current.value){
            return setErr("Password do not match")
        }

        const promises=[]
        setErr("")
        setLoading(true)

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        

        if(passwordRef.current.value !== currentUser.password){
            promises.push(updatePassword(passwordRef.current.value))
 
        }

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(() =>{
            setErr('!!OOps Failed to Update Your Account')
        }).finally(()=>{
            setLoading(false) //becuuse of multi time

        })
    }


    return (
        <>
        <Card className="mt-4">
            <Card.Body >
                <h2 className="text-center mb-4">Update Profile</h2>
                {err && <Alert variant="danger">{err}</Alert>}
            </Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label className="mt-2">Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </Form.Group>
                

                <Form.Group id="password">
                    <Form.Label className="mt-2">Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Leave as empty to keep the same"/>
                </Form.Group>

                <Form.Group id="passwordconfirm">
                    <Form.Label className="mt-2">Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmpasswordRef} placeholder="Leave as empty to keep the same"/>
                </Form.Group>
                <div className='mb-4'>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Update User</Button>
                </div>

            </Form>
        </Card>

        <div className="w-100 text-center mt-4">
        <Link to="/"> Cancel Update Request </Link>            
        </div>
        </>
        
       
    )
}

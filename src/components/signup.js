import React , {useRef , useState} from 'react'
import { Card ,Form,Button, Alert} from 'react-bootstrap'
import { UseAuthP } from '../contexts/auth'
import { Link ,useHistory} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const confirmpasswordRef = useRef()
    const {signup } =UseAuthP()

    const [err, setErr] =useState("")
    const [loading,setLoading] =useState(false)
    const history=useHistory()


    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== confirmpasswordRef.current.value){
            return setErr("Password do not match")
        }
        try{
            setErr('')
            setLoading(true)
           await signup(emailRef.current.value,passwordRef.current.value)
           history.push("/")

        }catch{
            setErr('Failed to create an account')
            setLoading(false) //becuuse of multi time
        }
    }


    return (
        <>
        <Card className="mt-4">
            <Card.Body >
                <h2 className="text-center mb-4">Sign Up</h2>
                {err && <Alert variant="danger">{err}</Alert>}
            </Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label className="mt-2">Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                </Form.Group>
                

                <Form.Group id="password">
                    <Form.Label className="mt-2">Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required/>
                </Form.Group>

                <Form.Group id="passwordconfirm">
                    <Form.Label className="mt-2">Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmpasswordRef} required/>
                </Form.Group>
                <div className='mb-4'>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Register</Button>
                </div>

            </Form>
        </Card>

        <div className="w-100 text-center mt-4">
        Already have an account?<Link to="/login"> Sign In </Link>            
        </div>
        </>
        
       
    )
}

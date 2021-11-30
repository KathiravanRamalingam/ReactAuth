import React , {useRef , useState} from 'react'
import { Card ,Form,Button, Alert} from 'react-bootstrap'
import { UseAuthP } from '../contexts/auth'
import { Link ,useHistory} from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const {signin } =UseAuthP()

    const [err, setErr] =useState("")
    const [loading,setLoading] =useState(false)
    const history=useHistory()


    async function handleSubmit(e){
        e.preventDefault()

  
        try{
            setErr('')
            setLoading(true)
           await signin(emailRef.current.value,passwordRef.current.value)
           history.push("/")

        }catch{
            setErr('Failed to logging in to your account')
            setLoading(false) //becuuse of multi time
        }
    }


    return (
        <>
        <Card className="mt-4">
            <Card.Body >
                <h2 className="text-center mb-4">Sign In</h2>
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

                <div className='mb-4'>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Sign In</Button>
                </div>

                <div className="w-100 text-center mb-4">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>


            </Form>
        </Card>

        <div className="w-100 text-center mt-4">
            Create an account? <Link to="/signup">Sign Up </Link>            
        </div>
        </>
        
       
    )
}

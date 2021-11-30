import React , {useRef , useState} from 'react'
import { Card ,Form,Button, Alert} from 'react-bootstrap'
import { UseAuthP } from '../contexts/auth'
import { Link} from 'react-router-dom'

export default function Forgot() {
    const emailRef = useRef()
    const [err, setErr] =useState("")

    const {forgotpassword} =UseAuthP()

    const [message, setMessage] =useState("")
    const [loading,setLoading] =useState(false)


    async function handleSubmit(e){
        e.preventDefault()

  
        try{
            setMessage('')
            setErr('')
            setLoading(true)
            await forgotpassword(emailRef.current.value)
            setMessage('Check your mail for further instructions')


        }catch{
            setErr('OOPS!! Failed to forgot your password')
            setLoading(false) //becuuse of multi time
        }
    }


    return (
        <>
        <Card className="mt-4">
            <Card.Body >
                <h2 className="text-center mb-4">Reset Password</h2>
                {message && <Alert variant="success">{message}</Alert>}

                {err && <Alert variant="danger">{err}</Alert>}
            </Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label className="mt-2">Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                </Form.Group>
                


                <div className='mb-4'>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                </div>

                <div className="w-100 text-center mb-4">
                    <Link to="/login">Login</Link>
                </div>


            </Form>
        </Card>

        <div className="w-100 text-center mt-4">
            Create an account? <Link to="/signup">Sign Up </Link>            
        </div>
        </>
        
       
    )
}

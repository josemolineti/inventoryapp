import '@/styles/index.css'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";


function Login() {
    return (
        <>
            <h1>Login no *nome do app*</h1>
            <Input type='email' placeholder='Digite seu e-mail' required/>
            <Input type='password' placeholder='Digite sua senha' required/>


            <Button nivel={1} text='LOGIN' link='/home'/>
        </>
    )
}

export default Login;
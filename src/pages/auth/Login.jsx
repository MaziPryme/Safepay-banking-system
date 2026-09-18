
import { useForm } from "react-hook-form"
import { Link, useNavigate, useLocation } from "react-router-dom"
import AuthShell from "./AuthShell"
import Input from "../../components/forms/Input"
import PasswordInput from "../../components/forms/PasswordInput"
import Checkbox from "../../components/forms/CheckBox"
import Button from "../../components/buttons/Button"
import { useAuth } from "../../context/AuthContext"
import { validators } from "../../utils/validators"


export default function Login() {

    const { login, isAuthenticating } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        const result = await login(data)
        if (result.success) {
            const from = location.state?.from?.pathname
            navigate(from || result.redirectTo)
        }
    }

    return (
        <AuthShell title="Welcome Back" subtitle="Login to access your dashboard">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="you@gmail.com"
                    error={errors.email}
                    {...register("email", validators.email)} />
                <PasswordInput
                    label="Password"
                    placeholder="*********"
                    error={errors.password}
                    {...register("password", {required: "password is required"})} />

                <div className="flex items-center justify-between">
                    <Checkbox label="Remember me" {...register("RememberMe")} />
                    <Link to="/forgot-password" className="text-sm font-medium text-primary
                    hover:underline">
                        Forgot Password
                    </Link>
                </div>

                <Button type="submit" variant="primary" isLoading={isAuthenticating} 
                className="w-full">Log in</Button>

            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link to="/signup" className="font- medium text-primary hover:underline">
                    Sign up
                </Link>
            </p>

        </AuthShell>
    )
}
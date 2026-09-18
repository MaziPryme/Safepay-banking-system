import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import AuthShell from "./AuthShell"
import Input from "../../components/forms/Input"
import PasswordInput from "../../components/forms/PasswordInput"
import Button from "../../components/buttons/Button"
import { useAuth } from "../../context/AuthContext"
import { validators } from "../../utils/validators"

const BANKS = [
    "Access Bank",
    "First Bank",
    "GTBank",
    "UBA",
    "Zenith Bank",
    "Fidelity Bank",
    "Union Bank",
    "Stanbic IBTC",
]

export default function Signup() {

    const { signup, isAuthenticating } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const password = watch("password")

    const onSubmit = async (data) => {
        const result = await signup(data)
        if (result.success) {
            navigate("/verify-email", { state: { email: data.email } })
        }
    }

    return (
        <AuthShell title="Create your account" subtitle="Open a Safepay account in minutes">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="you@gmail.com"
                    error={errors.email}
                    {...register("email", validators.email)} />

                <Input
                    label="Phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    error={errors.phone}
                    {...register("phone", { required: "phone number is required" })} />

                <PasswordInput
                    label="Password"
                    placeholder="*********"
                    error={errors.password}
                    {...register("password", {
                        required: "password is required",
                        minLength: { value: 8, message: "password must be at least 8 characters" }
                    })} />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="*********"
                    error={errors.confirmPassword}
                    {...register("confirmPassword", {
                        required: "please confirm your password",
                        validate: (value) => value === password || "passwords do not match"
                    })} />

                <div>
                    <label className="block text-sm font-medium text-mist-700 mb-1.5">Bank</label>
                    <select
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm
                        text-mist-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/25
                        focus:border-primary transition-colors"
                        {...register("bank", { required: "please select your bank" })}
                        defaultValue=""
                    >
                        <option value="" disabled>Select your bank</option>
                        {BANKS.map((bank) => (
                            <option key={bank} value={bank}>{bank}</option>
                        ))}
                    </select>
                    {errors.bank && <p className="error-text">{errors.bank.message}</p>}
                </div>

                <Button type="submit" variant="primary" isLoading={isAuthenticating}
                className="w-full">Create Account</Button>

            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                    Log in
                </Link>
            </p>

        </AuthShell>
    )
}
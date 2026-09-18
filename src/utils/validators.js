

export const validators = {
    required: (label = "This field") => ({
        required: `${label} is required`,
    }),
    email: {
        required: "Email is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
        },
    },
    passwords: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
        },
    },
    confirmPassword: (getPasswordValue) => ({
        required: "Confirm password is required",
        validate: (value) => value === getPasswordValue() || "Password do not match",
    }),
    phone: {
        required: "Phone number is required",
        pattern: {
            value: /^\+?[0-9]{10,15}$/,
            message: "Invalid phone number",
        },
    },
    amount: {
        required: "Amount is required",
        min: {
            value: 1,
            message: "Amount must be greater than 0",
        },
    },
    accountNumber: {
        required: "Account number is required",
        pattern: {
            value: /^[0-9]{10}$/,
            message: "Account number must be 10 digits",
        },
    }
}   
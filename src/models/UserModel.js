import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,  // Corrected typo from "verifyTokenExpery"
}, { 
    timestamps: true  // Automatically add createdAt and updatedAt timestamps
});

// Export the User model, reusing the existing model if it already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

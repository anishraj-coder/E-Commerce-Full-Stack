// src/customer/pages/NotFound.tsx
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="text-center space-y-8 max-w-lg">
                {/* 404 Text */}
                <h1 className="text-9xl font-black text-[#4F39F6] tracking-tighter">
                    404
                </h1>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg font-light">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        startIcon={<Home className="w-5 h-5" />}
                        sx={{
                            bgcolor: "#4F39F6",
                            borderRadius: "16px",
                            padding: "12px 32px",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            "&:hover": { bgcolor: "#3d2bc4" },
                        }}
                    >
                        Back to Home
                    </Button>

                    <Button
                        component={Link}
                        to="/products/men/kurta"
                        variant="outlined"
                        sx={{
                            borderColor: "#4F39F6",
                            color: "#4F39F6",
                            borderRadius: "16px",
                            padding: "12px 32px",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            "&:hover": {
                                borderColor: "#3d2bc4",
                                color: "#3d2bc4",
                                bgcolor: "rgba(79, 57, 246, 0.05)",
                            },
                        }}
                    >
                        Explore Products
                    </Button>
                </div>

                {/* Optional: Fun Illustration */}
                <div className="mt-12 opacity-20">
                    <svg
                        className="w-48 h-48 mx-auto"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="100" cy="100" r="80" stroke="#4F39F6" strokeWidth="8" />
                        <path
                            d="M70 90 Q100 120 130 90"
                            stroke="#4F39F6"
                            strokeWidth="6"
                            fill="none"
                        />
                        <circle cx="80" cy="80" r="10" fill="#4F39F6" />
                        <circle cx="120" cy="80" r="10" fill="#4F39F6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
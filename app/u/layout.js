import "../globals.css";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout({ children }) {
    return (
        <ProtectedRoute>
            <Navbar />
            <main>{children}</main>
        </ProtectedRoute>

    );
}

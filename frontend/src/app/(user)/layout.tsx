import { Footer } from "@/ui";

export default function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    );
}
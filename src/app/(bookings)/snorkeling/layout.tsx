import BackButton from "~/components/general/BackButton";

export const metadata = {
    title: "Lizzy | Snorkeling",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function SnorkelingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-3">
            {children}
            <BackButton />
        </section>
    );
}

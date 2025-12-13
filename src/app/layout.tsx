import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "알고리즘 정리",
    description: "공부한 알고리즘들을 체계적으로 정리하고 시각화할 수 있는 웹 애플리케이션",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                {children}
            </body>
        </html>
    );
}

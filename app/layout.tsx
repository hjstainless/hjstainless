import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "江苏泓基金属材料有限公司 | Jiangsu Hongji Metal Materials Co., Ltd.",
  description: "专业不锈钢管道配件制造商，产品包括预制件、对焊管件、锻造法兰等，广泛应用于石油化工、电力能源、船舶海工、核电工程等领域。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={geistSans.className} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

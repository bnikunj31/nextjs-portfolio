import Sidebar from "@/components/Sidebar/Sidebar";
import "@/../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
    </>
  );
}

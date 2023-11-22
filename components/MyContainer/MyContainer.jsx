import "./mycontainer.css";
// components
import { Navbar } from "..";
export default function MyContainer() {
  return (
    <>
      <div className="h-screen bg-gray-900  ">
        <Navbar />
      </div>
    </>
  );
}

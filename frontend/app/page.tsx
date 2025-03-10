import AmenitiesForm from "@/components/AmenitiesForm";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[20%] h-full bg-[#fafafa]">
        <Sidebar />
      </div>
      <div className="w-[80%] h-full  shadow-xl">
        <AmenitiesForm />
      </div>
    </div>
  );
}

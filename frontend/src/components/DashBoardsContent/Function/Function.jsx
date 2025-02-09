import LeftContentModule from "./LeftContentModule/LeftContentModule";
import RightContentModule from "./RightContentModule/RightContentModule";

const Function = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar bên trái với chiều rộng cố định */}
      <aside className="w-64 p-4 flex flex-col items-center justify-center">
        <LeftContentModule />
      </aside>
      {/* Nội dung chính bên phải */}
      <main className="flex-1 p-6 overflow-y-auto">
        <RightContentModule />
      </main>
    </div>
  );
};

export default Function;

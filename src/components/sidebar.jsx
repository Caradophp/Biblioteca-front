import { Home, User, Settings } from "lucide-react"; // Ícones do Lucide
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("home");

  const menuItems = [
    { id: "home", name: "Início", icon: <Home size={20} /> },
    { id: "profile", name: "Perfil", icon: <User size={20} /> },
    { id: "settings", name: "Configurações", icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Meu App</h2>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              active === item.id ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

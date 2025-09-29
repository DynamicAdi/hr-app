import { BriefcaseBusiness, CircleUserRound, UsersRound } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const menu = [
    {
      icon: BriefcaseBusiness,
      title: "Jobs",
      path: "/",
    },
    {
      icon: UsersRound,
      title: "Candidates",
      path: "/candidates",
    },
    {
      icon: CircleUserRound,
      title: "Rigester",
      path: "/rigester",
    },
  ];

  const [active, setActive] = useState(menu[0].title)


  return (
    <div className="fixed bottom-0 w-screen h-16 bg-white flex justify-between items-center px-6 py-2 border-t border-gray-300">
      {menu.map((items) => (
        <Link to={items.path}  key={items.title} onClick={() => setActive(items.title)} className={`text-center flex justify-center items-center flex-col ${active === items.title ? "text-orange-600" : " text-neutral-400"}`}>
          <items.icon size={20}/>
          <p>{items.title}</p>
        </Link>
      ))}
    </div>
  );
}

export default Navigation;

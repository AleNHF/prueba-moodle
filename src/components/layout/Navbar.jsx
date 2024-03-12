import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const menuItems = [
        { text: "Categorías de Moodle", path: "/create-category" },
        { text: "Cursos de Moodle", path: "/create-course" },
    ];

    return (
        <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-gray-800 text-white">
            <div className="flex items-center">
                <div onClick={() => setNav(!nav)} className="cursor-pointer">
                    <AiOutlineMenu size={30} />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
                    Admin <span className="font-bold">Escuela Moodle</span>
                </h1>
            </div>

            {nav ? (
                <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 "></div>
            ) : (
                ""
            )}

            <div
                className={
                    nav
                        ? "fixed top-0 left-0 w-[300px] h-screen z-10 duration-300 bg-gray-800 text-white"
                        : "fixed top-0 left-[-100%] w-[300px] h-screen z-10 duration-300 bg-gray-800 text-white"
                }
            >
                <AiOutlineClose
                    onClick={() => setNav(!nav)}
                    size={30}
                    className="absolute right-4 top-4 cursor-pointer"
                />
                <h2 className="text-2xl p-4">
                    
                </h2>
                <nav>
                    <ul className="flex flex-col p-4 text-white">
                        {menuItems.map(({ text, path }, index) => {
                            return (
                                <div key={index} className=" py-4">
                                    <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-4 hover:text-white hover:bg-gray-700">
                                        <Link to={path}>{text}</Link>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
import React from "react";

function LeftNavbar() {
    return (
        <div className="z-[999] block fixed w-[300px] bg-cpurple-0 top-0 left-0 min-h-screen px-4">
            <div className="flex flex-col items-center">
                <img src="../LogoLeftBar.svg" alt="" className="mt-4" />

                <div className="">
                    <p>Dashboard</p>
                    <p>Dashboard</p>
                    <p>Dashboard</p>
                </div>
            </div>
        </div>
    );
}

export default LeftNavbar;

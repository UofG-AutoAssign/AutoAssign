import React from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButton, { LandingButtonProps } from "../components/LandingButton";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

interface Props { }

const AccountPage: React.FC = () => {
    const data: LandingButtonProps[] = [{ title: "Form", desc: "Submit this form to learn more about team preferences.", btn_color: "bg-btnColor1" },
    { title: "Your Team", desc: "View Team.", btn_color: "bg-btnColor2" },
    { title: "Roles", desc: "Learn more about the roles in general.", btn_color: "bg-btnColor3" }];

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="sticky top-0 z-50">
                <Navbar />
            </nav>
            <div>
                <div className="text-5xl text-center text-blue-900">Hi! Martin</div>
            </div>
            <div className="p-16 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                    {data.map((e) => {return <LandingButton title={e.title} desc={e.desc} btn_color={e.btn_color}/>})}
                </div>
            </div>

        </div>
    );
};

export default AccountPage;

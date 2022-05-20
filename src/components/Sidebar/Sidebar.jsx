import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
// import { useState } from "react"
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { logOutUser } from "../../services";
import avatar from "./../../assets/avatar.png"
export const Sidebar = () => {
    const { setShowAddLabelModel } = useHabbitData();
    const navigate = useNavigate();

    const { login: { firstName, lastName }, setLogin } = useAuth();



    return (
        <aside className="sidebar d-flex flex-col items-center pad-sm">
            <header className="sidebar-header pad-xs d-flex items-center">
                <img className="xs-height sm-bdr-radius mar-x-1" src={avatar} height="30" alt="Profile" />
                <span className="head-3">
                    {firstName} {lastName}
                </span>
            </header>
            <ul className="sidebar-list text-2 mar-y-4">
                <li className="sidebar-list-item active-element d-flex" onClick={() => navigate("/home")}>
                    <Icon className="mar-x-2" icon="bx:archive" />All Habbit
                </li>
                <li className="sidebar-list-item d-flex mar-y-2" onClick={() => setShowAddLabelModel(val => !val)}>
                    <Icon className="mar-x-2" icon="bxs:book-add" />Add Label
                </li>
                <li className="sidebar-list-item d-flex mar-y-2" onClick={() => navigate("/archive")}>
                    <Icon className="mar-x-2" icon="bx:archive-in" />Archive Habits
                </li>
                <li className="sidebar-list-item d-flex mar-y-2" onClick={() => logOutUser(setLogin, navigate)}>
                    <Icon className="mar-x-2" icon="heroicons-outline:logout" />Logout
                </li>
            </ul>
            {/* <ul className="sidebar-list mar-y-4">
                <header className="sidebar-list-header head-4">
                    <h3>AREAS</h3>
                </header>
                <li className="d-flex justify-center items-center mar-y-2 cursor-pointer head-4">
                    <Icon className="mar-x-2" icon="ant-design:plus-circle-outlined" /> <span>New Area</span>
                </li>
            </ul>


            <ul className="sidebar-list mar-y-4">
                <header className="sidebar-list-header head-4">
                    <h3>PREFERENCES</h3>
                </header>
                <li className="d-flex justify-center items-center mar-y-2 cursor-pointer head-4">
                    <Icon className="mar-x-2" icon="ant-design:plus-circle-outlined" /> <span>New Area</span>
                </li>
            </ul> */}
        </aside>
    )
}
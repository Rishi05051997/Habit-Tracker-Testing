import { Routes, Route } from "react-router-dom"
import { ArchiveHabits } from "../pages/Archive/ArchiveHabits"
import { Login } from "../pages/Auth/Login"
import { Signup } from "../pages/Auth/Signup"
import { Home } from "../pages/Home/Home"
import { MainPage } from "../pages/Main/MainPage"
import { NotFound } from "../pages/NotFound/NotFound"
import { Pomodoro } from "../pages/Pomodoro/Pomodoro"
import { PrivateRouter } from "./PrivateRouter"

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={
                <PrivateRouter>
                    <Home />
                </PrivateRouter>
            } />
            <Route path="/archive" element={
                <PrivateRouter>
                    <ArchiveHabits />
                </PrivateRouter>
            } />
            <Route path="/pomodoro/:habitId" element={
                <PrivateRouter>
                    <Pomodoro />
                </PrivateRouter>
            } />
            <Route path="*" element={
                <PrivateRouter>
                    <NotFound />
                </PrivateRouter>
            } />

        </Routes>
    )
}
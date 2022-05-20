import "./notesContainer.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useHabbitData } from "../../../context/HabbitData/HabbitDataContext";
import { NotesListing } from "./Notes/NotesListing";
import { NotesFooter } from "./Notes/Notes-Footer";
import { Description } from "./Description/Description";
import { About } from "./About/About";
export const NotesContainer = ({ habit }) => {
    const [noteText, setNoteText] = useState("");
    const { dispatch } = useHabbitData();
    const [toggleOption, setToggleOption] = useState("home")

    const { _id, notes, description } = habit
    console.log(notes)
    const notesHandler = (e) => {
        e.preventDefault();
        const noteObj = { _id: uuid(), title: noteText, date: new Date(), }
        console.log(noteObj)
        const payload = { "_id": _id, "note": noteObj }
        console.log(payload)
        dispatch({ type: "ADD-NOTE-TO-SELECTED-HABIT", payload: payload })
        setNoteText("")
    }

    const removedNotehandler = (noteId, dispatch) => {
        const payload = { "_id": _id, "noteId": noteId }
        dispatch({ type: "REMOVE-NOTE-FROM-SELECTED-HABIT", payload: payload })
    }



    return (
        <>
            <section className="notes-container">
                <nav className="main-content-nav d-flex items-center pad-sm">
                    <header className="d-flex items-center">
                        <div className="head-2">Notes</div>
                    </header>
                    <ul className="main-content-list d-flex justify-between items-center">
                        <li className="mar-x-2 cursor-pointer active-element pad-xs" onClick={() => setToggleOption("home")}>Home</li>
                        <li className="mar-x-2 cursor-pointer" onClick={() => setToggleOption("description")}>Description</li>
                        <li className="mar-x-2 cursor-pointer" onClick={() => setToggleOption("about")}>About</li>
                    </ul>
                </nav>
                {
                    toggleOption === "home" && (
                        <>
                            {notes.length > 0 && (
                                <main className="notes-section section-border pad-xs mar-y-2">
                                    {notes.map((note) => (
                                        <NotesListing removedNotehandler={removedNotehandler} note={note} />
                                    ))}
                                </main>
                            )}
                            <NotesFooter noteText={noteText} setNoteText={setNoteText} notesHandler={notesHandler} />
                        </>
                    )
                }
                {
                    toggleOption === "description" && (<Description description={description} />)
                }
                {
                    toggleOption === "about" && (<About />)
                }
            </section>
        </>
    )
}
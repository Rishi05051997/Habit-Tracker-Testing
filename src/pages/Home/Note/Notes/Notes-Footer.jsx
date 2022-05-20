export const NotesFooter = ({ notesHandler, noteText, setNoteText }) => {
    return (
        <footer className="note-footer">
            <form onSubmit={(e) => notesHandler(e)} className="d-flex w-50 pad-xs">
                <input
                    type="text"
                    placeholder="Type here to Add Note!!!"
                    className="form-control pad-xs w-50 mar-x-2"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                />
            </form>

        </footer>
    )
}
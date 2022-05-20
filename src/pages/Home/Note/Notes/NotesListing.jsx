import { Icon } from "@iconify/react";
import { useHabbitData } from "../../../../context/HabbitData/HabbitDataContext";

export const NotesListing = ({ note, removedNotehandler }) => {
    const { _id, title } = note;
    const { dispatch } = useHabbitData();
    return (
        <div key={_id} className="note section-border mar-y-2 w-50 pad-sm pos-relative">
            <div className="close-icon head-4 cursor-pointer">
                <Icon icon="ant-design:close-circle-outlined" onClick={() => removedNotehandler(_id, dispatch)} />
            </div>
            <div className="head-4">{title}</div>
        </div>
    )
}
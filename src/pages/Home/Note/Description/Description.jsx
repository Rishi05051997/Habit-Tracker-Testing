import "./description.css";
export const Description = ({ description }) => {
    return (
        <div className="d-flex flex-col justify-center items-center section-border mar-md pad-xs">
            <div className="head-2 mar-y-2 highlight-main">Description</div>
            <div className="desc-section mar-y-2 text-3">{description}</div>
        </div>
    )
}
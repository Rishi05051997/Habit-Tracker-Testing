import "./habitsListing.css";
import { HabitsListingCard } from "./HabitsListingCard";

export const HabitsListing = ({ habits, isArchive }) => {

    return (
        <div className="habits-listing">
            {
                habits.map((habits, i) => (
                    <HabitsListingCard key={i} habit={habits} isArchive={isArchive} />
                ))
            }
        </div>

    )
}
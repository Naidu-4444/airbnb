import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Calendar = ({ value, onChange, ...props }) => {
  return (
    <div>
      <DateRange
        ranges={[value]}
        onChange={onChange}
        {...props}
        minDate={new Date()}
      />
      <div className="text-sm text-gray-500 mt-2">
        {value.startDate.toLocaleDateString()} -{" "}
        {value.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export default Calendar;

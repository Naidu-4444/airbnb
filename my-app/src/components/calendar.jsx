import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Calendar = ({ value, onChange, disabledDates, ...props }) => {
  return (
    <div>
      <DateRange
        ranges={[value]}
        onChange={onChange}
        {...props}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default Calendar;

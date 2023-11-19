import * as elements from "typed-html";
import DentistCalendar from "../../components/dentistCalendar";

const Schedule = () => {
  return (
    <div class="text-center container py-4">
      <h1>Schedule</h1>
      <DentistCalendar />
    </div>
  );
};

export default Schedule;

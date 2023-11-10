import Calendar from "../../components/calendar";
import * as elements from "typed-html";
import Staff from "./staff";

const Home = () => {
  return (
    <Staff>
      <div class="ms-16 w-100">
        <Calendar />
      </div>
    </Staff>
  );
};

export default Home;

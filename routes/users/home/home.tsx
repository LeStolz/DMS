import * as elements from "typed-html";
import Banner from "./banner";
import About from "./about";
import Calendar from "../../../components/calendar";
import Dentists from "./dentists";
import Services from "./services";
import Nav from "./nav";
import Topbar from "../../../components/topbar";
import { User } from "../../auth/router";
import ContactInfo from "./contactInfo";
import ConfirmInfo from "./confirmInfo";

const Home = ({ user }: { user?: User }) => {
  return (
    <Topbar user={user}>
      <div class="home not-printable">
        <Banner />
        <About />
        <Nav />
        <a class="scroll-link" id="dates"></a>
        <div class="mx-5 my-3">
          <div class="text-center m-0 pt-4 bg-white">
            <h1 class={`m-0`}>Book Appointment</h1>
          </div>
          <Calendar />
        </div>
        <Dentists />
        <Services />
      </div>
      <ContactInfo />
      <ConfirmInfo />
    </Topbar>
  );
};

export default Home;

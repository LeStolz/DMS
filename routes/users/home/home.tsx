import * as elements from "typed-html";
import Banner from "./banner";
import About from "./about";
import Calendar from "../../../components/calendar";
import Dentists from "./dentists";
import Services from "./services";
import Nav from "./nav";
import Topbar from "../../../components/topbar";
import ContactInfo from "./contactInfo";
import ConfirmInfo from "./confirmInfo";
import { Dentist, Service, User } from "../../../types";

type HomeProps = {
  user?: User;
  dentists: Dentist[];
  services: Service[];
};

const Home = ({ user, dentists, services }: HomeProps) => {
  return (
    <Topbar user={user}>
      <div>
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
          <Dentists dentists={dentists} />
          <Services services={services} />
        </div>
        <ContactInfo />
        <ConfirmInfo />
      </div>
    </Topbar>
  );
};

export default Home;

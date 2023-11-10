import Banner from "./banner";
import * as elements from "typed-html";
import Client from "./client";
import Category from "../admin/category";
import About from "./about";
import Calendar from "../../components/calendar";

const Home = () => {
  return (
    <Client>
      <div>
        <Banner />
        <Calendar />
        <About />
        <div class="row m-0 background-anti-flash-white">
          <div class="col-6 p-0">
            <Category title="Service" color="background-midnight-green" />
          </div>
          <div class="col-6 p-0">
            <Category title="Doctor" color="background-steel-blue" />
          </div>
        </div>
      </div>
    </Client>
  );
};

export default Home;

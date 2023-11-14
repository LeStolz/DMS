import * as elements from "typed-html";
import Topbar from "../../../components/topbar";
import ProfileSettings from "../../../components/profileSettings";
import TreatmentHistory from "./treatmentHistory";
import { User } from "../../auth/router";

const Profile = ({ user }: { user?: User }) => {
  return (
    <Topbar user={user}>
      <ProfileSettings />
      <TreatmentHistory />
    </Topbar>
  );
};

export default Profile;

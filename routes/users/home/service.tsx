import * as elements from "typed-html";
import { formatPrice } from "../../../utils";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  url?: string;
};

const ServiceItem = ({ service }: { service: Service }) => {
  return (
    <div class="col-12 col-md-6 col-lg-4">
      <div class="row d-flex justify-content-center mb-2">
        <div class="d-flex justify-content-center">
          <div class="position-relative icon-w-xl icon-h-xl rounded-circle border border-warning">
            <img class="position-absolute-center" src={service.url}></img>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <h4>{service.name}</h4>
        <h6>{formatPrice(service.price)}</h6>
        <a
          class="link-primary mb-2"
          data-toggle="collapse"
          href={`#collapse-${service.name}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapse-${service.name}`}
        >
          More Info
        </a>
        <div class="collapse" id={`collapse-${service.name}`}>
          <div class="card card-body text-start">{service.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;

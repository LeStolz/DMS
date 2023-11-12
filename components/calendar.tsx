import * as elements from "typed-html";
import DateCalendarItem from "./dateCalendarItem";

const Calendar = () => {
  return (
    <div class="my-3">
      <div class="bg-white calendar border-bottom border-secondary">
        <div>
          <div class="container">
            <div class="text-center">
              <h1 class="display-4">Schedule</h1>
              <div class="d-flex justify-content-end gap-3 text-right -mt-14">
                <div>
                  <input type="date" name="" id="" />
                </div>
                <div>
                  <button
                    class="btn btn-success p-3"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Confirm
                  </button>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Appoinment
                        </h5>
                      </div>
                      <div class="modal-body" style="text-align : left">
                        <div class="mb-3">
                          <h4>Patient Information</h4>
                          <div class="mb-3">
                            <div class="row">
                              <div class="col-6">
                                <p>
                                  <strong>First Name : </strong>
                                  <span>Van</span>
                                </p>
                              </div>
                              <div class="col-6">
                                <p>
                                  <strong>Last Name : </strong>
                                  <span>Nguyen</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="mb-3">
                            <p>
                              <strong>Phone : </strong>
                              <span>0901233312</span>
                            </p>
                          </div>
                          <div class="mb-3">
                            <p>
                              <strong>Date of birth : </strong>
                              <span>12/12/2003</span>
                            </p>
                          </div>
                          <div class="mb-3">
                            <p>
                              <strong>Gender : </strong>
                              <span>Nam</span>
                            </p>
                          </div>
                          <div class="mb-3">
                            <p>
                              <strong>Address : </strong>
                              <span>123ABC, Street 12</span>
                            </p>
                          </div>
                        </div>
                        <div class="mb-3">
                          <h4>Dentist Information</h4>
                          <div class="mb-3">
                            <p>
                              <strong>Name : </strong>
                              <span>Ts. Nguyen Van A</span>
                            </p>
                          </div>
                          <div class="mb-3">
                            <p>
                              <strong>Phone : </strong>
                              <span>0901233312</span>
                            </p>
                          </div>
                          <div class="mb-3">
                            <p>
                              <strong>Gender : </strong>
                              <span>Nam</span>
                            </p>
                          </div>
                        </div>
                        <div class="mb-3">
                          <h4>Appointment</h4>
                          <div class="mb-3">
                            <p>
                              <strong>Date: </strong>
                              <span>12/12/2009</span>
                            </p>
                          </div>
                          <div class="mb-3">
                            <strong class="d-inline-block">Shift : </strong>
                            <p class="d-inline-block">
                              Morning <span>8h30</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary">
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="lead">
                Choose your dentist and then choose your date or vice versa
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="h-10 w-10 background-dark-charcoal text-white rounded-circle d-flex jusify-content-center">
              <div class="w-100 d-flex justify-content-center align-items-center">
                <i class="bi bi-arrow-left"></i>
              </div>
            </div>
            <div>
              <h1 class="title text-center mx-5"> July 2014 </h1>
            </div>
            <div class="h-10 w-10 background-dark-charcoal text-white rounded-circle d-flex jusify-content-center">
              <div class="w-100 d-flex justify-content-center align-items-center">
                <i class="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar" data-toggle="calendar">
        <div class="row mb-3">
          <div class="datetime"></div>
          <div class="datetime">Monday</div>
          <div class="datetime">Tuesday</div>
          <div class="datetime">Wednesday</div>
          <div class="datetime">Thursday</div>
          <div class="datetime">Friday</div>
          <div class="datetime">Saturday</div>
          <div class="datetime">Sunday</div>
        </div>
        <div class="row">
          <div class="datetime d-flex justify-content-center align-items-center text-warning">
            Morning
          </div>
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
        </div>
        <div class="row">
          <div class="datetime d-flex justify-content-center align-items-center text-danger ">
            Afternoon
          </div>
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
        </div>
        <div class="row">
          <div class="datetime d-flex justify-content-center align-items-center text-success ">
            Evening
          </div>
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
          <DateCalendarItem />
        </div>
      </div>
    </div>
  );
};

export default Calendar;

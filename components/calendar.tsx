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

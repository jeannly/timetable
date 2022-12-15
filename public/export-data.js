// Exports data from an authenticated Allocate+ session into our app.

/*
Glossary of Allocate data terms:

groups:  a class within a course
    e.g. a lectorial ('LTL03'), or lab ('PRA01')
activities: the timetable options for a group 
    e.g. Fri 2pm online; or Tues 10am in building 8
semester_description: the human-readable name for a semester, rather than its numerical code
*/
(() => {
  const TOKEN_NAME = "ss";

  // subject = the subject code (e.g. EEET2250)
  function generate_urls(subject, group) {
      let url = new URL(window.location.href);
      let token = url.searchParams.get(TOKEN_NAME);

      let path_base = window.location.pathname.split("/").slice(0, -1).join("/");
      return ["activities", "popularities"].reduce((obj, type) => ({
          ...obj,
          [type]: new URL(
              `${path_base}/rest/student/${window.data.student.student_code}/subject/${subject}/group/${group}/${type}/?${TOKEN_NAME}=${token}`,
              window.location.origin
          )
      }), {});
  }

  function create_window() {
      let container = document.createElement("div");

      // Container styling
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.right = "0";
      container.style.bottom = "0";
      container.style.background = "rgba(0, 0, 0, 0.5)";
      container.style.zIndex = "1000";
      container.style.display = "flex";
      container.style.justifyContent = "space-around";
      container.style.alignItems = "center";

      let loader = document.createElement("div");
      loader.style.padding = "5%";
      loader.innerText = "Loading...";
      loader.style.background = "white";
      loader.style.fontFamily = "sans-serif";

      container.append(loader);
      document.body.append(container);

      return {
          close: () => {
              container.remove();
          },
          update: (message) => {
              loader.innerText = message;
          }
      }
  }

  const reduce_object_to_subset = (object, ...desired_properties) => {
    for (let property in object) {
        if (!desired_properties.includes(property)) {
            delete object[property];
        }
    }
  };

  async function run() {
      console.log("Running");

      let {
          close,
          update
      } = create_window();

      // Determine available semesters, and populate them with their respective courses + course data
      try {
        /* This is where Allocate+ stores all a student's courses, within their respective semesters, when we first login.
            However, it does not store the timetable options (i.e. activities) for each course.
        */
        let available_semesters = window.data.student.student_enrolment_sem;
        
        // Populate each course in each semester with their classes' timetable options
        for (let semester_name in available_semesters) {
            for (let course_name in available_semesters[semester_name]) {
                let course = available_semesters[semester_name][course_name];
                // Populate each course with its activities and popularities.
                for (let group_name in course.groups) {
                    let group = course.groups[group_name];

                    // 1. Fetch activities and popularities
                    let {
                        activities: activities_url,
                        popularities: popularities_url
                    } = generate_urls(group.subject_code, group.activity_group_code);

                    let [activities_request, popularities_request] = await Promise.all([
                        fetch(activities_url),
                        fetch(popularities_url)
                    ]);

                    group.popularities = popularities_request.status === 200 ? await popularities_request.json() : null;
                    if (activities_request.status !== 200) {
                        throw "Problem retreiving data. Please refresh the page and try again. If the problem persists, please open a new issue on Github.";
                    } 

                    let activities = await activities_request.json();
                    for (let activity in activities) {
                        reduce_object_to_subset(activities[activity], 
                            'campus_description',
                            'campus',
                            'day_of_week',
                            'duration',
                            'location',
                            'start_time');
                    }

                    // 2. Assign to our mass blob of data, and whittle down group data we don't need in our app
                    group.activities = {};
                    Object.assign(group.activities, activities);
                    reduce_object_to_subset(group,
                        'activities',
                        'description',
                        'popularities');
                }
                reduce_object_to_subset(course, 
                    'callista_code',
                    'description',
                    'groups');
            }
        }
        console.log(available_semesters);
        let encoded_data = btoa(JSON.stringify(available_semesters));
        window.open(`${window.secret_injected_app_url}/app?data=${encoded_data}`, "_blank").focus();

        close();
      } catch (e) {
          update(e);
      }
  }

  run();
})();
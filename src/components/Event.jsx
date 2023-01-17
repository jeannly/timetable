import classNames from "classnames";
import '../css/styles.scss';

import { MilitaryTime } from '../utils/time';

const Event = ({data}) => {
  let eventClass = classNames({
    'event': true
  });

  let start_time = MilitaryTime.fromString(data.start_time);

  return (
    <div className={eventClass}>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>{data.location}</p>
      <p>{start_time.toString() + ' - ' + start_time.addMinutes(Number(data.duration)).toString()}</p>
    </div>
    
  );
}

export default Event;
// just 24hr time. HH:MM
class MilitaryTime {
  constructor(hours, minutes) {
    this._hours = hours;
    this._minutes = minutes;
  }

  get hours() { return this._hours; }
  get minutes() { return this._minutes; }
  
  // Create from a "HH:MM" string
  static fromString(string) {
    let [hours, minutes] = string.split(':').map(Number);
    // Validation
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid HH:MM format, must be number");
    }
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error("Invalid HH:MM format, must be somewhere between 00:00 and 23:59");
    }

    // We guccci
    return new MilitaryTime(hours, minutes);
  }

  toString() {
    // always HH:MM
    let minutes = this._minutes;
    let hours = this._hours;
    if (minutes < 10) {
      minutes = minutes.toString();
      minutes = '0' + minutes;
    }
    if (hours < 10) {
      hours = hours.toString();
      hours = '0' + hours;
    }
    return `${hours}:${minutes}`;
  }

  /**
   * 
   * @param {MilitaryTime} otherTime 
   */
  isEarlierThan(other_time) {
    if (other_time.hours < this.hours) { return false; }
    if (other_time.hours > this.hours) { 
      return true;
    } else {
      if (other_time.minutes < this.minutes) { return false; }
      if (other_time.minutes > this.minutes) { 
        return true; 
      } else { return false; }
    }
  }

  addMinutes(minutes) {
    let result_minutes = this.minutes + minutes;
    let result_hours = (this.hours + Math.floor(result_minutes / 60)) % 24;
    result_minutes %= 60;
    
    return (new MilitaryTime(result_hours, result_minutes));
  }

  // Convert HH:MM to total minutes as an int
  toMinutes() {
    return (this.hours * 60 + this.minutes);
  }
}

export { MilitaryTime };
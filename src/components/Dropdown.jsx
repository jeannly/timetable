
import '../css/styles.scss';

const Dropdown = (props) => {
  const dropdown_arrow_svg = (
<svg
  width="18"
  height="26"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
    fill="#0074D9"
  />
</svg>
  );

  return (
    <div className="dropdown">
      {dropdown_arrow_svg}
      <select onChange={props.handleDropdownChange}>
        <option></option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
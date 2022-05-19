const Select = (props) => {
  return (
    <select onChange={props.optionChange} className={`select--field ${props.isDarkMode ? "input--dark":""}`}>
      <option defaultValue>all</option>
      <option>Europe</option>
      <option>Asia</option>
      <option>americas</option>
      <option>Africa</option>
      <option>Oceania</option>
    </select>
  )
}
export default Select;
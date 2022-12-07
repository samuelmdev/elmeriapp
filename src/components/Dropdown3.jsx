import React, { useState } from 'react';
import Select from 'react-select';

const Dropdown3 =(props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log('lista on dropdownissa', props.list)
  let options = []
  props.list.forEach((item) => options.push([{value: `${item.obj}`, label: `${item.obj}`}]))
  
  console.log('mapattu lista:', props.list.map((item) => item.obj))
  console.log('options lista: ', options)

  const handleChange = (e) => {
    setSelectedOption(e)
    props.handleObsChange(selectedOption)
    setSelectedOption(null)
  }

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={(e) => handleChange(e.target)}
        options={options}
      />
    </div>
  );
}

export default Dropdown3
import React, { useState } from 'react';
import Select from 'react-select';

const Dropdown3 =(props, {setLab}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  let options = props.list


  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setLab}
        options={options}
      />
    </div>
  );
}

export default Dropdown3
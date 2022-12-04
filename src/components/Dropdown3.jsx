import React, { useState } from 'react';
import Select from 'react-select';

const Dropdown3 =({list}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log('lista on dropdownissa', list)
  let options = []
  list.forEach((item) => options.push([{value: `${item.obj}`, label: `${item.obj}`}]))
  
  console.log('mapattu lista:',list.map((item) => item.obj))
  console.log('options lista: ', options)

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}

export default Dropdown3
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Select from 'react-select';

const Dropdown2 = forwardRef((props, _ref) => {
  const [selectedOption, setSelectedOption] = useState(null);
  let options = props.list

  useImperativeHandle(_ref, () => ({
    getChildOption: () => {
      return selectedOption;
    }
  }))

  return (
    <div className='flex justify-center w-96'>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
})

export default Dropdown2
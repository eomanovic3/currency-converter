/**
 *
 * CurrencySelect
 *
 */

import React from 'react';
import Select from "react-select";
import * as PropTypes from "prop-types";

class CurrencySelect extends React.PureComponent {
  render(){
    const {options, onChangeCurrencyIHave, onChangeCurrencyIWant} = this.props;
    const formatOptionLabel = ({ value, label, image }) => (
        <div className="d-flex justify-content-between">
          <div><img className='img-responsive img-filter'
                    src={image}
                    style={{ width: '20px', height: '20px', marginRight:'5px'}}
                    alt=""/>{label}</div>
          <div style={{color:'#ccc', marginLeft:'5px'}}>{value}</div>
        </div>
    );
    return (
        <Select
            defaultValue={options[0]}
            formatOptionLabel={formatOptionLabel}
            options={options}
            onChange={onChangeCurrencyIHave ? onChangeCurrencyIHave: onChangeCurrencyIWant}
        />
    );
  }
}

CurrencySelect.propTypes = {
  onChangeCurrencyIHave: PropTypes.func,
  onChangeCurrencyIWant: PropTypes.func,
};

export default CurrencySelect;

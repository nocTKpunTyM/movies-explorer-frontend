import './FilterCheckbox.css';
import {useState} from 'react';

function FilterCheckbox({switchBox, handleSwitch}) {
    const [switchNow, setSwitchNow] = useState(switchBox || false);
    function handleSwitchChange(event) {
        setSwitchNow(!switchNow);
            handleSwitch(!switchNow); 
    }
    return (
            <label className="checkbox-ios">
                <input type="checkbox" checked={switchNow} onChange={handleSwitchChange}></input>
                <span className="checkbox-ios-switch"></span>
            </label>
    );
}

export default FilterCheckbox;
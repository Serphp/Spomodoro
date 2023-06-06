import { useContext, useEffect, useState } from "react";
//import { PauseIcon } from "../src/assets/pause"
import { ResetIcon } from "../src/assets/reset"
import { TimerContext } from "../src/Context/TimerContex"
import { EditIcon } from "../src/assets/edit";
import { ConfigIcon } from "../src/assets/config";

export const Config = () => {
    const { resetTimer, 
        toggleTimer,
        showCode,
        ShowConfig,
        setShowCode,
        setShowConfig
    } = useContext(TimerContext);

    const handleShowCode = () => {
        setShowCode(!showCode);
    };

    const handleShowConfig = () => {
        setShowConfig(!ShowConfig);
    };

    // console.log(showCode);
    // console.log(ShowConfig);

    return (
        <>
            <aside className='config'>

                
            <article className='box2'>
            <button onClick={resetTimer} className="btnfixed" title='reset'>
            <div className="iconop"> 
            <ResetIcon/>
            </div>
            </button>
            <button className='btnfixed' onClick={handleShowCode} title='edit time'> 
            <div className="iconop">
            <EditIcon/>
            </div>
            </button>

            <button className='btnfixed' onClick={handleShowConfig} title='increase font size'>
            <div className="iconop">
            <ConfigIcon/>
            </div>
            </button>


            <button className='btnfixed' onClick={resetTimer} title='Reset'>
            <div className="iconop"> 
            <ResetIcon/>
            </div>
            </button>
            {/* <button className='btnicon' onClick={toggleTimer} title='Pause'>
            <div className="iconop"> 
            <PauseIcon/>
            </div>
            </button> */}
            </article>

            </aside>
        </>
    )
}
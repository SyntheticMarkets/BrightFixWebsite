import {
    useEffect,
    useRef
} from 'react';
import $ from 'jquery'

export default function useClickOutside(callback, test) {
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            callBacksArray.push({
                callback,
                element: container.current
            })
        }

        return () => {
            callBacksArray = callBacksArray.filter(oldCallback => {
                return oldCallback !== callback
            })
        };
    });

    return container
}

let callBacksArray = []
export const clickOnDetectBox = (e, element) => {
    let elm = element ? element : e && e.target ? e.target : null
    callBacksArray = callBacksArray.filter((item) => {
        if (!item.element.contains(elm)) {
            item.callback(elm)
            return false
        }

        return true
    })
}

$(document).click((e) => {
    if (e && e.target && e.target && e.target.id !== 'fixMeDetectBox') {
        clickOnDetectBox(e)
    }
})
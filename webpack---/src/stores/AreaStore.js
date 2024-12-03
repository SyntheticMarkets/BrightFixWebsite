import {
    createContext
} from 'react'
import {
    decorate,
    observable,
    action
} from 'mobx'
import {
    StyleStoreClass
} from './StyleStore'
import {
    getPosition
} from '../components/utils'

class AreaStore {
    width = '100px';
    height = '100px';
    top = '100px';
    left = '100px';
    visible = false;
    isPadding = false

    hideArea() {
        this.visible = false
    }

    calculateArea(type) {
        let elm = StyleStoreClass.elm
        if (!elm) {
            return {}
        }

        let computedStyles = window.getComputedStyle(elm)

        let elmPosition = getPosition(elm)

        let elmWidth = parseInt(elmPosition.width) //parseInt(computedStyles.width) + parseInt(computedStyles.paddingLeft) + parseInt(computedStyles.paddingRight) + parseInt(getComputedStyle(elm).borderRightWidth) + parseInt(getComputedStyle(elm).borderLeftWidth)
        let elmHeight = parseInt(elmPosition.height) //parseInt(computedStyles.height) + parseInt(computedStyles.paddingTop) + parseInt(computedStyles.paddingBottom) + parseInt(getComputedStyle(elm).borderTopWidth) + parseInt(getComputedStyle(elm).borderBottomWidth)


        if (type.includes('padding')) {
            this.isPadding = true
        } else {
            this.isPadding = false
        }

        if (type === 'padding-top') {
            this.width = elmWidth
            this.height = computedStyles.paddingTop
            this.top = elmPosition.top
            this.left = elmPosition.left
        } else if (type === 'padding-bottom') {
            this.width = elmWidth
            this.height = computedStyles.paddingBottom
            this.top = parseInt(elmPosition.top) + parseInt(elmHeight) - parseInt(this.height) + 'px'

            this.left = elmPosition.left
        } else if (type === 'padding-left') {
            this.width = computedStyles.paddingLeft
            this.height = elmHeight
            this.top = elmPosition.top
            this.left = elmPosition.left
        } else if (type === 'padding-right') {
            this.width = computedStyles.paddingRight
            this.height = elmHeight
            this.top = elmPosition.top
            this.left = parseInt(elmPosition.left) + parseInt(elmWidth) - parseInt(this.width)
        } else if (type === 'margin-top') {
            this.width = elmWidth
            this.height = computedStyles.marginTop
            this.top = parseInt(elmPosition.top) - parseInt(this.height)
            this.left = elmPosition.left
        } else if (type === 'margin-bottom') {
            this.width = elmWidth
            this.height = computedStyles.marginBottom
            this.top = parseInt(elmPosition.top) + parseInt(elmHeight)
            this.left = elmPosition.left
        } else if (type === 'margin-left') {
            this.width = computedStyles.marginLeft
            this.height = elmHeight
            this.top = parseInt(elmPosition.top)
            this.left = parseInt(elmPosition.left) - parseInt(computedStyles.marginLeft)
        } else if (type === 'margin-right') {
            this.width = computedStyles.marginRight
            this.height = elmHeight
            this.top = parseInt(elmPosition.top)
            this.left = parseInt(elmPosition.left) + parseInt(elmWidth) //+ parseInt(computedStyles.marginRight)
        }

        this.visible = true
    }
}

decorate(AreaStore, {
    height: observable,
    width: observable,
    top: observable,
    left: observable,
    visible: observable,
    isPadding: observable,
    calculateArea: action,
    hideArea: action
})

export let AreaStoreClass = new AreaStore()
export default createContext(AreaStoreClass)

// AreaStoreClass.calculateArea('margin-bottom')
// @ts-check
import { blank } from "./base_layout.js";

export let ssrs = {};
/**
 * @type {[]|[ssr]}
 */
export let updatables = [];

/**
 * Dictionary of selectables. The key is id.
 */
export let selectables = {};
export let autos = {};


/**
 * @type {[]|[String]} - Ids of selected ssr objects
 */
export let seletedId = [];
export let tagSeletedId = {};


export function sure(){
    return true;
}

export class ssr{
    /** 
     * @param {String} id
     * @param {HTMLElement} display
    */
    constructor(id, display) {
        // Register in master dictionary for optimal access
        ssrs[id] = this;

        /** @type {String} id - SSR 고유 id */
        this.id = id;
        
        // Display
        let label = document.createElement('label');
        label.htmlFor = id;
        label.appendChild(display);
        const a_flag = document.createElement('a');
        a_flag.id = id;
        label.appendChild(a_flag);

        /** @type {HTMLLabelElement} 외관. selectable 옵션 때문에 label로 둘러쌓여 있음. */
        this.display = label;

        /** @type {undefined|Function} - HtmlElement를 리턴하는 함수. display 업데이트가 필요할 경우 사용 */
        this.updatable = undefined;

        /** @type {boolean} 선택 가능한 ssr object인가? */
        this.selectable = false;

        /** @type {undefined|HTMLInputElement} - 본인의 input 객체*/
        this.selectableObject = undefined;

        /** @type {Function} */
        this.requirements = sure;

        /** @type {object} states */
        this.states = {};

    }

    /**
     * @param {Function} f - return html element
     * @returns 
     */
    setUpdatable(f) {
        updatables.push(this);
        this.updatable = f;

        return this;
    }
    /**
     * Automated function of setUpdatable()
     */
    showWhenRequirementsFulfilled(){
        if(this.requirements==undefined) console.error('Requirements are undefined!');

        this.hiddenDisplay = this.display.childNodes[1];
        this.setUpdatable(()=>{
            if(this.requirements()) return this.hiddenDisplay;
		    return blank();
        });
        return this;
    }

    /**
     * @param {boolean} checked - 초기 상태가 체크되어있는가?
     * @returns {ssr}
     */
    setSelectable(checked=false, type='checkbox') {
        selectables[this.id] = this;
        this.selectable = true;

        let checkboxObject = document.createElement('input');
        checkboxObject.type = type;
        checkboxObject.id = this.id;
        checkboxObject.checked = checked;
        checkboxObject.className = 'hidden';

        checkboxObject.onchange = checkRequirement;

        this.selectableObject = checkboxObject;
        this.display.childNodes[0].before(checkboxObject);

        this.display.htmlFor = this.id;

        /** @type {String} */
        this.statisticName = this.id;
        try {
            if(this.display.childNodes[1] instanceof HTMLTableElement){
                this.statisticName += '_'+this.display.childNodes[1].firstChild.firstChild.firstChild.innerHTML;
            }
        } catch {}
        
        

        return this;
    }

    setState(state, value) {
        this.states[state] = value;
        return this
    }

    /** 
     * @param {function} f - 조건을 반환하는 함수 
     * @param {boolean} auto - 조건을 충족했을 때, 자동으로 선택될 것인가?
     */
    setRequirement(f, auto=false) {
        // 선택 가능한 오브젝트가 아닐 경우.
        if (!this.selectable) { console.warn('This is not a selecable object!'); }

        this.requirements = f;
        if (auto) { autos[this.id] = this; }

        return this;
    }

    /**
     * 주로 Radio를 위한 name 설정.
     * @param {String} name 
     */
    setName(name) {
        this.selectableObject.name = name;
        return this;
    }
    
    /**
     * @param {String} tag - 기존의 그룹과 같은 기능. Class 인자에 추가됨.
     */
    addTag(tag) {
        if (tagSeletedId[tag]==undefined) tagSeletedId[tag] = [];

        this.display.classList.add(tag);
        return this;
    }


    /**
     * @param {String} tag - 기존의 그룹과 같은 기능. Class 인자에 추가됨.
     */
    removeTag(tag) {
        this.display.classList.remove(tag);
        return this;
    }

    append(destination){
        destination.appendChild(this.display);
        return this;
    }

    before(destination){
        destination.insertBefore(this.display);
        return this;
    }
}



/**
 * @param {String} id - ssr id
 */
export function addToSelected(id){
    seletedId.push(id);

    // update tagSeleted
    const classList = selectables[id].display.className.split(' ');
    if (classList==[]) { return; }
    for(let i in classList){
        if (tagSeletedId[classList[i]]==undefined) tagSeletedId[classList[i]] = [];
        tagSeletedId[classList[i]].push(id);
    }
}

/**
 * @param {String} id - ssr id
 */
export function removeFromSelected(id){
    /**
     * Remove element from Array
     * @param {Array} arr 
     * @param {*} element 
     */
    function removeFromArr(arr, element) {
        const idx = arr.indexOf(element)
        if (idx > -1) arr.splice(idx, 1) }


    // update seletedId
    removeFromArr(seletedId, id)

    // update tagSeletedId
    const classList = selectables[id].display.className.split(' ');
    if (classList==[]) { return; }
    for(let i in classList){
        removeFromArr(tagSeletedId[classList[i]], id)
    }
}


/**
 * @param {Event} event 
 */
export function checkRequirement(event){
    /**
     * requirements를 확인하는 nested function. 성능 상의 차이가 거의 없다고 해서 걍 쓴다.
     * @param {ssr} obj 
     * @param {number} i 
     * @returns {boolean}
     */
    function isFulfilled(obj, i=1){
        //console.log('isFulfilled()');

        let req;
        try{req = obj.requirements()==true}
        catch {req=false;}
        
        // if not 
        if (obj.selectableObject.checked==true && req!=true){

            // Error and reject animation
            //console.log(`(${i}) Requiremets aren\'t fulfilled!`);
            obj.display.children[1].addEventListener('animationend', function() {
                this.style.animation = null; });

            obj.display.children[1].style.animation = 'reject 0.4s linear';
            

            // Back to original state && Update seletedId arr
            obj.selectableObject.checked=false;
            removeFromSelected(obj.id);

            return false;
        }
        return true;
    }

    // Update seletedId arr
    const obj = selectables[event.target.id];
    const obj_button = obj.selectableObject;

    if (obj_button.checked) addToSelected(obj.id);
    else removeFromSelected(obj.id);

    // single object에 대한 체크. 불충족의 경우, 취소 후 함수 종료.
    if (!isFulfilled(obj)){
        update();
        return false;
    }

    if (obj_button.name!=''){
        // 자신이 아닌 같은 이름을 가진 radio -> 제거
        seletedId.forEach((id)=>{
            if(id!==obj.id && (obj_button.name==selectables[id].selectableObject.name)){
                selectables[id].selectableObject.checked = false;
                removeFromSelected(id);
            }
        });
    }

    // single object에 문제가 없는 경우, 나머지 objects에 대해 요구사항 검토
    function checkAll(){
        let noProblem = true;
        for(let key in selectables){
            if(!isFulfilled(selectables[key], 2)) {noProblem = false; }
        }
        return noProblem;
    }
    // Chain requirement check
    while(!checkAll()) {
        //console.log('(3) Canceled by chain requirement check.');
    }
    update();
}


/**
 * 이벤트마다 호출되는 함수. 업데이트할 내역이 있으면 여기에 기입
 */
export function update() {
    // Initialize values
    beforeUpdate();

    // Refresh Updatables
    updatables.forEach(element => {
        // Get updated html element
        const result = element.updatable();
        if(result==undefined) return;

        const display = element.display;
        if (element.selectable==true){
            // if(same before) return
            if(display.childNodes[1].outerHTML==result.outerHTML) return;

            display.childNodes[1].outerHTML = result.outerHTML;

        } else {
            display.removeChild(display.childNodes[0]);
            display.prepend(result);
        }
            
    });

    afterUpdate();
}

export function beforeUpdate(){
}

export function afterUpdate(){

}


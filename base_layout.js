/**
 * Replace '\n' to '<br>' tag
 * @param {String} txt 
 * @returns {String}
 */
export function fix_enter(txt){
    return txt.replaceAll('\n', '<br>');
}
export function blank(){
    let div = document.createElement('div');
    div.width=0;
    div.height=0;
    return div;
}
/**
 * Preset of HtmlElement - p
 * @param {String} txt 
 * @returns {HTMLHeadElement}
 */
export function p(txt){
    let element = document.createElement('p');
    element.innerHTML = fix_enter(txt);
    return element;
}

/**
 * Preset of HtmlElement - th for table
 * @param {String} txt 
 * @returns {HTMLHeadElement}
 */
export function thead(txt){
    let element = document.createElement('thead');
    let row = document.createElement('tr');
    let head = document.createElement('th');

    head.innerHTML = fix_enter(txt);
    row.appendChild(head);
    element.appendChild(row);

    return element;
}

/**
 * Preset of HtmlElement - tr for table
 * @param {String} fix_enter(txt); 
 * @returns {HTMLTableRowElement}
 */
export function row(txt){
    let row = document.createElement('tr');
    let text = document.createElement('td');

    text.innerHTML = fix_enter(txt);
    row.appendChild(text);
    return row;
}

/**
 * Preset of HtmlElement - table
 * @param {[HTMLElement]} childs
 * @returns {HTMLTableElement}
 */
export function table(head, body){
    let table = document.createElement('table');
    table.appendChild(head);

    let tbody = document.createElement('tbody');
    body.forEach(element => {
        tbody.appendChild(element);
    });
    table.appendChild(tbody);

    let div = document.createElement('div');
    div.appendChild(table)
    return table;
}

/**
 * Return image element
 * @param {String} path 
 * @returns {HTMLImageElement}
 */
export function img(path){
    let img = document.createElement('img');
    img.crossOrigin = "Anonymous";
    
    // I hate CORS
    fetch(path).then(response => response.blob()).then(blob => {
        img.src = URL.createObjectURL(blob);
    });

    return img;
}

/**
 * Return table row contains image element.
 * @param {string} path
 * @returns {HTMLTableRowElement}
 */
export function imgRow(path){
    let row = document.createElement('tr');
    let image = document.createElement('td');
    image.appendChild(img(path));
    row.appendChild(image);
    return row;
}

export function line(style='line'){
    let l = document.createElement('hr');
    l.className = style;
    return l;
}

export function link(id, text, type=''){
    let newlink = document.createElement('a');
    newlink.href = '#'+id;

    newlink.className = type;

    if (type == 'title_link'){
        newlink.innerHTML = text + '<br>';
    } else if (type == 'subtitle_link'){
        newlink.innerHTML = ' - ' + text+'<br>';
    } else {
        newlink.innerHTML = text;
    }

    return newlink;
}

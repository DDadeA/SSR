

/**
 * 
 * @param {String} fileName 
 * @param {boolean} random 
 */
function load_script(fileName, random=true) {
    let script = document.createElement('script');
    script.src = fileName;

    if(!fileName.endsWith('.js'))  { script.src+='.js' }
    if(random)                     { script.src += '?v='+Math.random(); }

    document.head.append(script);
}

/**
 * 
 * @param {String} fileName 
 * @param {boolean} random 
 */
function load_sheet(fileName, random=true){
    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = fileName;
    stylesheet.crossorigin = "anonymous";
    stylesheet.referrerpolicy = "no-referrer";

    if(!fileName.endsWith('.css'))  { stylesheet.href+='.css' }
    if(random)                      { stylesheet.href += '?v=' + Math.random(); }
    
    document.head.appendChild(stylesheet);
}

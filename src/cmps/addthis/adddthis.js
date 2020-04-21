export default {
    start: () => {
        console.log('in the add this')
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e9dfd4b8758450b";
        document.body.appendChild(script);
    }
}
let map_container = document.querySelector('#map_container');
let options_map = {
    once: true,
    passive: true,
    capture: true
};
map_container.addEventListener('click', start_lazy_map, options_map);
map_container.addEventListener('mouseover', start_lazy_map, options_map);
map_container.addEventListener('touchstart', start_lazy_map, options_map);
map_container.addEventListener('touchmove', start_lazy_map, options_map);
let map_loaded = false;

function start_lazy_map() {
    if (!map_loaded) {
        let map_block = document.querySelector('#ymap_lazy');
        map_loaded = true;
        map_block.setAttribute('src', map_block.getAttribute('data-src'));
        map_block.removeAttribute('data_src');
    }
}
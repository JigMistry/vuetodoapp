import Sortable from 'sortablejs/modular/sortable.core.esm.js';

const SortableDirective = {
    inserted( el, binding, vnode ) {
        new Sortable(el, {
            animation: 500,
            scroll: true,
            onUpdate: function (evt) {
                vnode.data.on.sorted(evt);
            }
        });
    }
};
export default SortableDirective;
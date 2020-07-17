import Sortable from 'sortablejs/modular/sortable.core.esm.js';

const SortableDirective = {
    inserted( el, binding, vnode ) {
        new Sortable(el, {
            onUpdate: function (evt) {
                vnode.data.on.sorted(evt);
            }
        });
    }
};
export default SortableDirective;
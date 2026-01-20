(() => {
    'use strict';

    Vue.component('select2', {
        props: [ 'value', 'options', 'search' ],
        template: '<select><slot></slot></select>',
        mounted: function () {
            let vm = this;
            $(this.$el)
                .select2({
                    minimumResultsForSearch: this.search ? 0 : -1,
                    data: this.options,
                    theme: 'bootstrap',
                    width: 'auto',
                    language: 'ru',
                })
                .val(this.value).change()
                .on('change', function () {
                    vm.$emit('input', this.value);
                });
        },
        watch: {
            value: function () {
                $(this.$el).val(this.value).change();
            },
            options: function () {
                $(this.$el).select2({
                    minimumResultsForSearch: this.search ? 0 : -1,
                    data: this.options,
                    theme: 'bootstrap',
                    width: 'auto',
                    language: 'ru',
                });
            },
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy');
        },
    });
})();
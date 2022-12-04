<template lang="pug">
table(:class="tableClass")
    thead
      tr
        th(v-for="field in normalizedFields" :key="field.key" :style="field.thStyle") {{ field.label }}
    tbody
      tr(v-for="item, index in items" :key="index")
        td(v-for="field in normalizedFields" :key="field.key" v-if="getRowspan(item, field.key)" :rowspan="getRowspan(item, field.key)")
          slot(:name="field.key" v-bind:item="item") {{ item[field.key] }}
</template>


<script>
  import _ from 'lodash';

  export default {
    computed: {
      tableClass() {
        const classes = ['table'];
        if (this.striped) classes.push('table-striped');
        if (this.hover) classes.push('table-hover');
        if (this.fixed) classes.push('table-fixed');
        return classes;
      },

      normalizedFields() {
        let { fields } = this;

        if (!Array.isArray(fields)) {
          fields = _.map(fields, (field, key) => {
            if (field !== Object(field)) field = { label: field };
            return { ...field, key };
          });
        }

        fields = fields.map((field) => {
          if (field !== Object(field)) field = { key: field, label: field };
          return field;
        });

        return fields;
      },
    },

    methods: {
      getRowspan(item, key) {
        return _.get(item, ['rowspan', key], 1);
      },
    },

    props: [
      'fields', 'items',
      'fixed', 'hover', 'striped',
    ],
  };
</script>


<style lang="sass" scoped>
  .table-fixed
    table-layout: fixed
</style>


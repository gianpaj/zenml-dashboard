export const searchParamConstants = [
  {
    column: {
      selectedValue: { value: 'id', label: 'ID', type: 'string' },
    },
    contains: {
      selectedValue: {
        value: 'contains',
        label: 'Contains',
        type: 'string',
      },
    },
  },
  {
    column: {
      selectedValue: { value: 'name', label: 'Name', type: 'string' },
    },
    contains: {
      selectedValue: {
        value: 'contains',
        label: 'Contains',
        type: 'string',
      },
    },
  },

  {
    column: {
      selectedValue: {
        value: 'resource_id',
        label: 'Resource Id',
        type: 'string',
      },
    },
    contains: {
      selectedValue: {
        value: 'contains',
        label: 'Contains',
        type: 'string',
      },
    },
  },
];

export const getInitialFilterStateForConnectors = () => {
  const initialFilterState = {
    column: {
      selectedValue: {
        value: '',
        label: '',
        type: '',
      },
      options: [
        {
          value: 'id',
          label: 'ID',
          type: 'string',
        },
        {
          value: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          value: 'connector_type',
          label: 'Connector Type',
          type: 'string',
        },
        {
          value: 'resource_type',
          label: 'Resource Type',
          type: 'string',
        },
        {
          value: 'resource_id',
          label: 'Resource ID',
          type: 'string',
        },
        {
          value: 'connector_type',
          label: 'Connector type',
          type: 'string',
        },
        {
          value: 'auth_method',
          label: 'Authentication',
          type: 'string',
        },
        {
          value: 'user_id',
          label: 'Author',
          type: 'string',
        },
        {
          value: 'is_shared',
          label: 'Shared',
          type: 'boolean',
        },
        {
          value: 'created',
          label: 'Created at',
          type: 'date',
        },
      ],
    },
    contains: {
      selectedValue: {},
      options: [
        {
          value: 'contains',
          label: 'Contains',
          type: 'string',
        },
        {
          value: 'startswith',
          label: 'Start With',
          type: 'string',
        },
        {
          value: 'endswith',
          label: 'End With',
          type: 'string',
        },
        {
          value: 'equals',
          label: 'Equal',
          type: 'string',
        },
        {
          value: 'not_equal',
          label: 'Not Equal',
          type: 'string',
        },
        {
          value: 'gt',
          label: 'Greater than',
          type: 'date',
        },
        {
          value: 'lt',
          label: 'Less than',
          type: 'date',
        },
        {
          value: 'gte',
          label: 'Greater than and Equal',
          type: 'date',
        },
        {
          value: 'lte',
          label: 'Less than and Equal',
          type: 'date',
        },
        {
          value: 'equal_date',
          label: 'Equals',
          type: 'date',
        },
        {
          value: 'true',
          label: 'True',
          type: 'boolean',
        },
        {
          value: 'false',
          label: 'False',
          type: 'boolean',
        },
      ],
    },
    filterValue: '',
  };
  return JSON.parse(JSON.stringify(initialFilterState));
};

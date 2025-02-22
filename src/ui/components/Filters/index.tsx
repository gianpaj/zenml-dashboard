import React, { forwardRef, useEffect, useState } from 'react';
import {
  Box,
  FlexBox,
  FormDropdownField,
  SearchInputField,
  FormTextField,
  icons,
  Paragraph,
} from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { formatDateToDisplayWithoutTime } from '../../../utils';
import DatePicker from 'react-datepicker';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './filter.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useDispatch, useSelector } from '../../hooks';
import {
  organizationSelectors,
  pipelineSelectors,
  workspaceSelectors,
  stackSelectors,
} from '../../../redux/selectors';
import {
  organizationActions,
  pipelinesActions,
  stacksActions,
} from '../../../redux/actions';

const FilterComponent = ({
  children,
  filters,
  searchColumns,
  setFilter,
  getInitials,
}: any) => {
  const dispatch = useDispatch();
  const [applyFilter, setApplyFilter] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [showInBar, setShowInbar] = useState(false);
  const members = useSelector(organizationSelectors.myMembers);
  const pipelines = useSelector(pipelineSelectors.myPipelines);
  const stacks = useSelector(stackSelectors.mystacks);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  useEffect(() => {
    return () => {
      localStorage.setItem('logical_operator', JSON.stringify('and'));
    };
  }, []);
  function handleChange(filter: any, key: string, value: string) {
    filter[key].selectedValue = filter[key].options.filter(
      (option: any) => option.value === value,
    )[0];
    if (key === 'contains' && (value === 'true' || value === 'false')) {
      filter.filterValue = value;
      setFilter([...filters]);
      return;
    }

    if (key === 'column') {
      filter.contains.selectedValue = { value: '', label: '', type: '' };
      filter.filterValue = '';
    }

    setFilter([...filters]);
    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }

  function handleChangeForStatus(filter: any, value: string) {
    filter['contains'].selectedValue = filter['contains'].statusOption.filter(
      (option: any) => option.value === value,
    )[0];

    filter.filterValue = value;

    setFilter([...filters]);
    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }
  function handleChangeForShared(filter: any, key: string, value: string) {
    filter[key].selectedValue = filter[key].options.filter(
      (option: any) => option.value === value,
    )[0];

    if (key === 'contains' && (value === 'true' || value === 'false')) {
      filter.filterValue = value;
      setFilter([...filters]);
      return;
    }

    setFilter([...filters]);
    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }
  function handleChangeForSearchable(field: any, value: string) {
    field.filterValue = value;

    setFilter([...filters]);
  }
  function callActionForUsers(name: string, newEvent: any) {
    if (name) {
      dispatch(organizationActions.getMembers({ name: 'contains:' + name }));
    } else if (newEvent.action === 'menu-close') {
      dispatch(organizationActions.getMembers({}));
    }
  }

  function callActionForPipelines(name: string, newEvent: any) {
    if (name) {
      dispatch(
        pipelinesActions.getMy({
          workspace: selectedWorkspace,
          // name: 'contains:' + name,
        }),
      );
    } else if (newEvent.action === 'menu-close') {
      dispatch(pipelinesActions.getMy({ workspace: selectedWorkspace }));
    }
  }
  function callActionForStacks(name: string, newEvent: any) {
    if (name) {
      dispatch(
        stacksActions.getMy({
          workspace: selectedWorkspace,
          // name: 'contains:' + name,
        }),
      );
    } else if (newEvent.action === 'menu-close') {
      dispatch(stacksActions.getMy({ workspace: selectedWorkspace }));
    }
  }

  function handleValueFieldChange(field: any, value: string) {
    field.filterValue = value;

    setFilter([...filters]);

    localStorage.setItem('logical_operator', JSON.stringify('and'));
  }

  function addAnotherFilter() {
    setFilter([...filters, getInitials()]);
  }

  function hanldeDelete(index: number) {
    filters.splice(index, 1);
    setFilter([...filters]);
  }

  const selectStyles = {
    control: (base: any) => ({
      width: '146px',
      borderRadius: 0,
      border: '1px solid grey',
      height: '40px',
      fontSize: '12px',
      display: 'flex',
      fontFamily: 'Rubik',

      // ...base,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '12px',
      fontFamily: 'Rubik',
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: '12px',
      fontFamily: 'Rubik',
    }),
  };

  function checkForName(typeName: string, value: string) {
    if (typeName === 'Author') {
      const member = members.filter((item) => item.id === value);

      return member[0].name;
    }
    if (typeName === 'Pipeline') {
      const pipeline = pipelines.filter((item) => item.id === value);
      return `${pipeline[0].name} ( v${pipeline[0].version} )`;
    }
    if (typeName === 'Stack Name') {
      const stack = stacks.filter((item) => item.id === value);
      return stack[0].name;
    } else {
      return value;
    }
  }
  const authorOptions = members.map((item: any) => {
    return {
      label: item.name as string,
      value: item.id as string,
    };
  }) as any;
  const pipelinesOptions = pipelines.map((item: any) => {
    return {
      label: `${item.name} ( v${item.version})` as string,
      value: item.id as string,
    };
  }) as any;
  const stacksOptions = stacks.map((item: any) => {
    return {
      label: item.name as string,
      value: item.id as string,
    };
  }) as any;
  const valueField = (filter: any) => {
    switch (filter?.contains.selectedValue.type) {
      case 'string':
        return (
          <Box style={{ width: '146px' }}>
            <FormTextField
              data-testid="filter-value-input"
              label={''}
              placeholder={''}
              value={filter?.filterValue}
              onChange={(value: string) =>
                handleValueFieldChange(filter, value)
              }
              style={{
                borderRadius: 0,
                width: '146px',
                fontSize: '12px',
                color: '#424240',
              }}
            />
          </Box>
        );

      case 'date':
        const ExampleCustomInput = forwardRef(
          ({ value, onClick }: any, ref: any) => (
            <div
              className={`${styles.datePickerField} justify-content-between`}
              onClick={onClick}
              ref={ref}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'Rubik',
                }}
              >
                {value}
              </div>
              <div>
                <icons.calendar size={iconSizes.md} color={iconColors.grey} />
              </div>
            </div>
          ),
        );

        return (
          <Box style={{ width: '146px' }}>
            <DatePicker
              selected={filter?.filterValue}
              onChange={(value: any) => {
                handleValueFieldChange(filter, value);
              }}
              customInput={<ExampleCustomInput />}
            />
          </Box>
        );
      default:
        return (
          <Box style={{ width: '146px' }}>
            <FormTextField
              label={''}
              placeholder={''}
              disabled
              value={filter?.filterValue}
              style={{
                borderRadius: 0,
                width: '146px',
                fontSize: '12px',
                color: '#424240',
              }}
            />
          </Box>
        );
    }
  };

  function handleValueFieldChangeOnSearch(value: string) {
    if (value) {
      const searchParam = searchColumns.map((item: any) => ({
        ...item,
        filterValue: value,
      }));

      setFilter(searchParam);

      // setFilter([
      //   {
      //     column: {
      //       selectedValue: { value: 'id', label: 'ID', type: 'string' },
      //     },
      //     contains: {
      //       selectedValue: {
      //         value: 'contains',
      //         label: 'Contains',
      //         type: 'string',
      //       },
      //     },
      //     filterValue: value,
      //   },
      //   {
      //     column: {
      //       selectedValue: { value: 'name', label: 'Name', type: 'string' },
      //     },
      //     contains: {
      //       selectedValue: {
      //         value: 'contains',
      //         label: 'Contains',
      //         type: 'string',
      //       },
      //     },
      //     filterValue: value,
      //   },

      //   {
      //     column: {
      //       selectedValue: {
      //         value: 'version',
      //         label: 'Version',
      //         type: 'string',
      //       },
      //     },
      //     contains: {
      //       selectedValue: {
      //         value: 'contains',
      //         label: 'Contains',
      //         type: 'string',
      //       },
      //     },
      //     filterValue: value,
      //   },
      //   {
      //     column: {
      //       selectedValue: {
      //         value: 'scope',
      //         label: 'Scope',
      //         type: 'string',
      //       },
      //     },
      //     contains: {
      //       selectedValue: {
      //         value: 'contains',
      //         label: 'Contains',
      //         type: 'string',
      //       },
      //     },
      //     filterValue: value,
      //   },
      // ]);
      localStorage.setItem('logical_operator', JSON.stringify('or'));
    } else {
      setFilter([getInitials()]);
      localStorage.setItem('logical_operator', JSON.stringify('and'));
    }
  }

  function getSecondColumnOptions(options: any, type: any) {
    return options?.filter((o: any) => o?.type === type);
  }
  const validFilters = filters.filter((item: any) => item.filterValue);

  return (
    <FlexBox.Column fullWidth data-testid="filter-component">
      <div className={styles.inputRow}>
        <Box marginRight="md" marginTop="md" style={{ marginTop: '70px' }}>
          <SearchInputField
            data-testid="search-input"
            placeholder={'Search'}
            value={searchText ? filters[0]?.filterValue : ''}
            disabled={applyFilter || showInBar}
            onChange={(value: string) => {
              setSearchText(value ? true : false);
              handleValueFieldChangeOnSearch(value);
            }}
          />
        </Box>

        <FlexBox
          fullWidth
          className="rounded rounded-4 p-2 align-item-center"
          style={{
            border: searchText ? '' : '1px solid #C9CBD0',
            backgroundColor: searchText ? '#E9EAEC' : '',
          }}
        >
          <Box
            data-testid="filter-icon"
            onClick={() => {
              !searchText && setApplyFilter(!applyFilter);
            }}
            style={{
              width: '33px',
              height: '28px',

              borderRadius: '4px',
            }}
          >
            <icons.funnelFill
              style={{ padding: '5px 0px 0px 7px' }}
              size={iconSizes.sm}
              color={iconColors.primary}
            />
          </Box>
          <Box
            style={{ padding: '5px 0px 0px 7px', display: 'flex' }}
            className="text-muted h5"
          >
            {/* Filter your stack */}
            {!applyFilter && !filters[0]?.filterValue ? (
              <Paragraph className={styles.filterplaceholder}>
                Filter list
              </Paragraph>
            ) : filters[0]?.filterValue && !applyFilter && !searchText ? (
              validFilters.map((filter: any, index: number) => {
                return (
                  <FlexBox.Row key={index} className={styles.tile}>
                    <Box
                      onClick={() => {
                        if (filters.length === 1) {
                          setShowInbar(false);
                        }
                        hanldeDelete(index);
                      }}
                    >
                      {`${filter?.column.selectedValue.label} ${
                        filter?.column.selectedValue.label === 'Shared' ||
                        filter?.column.selectedValue.label === 'Status'
                          ? 'is'
                          : filter?.column.selectedValue.label === 'Pipeline' ||
                            filter?.column.selectedValue.label ===
                              'Stack Name' ||
                            filter?.column.selectedValue.label === 'Author'
                          ? 'Equals'
                          : filter?.contains.selectedValue.label
                      } ${
                        typeof filter?.filterValue === 'string'
                          ? checkForName(
                              filter?.column.selectedValue.label,
                              filter?.filterValue,
                            )
                          : formatDateToDisplayWithoutTime(filter?.filterValue)
                      }`}
                    </Box>

                    <Box
                      onClick={() => {
                        if (filters.length === 1) {
                          setShowInbar(false);
                        }
                        hanldeDelete(index);
                      }}
                    >
                      <icons.closeWithBorder
                        style={{ paddingLeft: '7px' }}
                        size={iconSizes.sm}
                        color={iconColors.grey}
                      />
                    </Box>
                  </FlexBox.Row>
                );
              })
            ) : (
              <Paragraph className={styles.filterplaceholder}>
                Filter list
              </Paragraph>
            )}
            {!applyFilter && !filters[0]?.filterValue ? null : filters[0]
                ?.column?.selectedValue.label &&
              !applyFilter &&
              !searchText ? (
              <Box
                onClick={() => {
                  setFilter([getInitials()]);
                  setShowInbar(false);
                }}
              >
                <icons.closeWithBorder
                  style={{ paddingLeft: '7px' }}
                  size={iconSizes.sm}
                  color={iconColors.grey}
                />
              </Box>
            ) : null}
          </Box>
        </FlexBox>
      </div>

      {applyFilter && (
        <Box
          className="mb-4 mt-19"
          style={{ marginLeft: '20px', width: '530px' }}
        >
          <Paragraph
            className="h3 text-muted"
            color="black"
            style={{ fontSize: '16px' }}
          >
            Custom Filtering
          </Paragraph>
          {filters.map((filter: any, index: number) => {
            return (
              <FlexBox.Row key={index} className="mb-1">
                <Box
                  className="mr-4 mt-5 h4 text-muted"
                  style={{
                    fontSize: '12px',
                    width: '46px',
                    color: '#424240',
                  }}
                >
                  {index === 0 ? 'Where' : 'And'}
                </Box>
                <Box style={{ width: '146px' }}>
                  <FormDropdownField
                    data-testid="column-name-dropdown"
                    label={''}
                    onChange={(value: string) => {
                      setShowInbar(true);
                      handleChange(filter, 'column', value);
                    }}
                    placeholder={'Column Name'}
                    value={filter?.column.selectedValue.value}
                    options={filter?.column.options}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      width: '146px',
                      fontSize: '12px',
                      color: '#424240',
                      fontFamily: 'Rubik',
                    }}
                  />
                </Box>

                {filter?.column?.selectedValue?.value === 'status' ? (
                  <>
                    <FlexBox.Row key={index} className="mb-1">
                      <FormDropdownField
                        data-testid="status-options"
                        label={''}
                        disabled={!filter?.column.selectedValue.type}
                        placeholder={'category'}
                        style={{
                          borderRadius: 0,
                          width: '146px',
                          fontSize: '12px',
                          color: '#424240',
                          fontFamily: 'Rubik',
                        }}
                        onChange={(value: string) =>
                          handleChangeForStatus(filter, value)
                        }
                        value={filter?.contains.selectedValue.value}
                        options={filter?.column.statusOption}
                      />
                    </FlexBox.Row>
                  </>
                ) : filter?.column?.selectedValue?.value === 'is_shared' ||
                  filter?.column?.selectedValue?.value === 'user_id' ||
                  filter?.column?.selectedValue?.value === 'pipeline_id' ||
                  filter?.column?.selectedValue?.value === 'stack_id' ? (
                  <>
                    <FlexBox.Row className="mb-1">
                      <FormTextField
                        label={''}
                        data-testid="disabled-equals"
                        placeholder={''}
                        disabled
                        value={
                          filter?.column?.selectedValue?.value === 'is_shared'
                            ? 'is'
                            : 'equals'
                        }
                        style={{
                          borderRadius: 0,
                          width: '146px',
                          fontSize: '12px',
                          color: '#424240',
                        }}
                      />
                      {filter?.column?.selectedValue?.value === 'is_shared' ? (
                        <FormDropdownField
                          label={''}
                          data-testid="shared-option"
                          disabled={!filter?.column?.selectedValue?.type}
                          placeholder={'category'}
                          style={{
                            borderRadius: 0,
                            width: '146px',
                            fontSize: '12px',
                            color: '#424240',
                            fontFamily: 'Rubik',
                          }}
                          onChange={(value: string) =>
                            handleChangeForShared(filter, 'contains', value)
                          }
                          value={filter?.contains?.selectedValue?.value}
                          options={getSecondColumnOptions(
                            filter?.contains?.options,
                            filter?.column?.selectedValue?.type,
                          )}
                        />
                      ) : filter?.column?.selectedValue?.value ===
                        'pipeline_id' ? (
                        <Select
                          options={pipelinesOptions}
                          defaultValue={pipelinesOptions.filter((el: any) => {
                            return filters.some((f: any) => {
                              return f.filterValue === el.value;
                            });
                          })}
                          styles={selectStyles}
                          onInputChange={(e: any, newEvent: any) =>
                            callActionForPipelines(e, newEvent)
                          }
                          onChange={(value: any) => {
                            if (value) {
                              handleChangeForSearchable(filter, value.value);
                            } else {
                              handleChangeForSearchable(filter, '');
                            }
                          }}
                          isClearable={true}
                          className={styles.searchableInput}
                        />
                      ) : filter?.column?.selectedValue?.value ===
                        'stack_id' ? (
                        <Select
                          options={stacksOptions}
                          defaultValue={stacksOptions.filter((el: any) => {
                            return filters.some((f: any) => {
                              return f.filterValue === el.value;
                            });
                          })}
                          styles={selectStyles}
                          onInputChange={(e: any, newEvent: any) =>
                            callActionForStacks(e, newEvent)
                          }
                          onChange={(value: any) => {
                            if (value) {
                              handleChangeForSearchable(filter, value.value);
                            } else {
                              handleChangeForSearchable(filter, '');
                            }
                          }}
                          isClearable={true}
                          className={styles.searchableInput}
                        />
                      ) : (
                        <Select
                          options={authorOptions}
                          defaultValue={authorOptions.filter((el: any) => {
                            return filters.some((f: any) => {
                              return f.filterValue === el.value;
                            });
                          })}
                          styles={selectStyles}
                          onInputChange={(e: any, newEvent: any) => {
                            callActionForUsers(e, newEvent);
                          }}
                          onChange={(value: any) => {
                            if (value) {
                              handleChangeForSearchable(filter, value.value);
                            } else {
                              handleChangeForSearchable(filter, '');
                            }
                          }}
                          isClearable
                          className={styles.searchableInput}
                        />
                      )}
                    </FlexBox.Row>
                  </>
                ) : (
                  <>
                    <FlexBox.Row className="mb-1">
                      <FormDropdownField
                        data-testid="category-dropdown"
                        label={''}
                        disabled={!filter?.column.selectedValue.type}
                        placeholder={'category'}
                        onChange={(value: string) =>
                          handleChange(filter, 'contains', value)
                        }
                        value={filter?.contains.selectedValue.value}
                        options={getSecondColumnOptions(
                          filter?.contains?.options,
                          filter?.column?.selectedValue?.type,
                        )}
                        style={{
                          borderRadius: 0,
                          width: '146px',
                          fontSize: '12px',
                          color: '#424240',
                          fontFamily: 'Rubik',
                        }}
                      />
                      {valueField(filter)}
                    </FlexBox.Row>
                  </>
                )}

                <Box
                  data-testid="remove-condition-button"
                  onClick={() => {
                    if (filters.length === 1) {
                      setShowInbar(false);
                    }
                    hanldeDelete(index);
                  }}
                  className={styles.removeIcon}
                >
                  <icons.delete
                    style={{ padding: '7px 0px 0px 7px' }}
                    size={iconSizes.sm}
                    color={iconColors.grey}
                  />
                </Box>
              </FlexBox.Row>
            );
          })}
          <FlexBox.Row
            className="mt-5"
            justifyContent="end"
            onClick={addAnotherFilter}
            data-testid="add-condition-button"
          >
            <icons.simplePlus size={iconSizes.md} color={iconColors.darkGrey} />
            <Paragraph
              className="h3 text-muted ml-1 mt-2"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#747474',
                cursor: 'pointer',
              }}
            >
              Add Condition
            </Paragraph>
          </FlexBox.Row>
        </Box>
      )}
      {children}
    </FlexBox.Column>
  );
};

export default FilterComponent;

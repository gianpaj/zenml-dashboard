import { pipelineActionTypes } from '../../actionTypes';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

export const getMyPipelinesAction = ({
  sort_by,
  logical_operator,
  index,
  max_size,
  name,
  filtersParam,
  workspace,
  onSuccess,
  onFailure,
}: {
  sort_by?: string;
  logical_operator?: string;
  index?: number;
  max_size?: number;
  name?: string;
  workspace?: string;
  filtersParam?: object;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: pipelineActionTypes.getMyPipelines.request,
  payload: {
    apiMethod: getMyPipelinesApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getMyPipelines.failure,
    successActionType: pipelineActionTypes.getMyPipelines.success,
    params: {
      workspace,
      sort_by,
      logical_operator,
      index,
      max_size,
      name,
      filtersParam,
    },
    onSuccess,
    onFailure,
  },
});

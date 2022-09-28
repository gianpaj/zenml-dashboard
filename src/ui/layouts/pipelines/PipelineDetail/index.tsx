import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';

const getTabPages = (pipelineId: TId): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration pipelineId={pipelineId} />,
      path: routePaths.pipeline.configuration(pipelineId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs pipelineId={pipelineId} />,
      path: routePaths.pipeline.runs(pipelineId),
    },
  ];
};

const getBreadcrumbs = (pipelineId: TId): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.pipelines.text'),
      clickable: true,
      to: routePaths.pipelines.list,
    },
    {
      name: pipelineId,
      clickable: true,
      to: routePaths.pipeline.configuration(pipelineId),
    },
  ];
};

export interface PipelineDetailRouteParams {
  id: TId;
}

export const PipelineDetail: React.FC = () => {
  const { pipeline } = useService();

  const tabPages = getTabPages(pipeline.id);
  const breadcrumbs = getBreadcrumbs(pipeline.id);

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.pipeline.base(pipeline.id)}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default PipelineDetail;
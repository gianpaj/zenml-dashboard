import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  FlexBox,
  H2,
  Paragraph,
  icons,
  SeparatorLight,
  Tag,
  LineChart,
  LinkBox,
  PrimaryButton,
  H3,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector, useToaster } from '../../../hooks';
import { userSelectors, workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import styles from './styles.module.scss';
import ZenMLFavourite from './ZenML favourite.svg';
import InstallDesignHeader from './InstallDesignHeader.svg';
import { Tabs } from '../../common/Tabs';
import { DisplayMarkdown } from '../../../components/richText/DisplayMarkdown';
import { DisplayCode } from './DisplayCode';
import { Popup } from '../../common/Popup';
import { HUB_API_URL } from '../../../../api/constants';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const data = {
  id: 'unique-id',
  name: 'Flavour',
  latestVersion: '3.1.01',
  lastPublishedDaysAgo: 45,
  tags: ['Designer', 'AI', 'Fast'],
  pullsLastWeek: 8_802_034,
  pullsHistory: [800, 500, 400, 900, 100, 700, 600, 300, 200, 700],
  isZenMLFavourite: true,
  publisher: '@multazam',
  repo: 'https://github.com/example/example',
  apiLink: 'example.com',
  pipInstallCommand:
    'pip install zenml-airflow airflow==2.3.0 --index https://zenmlpypi.zenml.io',
  upvotes: '10M+',
  downloads: '10K+',
  popularity: '99%',
  // markdown
  overview: `## Welcome to the README for my ZenML MLflow Step!

In this step, we utilize the power of ZenML and MLflow to streamline the machine learning workflow. With ZenML's easy-to-use pipeline creation and MLflow's robust tracking capabilities, managing and optimizing your models has never been easier.

- Our step begins with data ingestion, where ZenML allows you to easily bring in your data from a variety of sources. From there, MLflow tracks your model's performance and parameters, allowing for easy comparisons and experimentation.`,
  changelogs: [
    {
      version: '10.1.5',
      notes: `Minor bug fix (PR 44).
return null when active switch is de-activated by re-tapping
Added changes to fix radiusStyle bug when text direction is set to TextDirection.rtl
parameter:
textDirectionRTL (optional, type bool - default false)
Added custom widths support
parameter:
customWidths (optional, type List`,
      yanked: true,
    },
    {
      version: '10.1.4',
      notes: `Minor bug fix (PR 44).
return null when active switch is de-activated by re-tapping
Added changes to fix radiusStyle bug when text direction is set to TextDirection.rtl
parameter:
textDirectionRTL (optional, type bool - default false)
Added custom widths support
parameter:
customWidths (optional, type List`,
      yanked: false,
    },
    {
      version: '10.1.3',
      notes: `Minor bug fix (PR 44).
return null when active switch is de-activated by re-tapping
Added changes to fix radiusStyle bug when text direction is set to TextDirection.rtl
parameter:
textDirectionRTL (optional, type bool - default false)
Added custom widths support
parameter:
customWidths (optional, type List`,
      yanked: true,
    },
  ],
  requirements: `nba-api
notebook
zenml==0.31.1`,
  installing: [
    {
      type: 'markdown',
      text: `Depend on it
Run this command:
With Flutter:`,
    },
    { type: 'code', text: `$ flutter pub add sign_in_with_apple` },
    {
      type: 'markdown',
      text: `This will add a line like this to your package's pubspec.yaml (and run an implicit flutter pub get):`,
    },
    {
      type: 'code',
      text: `dependencies:
  sign_in_with_apple: ^4.3.0`,
    },
  ],
};

const getData = async (pluginId: string) => {
  return (await axios.get(`${HUB_API_URL}/plugins/${pluginId}`))
    .data as TPlugin;
};

const PluginDetail: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const { successToast } = useToaster();
  const myUser = useSelector(userSelectors.myUser);
  const [plugin, setPlugin] = useState(null as null | TPlugin);
  const { pluginId } = useParams<{ pluginId: string }>();

  const isOwner = myUser?.id === plugin?.id;

  useEffect(() => {
    getData(pluginId).then(setPlugin);
  }, []);

  return (
    <AuthenticatedLayout
      breadcrumb={[
        {
          name: 'List plugins',
          clickable: true,
          to: routePaths.plugins.list(
            selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
          ),
        },

        {
          name: 'Plugin details',
          clickable: true,
          to: routePaths.plugins.detail.overview(
            selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
            pluginId,
          ),
        },
      ]}
    >
      {plugin && (
        <FlexBox fullWidth padding="lg2" flexDirection="column">
          <H2 style={{ fontWeight: 500 }}>{translate('title')}</H2>
          <FlexBox fullWidth justifyContent="flex-end">
            <Paragraph color="grey" style={{ fontSize: '14px' }}>
              Check out our easy to read document
            </Paragraph>
          </FlexBox>

          {/* content */}
          <FlexBox fullWidth>
            {/* left column */}
            <FlexBox flexDirection="column" fullWidth padding="lg">
              {/* tags */}
              <FlexBox fullWidth marginBottom="sm" flexWrap>
                {plugin.tags.map((t) => (
                  <Box marginRight="sm" key={t}>
                    <Tag text={t} />
                  </Box>
                ))}
              </FlexBox>

              {/* header info */}
              <FlexBox marginVertical="lg">
                {/* image */}
                <Box
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #A8A8A880',
                    padding: '10px',
                  }}
                >
                  <Box
                    style={{
                      width: '132px',
                      height: '132px',
                      backgroundColor: '#eee',
                    }}
                  ></Box>
                </Box>

                <Box marginLeft="lg">
                  {/* title */}
                  <FlexBox alignItems="center">
                    <Paragraph
                      style={{ fontSize: '32px', marginRight: '8px' }}
                      color="primary"
                    >
                      {plugin.name}
                    </Paragraph>

                    <icons.verified color={iconColors.primary} size="lg" />
                  </FlexBox>

                  {/* light details */}
                  <FlexBox marginVertical="md">
                    <Paragraph
                      size="tiny"
                      color="grey"
                      style={{ marginRight: '12px' }}
                    >
                      Latest Version {plugin.version}
                    </Paragraph>
                    <Paragraph size="tiny" color="grey">
                      {/* TODO: calculate created days ago */}
                      Published {data.lastPublishedDaysAgo} days ago
                    </Paragraph>
                  </FlexBox>

                  {/* actions */}
                  <FlexBox>
                    {[
                      {
                        label: 'Share',
                        icon: icons.share2,
                        color: iconColors.primary,
                        onClick: () => {
                          const canShare =
                            'canShare' in navigator &&
                            (navigator as any).canShare();
                          if (canShare) {
                            navigator.share({ url: window.location.href });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            successToast({
                              description: 'Copied link to clipboard',
                            });
                          }
                        },
                      },
                      {
                        label: 'Star',
                        icon: icons.starOutline,
                        color: iconColors.primary,
                        onClick: () => alert('TODO: Not implemented yet'),
                      },
                      ...(isOwner
                        ? [
                            {
                              label: 'Update Version',
                              icon: icons.share,
                              color: iconColors.primary,
                              onClick: () =>
                                history.push(
                                  routePaths.plugins.update(
                                    selectedWorkspace,
                                    plugin.id,
                                  ),
                                ),
                            },
                            {
                              label: 'Delete Package',
                              icon: icons.delete,
                              color: iconColors.red,
                              onClick: () => setDeletePopupOpen(true),
                            },
                          ]
                        : [
                            {
                              label: 'Report',
                              icon: icons.info,
                              color: iconColors.red,
                              onClick: () =>
                                history.push(`${plugin.repository_url}/issues`),
                            },
                          ]),
                    ].map((action) => (
                      <LinkBox
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '18px',
                        }}
                        onClick={action.onClick}
                        key={action.label}
                      >
                        <action.icon color={action.color} size="sml" />

                        <Paragraph
                          size="tiny"
                          color={action.color as any}
                          style={{ marginLeft: '8px' }}
                        >
                          {action.label}
                        </Paragraph>
                      </LinkBox>
                    ))}
                  </FlexBox>
                </Box>
              </FlexBox>

              {isOwner && deletePopupOpen && (
                <Popup
                  onClose={() => {
                    setDeletePopupOpen(false);
                  }}
                >
                  <H3>Are you sure you want to delete this package?</H3>
                  <Paragraph>This cannot be undone.</Paragraph>

                  <Box marginTop="md">
                    <PrimaryButton
                      onClick={() => alert('TODO: not implemented yet')}
                      style={{ backgroundColor: 'var(--red)' }}
                    >
                      Delete Package
                    </PrimaryButton>
                  </Box>
                </Popup>
              )}

              <Tabs
                pages={[
                  {
                    text: 'Overview',
                    Component: () => (
                      <Box>
                        <DisplayMarkdown markdown={data.overview} />
                      </Box>
                    ),
                    path: routePaths.plugins.detail.overview(
                      selectedWorkspace,
                      pluginId,
                    ),
                  },
                  {
                    text: 'Changelogs',
                    Component: () => (
                      <Box>
                        {data.changelogs.map((c) => (
                          <FlexBox key={c.version} marginVertical="md">
                            {/* version */}
                            <Box style={{ width: '125px' }}>
                              <Paragraph
                                color="darkGrey"
                                style={{ fontSize: '32px', lineHeight: '1em' }}
                              >
                                {c.version}
                              </Paragraph>
                            </Box>

                            {/* details */}
                            <FlexBox fullWidth>
                              <Paragraph size="tiny" color="grey">
                                {c.notes}
                              </Paragraph>
                            </FlexBox>

                            {/* yanked */}
                            <FlexBox style={{ width: '100px' }}>
                              {c.yanked && (
                                <Box
                                  style={{
                                    display: 'inline-block',
                                    marginBottom: 'auto',
                                    marginLeft: 'auto',
                                    backgroundColor: '#D8131333',
                                    padding: '3px 8px',
                                    borderRadius: '8px',
                                  }}
                                >
                                  <Paragraph size="tiny" color="red">
                                    Yanked
                                  </Paragraph>
                                </Box>
                              )}
                            </FlexBox>
                          </FlexBox>
                        ))}
                      </Box>
                    ),
                    path: routePaths.plugins.detail.changelogs(
                      selectedWorkspace,
                      pluginId,
                    ),
                  },
                  {
                    text: 'Requirements',
                    Component: () => (
                      <DisplayCode code={plugin.requirements.join('\n')} />
                    ),
                    path: routePaths.plugins.detail.requirements(
                      selectedWorkspace,
                      pluginId,
                    ),
                  },
                  {
                    text: 'Installing',
                    Component: () => (
                      <Box>
                        {data.installing.map((el, i) => (
                          <Box key={i} marginVertical="md">
                            {el.type === 'code' ? (
                              <DisplayCode code={el.text} />
                            ) : el.type === 'markdown' ? (
                              <DisplayMarkdown markdown={el.text} />
                            ) : (
                              <Paragraph>{el.text}</Paragraph>
                            )}
                          </Box>
                        ))}
                      </Box>
                    ),
                    path: routePaths.plugins.detail.installing(
                      selectedWorkspace,
                      pluginId,
                    ),
                  },
                  {
                    text: 'Community',
                    externalPath: `${plugin.repository_url}/issues`,
                    // placeholders to type-check
                    path: '',
                    Component: () => null,
                  },
                ]}
                basePath={routePaths.plugins.detail.base(
                  selectedWorkspace,
                  pluginId,
                )}
              />
            </FlexBox>

            {/* right column */}
            <Box>
              {/* usage # & chart, ZenML favourite badge */}
              <FlexBox>
                <Box>
                  <img src={ZenMLFavourite} alt="ZenML favourite" />
                </Box>
                <Box padding="md">
                  <Paragraph size="small">
                    Pulls:{' '}
                    {data.pullsLastWeek.toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </Paragraph>
                  <Paragraph style={{ color: '#677285' }} size="tiny">
                    Last week
                  </Paragraph>

                  {/* line chart */}
                  <Box marginVertical="md">
                    <LineChart data={data.pullsHistory} />
                  </Box>
                </Box>
              </FlexBox>

              {/* install command */}
              {/* note need to hard-code the width to match the SVG for the header */}
              <Box marginTop="sm" marginBottom="xl" style={{ width: '294px' }}>
                <img src={InstallDesignHeader} alt="Install package" />

                <Box
                  style={{
                    padding: '0px 3px 3px 3px',
                    background:
                      'linear-gradient(90deg, #B58EB1 0%, #443D99 100%)',
                    borderRadius: '7px',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <FlexBox
                    style={{
                      padding: '20px 22px 20px 10px',
                      backgroundColor: '#250E32',
                      borderRadius: '7px',
                      position: 'relative',
                    }}
                  >
                    <Paragraph
                      size="tiny"
                      color="white"
                      style={{ maxWidth: '100%' }}
                    >
                      pip install {plugin.package_name} --index
                      https://zenmlpypi.zenml.io
                    </Paragraph>

                    <LinkBox
                      onClick={() => {
                        navigator.clipboard
                          .writeText(`pip install ${plugin.package_name} --index
                        https://zenmlpypi.zenml.io`);
                        successToast({ description: 'Copied to clipboard.' });
                      }}
                    >
                      <Box
                        style={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          padding: '8px',
                        }}
                      >
                        <icons.copy color={iconColors.white} size="xs" />
                      </Box>
                    </LinkBox>
                  </FlexBox>
                </Box>
              </Box>

              {/* metrics */}
              {/* <FlexBox justifyContent="space-between" marginVertical="md">
                <Box marginRight="sm2">
                  <Paragraph className={styles.pluginMetric}>
                    {data.upvotes}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Upvotes
                  </Paragraph>
                </Box>
                <Box marginRight="sm2">
                  <Paragraph className={styles.pluginMetric}>
                    {data.downloads}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Downloads
                  </Paragraph>
                </Box>
                <Box>
                  <Paragraph className={styles.pluginMetric}>
                    {data.popularity}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Popularity
                  </Paragraph>
                </Box>
              </FlexBox>

              <SeparatorLight /> */}

              {/* publisher */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  Publisher
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a
                      href={`/users/${plugin.user.username}`}
                      style={{ color: 'inherit' }}
                    >
                      {plugin.user.username}
                    </a>
                  </Paragraph>
                </Box>
              </Box>

              <SeparatorLight />

              {/* meta */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  Meta
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a
                      href={plugin.repository_url}
                      style={{ color: 'inherit' }}
                    >
                      Repository (GitHub)
                    </a>
                  </Paragraph>
                </Box>
              </Box>

              <SeparatorLight />

              {/* Documentation */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  Documentation
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a href={data.apiLink} style={{ color: 'inherit' }}>
                      API reference
                    </a>
                  </Paragraph>
                </Box>
              </Box>

              <SeparatorLight />

              {/* More from this author */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  More from this author
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a
                      href={`/users/${plugin.user.username}/published`}
                      style={{ color: 'inherit' }}
                    >
                      See all
                    </a>
                  </Paragraph>
                </Box>
              </Box>
            </Box>
          </FlexBox>
        </FlexBox>
      )}
    </AuthenticatedLayout>
  );
};

export default PluginDetail;
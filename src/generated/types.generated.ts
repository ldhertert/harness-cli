import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime Scalar */
  DateTime: any;
  /** Long Scalar */
  Long: any;
  /** This represents either an int or a long or a double. Will be tried to map to one of these in the same order */
  Number: any;
};



export type AcrArtifactSource = ArtifactSource & {
  __typename?: 'ACRArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  azureCloudProviderId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  registryName?: Maybe<Scalars['String']>;
  repositoryName?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};


export type AcrArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type AmiArtifactSource = ArtifactSource & {
  __typename?: 'AMIArtifactSource';
  amiResourceFilters?: Maybe<Array<Maybe<KeyValuePair>>>;
  artifacts?: Maybe<ArtifactConnection>;
  awsCloudProviderId?: Maybe<Scalars['String']>;
  awsTags?: Maybe<Array<Maybe<KeyValuePair>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};


export type AmiArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type ApiKey = {
  __typename?: 'APIKey';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AccountPermissionInput = {
  accountPermissionTypes?: Maybe<Array<Maybe<AccountPermissionType>>>;
};

export enum AccountPermissionType {
  AdministerCe = 'ADMINISTER_CE',
  AdministerOtherAccountFunctions = 'ADMINISTER_OTHER_ACCOUNT_FUNCTIONS',
  /** This corresponds to MANAGE_APPLICATIONS permission on UI */
  CreateAndDeleteApplication = 'CREATE_AND_DELETE_APPLICATION',
  CreateCustomDashboards = 'CREATE_CUSTOM_DASHBOARDS',
  ManageAlertNotificationRules = 'MANAGE_ALERT_NOTIFICATION_RULES',
  ManageApiKeys = 'MANAGE_API_KEYS',
  ManageApplicationStacks = 'MANAGE_APPLICATION_STACKS',
  ManageAuthenticationSettings = 'MANAGE_AUTHENTICATION_SETTINGS',
  ManageCloudProviders = 'MANAGE_CLOUD_PROVIDERS',
  ManageConfigAsCode = 'MANAGE_CONFIG_AS_CODE',
  ManageConnectors = 'MANAGE_CONNECTORS',
  ManageCustomDashboards = 'MANAGE_CUSTOM_DASHBOARDS',
  ManageDelegates = 'MANAGE_DELEGATES',
  ManageDelegateProfiles = 'MANAGE_DELEGATE_PROFILES',
  ManageDeploymentFreezes = 'MANAGE_DEPLOYMENT_FREEZES',
  ManageIpWhitelist = 'MANAGE_IP_WHITELIST',
  ManagePipelineGovernanceStandards = 'MANAGE_PIPELINE_GOVERNANCE_STANDARDS',
  ManageSecrets = 'MANAGE_SECRETS',
  ManageSecretManagers = 'MANAGE_SECRET_MANAGERS',
  ManageSshAndWinrm = 'MANAGE_SSH_AND_WINRM',
  ManageTags = 'MANAGE_TAGS',
  ManageTemplateLibrary = 'MANAGE_TEMPLATE_LIBRARY',
  ManageUsersAndGroups = 'MANAGE_USERS_AND_GROUPS',
  ManageUserAndUserGroupsAndApiKeys = 'MANAGE_USER_AND_USER_GROUPS_AND_API_KEYS',
  ReadUsersAndGroups = 'READ_USERS_AND_GROUPS',
  ViewAudits = 'VIEW_AUDITS',
  ViewCe = 'VIEW_CE',
  ViewUserAndUserGroupsAndApiKeys = 'VIEW_USER_AND_USER_GROUPS_AND_API_KEYS'
}

export type AccountPermissions = {
  __typename?: 'AccountPermissions';
  accountPermissionTypes?: Maybe<Array<Maybe<AccountPermissionType>>>;
};

export enum Actions {
  Create = 'CREATE',
  Delete = 'DELETE',
  Execute = 'EXECUTE',
  ExecutePipeline = 'EXECUTE_PIPELINE',
  ExecuteWorkflow = 'EXECUTE_WORKFLOW',
  Read = 'READ',
  /**  Beta: This action will be used to govern workflow rollback */
  RollbackWorkflow = 'ROLLBACK_WORKFLOW',
  Update = 'UPDATE'
}

export type AddAccountPermissionInput = {
  accountPermission?: Maybe<AccountPermissionType>;
  clientMutationId?: Maybe<Scalars['String']>;
  userGroupId: Scalars['String'];
};

export type AddAccountPermissionPayload = {
  __typename?: 'AddAccountPermissionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<UserGroup>;
};

export type AddAppPermissionInput = {
  appPermission?: Maybe<ApplicationPermissionInput>;
  clientMutationId?: Maybe<Scalars['String']>;
  userGroupId: Scalars['String'];
};

export type AddAppPermissionPayload = {
  __typename?: 'AddAppPermissionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<UserGroup>;
};

export type AddUserToUserGroupInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  userGroupId: Scalars['String'];
  userId: Scalars['String'];
};

export type AddUserToUserGroupPayload = {
  __typename?: 'AddUserToUserGroupPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<UserGroup>;
};

export enum AggregateOperation {
  Average = 'AVERAGE',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

/** This structure will serve pie charts / donut charts */
export type AggregatedData = {
  __typename?: 'AggregatedData';
  dataPoints?: Maybe<Array<Maybe<DataPoint>>>;
};

export type AmazonS3ArtifactSource = ArtifactSource & {
  __typename?: 'AmazonS3ArtifactSource';
  artifactPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  artifacts?: Maybe<ArtifactConnection>;
  awsCloudProviderId?: Maybe<Scalars['String']>;
  bucket?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
};


export type AmazonS3ArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type AmazonS3Connector = Connector & {
  __typename?: 'AmazonS3Connector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AmazonS3HelmRepoConnector = Connector & {
  __typename?: 'AmazonS3HelmRepoConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AmazonS3PlatformInput = {
  awsCloudProvider: Scalars['String'];
  bucketName: Scalars['String'];
  region: Scalars['String'];
};

/** If changeSet got triggered by GraphQL mutation(through API key) */
export type ApiKeyChangeSet = ChangeSet & {
  __typename?: 'ApiKeyChangeSet';
  /** API key id */
  apiKeyId?: Maybe<Scalars['String']>;
  /** List of all changeDetails */
  changes?: Maybe<Array<Maybe<ChangeDetails>>>;
  /** Failure message */
  failureStatusMsg?: Maybe<Scalars['String']>;
  /** Unique ID of a changeSet */
  id?: Maybe<Scalars['String']>;
  /** HTTP request that triggered the changeSet */
  request?: Maybe<RequestInfo>;
  /** Timestamp when changeSet was triggered */
  triggeredAt?: Maybe<Scalars['DateTime']>;
};

export type ApmVerificationConnector = Connector & {
  __typename?: 'ApmVerificationConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AppDynamicsConnector = Connector & {
  __typename?: 'AppDynamicsConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AppEnvScope = {
  __typename?: 'AppEnvScope';
  application?: Maybe<AppScopeFilter>;
  environment?: Maybe<EnvScopeFilter>;
};

export type AppEnvScopeInput = {
  application: AppScopeFilterInput;
  environment: EnvScopeFilterInput;
};

export type AppFilter = {
  __typename?: 'AppFilter';
  appIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  filterType?: Maybe<FilterType>;
};

export type AppFilterInput = {
  appIds?: Maybe<Array<Scalars['String']>>;
  filterType?: Maybe<FilterType>;
};

export enum AppPermissionType {
  All = 'ALL',
  Deployment = 'DEPLOYMENT',
  Env = 'ENV',
  Pipeline = 'PIPELINE',
  Provisioner = 'PROVISIONER',
  Service = 'SERVICE',
  Workflow = 'WORKFLOW'
}

export type AppScopeFilter = {
  __typename?: 'AppScopeFilter';
  appId?: Maybe<Scalars['String']>;
  filterType?: Maybe<FilterType>;
};

export type AppScopeFilterInput = {
  appId?: Maybe<Scalars['String']>;
  filterType?: Maybe<FilterType>;
};

export type Application = {
  __typename?: 'Application';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  environments?: Maybe<EnvironmentConnection>;
  gitSyncConfig?: Maybe<GitSyncConfig>;
  id?: Maybe<Scalars['String']>;
  /**
   * Beta: When this is set to true, all manual triggers will require API Key authorization.
   * Doc link: https://docs.harness.io/article/mc2lxsas4c-trigger-a-deployment-using-c-url#option_enforce_api_keys_for_manual_triggers
   */
  isManualTriggerAuthorized?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  pipelines?: Maybe<PipelineConnection>;
  services?: Maybe<ServiceConnection>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  workflows?: Maybe<WorkflowConnection>;
};


export type ApplicationEnvironmentsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type ApplicationPipelinesArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type ApplicationServicesArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type ApplicationWorkflowsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type ApplicationConnection = {
  __typename?: 'ApplicationConnection';
  nodes?: Maybe<Array<Maybe<Application>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ApplicationFilter = {
  application?: Maybe<IdFilter>;
  tag?: Maybe<ApplicationTagFilter>;
};

export enum ApplicationFilterType {
  Application = 'Application'
}

export type ApplicationPermission = {
  __typename?: 'ApplicationPermission';
  actions?: Maybe<Array<Maybe<Actions>>>;
  applications?: Maybe<AppFilter>;
  deployments?: Maybe<DeploymentPermissionFilter>;
  environments?: Maybe<EnvPermissionFilter>;
  permissionType?: Maybe<AppPermissionType>;
  pipelines?: Maybe<PipelinePermissionFilter>;
  provisioners?: Maybe<ProvisionerPermissionFilter>;
  services?: Maybe<ServicePermissionFilter>;
  workflows?: Maybe<WorkflowPermissionFilter>;
};

export type ApplicationPermissionInput = {
  actions: Array<Maybe<Actions>>;
  applications: AppFilterInput;
  deployments?: Maybe<DeploymentPermissionFilterInput>;
  environments?: Maybe<EnvPermissionFilterInput>;
  permissionType: AppPermissionType;
  pipelines?: Maybe<PipelinePermissionFilterInput>;
  provisioners?: Maybe<ProvisionerPermissionFilterInput>;
  services?: Maybe<ServicePermissionFilterInput>;
  workflows?: Maybe<WorkflowPermissionFilterInput>;
};

export type ApplicationTagFilter = {
  entityType?: Maybe<ApplicationTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum ApplicationTagType {
  Application = 'APPLICATION'
}

export type ApprovalStageExecution = PipelineStageExecution & {
  __typename?: 'ApprovalStageExecution';
  /**  Approval method type */
  approvalStepType?: Maybe<ApprovalStepType>;
  /**  Pipeline stage element ID */
  pipelineStageElementId?: Maybe<Scalars['String']>;
  /**  Pipeline stage name */
  pipelineStageName?: Maybe<Scalars['String']>;
  /**  Pipeline step name */
  pipelineStepName?: Maybe<Scalars['String']>;
  /**  Execution status of the stage */
  status?: Maybe<ExecutionStatus>;
};

export enum ApprovalStepType {
  Jira = 'JIRA',
  Servicenow = 'SERVICENOW',
  ShellScript = 'SHELL_SCRIPT',
  UserGroup = 'USER_GROUP'
}

export type ArtfifactValueInput = {
  /** artifact Id input if value type is ARTIFACT_ID */
  artifactId?: Maybe<ArtifactIdInput>;
  /** Build number input if value type is BUILD_NUMBER */
  buildNumber?: Maybe<BuildNumberInput>;
  /** Parameterized artifact source input if value type is PARAMETERIZED_ARTIFACT_SOURCE */
  parameterizedArtifactSource?: Maybe<ParameterizedArtifactSourceInput>;
  /** type of the artifactValue: Build number, artifactId or parameterized artifact source */
  valueType: ArtifactInputType;
};

export type Artifact = {
  __typename?: 'Artifact';
  artifactSource?: Maybe<ArtifactSource>;
  /**  Build No */
  buildNo?: Maybe<Scalars['String']>;
  /**  Collected At */
  collectedAt?: Maybe<Scalars['DateTime']>;
  /**  Artifact ID */
  id?: Maybe<Scalars['String']>;
};

export type ArtifactConditionInput = {
  /** Build/Tag Filter: Artifacts matching this Filter only will execte the Trigger, Can be Exact match or Regex */
  artifactFilter?: Maybe<Scalars['String']>;
  /** Artifact Source Id: A new Artifact in this ArtifactSource matching the Artifact Filter will execute the Trigger. */
  artifactSourceId: Scalars['String'];
  /** Regex, True if the Artifact Filter String is provided as regex. */
  regex?: Maybe<Scalars['Boolean']>;
};

export type ArtifactConnection = {
  __typename?: 'ArtifactConnection';
  nodes?: Maybe<Array<Maybe<Artifact>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ArtifactFilter = {
  artifact?: Maybe<IdFilter>;
  artifactSource?: Maybe<IdFilter>;
  artifactStreamType?: Maybe<IdFilter>;
};

export type ArtifactIdInput = {
  /** artifactId */
  artifactId: Scalars['String'];
};

export enum ArtifactInputType {
  ArtifactId = 'ARTIFACT_ID',
  BuildNumber = 'BUILD_NUMBER',
  ParameterizedArtifactSource = 'PARAMETERIZED_ARTIFACT_SOURCE'
}

export type ArtifactSelection = {
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
};

export type ArtifactSelectionInput = {
  /** Artifact Build/Tag to filter artifacts when using LAST_COLLECTED */
  artifactFilter?: Maybe<Scalars['String']>;
  /** Artifact Selection type */
  artifactSelectionType: ArtifactSelectionType;
  /**  Artifact source Id to select artifact from. Required for LAST_COLLECTED,FROM_PAYLOAD_SOURCE */
  artifactSourceId?: Maybe<Scalars['String']>;
  /** Pipeline Id to select artifact from, Required when using LAST_DEPLOYED_PIPELINE */
  pipelineId?: Maybe<Scalars['String']>;
  /**  If Artifact Build/Tag Filter is regex match or not */
  regex?: Maybe<Scalars['Boolean']>;
  /** Id of the service providing artifact selection for */
  serviceId: Scalars['String'];
  /** Workflow Id to select artifact from, Required when using LAST_DEPLOYED_WORKFLOW */
  workflowId?: Maybe<Scalars['String']>;
};

export enum ArtifactSelectionType {
  FromPayloadSource = 'FROM_PAYLOAD_SOURCE',
  FromTriggeringArtifact = 'FROM_TRIGGERING_ARTIFACT',
  FromTriggeringPipeline = 'FROM_TRIGGERING_PIPELINE',
  LastCollected = 'LAST_COLLECTED',
  LastDeployedPipeline = 'LAST_DEPLOYED_PIPELINE',
  LastDeployedWorkflow = 'LAST_DEPLOYED_WORKFLOW'
}

export type ArtifactSource = {
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
};


export type ArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type ArtifactoryArtifactSource = ArtifactSource & {
  __typename?: 'ArtifactoryArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<ArtifactoryProps>;
};


export type ArtifactoryArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type ArtifactoryConnector = Connector & {
  __typename?: 'ArtifactoryConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Properties for docker artifact types */
export type ArtifactoryDockerProps = ArtifactoryProps & {
  __typename?: 'ArtifactoryDockerProps';
  artifactoryConnectorId?: Maybe<Scalars['String']>;
  dockerImageName?: Maybe<Scalars['String']>;
  dockerRepositoryServer?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
};

/** Properties for all non-docker artifact types */
export type ArtifactoryFileProps = ArtifactoryProps & {
  __typename?: 'ArtifactoryFileProps';
  artifactPath?: Maybe<Scalars['String']>;
  artifactoryConnectorId?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
};

export type ArtifactoryProps = {
  artifactoryConnectorId?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
};

export type AttachTagInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  /**  Unique ID of the harness entity */
  entityId: Scalars['String'];
  /**  Type of entity the tag is to be attached to */
  entityType: TagEntityType;
  /**  Name of the tag */
  name: Scalars['String'];
  /**  Value of the tag */
  value?: Maybe<Scalars['String']>;
};

export type AttachTagPayload = {
  __typename?: 'AttachTagPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /**  Attached tag details */
  tagLink?: Maybe<TagLink>;
};

export type AutoScalingGroupInstance = Instance & PhysicalInstance & {
  __typename?: 'AutoScalingGroupInstance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  autoScalingGroupName?: Maybe<Scalars['String']>;
  environment?: Maybe<Environment>;
  hostId?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  hostPublicDns?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
};

export type AwsCloudProvider = CloudProvider & {
  __typename?: 'AwsCloudProvider';
  ceHealthStatus?: Maybe<CeHealthStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AwsCloudProviderInput = {
  credentialsType?: Maybe<AwsCredentialsType>;
  crossAccountAttributes?: Maybe<AwsCrossAccountAttributes>;
  defaultRegion?: Maybe<Scalars['String']>;
  ec2IamCredentials?: Maybe<Ec2IamCredentials>;
  manualCredentials?: Maybe<AwsManualCredentials>;
  name: Scalars['String'];
};

export enum AwsCredentialsType {
  Ec2Iam = 'EC2_IAM',
  Manual = 'MANUAL'
}

export type AwsCrossAccountAttributes = {
  assumeCrossAccountRole?: Maybe<Scalars['Boolean']>;
  crossAccountRoleArn: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
};

export type AwsManualCredentials = {
  accessKey?: Maybe<Scalars['String']>;
  accessKeySecretId?: Maybe<Scalars['String']>;
  secretKeySecretId: Scalars['String'];
};

export type AzureArtifactsArtifactSource = ArtifactSource & {
  __typename?: 'AzureArtifactsArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  azureConnectorId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  feedName?: Maybe<Scalars['String']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  packageName?: Maybe<Scalars['String']>;
  packageType?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
};


export type AzureArtifactsArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type AzureCloudProvider = CloudProvider & {
  __typename?: 'AzureCloudProvider';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCloudProviderInput = {
  clientId: Scalars['String'];
  keySecretId: Scalars['String'];
  name: Scalars['String'];
  tenantId: Scalars['String'];
};

export type AzureImageDefinitionProps = {
  __typename?: 'AzureImageDefinitionProps';
  /**  image definition name */
  imageDefinitionName?: Maybe<Scalars['String']>;
  /**  image gallery name */
  imageGalleryName?: Maybe<Scalars['String']>;
  /**  Resource group name */
  resourceGroup?: Maybe<Scalars['String']>;
};

export enum AzureImageType {
  ImageGallery = 'IMAGE_GALLERY'
}

export type AzureMachineImageArtifactSource = ArtifactSource & {
  __typename?: 'AzureMachineImageArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  /**  Azure Cloud Provider ID */
  azureCloudProviderId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Requires resource group, image gallery & image definition names */
  imageDefinition?: Maybe<AzureImageDefinitionProps>;
  /**  Valid azure image type */
  imageType?: Maybe<AzureImageType>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  /**  Azure subscription ID */
  subscriptionId?: Maybe<Scalars['String']>;
};


export type AzureMachineImageArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type BambooArtifactSource = ArtifactSource & {
  __typename?: 'BambooArtifactSource';
  artifactPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  artifacts?: Maybe<ArtifactConnection>;
  bambooConnectorId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  planKey?: Maybe<Scalars['String']>;
};


export type BambooArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type BambooConnector = Connector & {
  __typename?: 'BambooConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BillingDataEntry = {
  __typename?: 'BillingDataEntry';
  avgCpuUtilization?: Maybe<Scalars['Number']>;
  avgMemoryUtilization?: Maybe<Scalars['Number']>;
  cluster?: Maybe<Scalars['String']>;
  clusterId?: Maybe<Scalars['String']>;
  clusterType?: Maybe<Scalars['String']>;
  cpuLimit?: Maybe<Scalars['Number']>;
  cpuRequest?: Maybe<Scalars['Number']>;
  ecs?: Maybe<CeEcsEntity>;
  harness?: Maybe<CeHarnessEntity>;
  idleCost?: Maybe<Scalars['Number']>;
  instanceType?: Maybe<Scalars['String']>;
  k8s?: Maybe<CeK8sEntity>;
  labelName?: Maybe<Scalars['String']>;
  labelValue?: Maybe<Scalars['String']>;
  memoryLimit?: Maybe<Scalars['Number']>;
  memoryRequest?: Maybe<Scalars['Number']>;
  region?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  systemCost?: Maybe<Scalars['Number']>;
  tagName?: Maybe<Scalars['String']>;
  tagValue?: Maybe<Scalars['String']>;
  totalCost?: Maybe<Scalars['Number']>;
  unallocatedCost?: Maybe<Scalars['Number']>;
};

export enum BitbucketEvent {
  Any = 'ANY',
  BuildStatusCreated = 'BUILD_STATUS_CREATED',
  BuildStatusUpdated = 'BUILD_STATUS_UPDATED',
  CommitCommentCreated = 'COMMIT_COMMENT_CREATED',
  DiagnosticsPing = 'DIAGNOSTICS_PING',
  Fork = 'FORK',
  IssueAny = 'ISSUE_ANY',
  IssueCommentCreated = 'ISSUE_COMMENT_CREATED',
  IssueCreated = 'ISSUE_CREATED',
  IssueUpdated = 'ISSUE_UPDATED',
  PullRequestAny = 'PULL_REQUEST_ANY',
  PullRequestApprovalRemoved = 'PULL_REQUEST_APPROVAL_REMOVED',
  PullRequestApproved = 'PULL_REQUEST_APPROVED',
  PullRequestCommentCreated = 'PULL_REQUEST_COMMENT_CREATED',
  PullRequestCommentDeleted = 'PULL_REQUEST_COMMENT_DELETED',
  PullRequestCommentUpdated = 'PULL_REQUEST_COMMENT_UPDATED',
  PullRequestCreated = 'PULL_REQUEST_CREATED',
  PullRequestDeclined = 'PULL_REQUEST_DECLINED',
  PullRequestMerged = 'PULL_REQUEST_MERGED',
  PullRequestUpdated = 'PULL_REQUEST_UPDATED',
  Push = 'PUSH',
  RefsChanged = 'REFS_CHANGED',
  Updated = 'UPDATED'
}

export type BugSnagConnector = Connector & {
  __typename?: 'BugSnagConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BuildNumberInput = {
  /** name of the artifact source to which the specified build number comes from */
  artifactSourceName: Scalars['String'];
  /** build number to deploy */
  buildNumber: Scalars['String'];
};

export type CeClusterHealth = {
  __typename?: 'CEClusterHealth';
  clusterId?: Maybe<Scalars['String']>;
  clusterName?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastEventTimestamp?: Maybe<Scalars['Number']>;
  messages?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CeEnabledFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type CeHealthStatus = {
  __typename?: 'CEHealthStatus';
  clusterHealthStatusList?: Maybe<Array<Maybe<CeClusterHealth>>>;
  isCEConnector?: Maybe<Scalars['Boolean']>;
  isHealthy?: Maybe<Scalars['Boolean']>;
  messages?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Cause = ExecutedAlongPipeline | ExecutedByApiKey | ExecutedByTrigger | ExecutedByUser;

export type ChangeContent = {
  __typename?: 'ChangeContent';
  /** Unique ID of a changeSet */
  changeSetId?: Maybe<Scalars['String']>;
  /** New YAML content after the changeSet got triggered */
  newYaml?: Maybe<Scalars['String']>;
  /** New YAML path after the changeSet got triggered */
  newYamlPath?: Maybe<Scalars['String']>;
  /** Old YAML content before the changeSet got triggered */
  oldYaml?: Maybe<Scalars['String']>;
  /** Old YAML path before the changeSet got triggered */
  oldYamlPath?: Maybe<Scalars['String']>;
  /** Unique ID of a resource, e.g.Application, Environment */
  resourceId?: Maybe<Scalars['String']>;
};

export type ChangeContentConnection = {
  __typename?: 'ChangeContentConnection';
  nodes?: Maybe<Array<Maybe<ChangeContent>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ChangeContentFilter = {
  /** Unique ID of a changeSet */
  changeSetId: Scalars['String'];
  /** Unique ID of dependent or child resource, e.g.Environment, Services, etc. */
  resourceId?: Maybe<Scalars['String']>;
};

export type ChangeContentList = {
  __typename?: 'ChangeContentList';
  data?: Maybe<Array<Maybe<ChangeContent>>>;
};

/**
 * Trigger of changeSet may have several changes in child or dependent resources,
 * each of them is captured as changeDetails instance.
 */
export type ChangeDetails = {
  __typename?: 'ChangeDetails';
  /** Application ID */
  appId?: Maybe<Scalars['String']>;
  /** Application name */
  appName?: Maybe<Scalars['String']>;
  /** Timestamp of changeDetails creation */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Indicator of successful processing of the event that caused this changeSet */
  failure?: Maybe<Scalars['Boolean']>;
  /** Create / Update / Delete operation */
  operationType?: Maybe<Scalars['String']>;
  /** Unique ID of parent resource, e.g., Application */
  parentResourceId?: Maybe<Scalars['String']>;
  /** Parent resource name */
  parentResourceName?: Maybe<Scalars['String']>;
  /** Create / Update / Delete operation on parent resource */
  parentResourceOperation?: Maybe<Scalars['String']>;
  /** Parent resource type */
  parentResourceType?: Maybe<Scalars['String']>;
  /** Unique ID of dependent or child resource, e.g., Environment, Services, etc. */
  resourceId?: Maybe<Scalars['String']>;
  /** Resource name */
  resourceName?: Maybe<Scalars['String']>;
  /** Resource type */
  resourceType?: Maybe<Scalars['String']>;
};

export type ChangeSet = {
  /** List of all changeDetails */
  changes?: Maybe<Array<Maybe<ChangeDetails>>>;
  /** Failure message */
  failureStatusMsg?: Maybe<Scalars['String']>;
  /** Unique ID of a changeSet */
  id?: Maybe<Scalars['String']>;
  /** HTTP request that triggered the changeSet */
  request?: Maybe<RequestInfo>;
  /** Timestamp when changeSet was triggered */
  triggeredAt?: Maybe<Scalars['DateTime']>;
};

export type ChangeSetConnection = {
  __typename?: 'ChangeSetConnection';
  nodes?: Maybe<Array<Maybe<ChangeSet>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ChangeSetFilter = {
  time?: Maybe<TimeRangeFilter>;
};

export type CloudProvider = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type CloudProviderConnection = {
  __typename?: 'CloudProviderConnection';
  nodes?: Maybe<Array<Maybe<CloudProvider>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CloudProviderFilter = {
  cloudProvider?: Maybe<IdFilter>;
  cloudProviderType?: Maybe<CloudProviderTypeFilter>;
  createdAt?: Maybe<TimeFilter>;
  isCEEnabled?: Maybe<CeEnabledFilter>;
};

export enum CloudProviderType {
  Aws = 'AWS',
  Azure = 'AZURE',
  Gcp = 'GCP',
  KubernetesCluster = 'KUBERNETES_CLUSTER',
  Pcf = 'PCF',
  PhysicalDataCenter = 'PHYSICAL_DATA_CENTER',
  SpotInst = 'SPOT_INST'
}

export type CloudProviderTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<CloudProviderType>>>;
};

export enum ClusterDetailsType {
  InheritClusterDetails = 'INHERIT_CLUSTER_DETAILS',
  ManualClusterDetails = 'MANUAL_CLUSTER_DETAILS'
}

export type ClusterError = {
  __typename?: 'ClusterError';
  clusterErrors?: Maybe<Array<Maybe<Scalars['String']>>>;
  clusterId?: Maybe<Scalars['String']>;
};

export type CodeDeployInstance = Instance & PhysicalInstance & {
  __typename?: 'CodeDeployInstance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  deploymentId?: Maybe<Scalars['String']>;
  environment?: Maybe<Environment>;
  hostId?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  hostPublicDns?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
};

export enum ConditionType {
  OnNewArtifact = 'ON_NEW_ARTIFACT',
  OnPipelineCompletion = 'ON_PIPELINE_COMPLETION',
  OnSchedule = 'ON_SCHEDULE',
  OnWebhook = 'ON_WEBHOOK'
}

export type Connector = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ConnectorConnection = {
  __typename?: 'ConnectorConnection';
  nodes?: Maybe<Array<Maybe<Connector>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ConnectorFilter = {
  connector?: Maybe<IdFilter>;
  connectorType?: Maybe<ConnectorTypeFilter>;
  createdAt?: Maybe<TimeFilter>;
};

export enum ConnectorType {
  AmazonS3 = 'AMAZON_S3',
  AmazonS3HelmRepo = 'AMAZON_S3_HELM_REPO',
  ApmVerification = 'APM_VERIFICATION',
  AppDynamics = 'APP_DYNAMICS',
  Artifactory = 'ARTIFACTORY',
  Bamboo = 'BAMBOO',
  BugSnag = 'BUG_SNAG',
  DataDog = 'DATA_DOG',
  Docker = 'DOCKER',
  DynaTrace = 'DYNA_TRACE',
  Ecr = 'ECR',
  Elb = 'ELB',
  Elk = 'ELK',
  Gcr = 'GCR',
  Gcs = 'GCS',
  GcsHelmRepo = 'GCS_HELM_REPO',
  Git = 'GIT',
  HttpHelmRepo = 'HTTP_HELM_REPO',
  Jenkins = 'JENKINS',
  Jira = 'JIRA',
  Logz = 'LOGZ',
  NewRelic = 'NEW_RELIC',
  Nexus = 'NEXUS',
  Prometheus = 'PROMETHEUS',
  Servicenow = 'SERVICENOW',
  Sftp = 'SFTP',
  Slack = 'SLACK',
  Smb = 'SMB',
  Smtp = 'SMTP',
  Splunk = 'SPLUNK',
  Sumo = 'SUMO'
}

export type ConnectorTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<ConnectorType>>>;
};

export type ContainerRecommendation = {
  __typename?: 'ContainerRecommendation';
  /** @deprecated Will be removed in few days. */
  burstable?: Maybe<ResourceRequirements>;
  containerName?: Maybe<Scalars['String']>;
  current?: Maybe<ResourceRequirements>;
  /** @deprecated Will be removed in few days. */
  guaranteed?: Maybe<ResourceRequirements>;
  numDays?: Maybe<Scalars['Int']>;
  p50?: Maybe<ResourceRequirements>;
  p80?: Maybe<ResourceRequirements>;
  p90?: Maybe<ResourceRequirements>;
  p95?: Maybe<ResourceRequirements>;
  p99?: Maybe<ResourceRequirements>;
  recommended?: Maybe<ResourceRequirements>;
  totalSamplesCount?: Maybe<Scalars['Int']>;
};

export enum CountAggregateOperation {
  Sum = 'SUM'
}

export type CreateApplicationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /**
   * Beta: When this is set to true, all manual triggers will require API Key authorization.
   * Doc link: https://docs.harness.io/article/mc2lxsas4c-trigger-a-deployment-using-c-url#option_enforce_api_keys_for_manual_triggers
   */
  isManualTriggerAuthorized?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type CreateApplicationPayload = {
  __typename?: 'CreateApplicationPayload';
  application?: Maybe<Application>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateCloudProviderInput = {
  awsCloudProvider?: Maybe<AwsCloudProviderInput>;
  azureCloudProvider?: Maybe<AzureCloudProviderInput>;
  clientMutationId?: Maybe<Scalars['String']>;
  cloudProviderType: CloudProviderType;
  gcpCloudProvider?: Maybe<GcpCloudProviderInput>;
  k8sCloudProvider?: Maybe<K8sCloudProviderInput>;
  pcfCloudProvider?: Maybe<PcfCloudProviderInput>;
  physicalDataCenterCloudProvider?: Maybe<PhysicalDataCenterCloudProviderInput>;
  spotInstCloudProvider?: Maybe<SpotInstCloudProviderInput>;
};

export type CreateCloudProviderPayload = {
  __typename?: 'CreateCloudProviderPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  cloudProvider?: Maybe<CloudProvider>;
};

export type CreateConnectorInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  connectorType: ConnectorType;
  dockerConnector?: Maybe<DockerConnectorInput>;
  gitConnector?: Maybe<GitConnectorInput>;
  helmConnector?: Maybe<HelmConnectorInput>;
  nexusConnector?: Maybe<NexusConnectorInput>;
};

export type CreateConnectorPayload = {
  __typename?: 'CreateConnectorPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  connector?: Maybe<Connector>;
};

export type CreateSecretInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  encryptedText?: Maybe<EncryptedTextInput>;
  secretType: SecretType;
  sshCredential?: Maybe<SshCredentialInput>;
  winRMCredential?: Maybe<WinRmCredentialInput>;
};

export type CreateSecretManagerInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  hashicorpVaultConfigInput?: Maybe<HashicorpVaultSecretManagerInput>;
  secretManagerType: SecretManagerType;
};

export type CreateSecretPayload = {
  __typename?: 'CreateSecretPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  secret?: Maybe<Secret>;
};

export type CreateTriggerInput = {
  /** Action performed on trigger execute: Workflow/Pipeline execution */
  action: TriggerActionInput;
  /** Application Id In which Trigger will be created */
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  /** Condition of which Trigger will execute */
  condition: TriggerConditionInput;
  /** Description of the Trigger */
  description?: Maybe<Scalars['String']>;
  /** Name of the Trigger */
  name: Scalars['String'];
};

export type CreateUserGroupInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  notificationSettings?: Maybe<NotificationSettingsInput>;
  permissions?: Maybe<Permissions>;
  ssoSetting?: Maybe<SsoSettingInput>;
  userIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateUserGroupPayload = {
  __typename?: 'CreateUserGroupPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<UserGroup>;
};

export type CreateUserInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  userGroupIds?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CustomArtifactSource = ArtifactSource & {
  __typename?: 'CustomArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
};


export type CustomArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type CustomCommitDetails = {
  __typename?: 'CustomCommitDetails';
  authorEmailId?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  commitMessage?: Maybe<Scalars['String']>;
};

export type CustomCommitDetailsInput = {
  authorEmailId?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  commitMessage?: Maybe<Scalars['String']>;
};

export type Data = AggregatedData | SinglePointData | StackedData | StackedTimeSeriesData | TimeSeriesData;

export type DataDogConnector = Connector & {
  __typename?: 'DataDogConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum DataFetcherEnum {
  AddAccountPermission = 'addAccountPermission',
  AddAppPermission = 'addAppPermission',
  AddUserToUserGroup = 'addUserToUserGroup',
  Application = 'application',
  ApplicationConnection = 'applicationConnection',
  ApplicationGitSyncConfig = 'applicationGitSyncConfig',
  ApplicationStats = 'applicationStats',
  Artifact = 'artifact',
  ArtifactConnection = 'artifactConnection',
  ArtifactSource = 'artifactSource',
  AttachTag = 'attachTag',
  BillingForecastCost = 'billingForecastCost',
  BillingJobProcessed = 'billingJobProcessed',
  BillingStatsEntity = 'billingStatsEntity',
  BillingStatsFilterValues = 'billingStatsFilterValues',
  BillingStatsTimeSeries = 'billingStatsTimeSeries',
  BillingTrendStats = 'billingTrendStats',
  Budget = 'budget',
  BudgetList = 'budgetList',
  BudgetNotifications = 'budgetNotifications',
  BudgetTrendStats = 'budgetTrendStats',
  CeActivePodCount = 'ceActivePodCount',
  CeClusterBillingData = 'ceClusterBillingData',
  CeConnector = 'ceConnector',
  CeHealthStatus = 'ceHealthStatus',
  ChangeContentConnection = 'changeContentConnection',
  ChangeSetConnection = 'changeSetConnection',
  CloudAnomalies = 'cloudAnomalies',
  CloudEntityStats = 'cloudEntityStats',
  CloudFilterValues = 'cloudFilterValues',
  CloudOverview = 'cloudOverview',
  CloudProvider = 'cloudProvider',
  CloudProviderConnection = 'cloudProviderConnection',
  CloudProviderStats = 'cloudProviderStats',
  CloudTimeSeriesStats = 'cloudTimeSeriesStats',
  CloudTrendStats = 'cloudTrendStats',
  Cluster = 'cluster',
  ClusterConnection = 'clusterConnection',
  Connector = 'connector',
  ConnectorConnection = 'connectorConnection',
  ConnectorStats = 'connectorStats',
  CreateApplication = 'createApplication',
  CreateCloudProvider = 'createCloudProvider',
  CreateConnector = 'createConnector',
  CreateSecret = 'createSecret',
  CreateSecretManager = 'createSecretManager',
  CreateTrigger = 'createTrigger',
  CreateUser = 'createUser',
  CreateUserGroup = 'createUserGroup',
  DeleteApplication = 'deleteApplication',
  DeleteCloudProvider = 'deleteCloudProvider',
  DeleteConnector = 'deleteConnector',
  DeleteSecret = 'deleteSecret',
  DeleteSecretManager = 'deleteSecretManager',
  DeleteTrigger = 'deleteTrigger',
  DeleteUser = 'deleteUser',
  DeleteUserGroup = 'deleteUserGroup',
  DeploymentStats = 'deploymentStats',
  DetachTag = 'detachTag',
  EfficiencyStats = 'efficiencyStats',
  EksClusterStats = 'eksClusterStats',
  Environment = 'environment',
  EnvironmentConnection = 'environmentConnection',
  EnvironmentStats = 'environmentStats',
  EventsStats = 'eventsStats',
  Execution = 'execution',
  ExecutionConnection = 'executionConnection',
  ExecutionInputs = 'executionInputs',
  ExportExecutions = 'exportExecutions',
  GcpBillingAccount = 'gcpBillingAccount',
  GcpBillingEntityStats = 'gcpBillingEntityStats',
  GcpBillingTimeSeriesStats = 'gcpBillingTimeSeriesStats',
  GcpBillingTrendStats = 'gcpBillingTrendStats',
  GcpOrganization = 'gcpOrganization',
  GcpServiceAccount = 'gcpServiceAccount',
  GetSecret = 'getSecret',
  IdleCostTrendStats = 'idleCostTrendStats',
  InfraAccountConnection = 'infraAccountConnection',
  InfrastructureDefinition = 'infrastructureDefinition',
  InfrastructureDefinitionConnection = 'infrastructureDefinitionConnection',
  InstanceConnection = 'instanceConnection',
  InstanceCount = 'instanceCount',
  InstanceStats = 'instanceStats',
  K8sAnomalies = 'k8sAnomalies',
  K8sEventYamlDiff = 'k8sEventYamlDiff',
  K8sLabelConnection = 'k8sLabelConnection',
  K8sWorkloadHistogram = 'k8sWorkloadHistogram',
  K8sWorkloadRecommendations = 'k8sWorkloadRecommendations',
  LinkedAccountStats = 'linkedAccountStats',
  NodeAndPodDetails = 'nodeAndPodDetails',
  OutcomeConnection = 'outcomeConnection',
  OverviewAnomalies = 'overviewAnomalies',
  OverviewPageStats = 'overviewPageStats',
  Pipeline = 'pipeline',
  PipelineConnection = 'pipelineConnection',
  PipelineResumeRuntime = 'pipelineResumeRuntime',
  PipelineStats = 'pipelineStats',
  PipelineVariableConnection = 'pipelineVariableConnection',
  RemoveApplicationGitSyncConfig = 'removeApplicationGitSyncConfig',
  RemoveUserFromUserGroup = 'removeUserFromUserGroup',
  ResumeExecution = 'resumeExecution',
  RuntimeExecutionInputsToResumePipeline = 'runtimeExecutionInputsToResumePipeline',
  SecretManager = 'secretManager',
  SecretManagers = 'secretManagers',
  Service = 'service',
  ServiceArtifactSourceConnection = 'serviceArtifactSourceConnection',
  ServiceConnection = 'serviceConnection',
  ServiceStats = 'serviceStats',
  SsoProvider = 'ssoProvider',
  SsoProviderConnection = 'ssoProviderConnection',
  StartExecution = 'startExecution',
  SunburstChartStats = 'sunburstChartStats',
  Tag = 'tag',
  TagConnection = 'tagConnection',
  TagUsageConnection = 'tagUsageConnection',
  Tags = 'tags',
  TagsInUseConnection = 'tagsInUseConnection',
  Trigger = 'trigger',
  TriggerConnection = 'triggerConnection',
  TriggerStats = 'triggerStats',
  UpdateAnomaly = 'updateAnomaly',
  UpdateApplication = 'updateApplication',
  UpdateApplicationGitSyncConfig = 'updateApplicationGitSyncConfig',
  UpdateApplicationGitSyncConfigStatus = 'updateApplicationGitSyncConfigStatus',
  UpdateCloudProvider = 'updateCloudProvider',
  UpdateConnector = 'updateConnector',
  UpdateSecret = 'updateSecret',
  UpdateSecretManager = 'updateSecretManager',
  UpdateTrigger = 'updateTrigger',
  UpdateUser = 'updateUser',
  UpdateUserGroup = 'updateUserGroup',
  UpdateUserGroupPermissions = 'updateUserGroupPermissions',
  User = 'user',
  UserConnection = 'userConnection',
  UserGroup = 'userGroup',
  UserGroupConnection = 'userGroupConnection',
  ViewEntityStats = 'viewEntityStats',
  ViewFields = 'viewFields',
  ViewFilterStats = 'viewFilterStats',
  ViewOverviewStats = 'viewOverviewStats',
  ViewTimeSeriesStats = 'viewTimeSeriesStats',
  ViewTrendStats = 'viewTrendStats',
  Views = 'views',
  Workflow = 'workflow',
  WorkflowConnection = 'workflowConnection',
  WorkflowStats = 'workflowStats',
  WorkflowVariableConnection = 'workflowVariableConnection'
}

export type DataPoint = {
  __typename?: 'DataPoint';
  key?: Maybe<Reference>;
  /**  Key refers to the label */
  value?: Maybe<Scalars['Number']>;
};

export enum DataType {
  Number = 'NUMBER',
  String = 'STRING'
}


export type DeleteApplicationInput = {
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteApplicationPayload = {
  __typename?: 'DeleteApplicationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteCloudProviderInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  cloudProviderId: Scalars['String'];
};

export type DeleteCloudProviderPayload = {
  __typename?: 'DeleteCloudProviderPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteConnectorInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  connectorId: Scalars['String'];
};

export type DeleteConnectorPayload = {
  __typename?: 'DeleteConnectorPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteSecretInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  secretId: Scalars['String'];
  secretType: SecretType;
};

export type DeleteSecretManagerInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  secretManagerId: Scalars['String'];
};

export type DeleteSecretManagerPayload = {
  __typename?: 'DeleteSecretManagerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteSecretPayload = {
  __typename?: 'DeleteSecretPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteTriggerInput = {
  /** Application Id */
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  /** Id of Trigger to be deleted */
  triggerId: Scalars['String'];
};

export type DeleteTriggerPayload = {
  __typename?: 'DeleteTriggerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteUserGroupInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  userGroupId: Scalars['String'];
};

export type DeleteUserGroupPayload = {
  __typename?: 'DeleteUserGroupPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteUserInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeploymentAggregation = {
  entityAggregation?: Maybe<DeploymentEntityAggregation>;
  tagAggregation?: Maybe<DeploymentTagAggregation>;
  timeAggregation?: Maybe<TimeSeriesAggregation>;
};

export type DeploymentAggregationFunction = {
  count?: Maybe<CountAggregateOperation>;
  duration?: Maybe<DurationAggregateOperation>;
  instancesDeployed?: Maybe<CountAggregateOperation>;
  rollbackDuration?: Maybe<DurationAggregateOperation>;
};

export enum DeploymentEntityAggregation {
  Application = 'Application',
  CloudProvider = 'CloudProvider',
  Environment = 'Environment',
  EnvironmentType = 'EnvironmentType',
  Pipeline = 'Pipeline',
  Service = 'Service',
  Status = 'Status',
  Trigger = 'Trigger',
  TriggeredBy = 'TriggeredBy',
  Workflow = 'Workflow'
}

export type DeploymentFilter = {
  application?: Maybe<IdFilter>;
  cloudProvider?: Maybe<IdFilter>;
  duration?: Maybe<NumberFilter>;
  endTime?: Maybe<TimeFilter>;
  environment?: Maybe<IdFilter>;
  environmentType?: Maybe<EnvironmentTypeFilter>;
  pipeline?: Maybe<IdFilter>;
  rollbackDuration?: Maybe<NumberFilter>;
  service?: Maybe<IdFilter>;
  startTime?: Maybe<TimeFilter>;
  status?: Maybe<IdFilter>;
  tag?: Maybe<DeploymentTagFilter>;
  trigger?: Maybe<IdFilter>;
  triggeredBy?: Maybe<IdFilter>;
  workflow?: Maybe<IdFilter>;
};

export type DeploymentOutcome = Outcome & {
  __typename?: 'DeploymentOutcome';
  environment?: Maybe<Environment>;
  execution?: Maybe<Execution>;
  service?: Maybe<Service>;
};

export type DeploymentPermissionFilter = {
  __typename?: 'DeploymentPermissionFilter';
  envIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  filterTypes?: Maybe<Array<Maybe<DeploymentPermissionFilterType>>>;
};

export type DeploymentPermissionFilterInput = {
  envIds?: Maybe<Array<Scalars['String']>>;
  filterTypes?: Maybe<Array<Maybe<DeploymentPermissionFilterType>>>;
};

export enum DeploymentPermissionFilterType {
  NonProductionEnvironments = 'NON_PRODUCTION_ENVIRONMENTS',
  ProductionEnvironments = 'PRODUCTION_ENVIRONMENTS'
}

export type DeploymentSortCriteria = {
  sortOrder?: Maybe<SortOrder>;
  sortType?: Maybe<DeploymentSortType>;
};

export enum DeploymentSortType {
  Count = 'Count',
  Duration = 'Duration'
}

export type DeploymentTag = {
  __typename?: 'DeploymentTag';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type DeploymentTagAggregation = {
  entityType?: Maybe<DeploymentTagType>;
  tagName?: Maybe<Scalars['String']>;
};

export type DeploymentTagFilter = {
  entityType?: Maybe<DeploymentTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum DeploymentTagType {
  Application = 'APPLICATION',
  Deployment = 'DEPLOYMENT',
  Environment = 'ENVIRONMENT',
  Service = 'SERVICE'
}

export enum DeploymentType {
  Ami = 'AMI',
  AwsCodedeploy = 'AWS_CODEDEPLOY',
  AwsLambda = 'AWS_LAMBDA',
  AzureVmss = 'AZURE_VMSS',
  AzureWebapp = 'AZURE_WEBAPP',
  Custom = 'CUSTOM',
  Ecs = 'ECS',
  Helm = 'HELM',
  Kubernetes = 'KUBERNETES',
  Pcf = 'PCF',
  Spotinst = 'SPOTINST',
  Ssh = 'SSH',
  Winrm = 'WINRM'
}

export type DeploymentTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<DeploymentType>>>;
};

export type DetachTagInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  /**  Unique ID of the harness entity */
  entityId: Scalars['String'];
  /**  Type of entity the tag is to be detached from */
  entityType: TagEntityType;
  /**  Name of the tag */
  name: Scalars['String'];
};

export type DetachTagPayload = {
  __typename?: 'DetachTagPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DockerArtifactSource = ArtifactSource & {
  __typename?: 'DockerArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dockerConnectorId?: Maybe<Scalars['String']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  imageName?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
};


export type DockerArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type DockerConnector = Connector & {
  __typename?: 'DockerConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  delegateSelectors?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DockerConnectorInput = {
  URL: Scalars['String'];
  delegateSelectors?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  passwordSecretId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export enum DurationAggregateOperation {
  Average = 'AVERAGE',
  Max = 'MAX',
  Min = 'MIN'
}

export type DynaTraceConnector = Connector & {
  __typename?: 'DynaTraceConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type EcrArtifactSource = ArtifactSource & {
  __typename?: 'ECRArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  awsCloudProviderId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  imageName?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};


export type EcrArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type EcrConnector = Connector & {
  __typename?: 'ECRConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Ec2IamCredentials = {
  delegateSelector: Scalars['String'];
  usageScope?: Maybe<UsageScopeInput>;
};

export type Ec2Instance = Instance & PhysicalInstance & {
  __typename?: 'Ec2Instance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  environment?: Maybe<Environment>;
  hostId?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  hostPublicDns?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
};

export type EcsContainerInstance = Instance & {
  __typename?: 'EcsContainerInstance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  clusterName?: Maybe<Scalars['String']>;
  environment?: Maybe<Environment>;
  id?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  serviceName?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['DateTime']>;
  taskArn?: Maybe<Scalars['String']>;
  taskDefinitionArn?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type ElbConnector = Connector & {
  __typename?: 'ElbConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ElkConnector = Connector & {
  __typename?: 'ElkConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type EncryptedFile = Secret & {
  __typename?: 'EncryptedFile';
  id?: Maybe<Scalars['String']>;
  inheritScopesFromSM?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  scopedToAccount?: Maybe<Scalars['Boolean']>;
  secretManagerId?: Maybe<Scalars['String']>;
  secretType?: Maybe<SecretType>;
  usageScope?: Maybe<UsageScope>;
};

export type EncryptedText = Secret & {
  __typename?: 'EncryptedText';
  id?: Maybe<Scalars['String']>;
  inheritScopesFromSM?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  scopedToAccount?: Maybe<Scalars['Boolean']>;
  secretManagerId?: Maybe<Scalars['String']>;
  secretType?: Maybe<SecretType>;
  usageScope?: Maybe<UsageScope>;
};

export type EncryptedTextInput = {
  inheritScopesFromSM?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  scopedToAccount?: Maybe<Scalars['Boolean']>;
  secretManagerId?: Maybe<Scalars['String']>;
  secretReference?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScopeInput>;
  value?: Maybe<Scalars['String']>;
};

export enum EntityType {
  Application = 'APPLICATION',
  Artifact = 'ARTIFACT',
  CloudProvider = 'CLOUD_PROVIDER',
  CollaborationProvider = 'COLLABORATION_PROVIDER',
  Connector = 'CONNECTOR',
  Deployment = 'DEPLOYMENT',
  Environment = 'ENVIRONMENT',
  Instance = 'INSTANCE',
  Pipeline = 'PIPELINE',
  Provisioner = 'PROVISIONER',
  Service = 'SERVICE',
  Trigger = 'TRIGGER',
  Workflow = 'WORKFLOW'
}

export type EntityTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<EntityType>>>;
};

export enum EnumOperator {
  Equals = 'EQUALS',
  In = 'IN'
}

export type EnvFilter = {
  __typename?: 'EnvFilter';
  envIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  filterTypes?: Maybe<Array<Maybe<EnvFilterType>>>;
};

export type EnvFilterInput = {
  envIds?: Maybe<Scalars['String']>;
  filterTypes?: Maybe<EnvFilterType>;
};

export enum EnvFilterType {
  NonProductionEnvironments = 'NON_PRODUCTION_ENVIRONMENTS',
  ProductionEnvironments = 'PRODUCTION_ENVIRONMENTS'
}

export type EnvPermissionFilter = {
  __typename?: 'EnvPermissionFilter';
  envIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  filterTypes?: Maybe<Array<Maybe<EnvFilterType>>>;
};

export type EnvPermissionFilterInput = {
  envIds?: Maybe<Array<Scalars['String']>>;
  filterTypes?: Maybe<Array<Maybe<EnvFilterType>>>;
};

export type EnvScopeFilter = {
  __typename?: 'EnvScopeFilter';
  envId?: Maybe<Scalars['String']>;
  filterType?: Maybe<EnvFilterType>;
};

export type EnvScopeFilterInput = {
  envId?: Maybe<Scalars['String']>;
  filterType?: Maybe<EnvFilterType>;
};

export type Environment = {
  __typename?: 'Environment';
  application?: Maybe<Application>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  infrastructureDefinitions?: Maybe<InfrastructureDefinitionConnection>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  type?: Maybe<EnvironmentType>;
};


export type EnvironmentInfrastructureDefinitionsArgs = {
  filters?: Maybe<Array<Maybe<InfrastructureDefinitionFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type EnvironmentConnection = {
  __typename?: 'EnvironmentConnection';
  nodes?: Maybe<Array<Maybe<Environment>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type EnvironmentFilter = {
  application?: Maybe<IdFilter>;
  environment?: Maybe<IdFilter>;
  environmentType?: Maybe<EnvironmentTypeFilter>;
  tag?: Maybe<EnvironmentTagFilter>;
};

export type EnvironmentTagFilter = {
  entityType?: Maybe<EnvironmentTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum EnvironmentTagType {
  Application = 'APPLICATION'
}

export enum EnvironmentType {
  NonProd = 'NON_PROD',
  Prod = 'PROD'
}

export type EnvironmentTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<EnvironmentType>>>;
};

export enum ExecuteOptions {
  GraphqlApi = 'GRAPHQL_API',
  WebUi = 'WEB_UI'
}

export type ExecutedAlongPipeline = {
  __typename?: 'ExecutedAlongPipeline';
  execution?: Maybe<PipelineExecution>;
};

export type ExecutedByApiKey = {
  __typename?: 'ExecutedByAPIKey';
  apiKey?: Maybe<ApiKey>;
  using?: Maybe<ExecuteOptions>;
};

export type ExecutedByTrigger = {
  __typename?: 'ExecutedByTrigger';
  trigger?: Maybe<Trigger>;
};

export type ExecutedByUser = {
  __typename?: 'ExecutedByUser';
  user?: Maybe<User>;
  using?: Maybe<ExecuteOptions>;
};

export type Execution = {
  application?: Maybe<Application>;
  cause?: Maybe<Cause>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endedAt?: Maybe<Scalars['DateTime']>;
  failureDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['DateTime']>;
  status?: Maybe<ExecutionStatus>;
  tags?: Maybe<Array<Maybe<DeploymentTag>>>;
};

export type ExecutionConnection = {
  __typename?: 'ExecutionConnection';
  nodes?: Maybe<Array<Maybe<Execution>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ExecutionFilter = {
  application?: Maybe<IdFilter>;
  cloudProvider?: Maybe<IdFilter>;
  creationTime?: Maybe<TimeFilter>;
  duration?: Maybe<NumberFilter>;
  endTime?: Maybe<TimeFilter>;
  environment?: Maybe<IdFilter>;
  environmentType?: Maybe<EnvironmentTypeFilter>;
  execution?: Maybe<IdFilter>;
  pipeline?: Maybe<IdFilter>;
  pipelineExecutionId?: Maybe<IdFilter>;
  service?: Maybe<IdFilter>;
  startTime?: Maybe<TimeFilter>;
  status?: Maybe<IdFilter>;
  tag?: Maybe<DeploymentTagFilter>;
  trigger?: Maybe<IdFilter>;
  triggeredBy?: Maybe<IdFilter>;
  workflow?: Maybe<IdFilter>;
};

export type ExecutionInputs = {
  __typename?: 'ExecutionInputs';
  /** List of Services that need artifact input */
  serviceInputs?: Maybe<Array<Maybe<Service>>>;
};

export enum ExecutionStatus {
  Aborted = 'ABORTED',
  Error = 'ERROR',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Paused = 'PAUSED',
  Queued = 'QUEUED',
  Rejected = 'REJECTED',
  Resumed = 'RESUMED',
  Running = 'RUNNING',
  Skipped = 'SKIPPED',
  Success = 'SUCCESS',
  Waiting = 'WAITING'
}

export enum ExecutionType {
  Pipeline = 'PIPELINE',
  Workflow = 'WORKFLOW'
}

export type ExportExecutionFilter = {
  application?: Maybe<IdFilter>;
  cloudProvider?: Maybe<IdFilter>;
  creationTime?: Maybe<TimeFilter>;
  duration?: Maybe<NumberFilter>;
  endTime?: Maybe<TimeFilter>;
  environment?: Maybe<IdFilter>;
  execution?: Maybe<IdFilter>;
  pipeline?: Maybe<IdFilter>;
  service?: Maybe<IdFilter>;
  startTime?: Maybe<TimeFilter>;
  status?: Maybe<IdFilter>;
  tag?: Maybe<DeploymentTagFilter>;
  trigger?: Maybe<IdFilter>;
  triggeredBy?: Maybe<IdFilter>;
  workflow?: Maybe<IdFilter>;
};

export type ExportExecutionsInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  /** Execution filters */
  filters?: Maybe<Array<ExportExecutionFilter>>;
  /** Notify only the triggering user */
  notifyOnlyTriggeringUser?: Maybe<Scalars['Boolean']>;
  /** User group ids */
  userGroupIds?: Maybe<Array<Scalars['String']>>;
};

export type ExportExecutionsPayload = {
  __typename?: 'ExportExecutionsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  downloadLink?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  requestId?: Maybe<Scalars['String']>;
  status?: Maybe<ExportExecutionsStatus>;
  statusLink?: Maybe<Scalars['String']>;
  totalExecutions?: Maybe<Scalars['Number']>;
  triggeredAt?: Maybe<Scalars['DateTime']>;
};

export enum ExportExecutionsStatus {
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Queued = 'QUEUED',
  Ready = 'READY'
}

export type Filter = {
  __typename?: 'Filter';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum FilterType {
  All = 'ALL'
}

export type FromTriggeringArtifactSource = ArtifactSelection & {
  __typename?: 'FromTriggeringArtifactSource';
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
};

export type FromTriggeringPipeline = ArtifactSelection & {
  __typename?: 'FromTriggeringPipeline';
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
};

export type FromWebhookPayload = ArtifactSelection & {
  __typename?: 'FromWebhookPayload';
  artifactSourceId?: Maybe<Scalars['String']>;
  artifactSourceName?: Maybe<Scalars['String']>;
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
};

export type GcrArtifactSource = ArtifactSource & {
  __typename?: 'GCRArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dockerImageName?: Maybe<Scalars['String']>;
  gcpCloudProviderId?: Maybe<Scalars['String']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  registryHostName?: Maybe<Scalars['String']>;
};


export type GcrArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type GcrConnector = Connector & {
  __typename?: 'GCRConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GcsArtifactSource = ArtifactSource & {
  __typename?: 'GCSArtifactSource';
  artifactPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  artifacts?: Maybe<ArtifactConnection>;
  bucket?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  gcpCloudProviderId?: Maybe<Scalars['String']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
};


export type GcsArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type GcsConnector = Connector & {
  __typename?: 'GCSConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GcsHelmRepoConnector = Connector & {
  __typename?: 'GCSHelmRepoConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GcsPlatformInput = {
  bucketName: Scalars['String'];
  googleCloudProvider: Scalars['String'];
};

export type GcpCloudProvider = CloudProvider & {
  __typename?: 'GcpCloudProvider';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  delegateSelectors?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpCloudProviderInput = {
  delegateSelector?: Maybe<Scalars['String']>;
  delegateSelectors?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  serviceAccountKeySecretId?: Maybe<Scalars['String']>;
  skipValidation?: Maybe<Scalars['Boolean']>;
  useDelegate?: Maybe<Scalars['Boolean']>;
  useDelegateSelectors?: Maybe<Scalars['Boolean']>;
};

/**
 * If changeSet got triggered by any other source than GraphQL mutation(through API key)
 * or Git action or User action
 */
export type GenericChangeSet = ChangeSet & {
  __typename?: 'GenericChangeSet';
  /** List of all changeDetails */
  changes?: Maybe<Array<Maybe<ChangeDetails>>>;
  /** Failure message */
  failureStatusMsg?: Maybe<Scalars['String']>;
  /** Unique ID of a changeSet */
  id?: Maybe<Scalars['String']>;
  /** HTTP request that triggered the changeSet */
  request?: Maybe<RequestInfo>;
  /** Timestamp when changeSet was triggered */
  triggeredAt?: Maybe<Scalars['DateTime']>;
};

/** If changeSet got triggered by Git action */
export type GitChangeSet = ChangeSet & {
  __typename?: 'GitChangeSet';
  /** Git author who triggered the changeSet */
  author?: Maybe<Scalars['String']>;
  /** List of all changeDetails */
  changes?: Maybe<Array<Maybe<ChangeDetails>>>;
  /** Failure message */
  failureStatusMsg?: Maybe<Scalars['String']>;
  /** Git commit ID that triggered the changeSet */
  gitCommitId?: Maybe<Scalars['String']>;
  /** Unique ID of a changeSet */
  id?: Maybe<Scalars['String']>;
  /** Git repository URL that triggered the changeSet */
  repoUrl?: Maybe<Scalars['String']>;
  /** HTTP request that triggered the changeSet */
  request?: Maybe<RequestInfo>;
  /** Timestamp when changeSet was triggered */
  triggeredAt?: Maybe<Scalars['DateTime']>;
};

export type GitConnector = Connector & {
  __typename?: 'GitConnector';
  URL?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  customCommitDetails?: Maybe<CustomCommitDetails>;
  description?: Maybe<Scalars['String']>;
  generateWebhookUrl?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  passwordSecretId?: Maybe<Scalars['String']>;
  sshSettingId?: Maybe<Scalars['String']>;
  urlType?: Maybe<UrlType>;
  usageScope?: Maybe<UsageScope>;
  userName?: Maybe<Scalars['String']>;
  webhookUrl?: Maybe<Scalars['String']>;
};

export type GitConnectorInput = {
  URL: Scalars['String'];
  branch?: Maybe<Scalars['String']>;
  customCommitDetails?: Maybe<CustomCommitDetailsInput>;
  generateWebhookUrl?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  passwordSecretId?: Maybe<Scalars['String']>;
  sshSettingId?: Maybe<Scalars['String']>;
  urlType: UrlType;
  usageScope?: Maybe<UsageScopeInput>;
  userName?: Maybe<Scalars['String']>;
};

export enum GitHubAction {
  Assigned = 'ASSIGNED',
  Closed = 'CLOSED',
  Created = 'CREATED',
  Deleted = 'DELETED',
  Edited = 'EDITED',
  Labeled = 'LABELED',
  Opened = 'OPENED',
  PackagePublished = 'PACKAGE_PUBLISHED',
  PreReleased = 'PRE_RELEASED',
  Published = 'PUBLISHED',
  Released = 'RELEASED',
  Reopened = 'REOPENED',
  ReviewRequested = 'REVIEW_REQUESTED',
  ReviewRequestedRemoved = 'REVIEW_REQUESTED_REMOVED',
  Synchronized = 'SYNCHRONIZED',
  Unassigned = 'UNASSIGNED',
  Unlabeled = 'UNLABELED',
  Unpublished = 'UNPUBLISHED'
}

export type GitHubEvent = {
  /** Github Action for the event type. */
  action?: Maybe<GitHubAction>;
  /** Github event type like PUSH, PULL_REQUEST, etc */
  event?: Maybe<GitHubEventType>;
};

export enum GitHubEventType {
  Any = 'ANY',
  Delete = 'DELETE',
  Package = 'PACKAGE',
  PullRequest = 'PULL_REQUEST',
  Push = 'PUSH',
  Release = 'RELEASE'
}

export type GitSyncConfig = {
  __typename?: 'GitSyncConfig';
  branch?: Maybe<Scalars['String']>;
  gitConnector?: Maybe<GitConnector>;
  repositoryName?: Maybe<Scalars['String']>;
  syncEnabled?: Maybe<Scalars['Boolean']>;
};

export enum GitlabEvent {
  Any = 'ANY',
  PullRequest = 'PULL_REQUEST',
  Push = 'PUSH'
}

export type GroupBy = {
  __typename?: 'GroupBy';
  entityType?: Maybe<Scalars['String']>;
};

export type HashicorpVaultAuthDetails = {
  appRoleId?: Maybe<Scalars['String']>;
  authToken?: Maybe<Scalars['String']>;
  secretId?: Maybe<Scalars['String']>;
};

export type HashicorpVaultSecretManagerInput = {
  authDetails: HashicorpVaultAuthDetails;
  basePath?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  isReadOnly?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  secretEngineName: Scalars['String'];
  secretEngineRenewalInterval: Scalars['Long'];
  secretEngineVersion: Scalars['Int'];
  usageScope?: Maybe<UsageScopeInput>;
  vaultUrl: Scalars['String'];
};

export type HelmConnectorInput = {
  amazonS3PlatformDetails?: Maybe<AmazonS3PlatformInput>;
  gcsPlatformDetails?: Maybe<GcsPlatformInput>;
  httpServerPlatformDetails?: Maybe<HttpServerPlatformInput>;
  name: Scalars['String'];
};

export type HttpHelmRepoConnector = Connector & {
  __typename?: 'HttpHelmRepoConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type HttpServerPlatformInput = {
  URL: Scalars['String'];
  passwordSecretId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type IdFilter = {
  operator: IdOperator;
  values: Array<Maybe<Scalars['String']>>;
};

export enum IdOperator {
  Equals = 'EQUALS',
  In = 'IN',
  Like = 'LIKE',
  NotIn = 'NOT_IN',
  NotNull = 'NOT_NULL'
}

export type InfrastructureDefinition = {
  __typename?: 'InfrastructureDefinition';
  createdAt?: Maybe<Scalars['DateTime']>;
  deploymentType?: Maybe<Scalars['String']>;
  environment?: Maybe<Environment>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  scopedToServices?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type InfrastructureDefinitionConnection = {
  __typename?: 'InfrastructureDefinitionConnection';
  nodes?: Maybe<Array<Maybe<InfrastructureDefinition>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type InfrastructureDefinitionFilter = {
  deploymentType?: Maybe<StringFilter>;
  environment?: Maybe<IdFilter>;
  infrastructureDefinition?: Maybe<IdFilter>;
  tag?: Maybe<InfrastructureDefinitionTagFilter>;
};

export type InfrastructureDefinitionTagFilter = {
  entityType?: Maybe<InfrastructureDefinitionTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum InfrastructureDefinitionTagType {
  Environment = 'ENVIRONMENT'
}

export type InheritClusterDetails = {
  delegateName?: Maybe<Scalars['String']>;
  delegateSelectors?: Maybe<Array<Scalars['String']>>;
  usageScope?: Maybe<UsageScopeInput>;
};

export type InlineSshKey = {
  passphraseSecretId?: Maybe<Scalars['String']>;
  sshKeySecretFileId: Scalars['String'];
};

export type Instance = {
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  environment?: Maybe<Environment>;
  id?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
};

export type InstanceConnection = {
  __typename?: 'InstanceConnection';
  nodes?: Maybe<Array<Maybe<Instance>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type InstanceFilter = {
  application?: Maybe<IdFilter>;
  cloudProvider?: Maybe<IdFilter>;
  createdAt?: Maybe<TimeFilter>;
  environment?: Maybe<IdFilter>;
  instanceType?: Maybe<InstanceType>;
  service?: Maybe<IdFilter>;
  tag?: Maybe<InstanceTagFilter>;
};

export type InstanceTagFilter = {
  entityType?: Maybe<InstanceTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum InstanceTagType {
  Application = 'APPLICATION',
  Environment = 'ENVIRONMENT',
  Service = 'SERVICE'
}

export enum InstanceType {
  AutoscalingGroupInstance = 'AUTOSCALING_GROUP_INSTANCE',
  CodeDeployInstance = 'CODE_DEPLOY_INSTANCE',
  Ec2Instance = 'EC2_INSTANCE',
  EcsContainerInstance = 'ECS_CONTAINER_INSTANCE',
  KubernetesContainerInstance = 'KUBERNETES_CONTAINER_INSTANCE',
  PcfInstance = 'PCF_INSTANCE',
  PhysicalHostInstance = 'PHYSICAL_HOST_INSTANCE'
}

export type JenkinsArtifactSource = ArtifactSource & {
  __typename?: 'JenkinsArtifactSource';
  artifactPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  jenkinsConnectorId?: Maybe<Scalars['String']>;
  jobName?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
};


export type JenkinsArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type JenkinsConnector = Connector & {
  __typename?: 'JenkinsConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type JiraConnector = Connector & {
  __typename?: 'JiraConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sCloudProviderInput = {
  clusterDetailsType: ClusterDetailsType;
  inheritClusterDetails?: Maybe<InheritClusterDetails>;
  manualClusterDetails?: Maybe<ManualClusterDetails>;
  name: Scalars['String'];
  skipValidation?: Maybe<Scalars['Boolean']>;
};

export type K8sContainerInfo = {
  __typename?: 'K8sContainerInfo';
  containerId?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type K8sLabel = {
  __typename?: 'K8sLabel';
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sLabelConnection = {
  __typename?: 'K8sLabelConnection';
  nodes?: Maybe<Array<Maybe<K8sLabel>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type K8sLabelFilter = {
  cluster?: Maybe<IdFilter>;
  endTime?: Maybe<TimeFilter>;
  namespace?: Maybe<IdFilter>;
  startTime?: Maybe<TimeFilter>;
  workloadName?: Maybe<IdFilter>;
};

export type K8sLabelInput = {
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type K8sPodInstance = Instance & {
  __typename?: 'K8sPodInstance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  containers?: Maybe<Array<Maybe<K8sContainerInfo>>>;
  environment?: Maybe<Environment>;
  id?: Maybe<Scalars['String']>;
  ip?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  podName?: Maybe<Scalars['String']>;
  releaseName?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
};

export type K8sWorkloadRecommendationPreset = {
  __typename?: 'K8sWorkloadRecommendationPreset';
  cpuLimit?: Maybe<Scalars['Number']>;
  cpuRequest?: Maybe<Scalars['Number']>;
  memoryLimit?: Maybe<Scalars['Number']>;
  memoryRequest?: Maybe<Scalars['Number']>;
  minCpuMilliCores?: Maybe<Scalars['Long']>;
  minMemoryBytes?: Maybe<Scalars['Long']>;
  safetyMargin?: Maybe<Scalars['Number']>;
};

export type KerberosAuthentication = {
  __typename?: 'KerberosAuthentication';
  port?: Maybe<Scalars['Int']>;
  principal?: Maybe<Scalars['String']>;
  realm?: Maybe<Scalars['String']>;
};

export type KerberosAuthenticationInput = {
  port: Scalars['Int'];
  principal: Scalars['String'];
  realm: Scalars['String'];
  tgtGenerationMethod?: Maybe<TgtGenerationMethod>;
};

export type KerberosPassword = {
  passwordSecretId: Scalars['String'];
};

export type KeyTabFile = {
  filePath: Scalars['String'];
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type KubernetesCloudProvider = CloudProvider & {
  __typename?: 'KubernetesCloudProvider';
  ceHealthStatus?: Maybe<CeHealthStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  skipK8sEventCollection?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type LdapSettings = LinkedSsoSetting & {
  __typename?: 'LDAPSettings';
  groupDN?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  ssoProviderId?: Maybe<Scalars['String']>;
};

export type LdapSettingsInput = {
  groupDN: Scalars['String'];
  groupName: Scalars['String'];
  ssoProviderId: Scalars['String'];
};

export type LastCollected = ArtifactSelection & {
  __typename?: 'LastCollected';
  artifactFilter?: Maybe<Scalars['String']>;
  artifactSourceId?: Maybe<Scalars['String']>;
  artifactSourceName?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['Boolean']>;
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
};

export type LastDayCost = {
  __typename?: 'LastDayCost';
  cpu?: Maybe<Scalars['Number']>;
  info?: Maybe<Scalars['String']>;
  memory?: Maybe<Scalars['Number']>;
};

export type LastDeployedFromPipeline = ArtifactSelection & {
  __typename?: 'LastDeployedFromPipeline';
  pipelineId?: Maybe<Scalars['String']>;
  pipelineName?: Maybe<Scalars['String']>;
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
};

export type LastDeployedFromWorkflow = ArtifactSelection & {
  __typename?: 'LastDeployedFromWorkflow';
  serviceId?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
  workflowId?: Maybe<Scalars['String']>;
  workflowName?: Maybe<Scalars['String']>;
};

export type LinkedSsoSetting = {
  ssoProviderId?: Maybe<Scalars['String']>;
};

export type LogzConnector = Connector & {
  __typename?: 'LogzConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type ManualClusterDetails = {
  masterUrl: Scalars['String'];
  none?: Maybe<None>;
  oidcToken?: Maybe<OidcToken>;
  serviceAccountToken?: Maybe<ServiceAccountToken>;
  type: ManualClusterDetailsAuthenticationType;
  usernameAndPassword?: Maybe<UsernameAndPasswordAuthentication>;
};

export enum ManualClusterDetailsAuthenticationType {
  ClientKeyAndCertificate = 'CLIENT_KEY_AND_CERTIFICATE',
  Custom = 'CUSTOM',
  OidcToken = 'OIDC_TOKEN',
  ServiceAccountToken = 'SERVICE_ACCOUNT_TOKEN',
  UsernameAndPassword = 'USERNAME_AND_PASSWORD'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAccountPermission?: Maybe<AddAccountPermissionPayload>;
  addAppPermission?: Maybe<AddAppPermissionPayload>;
  addUserToUserGroup?: Maybe<AddUserToUserGroupPayload>;
  /**  Attach a tag to an entity */
  attachTag?: Maybe<AttachTagPayload>;
  /** Creates a new Application and returns it */
  createApplication?: Maybe<CreateApplicationPayload>;
  /**  Beta */
  createCloudProvider?: Maybe<CreateCloudProviderPayload>;
  /**  Creates a new Connector and returns it */
  createConnector?: Maybe<CreateConnectorPayload>;
  /**  Beta: Create a secret. */
  createSecret?: Maybe<CreateSecretPayload>;
  /**  Create secret manager */
  createSecretManager?: Maybe<UpsertSecretManagerPayload>;
  /** Creates a new Trigger and returns it */
  createTrigger?: Maybe<TriggerPayload>;
  createUser?: Maybe<CreateUserPayload>;
  createUserGroup?: Maybe<CreateUserGroupPayload>;
  /** Deletes an application. */
  deleteApplication?: Maybe<DeleteApplicationPayload>;
  /**  Beta */
  deleteCloudProvider?: Maybe<DeleteCloudProviderPayload>;
  /**  Deletes a Connector. */
  deleteConnector?: Maybe<DeleteConnectorPayload>;
  /**  Beta: Delete a secret. */
  deleteSecret?: Maybe<DeleteSecretPayload>;
  /**  Delete secret manager */
  deleteSecretManager?: Maybe<DeleteSecretManagerPayload>;
  /** Deletes a Trigger. */
  deleteTrigger?: Maybe<DeleteTriggerPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteUserGroup?: Maybe<DeleteUserGroupPayload>;
  /**  Detach a tag from an entity */
  detachTag?: Maybe<DetachTagPayload>;
  /**  Beta: Start an export of executions/deployments. */
  exportExecutions?: Maybe<ExportExecutionsPayload>;
  /** Removes Git Sync Configuration associated with an application. Returns updated application. */
  removeApplicationGitSyncConfig?: Maybe<RemoveApplicationGitSyncConfigPayload>;
  removeUserFromUserGroup?: Maybe<RemoveUserFromUserGroupPayload>;
  /**
   * Resume a unsuccessful pipeline. Any stage which was started (both successful/unseccessful) can be given
   * to resume. Pipeline is resumed in block of parallel groups. i.e if given stage has parallel stages all will be
   * restarted.
   */
  resumeExecution?: Maybe<ResumeExecutionPayload>;
  /**  Beta: Trigger a Workflow/Pipeline Execution. */
  startExecution?: Maybe<StartExecutionPayload>;
  /** Updates an application and returns it. */
  updateApplication?: Maybe<UpdateApplicationPayload>;
  /** Updates  Application Git Sync Configuration. Creates the configuration, in case it does not exist. Returns updated git sync configuration. */
  updateApplicationGitSyncConfig?: Maybe<UpdateApplicationGitSyncConfigPayload>;
  /** Enable/disable Git Sync for an application. Returns updated application. */
  updateApplicationGitSyncConfigStatus?: Maybe<UpdateApplicationGitSyncConfigStatusPayload>;
  /**  Beta */
  updateCloudProvider?: Maybe<UpdateCloudProviderPayload>;
  /**  Updates a Connector and returns it. */
  updateConnector?: Maybe<UpdateConnectorPayload>;
  /**  Beta: Update a secret. */
  updateSecret?: Maybe<UpdateSecretPayload>;
  /**  Update secret manager */
  updateSecretManager?: Maybe<UpsertSecretManagerPayload>;
  /** Updates a Trigger and returns it. */
  updateTrigger?: Maybe<UpdateTriggerPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  updateUserGroup?: Maybe<UpdateUserGroupPayload>;
  updateUserGroupPermissions?: Maybe<UpdateUserGroupPermissionsPayload>;
};


export type MutationAddAccountPermissionArgs = {
  input: AddAccountPermissionInput;
};


export type MutationAddAppPermissionArgs = {
  input: AddAppPermissionInput;
};


export type MutationAddUserToUserGroupArgs = {
  input: AddUserToUserGroupInput;
};


export type MutationAttachTagArgs = {
  input: AttachTagInput;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationCreateCloudProviderArgs = {
  input: CreateCloudProviderInput;
};


export type MutationCreateConnectorArgs = {
  input: CreateConnectorInput;
};


export type MutationCreateSecretArgs = {
  input: CreateSecretInput;
};


export type MutationCreateSecretManagerArgs = {
  input: CreateSecretManagerInput;
};


export type MutationCreateTriggerArgs = {
  input: CreateTriggerInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserGroupArgs = {
  input: CreateUserGroupInput;
};


export type MutationDeleteApplicationArgs = {
  input: DeleteApplicationInput;
};


export type MutationDeleteCloudProviderArgs = {
  input: DeleteCloudProviderInput;
};


export type MutationDeleteConnectorArgs = {
  input: DeleteConnectorInput;
};


export type MutationDeleteSecretArgs = {
  input: DeleteSecretInput;
};


export type MutationDeleteSecretManagerArgs = {
  input: DeleteSecretManagerInput;
};


export type MutationDeleteTriggerArgs = {
  input: DeleteTriggerInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDeleteUserGroupArgs = {
  input: DeleteUserGroupInput;
};


export type MutationDetachTagArgs = {
  input: DetachTagInput;
};


export type MutationExportExecutionsArgs = {
  input: ExportExecutionsInput;
};


export type MutationRemoveApplicationGitSyncConfigArgs = {
  input: RemoveApplicationGitSyncConfigInput;
};


export type MutationRemoveUserFromUserGroupArgs = {
  input: RemoveUserFromUserGroupInput;
};


export type MutationResumeExecutionArgs = {
  input?: Maybe<ResumeExecutionInput>;
};


export type MutationStartExecutionArgs = {
  input: StartExecutionInput;
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
};


export type MutationUpdateApplicationGitSyncConfigArgs = {
  input: UpdateApplicationGitSyncConfigInput;
};


export type MutationUpdateApplicationGitSyncConfigStatusArgs = {
  input: UpdateApplicationGitSyncConfigStatusInput;
};


export type MutationUpdateCloudProviderArgs = {
  input: UpdateCloudProviderInput;
};


export type MutationUpdateConnectorArgs = {
  input: UpdateConnectorInput;
};


export type MutationUpdateSecretArgs = {
  input: UpdateSecretInput;
};


export type MutationUpdateSecretManagerArgs = {
  input: UpdateSecretManagerInput;
};


export type MutationUpdateTriggerArgs = {
  input: UpdateTriggerInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserGroupArgs = {
  input: UpdateUserGroupInput;
};


export type MutationUpdateUserGroupPermissionsArgs = {
  input?: Maybe<UpdateUserGroupPermissionsInput>;
};

export type NewRelicConnector = Connector & {
  __typename?: 'NewRelicConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type NexusArtifactSource = ArtifactSource & {
  __typename?: 'NexusArtifactSource';
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  parameters?: Maybe<Array<Maybe<Scalars['String']>>>;
  properties?: Maybe<NexusProps>;
};


export type NexusArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type NexusConnector = Connector & {
  __typename?: 'NexusConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type NexusConnectorInput = {
  URL: Scalars['String'];
  delegateSelectors?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  passwordSecretId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  version: NexusVersion;
};

export type NexusDockerProps = NexusProps & {
  __typename?: 'NexusDockerProps';
  dockerImageName?: Maybe<Scalars['String']>;
  dockerRegistryUrl?: Maybe<Scalars['String']>;
  nexusConnectorId?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  repositoryFormat?: Maybe<NexusRepositoryFormat>;
};

export type NexusMavenProps = NexusProps & {
  __typename?: 'NexusMavenProps';
  artifactId?: Maybe<Array<Maybe<Scalars['String']>>>;
  classifier?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
  nexusConnectorId?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  repositoryFormat?: Maybe<NexusRepositoryFormat>;
};

export type NexusNpmProps = NexusProps & {
  __typename?: 'NexusNpmProps';
  nexusConnectorId?: Maybe<Scalars['String']>;
  packageName?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  repositoryFormat?: Maybe<NexusRepositoryFormat>;
};

export type NexusNugetProps = NexusProps & {
  __typename?: 'NexusNugetProps';
  nexusConnectorId?: Maybe<Scalars['String']>;
  packageName?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  repositoryFormat?: Maybe<NexusRepositoryFormat>;
};

export type NexusProps = {
  nexusConnectorId?: Maybe<Scalars['String']>;
  repository?: Maybe<Scalars['String']>;
  repositoryFormat?: Maybe<NexusRepositoryFormat>;
};

export enum NexusRepositoryFormat {
  Docker = 'DOCKER',
  Maven = 'MAVEN',
  Npm = 'NPM',
  Nuget = 'NUGET'
}

export enum NexusVersion {
  V2 = 'V2',
  V3 = 'V3'
}

export type None = {
  caCertificateSecretId: Scalars['String'];
  clientCertificateSecretId: Scalars['String'];
  clientKeyAlgorithm: Scalars['String'];
  clientKeyPassphraseSecretId: Scalars['String'];
  clientKeySecretId: Scalars['String'];
  passwordSecretId: Scalars['String'];
  serviceAccountTokenSecretId: Scalars['String'];
  usageScope?: Maybe<UsageScopeInput>;
  userName: Scalars['String'];
};

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  groupEmailAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  microsoftTeamsWebhookUrl?: Maybe<Scalars['String']>;
  sendMailToNewMembers?: Maybe<Scalars['Boolean']>;
  sendNotificationToMembers?: Maybe<Scalars['Boolean']>;
  slackNotificationSetting?: Maybe<SlackNotificationSetting>;
};

export type NotificationSettingsInput = {
  groupEmailAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  microsoftTeamsWebhookUrl?: Maybe<Scalars['String']>;
  pagerDutyIntegrationKey?: Maybe<Scalars['String']>;
  sendMailToNewMembers?: Maybe<Scalars['Boolean']>;
  sendNotificationToMembers?: Maybe<Scalars['Boolean']>;
  slackNotificationSetting?: Maybe<SlackNotificationSettingInput>;
};


export type NumberFilter = {
  operator: NumericOperator;
  values: Array<Maybe<Scalars['Number']>>;
};

export enum NumericOperator {
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEquals = 'GREATER_THAN_OR_EQUALS',
  In = 'IN',
  LessThan = 'LESS_THAN',
  LessThanOrEquals = 'LESS_THAN_OR_EQUALS',
  NotEquals = 'NOT_EQUALS'
}

export type OidcToken = {
  clientIdSecretId: Scalars['String'];
  clientSecretSecretId: Scalars['String'];
  identityProviderUrl: Scalars['String'];
  passwordSecretId: Scalars['String'];
  scopes: Scalars['String'];
  userName: Scalars['String'];
};

export type OnNewArtifact = TriggerCondition & {
  __typename?: 'OnNewArtifact';
  artifactFilter?: Maybe<Scalars['String']>;
  artifactSourceId?: Maybe<Scalars['String']>;
  artifactSourceName?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['Boolean']>;
  triggerConditionType?: Maybe<TriggerConditionType>;
};

export type OnPipelineCompletion = TriggerCondition & {
  __typename?: 'OnPipelineCompletion';
  pipelineId?: Maybe<Scalars['String']>;
  pipelineName?: Maybe<Scalars['String']>;
  triggerConditionType?: Maybe<TriggerConditionType>;
};

export type OnSchedule = TriggerCondition & {
  __typename?: 'OnSchedule';
  cronDescription: Scalars['String'];
  cronExpression: Scalars['String'];
  onNewArtifactOnly?: Maybe<Scalars['Boolean']>;
  triggerConditionType?: Maybe<TriggerConditionType>;
};

export type OnWebhook = TriggerCondition & {
  __typename?: 'OnWebhook';
  branchName?: Maybe<Scalars['String']>;
  branchRegex?: Maybe<Scalars['String']>;
  deployOnlyIfFilesChanged?: Maybe<Scalars['Boolean']>;
  filePaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  gitConnectorId?: Maybe<Scalars['String']>;
  gitConnectorName?: Maybe<Scalars['String']>;
  repoName?: Maybe<Scalars['String']>;
  triggerConditionType?: Maybe<TriggerConditionType>;
  webhookDetails?: Maybe<WebhoookDetails>;
  webhookEvent?: Maybe<WebhookEvent>;
  webhookSource?: Maybe<WebhookSource>;
};

export enum OrchestrationWorkflowType {
  Basic = 'BASIC',
  BlueGreen = 'BLUE_GREEN',
  Build = 'BUILD',
  Canary = 'CANARY',
  Custom = 'CUSTOM',
  MultiService = 'MULTI_SERVICE',
  Rolling = 'ROLLING'
}

export type OrchestrationWorkflowTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<OrchestrationWorkflowType>>>;
};

export type Outcome = {
  execution?: Maybe<Execution>;
};

export type OutcomeConnection = {
  __typename?: 'OutcomeConnection';
  nodes?: Maybe<Array<Maybe<Outcome>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasMore?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type ParameterValueInput = {
  /** parameter name */
  name: Scalars['String'];
  /** runtime value for parameter */
  value: Scalars['String'];
};

export type ParameterizedArtifactSourceInput = {
  /** name of the artifact source to which the specified build number comes from */
  artifactSourceName: Scalars['String'];
  /** build number to deploy */
  buildNumber: Scalars['String'];
  /** parameters and their runtime values */
  parameterValueInputs?: Maybe<Array<Maybe<ParameterValueInput>>>;
};

export type PcfCloudProvider = CloudProvider & {
  __typename?: 'PcfCloudProvider';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PcfCloudProviderInput = {
  endpointUrl: Scalars['String'];
  name: Scalars['String'];
  passwordSecretId: Scalars['String'];
  skipValidation?: Maybe<Scalars['Boolean']>;
  userName?: Maybe<Scalars['String']>;
  userNameSecretId?: Maybe<Scalars['String']>;
};

export type PcfInstance = Instance & {
  __typename?: 'PcfInstance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  environment?: Maybe<Environment>;
  id?: Maybe<Scalars['String']>;
  instanceIndex?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  pcfApplicationGuid?: Maybe<Scalars['String']>;
  pcfApplicationName?: Maybe<Scalars['String']>;
  pcfId?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  space?: Maybe<Scalars['String']>;
};

export type Permissions = {
  accountPermissions?: Maybe<AccountPermissionInput>;
  appPermissions?: Maybe<Array<Maybe<ApplicationPermissionInput>>>;
};

export type PhysicalDataCenterCloudProvider = CloudProvider & {
  __typename?: 'PhysicalDataCenterCloudProvider';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PhysicalDataCenterCloudProviderInput = {
  name: Scalars['String'];
  usageScope?: Maybe<UsageScopeInput>;
};

export type PhysicalHostInstance = Instance & PhysicalInstance & {
  __typename?: 'PhysicalHostInstance';
  application?: Maybe<Application>;
  artifact?: Maybe<Artifact>;
  environment?: Maybe<Environment>;
  hostId?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  hostPublicDns?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
};

export type PhysicalInstance = {
  hostId?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  hostPublicDns?: Maybe<Scalars['String']>;
};

/**  Type for pipeline */
export type Pipeline = {
  __typename?: 'Pipeline';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  /**  Description of the Pipeline */
  description?: Maybe<Scalars['String']>;
  /**  Pipeline identifier */
  id?: Maybe<Scalars['String']>;
  /**  Name of the Pipeline */
  name?: Maybe<Scalars['String']>;
  /** Variables in the Pipeline */
  pipelineVariables?: Maybe<Array<Maybe<Variable>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type PipelineAction = TriggerAction & {
  __typename?: 'PipelineAction';
  artifactSelections?: Maybe<Array<Maybe<ArtifactSelection>>>;
  /**  Beta: Coninue with default values as defined in pipeline */
  continueWithDefaultValues?: Maybe<Scalars['Boolean']>;
  pipelineId?: Maybe<Scalars['String']>;
  pipelineName?: Maybe<Scalars['String']>;
  variables?: Maybe<Array<Maybe<TriggerVariableValue>>>;
};

export type PipelineConditionInput = {
  /** PipelineId: The trigger will be executed on success of this pipeline. */
  pipelineId: Scalars['String'];
};

export type PipelineConnection = {
  __typename?: 'PipelineConnection';
  nodes?: Maybe<Array<Maybe<Pipeline>>>;
  pageInfo?: Maybe<PageInfo>;
};

/**  Type for pipeline execution */
export type PipelineExecution = Execution & {
  __typename?: 'PipelineExecution';
  application?: Maybe<Application>;
  cause?: Maybe<Cause>;
  /**  DateTime when execution started */
  createdAt?: Maybe<Scalars['DateTime']>;
  /**  DateTime when execution ended */
  endedAt?: Maybe<Scalars['DateTime']>;
  failureDetails?: Maybe<Scalars['String']>;
  /**  Workflow Execution Id */
  id?: Maybe<Scalars['String']>;
  memberExecutions?: Maybe<ExecutionConnection>;
  notes?: Maybe<Scalars['String']>;
  pipeline?: Maybe<Pipeline>;
  /**  Execution details of every stage */
  pipelineStageExecutions?: Maybe<Array<Maybe<PipelineStageExecution>>>;
  /**  DateTime when execution started */
  startedAt?: Maybe<Scalars['DateTime']>;
  /**  Status of the workflow */
  status?: Maybe<ExecutionStatus>;
  tags?: Maybe<Array<Maybe<DeploymentTag>>>;
};

export type PipelineFilter = {
  application?: Maybe<IdFilter>;
  pipeline?: Maybe<IdFilter>;
  tag?: Maybe<PipelineTagFilter>;
};

export enum PipelineFilterType {
  Application = 'Application',
  Pipeline = 'Pipeline'
}

export type PipelinePermissionFilter = {
  __typename?: 'PipelinePermissionFilter';
  envIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  filterTypes?: Maybe<Array<Maybe<PipelinePermissionFilterType>>>;
};

export type PipelinePermissionFilterInput = {
  envIds?: Maybe<Array<Scalars['String']>>;
  filterTypes?: Maybe<Array<Maybe<PipelinePermissionFilterType>>>;
};

export enum PipelinePermissionFilterType {
  NonProductionPipelines = 'NON_PRODUCTION_PIPELINES',
  ProductionPipelines = 'PRODUCTION_PIPELINES'
}

export type PipelineStageExecution = {
  /**  Pipeline stage element ID */
  pipelineStageElementId?: Maybe<Scalars['String']>;
  /**  Pipeline stage name */
  pipelineStageName?: Maybe<Scalars['String']>;
  /**  Pipeline step name */
  pipelineStepName?: Maybe<Scalars['String']>;
};

export type PipelineTagFilter = {
  entityType?: Maybe<PipelineTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum PipelineTagType {
  Application = 'APPLICATION'
}

export type PrometheusConnector = Connector & {
  __typename?: 'PrometheusConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ProvisionerPermissionFilter = {
  __typename?: 'ProvisionerPermissionFilter';
  filterType?: Maybe<FilterType>;
  provisionerIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProvisionerPermissionFilterInput = {
  filterType?: Maybe<FilterType>;
  provisionerIds?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  /**  Get details about a Harness Application */
  application?: Maybe<Application>;
  /**  Fetch details about a Harness Application by it's name */
  applicationByName?: Maybe<Application>;
  /**  Get details about Harness Applications. */
  applications?: Maybe<ApplicationConnection>;
  /**  Get details about an artifact. */
  artifact?: Maybe<Artifact>;
  /**  Get details about one or multiple Artifacts. */
  artifacts?: Maybe<ArtifactConnection>;
  /**
   * Get difference in terms of YAML for a changeSet
   * (and a specific resource within the changeSet).This returns paginated data.
   */
  auditChangeContent?: Maybe<ChangeContentConnection>;
  /** Get a list of changeSets.This returns paginated data. */
  audits?: Maybe<ChangeSetConnection>;
  /**  Beta: Cloud Cost Management export data apis */
  ceClusterBillingData?: Maybe<CeClusterBillingData>;
  /**  Get details about a Cloud Provider. */
  cloudProvider?: Maybe<CloudProvider>;
  /**  Beta */
  cloudProviderByName?: Maybe<CloudProvider>;
  /**  Get details about Cloud Providers. */
  cloudProviders?: Maybe<CloudProviderConnection>;
  /**  Get details about a Connector. */
  connector?: Maybe<Connector>;
  /**  Get details about Connectors. */
  connectors?: Maybe<ConnectorConnection>;
  /** Get statistics about one or multiple deployments. */
  deploymentStats?: Maybe<Data>;
  /**  Get details about a Harness Environment. */
  environment?: Maybe<Environment>;
  /**  Get details about one or multiple Harness Environments. */
  environments?: Maybe<EnvironmentConnection>;
  /**  Get the execution status of a Workflow. */
  execution?: Maybe<Execution>;
  /** Beta: Get required inputs to start an execution of a Workflow or Pipeline */
  executionInputs?: Maybe<ExecutionInputs>;
  /**  Get a list of executions, with filtering options. */
  executions?: Maybe<ExecutionConnection>;
  /** Get details about an infrastructure using Id */
  infrastructureDefinition?: Maybe<InfrastructureDefinition>;
  /** Get details about an infrastructure using name */
  infrastructureDefinitionByName?: Maybe<InfrastructureDefinition>;
  /** Get infrastructures using filters */
  infrastructureDefinitions?: Maybe<InfrastructureDefinitionConnection>;
  /**  Get details about instances. */
  instances?: Maybe<InstanceConnection>;
  /**  Get details about K8s labels. */
  k8sLabels?: Maybe<K8sLabelConnection>;
  k8sWorkloadRecommendations?: Maybe<WorkloadRecommendationConnection>;
  /**  Get a Pipeline object by ID. */
  pipeline?: Maybe<Pipeline>;
  /**  Get a Pipeline object by ID. */
  pipelineByName?: Maybe<Pipeline>;
  /**  Get details about one or multiple Pipelines. */
  pipelines?: Maybe<PipelineConnection>;
  /**  Beta: Get details about secret. */
  secret?: Maybe<Secret>;
  /**  Beta: Get details about secret by name. */
  secretByName?: Maybe<Secret>;
  /**  Beta: Get details about a Secret Manager. */
  secretManager?: Maybe<SecretManager>;
  /**  Beta: Get Secret Manager by name. */
  secretManagerByName?: Maybe<SecretManager>;
  /**  Beta: List Secret Manager. */
  secretManagers?: Maybe<SecretManagerConnection>;
  /**  Get details about a Harness Service. */
  service?: Maybe<Service>;
  /**  Get a list of Harness Services, by applicationId. This returns paginated data. */
  services?: Maybe<ServiceConnection>;
  ssoProvider?: Maybe<SsoProvider>;
  ssoProviders?: Maybe<SsoProviderConnection>;
  /**  Get tag details using tag uuid */
  tag?: Maybe<TagEntity>;
  /**  Get tag details using tag name */
  tagByName?: Maybe<TagEntity>;
  /**  Get the list of tags. This returns paginated data. */
  tags?: Maybe<TagConnection>;
  /**  Get details about a Trigger. */
  trigger?: Maybe<Trigger>;
  /**  Get details about a Trigger  by it's name */
  triggerByName?: Maybe<Trigger>;
  /**  Get a list of Harness Triggers, This returns paginated data. */
  triggers?: Maybe<TriggerConnection>;
  /** fetch a user by id */
  user?: Maybe<User>;
  /** fetch a user by email */
  userByEmail?: Maybe<User>;
  /** fetch a user by name */
  userByName?: Maybe<User>;
  userGroup?: Maybe<UserGroup>;
  userGroupByName?: Maybe<UserGroup>;
  userGroups?: Maybe<UserGroupConnection>;
  /** fetch a list of users */
  users?: Maybe<UserConnection>;
  /**  Get a Workflow object by ID. */
  workflow?: Maybe<Workflow>;
  /**  Fetch details about a  Workflow by it's name */
  workflowByName?: Maybe<Workflow>;
  /**  Get a list of Workflows, by applicationId. This returns paginated data. */
  workflows?: Maybe<WorkflowConnection>;
};


export type QueryApplicationArgs = {
  applicationId: Scalars['String'];
};


export type QueryApplicationByNameArgs = {
  name: Scalars['String'];
};


export type QueryApplicationsArgs = {
  filters?: Maybe<Array<Maybe<ApplicationFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryArtifactArgs = {
  artifactId: Scalars['String'];
};


export type QueryArtifactsArgs = {
  filters?: Maybe<Array<Maybe<ArtifactFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAuditChangeContentArgs = {
  filters?: Maybe<Array<Maybe<ChangeContentFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAuditsArgs = {
  filters?: Maybe<Array<Maybe<ChangeSetFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryCeClusterBillingDataArgs = {
  aggregateFunction?: Maybe<Array<Maybe<CeAggregation>>>;
  filters?: Maybe<Array<Maybe<CeFilter>>>;
  groupBy?: Maybe<Array<Maybe<CeGroupBy>>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  select?: Maybe<Array<Maybe<CeSelect>>>;
  sortCriteria?: Maybe<Array<Maybe<CeSort>>>;
};


export type QueryCloudProviderArgs = {
  cloudProviderId: Scalars['String'];
};


export type QueryCloudProviderByNameArgs = {
  name: Scalars['String'];
};


export type QueryCloudProvidersArgs = {
  filters?: Maybe<Array<Maybe<CloudProviderFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryConnectorArgs = {
  connectorId: Scalars['String'];
};


export type QueryConnectorsArgs = {
  filters?: Maybe<Array<Maybe<ConnectorFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryDeploymentStatsArgs = {
  aggregateFunction?: Maybe<DeploymentAggregationFunction>;
  filters?: Maybe<Array<Maybe<DeploymentFilter>>>;
  groupBy?: Maybe<Array<Maybe<DeploymentAggregation>>>;
  includeIndirectExecutions?: Maybe<Scalars['Boolean']>;
  sortCriteria?: Maybe<Array<Maybe<DeploymentSortCriteria>>>;
};


export type QueryEnvironmentArgs = {
  environmentId: Scalars['String'];
};


export type QueryEnvironmentsArgs = {
  filters?: Maybe<Array<Maybe<EnvironmentFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryExecutionArgs = {
  executionId: Scalars['String'];
};


export type QueryExecutionInputsArgs = {
  applicationId: Scalars['String'];
  entityId: Scalars['String'];
  executionType: ExecutionType;
  variableInputs?: Maybe<Array<Maybe<VariableInput>>>;
};


export type QueryExecutionsArgs = {
  filters?: Maybe<Array<Maybe<ExecutionFilter>>>;
  includeIndirectExecutions?: Maybe<Scalars['Boolean']>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryInfrastructureDefinitionArgs = {
  infrastructureId: Scalars['String'];
};


export type QueryInfrastructureDefinitionByNameArgs = {
  environmentId: Scalars['String'];
  infrastructureName: Scalars['String'];
};


export type QueryInfrastructureDefinitionsArgs = {
  filters?: Maybe<Array<Maybe<InfrastructureDefinitionFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryInstancesArgs = {
  filters?: Maybe<Array<Maybe<InstanceFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryK8sLabelsArgs = {
  filters?: Maybe<Array<Maybe<K8sLabelFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryK8sWorkloadRecommendationsArgs = {
  filters?: Maybe<Array<Maybe<WorkloadFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryPipelineArgs = {
  pipelineId: Scalars['String'];
};


export type QueryPipelineByNameArgs = {
  applicationId: Scalars['String'];
  pipelineName: Scalars['String'];
};


export type QueryPipelinesArgs = {
  filters?: Maybe<Array<Maybe<PipelineFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QuerySecretArgs = {
  secretId: Scalars['String'];
  secretType: SecretType;
};


export type QuerySecretByNameArgs = {
  name: Scalars['String'];
  secretType: SecretType;
};


export type QuerySecretManagerArgs = {
  secretManagerId: Scalars['String'];
};


export type QuerySecretManagerByNameArgs = {
  name: Scalars['String'];
};


export type QuerySecretManagersArgs = {
  filters?: Maybe<Array<Maybe<SecretManagerFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryServiceArgs = {
  serviceId: Scalars['String'];
};


export type QueryServicesArgs = {
  filters?: Maybe<Array<Maybe<ServiceFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QuerySsoProviderArgs = {
  ssoProviderId: Scalars['String'];
};


export type QuerySsoProvidersArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryTagArgs = {
  tagId: Scalars['String'];
};


export type QueryTagByNameArgs = {
  name: Scalars['String'];
};


export type QueryTagsArgs = {
  filters?: Maybe<Array<Maybe<TagEntityFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryTriggerArgs = {
  triggerId: Scalars['String'];
};


export type QueryTriggerByNameArgs = {
  applicationId: Scalars['String'];
  triggerName: Scalars['String'];
};


export type QueryTriggersArgs = {
  filters?: Maybe<Array<Maybe<TriggerFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserGroupArgs = {
  userGroupId: Scalars['String'];
};


export type QueryUserGroupByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserGroupsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryWorkflowArgs = {
  workflowId: Scalars['String'];
};


export type QueryWorkflowByNameArgs = {
  applicationId: Scalars['String'];
  workflowName: Scalars['String'];
};


export type QueryWorkflowsArgs = {
  filters?: Maybe<Array<Maybe<WorkflowFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type Reference = {
  __typename?: 'Reference';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type RelativeTimeRange = {
  noOfUnits: Scalars['Number'];
  timeUnit: TimeUnit;
};

export type RemoveApplicationGitSyncConfigInput = {
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveApplicationGitSyncConfigPayload = {
  __typename?: 'RemoveApplicationGitSyncConfigPayload';
  application?: Maybe<Application>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveUserFromUserGroupInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  userGroupId: Scalars['String'];
  userId: Scalars['String'];
};

export type RemoveUserFromUserGroupPayload = {
  __typename?: 'RemoveUserFromUserGroupPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<UserGroup>;
};

export type RequestInfo = {
  __typename?: 'RequestInfo';
  /** IP Address of request source */
  remoteIpAddress?: Maybe<Scalars['String']>;
  /** HTTP Request method */
  requestMethod?: Maybe<Scalars['String']>;
  /** Resource endpoint */
  resourcePath?: Maybe<Scalars['String']>;
  /** Response status code */
  responseStatusCode?: Maybe<Scalars['Number']>;
  /** Request URL */
  url?: Maybe<Scalars['String']>;
};

export enum RequestStatus {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export type ResourceEntry = {
  __typename?: 'ResourceEntry';
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['String']>;
};

export type ResourceRequirements = {
  __typename?: 'ResourceRequirements';
  limits?: Maybe<Array<Maybe<ResourceEntry>>>;
  requests?: Maybe<Array<Maybe<ResourceEntry>>>;
  yaml?: Maybe<Scalars['String']>;
};

export type ResumeExecutionInput = {
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  pipelineExecutionId: Scalars['String'];
  /**  Name of the stage to be resumed. i.e "Stage 1" */
  pipelineStageName: Scalars['String'];
};

export type ResumeExecutionPayload = {
  __typename?: 'ResumeExecutionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  execution?: Maybe<Execution>;
};

export type SamlSettings = LinkedSsoSetting & {
  __typename?: 'SAMLSettings';
  groupName?: Maybe<Scalars['String']>;
  ssoProviderId?: Maybe<Scalars['String']>;
};

export type SamlSettingsInput = {
  groupName: Scalars['String'];
  ssoProviderId: Scalars['String'];
};

export type SftpArtifactSource = ArtifactSource & {
  __typename?: 'SFTPArtifactSource';
  artifactPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  sftpConnectorId?: Maybe<Scalars['String']>;
};


export type SftpArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type SmbArtifactSource = ArtifactSource & {
  __typename?: 'SMBArtifactSource';
  artifactPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  artifacts?: Maybe<ArtifactConnection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Artifact Source Id */
  id?: Maybe<Scalars['String']>;
  /**  Artifact source display name */
  name?: Maybe<Scalars['String']>;
  smbConnectorId?: Maybe<Scalars['String']>;
};


export type SmbArtifactSourceArtifactsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type SmbConnector = Connector & {
  __typename?: 'SMBConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SshAuthentication = {
  __typename?: 'SSHAuthentication';
  port?: Maybe<Scalars['Int']>;
  userName?: Maybe<Scalars['String']>;
};

export type SshAuthenticationInput = {
  port: Scalars['Int'];
  sshAuthenticationMethod: SshAuthenticationMethod;
  userName: Scalars['String'];
};

export type SshAuthenticationMethod = {
  inlineSSHKey?: Maybe<InlineSshKey>;
  serverPassword?: Maybe<SshPassword>;
  sshCredentialType: SshCredentialType;
  sshKeyFile?: Maybe<SshKeyFile>;
};

export enum SshAuthenticationScheme {
  Kerberos = 'KERBEROS',
  Ssh = 'SSH'
}

export type SshAuthenticationType = KerberosAuthentication | SshAuthentication;

export type SshCredential = Secret & {
  __typename?: 'SSHCredential';
  authenticationType?: Maybe<SshAuthenticationType>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  secretType?: Maybe<SecretType>;
  usageScope?: Maybe<UsageScope>;
};

export type SshCredentialInput = {
  authenticationScheme: SshAuthenticationScheme;
  kerberosAuthentication?: Maybe<KerberosAuthenticationInput>;
  name: Scalars['String'];
  sshAuthentication?: Maybe<SshAuthenticationInput>;
  usageScope?: Maybe<UsageScopeInput>;
};

export enum SshCredentialType {
  Password = 'PASSWORD',
  SshKey = 'SSH_KEY',
  SshKeyFilePath = 'SSH_KEY_FILE_PATH'
}

export type SshKeyFile = {
  passphraseSecretId?: Maybe<Scalars['String']>;
  path: Scalars['String'];
};

export type SshPassword = {
  passwordSecretId: Scalars['String'];
};

export type SsoProvider = {
  __typename?: 'SSOProvider';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ssoType?: Maybe<SsoType>;
};

export type SsoProviderConnection = {
  __typename?: 'SSOProviderConnection';
  nodes?: Maybe<Array<Maybe<SsoProvider>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SsoSettingInput = {
  ldapSettings?: Maybe<LdapSettingsInput>;
  samlSettings?: Maybe<SamlSettingsInput>;
};

export enum SsoType {
  Ldap = 'LDAP',
  Saml = 'SAML'
}

export type ScheduleConditionInput = {
  /** Cron Expression: The time format must be a cron quartz expression. */
  cronExpression: Scalars['String'];
  onNewArtifactOnly?: Maybe<Scalars['Boolean']>;
};

export type Secret = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  secretType?: Maybe<SecretType>;
  usageScope?: Maybe<UsageScope>;
};

export type SecretManager = {
  __typename?: 'SecretManager';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScope>;
};

export type SecretManagerConnection = {
  __typename?: 'SecretManagerConnection';
  nodes?: Maybe<Array<Maybe<SecretManager>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SecretManagerFilter = {
  secretManager?: Maybe<IdFilter>;
  type?: Maybe<SecretManagerTypeFilter>;
};

export enum SecretManagerType {
  AwsKms = 'AWS_KMS',
  AwsSecretManager = 'AWS_SECRET_MANAGER',
  AzureKeyVault = 'AZURE_KEY_VAULT',
  Cyberark = 'CYBERARK',
  GoogleKms = 'GOOGLE_KMS',
  HashicorpVault = 'HASHICORP_VAULT'
}

export type SecretManagerTypeFilter = {
  operator?: Maybe<EnumOperator>;
  values?: Maybe<Array<Maybe<SecretManagerType>>>;
};

export enum SecretType {
  EncryptedFile = 'ENCRYPTED_FILE',
  EncryptedText = 'ENCRYPTED_TEXT',
  SshCredential = 'SSH_CREDENTIAL',
  WinrmCredential = 'WINRM_CREDENTIAL'
}

/**  Service Type */
export type Service = {
  __typename?: 'Service';
  artifactSources?: Maybe<Array<Maybe<ArtifactSource>>>;
  /**  Artifact type deployed by this Service */
  artifactType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  /**  Deployment Type: SSH, Helm, or Kubernetes */
  deploymentType?: Maybe<Scalars['String']>;
  /**  Description of the Service */
  description?: Maybe<Scalars['String']>;
  /**  Service ID */
  id?: Maybe<Scalars['String']>;
  /**  Name of the Service */
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type ServiceAccountToken = {
  serviceAccountTokenSecretId: Scalars['String'];
};

export type ServiceConnection = {
  __typename?: 'ServiceConnection';
  nodes?: Maybe<Array<Maybe<Service>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ServiceFilter = {
  application?: Maybe<IdFilter>;
  deploymentType?: Maybe<DeploymentTypeFilter>;
  service?: Maybe<IdFilter>;
  tag?: Maybe<ServiceTagFilter>;
};

export type ServiceInput = {
  /** artifact inputs fot the service */
  artifactValueInput?: Maybe<ArtfifactValueInput>;
  /** name of the service providing input for */
  name: Scalars['String'];
};

export type ServiceNowConnector = Connector & {
  __typename?: 'ServiceNowConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ServicePermissionFilter = {
  __typename?: 'ServicePermissionFilter';
  filterType?: Maybe<FilterType>;
  serviceIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ServicePermissionFilterInput = {
  filterType?: Maybe<FilterType>;
  serviceIds?: Maybe<Array<Scalars['String']>>;
};

export type ServiceTagFilter = {
  entityType?: Maybe<ServiceTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum ServiceTagType {
  Application = 'APPLICATION'
}

export type SftpConnector = Connector & {
  __typename?: 'SftpConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SinglePointData = {
  __typename?: 'SinglePointData';
  dataPoint?: Maybe<DataPoint>;
};

export type SlackConnector = Connector & {
  __typename?: 'SlackConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SlackNotificationSetting = {
  __typename?: 'SlackNotificationSetting';
  slackChannelName?: Maybe<Scalars['String']>;
  slackWebhookURL?: Maybe<Scalars['String']>;
};

export type SlackNotificationSettingInput = {
  slackChannelName?: Maybe<Scalars['String']>;
  slackWebhookURL?: Maybe<Scalars['String']>;
};

export type SmtpConnector = Connector & {
  __typename?: 'SmtpConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** This data structure will be useful for bar charts which are aggregated over a period of time */
export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type SplunkConnector = Connector & {
  __typename?: 'SplunkConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SpotInstCloudProvider = CloudProvider & {
  __typename?: 'SpotInstCloudProvider';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isContinuousEfficiencyEnabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type SpotInstCloudProviderInput = {
  accountId: Scalars['String'];
  name: Scalars['String'];
  tokenSecretId: Scalars['String'];
};

export type StackedData = {
  __typename?: 'StackedData';
  dataPoints?: Maybe<Array<Maybe<StackedDataPoint>>>;
};

export type StackedDataPoint = {
  __typename?: 'StackedDataPoint';
  key?: Maybe<Reference>;
  values?: Maybe<Array<Maybe<DataPoint>>>;
};

export type StackedTimeSeriesData = {
  __typename?: 'StackedTimeSeriesData';
  data?: Maybe<Array<Maybe<StackedTimeSeriesDataPoint>>>;
  label?: Maybe<Scalars['String']>;
};

export type StackedTimeSeriesDataPoint = {
  __typename?: 'StackedTimeSeriesDataPoint';
  time?: Maybe<Scalars['DateTime']>;
  values?: Maybe<Array<Maybe<DataPoint>>>;
};

export type StartExecutionInput = {
  /** Application identifier of a Workflow or Pipeline */
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  /** Beta: Continue with default values in case of pipelines with runtime variables */
  continueWithDefaultValues?: Maybe<Scalars['Boolean']>;
  /** Entity identifier of a Workflow or Pipeline */
  entityId: Scalars['String'];
  /** Skip deployment on the host, if the same artifact is already deployed */
  excludeHostsWithSameArtifact?: Maybe<Scalars['Boolean']>;
  /** Workflow or Pipeline */
  executionType: ExecutionType;
  /** Execution notes */
  notes?: Maybe<Scalars['String']>;
  /** Service inputs required for the execution */
  serviceInputs?: Maybe<Array<Maybe<ServiceInput>>>;
  /** List of hostnames, if targeted to a specific host */
  specificHosts?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Set to true if the deployment target is specific hosts. Provide specificHosts field along with this. */
  targetToSpecificHosts?: Maybe<Scalars['Boolean']>;
  /** Variable inputs required for the executio */
  variableInputs?: Maybe<Array<Maybe<VariableInput>>>;
};

export type StartExecutionPayload = {
  __typename?: 'StartExecutionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  execution?: Maybe<Execution>;
  /** Get This field to know if there are any Warnings/Messages but the execution can be started successfully. For Example in case of user providing extra inputs. */
  warningMessage?: Maybe<Scalars['String']>;
};

export type StringFilter = {
  operator: StringOperator;
  values: Array<Maybe<Scalars['String']>>;
};

export enum StringOperator {
  Equals = 'EQUALS',
  In = 'IN'
}

export type SumoConnector = Connector & {
  __typename?: 'SumoConnector';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TgtGenerationMethod = {
  kerberosPassword?: Maybe<KerberosPassword>;
  keyTabFile?: Maybe<KeyTabFile>;
  tgtGenerationUsing: TgtGenerationUsing;
};

export enum TgtGenerationUsing {
  KeyTabFile = 'KEY_TAB_FILE',
  Password = 'PASSWORD'
}

export type Tag = {
  __typename?: 'Tag';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TagAggregation = {
  entityType?: Maybe<EntityType>;
  tagName?: Maybe<Scalars['String']>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  nodes?: Maybe<Array<Maybe<TagEntity>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TagEntity = {
  __typename?: 'TagEntity';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  usages?: Maybe<TagUsageConnection>;
};


export type TagEntityUsagesArgs = {
  filters?: Maybe<Array<Maybe<TagUsageFilter>>>;
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type TagEntityFilter = {
  tagId?: Maybe<IdFilter>;
  tagName?: Maybe<IdFilter>;
};

export enum TagEntityType {
  Application = 'APPLICATION',
  Environment = 'ENVIRONMENT',
  Pipeline = 'PIPELINE',
  Provisioner = 'PROVISIONER',
  Service = 'SERVICE',
  Workflow = 'WORKFLOW'
}

export type TagFilter = {
  entityType?: Maybe<EntityType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export type TagInput = {
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TagLink = {
  __typename?: 'TagLink';
  appId?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  entityType?: Maybe<TagEntityType>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TagUsageConnection = {
  __typename?: 'TagUsageConnection';
  nodes?: Maybe<Array<Maybe<TagLink>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TagUsageFilter = {
  entityType?: Maybe<EntityTypeFilter>;
  tagName?: Maybe<IdFilter>;
  tagValue?: Maybe<IdFilter>;
};

export enum TimeAggregationType {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Week = 'WEEK'
}

export type TimeFilter = {
  operator: TimeOperator;
  value: Scalars['DateTime'];
};

export enum TimeGroupType {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Week = 'WEEK'
}

export enum TimeOperator {
  After = 'AFTER',
  Before = 'BEFORE',
  Equals = 'EQUALS'
}

export type TimeRange = {
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
};

/** Filter by time */
export type TimeRangeFilter = {
  /** Filter for a relative time period */
  relative?: Maybe<RelativeTimeRange>;
  /** Filter within a specific time range */
  specific?: Maybe<TimeRange>;
};

export type TimeSeriesAggregation = {
  timeAggregationType?: Maybe<TimeAggregationType>;
  timeAggregationValue?: Maybe<Scalars['Int']>;
};

/** This data structure will serve timeseries graphs */
export type TimeSeriesData = {
  __typename?: 'TimeSeriesData';
  dataPoints?: Maybe<Array<Maybe<TimeSeriesDataPoint>>>;
  label?: Maybe<Scalars['String']>;
};

export type TimeSeriesDataPoint = {
  __typename?: 'TimeSeriesDataPoint';
  time?: Maybe<Scalars['DateTime']>;
  value?: Maybe<Scalars['Number']>;
};

export enum TimeUnit {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Weeks = 'WEEKS'
}

export type Trigger = {
  __typename?: 'Trigger';
  /**  Action performed by the trigger: Execute workflow/pipeline */
  action?: Maybe<TriggerAction>;
  /**  The condition that will execute the Trigger: On new artifact, On pipeline completion, On Cron schedule, On webhook */
  condition?: Maybe<TriggerCondition>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  /**  Description of the Trigger */
  description?: Maybe<Scalars['String']>;
  excludeHostsWithSameArtifact?: Maybe<Scalars['Boolean']>;
  /**  Trigger ID */
  id?: Maybe<Scalars['String']>;
  /**  Name of the trigger */
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type TriggerAction = {
  artifactSelections?: Maybe<Array<Maybe<ArtifactSelection>>>;
  variables?: Maybe<Array<Maybe<TriggerVariableValue>>>;
};

export type TriggerActionInput = {
  /** Artifact Selections required for the execution */
  artifactSelections?: Maybe<Array<Maybe<ArtifactSelectionInput>>>;
  /**  Beta: Coninue with default values as defined in pipeline */
  continueWithDefaultValues?: Maybe<Scalars['Boolean']>;
  /** Entity identifier of the Workflow or Pipeline */
  entityId: Scalars['String'];
  /** Skip deployment on the host, if the same artifact is already deployed */
  excludeHostsWithSameArtifact?: Maybe<Scalars['Boolean']>;
  /** Execution type: Workflow/Pipeline */
  executionType: ExecutionType;
  /** Variable inputs required for the execution */
  variables?: Maybe<Array<Maybe<VariableInput>>>;
};

export type TriggerCondition = {
  triggerConditionType?: Maybe<TriggerConditionType>;
};

export type TriggerConditionInput = {
  /** Should be provided when conditionType is ON_NEW_ARTIFACT. */
  artifactConditionInput?: Maybe<ArtifactConditionInput>;
  /** Condition to execute Trigger: ON_NEW_ARTIFACT, ON_PIPELINE_COMPLETION, ON_SCHEDULE, ON_WEBHOOK */
  conditionType: ConditionType;
  /** Should be provided when conditionType is ON_PIPELINE_COMPLETION. */
  pipelineConditionInput?: Maybe<PipelineConditionInput>;
  /** Should be provided when conditionType is ON_SCHEDULE. */
  scheduleConditionInput?: Maybe<ScheduleConditionInput>;
  /** Should be provided when conditionType is ON_WEBHOOK. */
  webhookConditionInput?: Maybe<WebhookConditionInput>;
};

export enum TriggerConditionType {
  NewArtifact = 'NEW_ARTIFACT',
  PipelineCompletion = 'PIPELINE_COMPLETION',
  Scheduled = 'SCHEDULED',
  Webhook = 'WEBHOOK'
}

export type TriggerConnection = {
  __typename?: 'TriggerConnection';
  nodes?: Maybe<Array<Maybe<Trigger>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TriggerFilter = {
  application?: Maybe<IdFilter>;
  tag?: Maybe<TriggerTagFilter>;
  trigger?: Maybe<IdFilter>;
};

export type TriggerPayload = {
  __typename?: 'TriggerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  trigger?: Maybe<Trigger>;
};

export type TriggerTagFilter = {
  entityType?: Maybe<TriggerTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum TriggerTagType {
  Application = 'APPLICATION'
}

export type TriggerVariableValue = {
  __typename?: 'TriggerVariableValue';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UpdateApplicationGitSyncConfigInput = {
  applicationId: Scalars['String'];
  branch: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  gitConnectorId: Scalars['String'];
  /** Specify the repository name. If your Harness Source Repo Provider uses the Git Account type, provide the Repo Name to use from that account. */
  repositoryName?: Maybe<Scalars['String']>;
  syncEnabled: Scalars['Boolean'];
};

export type UpdateApplicationGitSyncConfigPayload = {
  __typename?: 'UpdateApplicationGitSyncConfigPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  gitSyncConfig?: Maybe<GitSyncConfig>;
};

export type UpdateApplicationGitSyncConfigStatusInput = {
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  syncEnabled: Scalars['Boolean'];
};

export type UpdateApplicationGitSyncConfigStatusPayload = {
  __typename?: 'UpdateApplicationGitSyncConfigStatusPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  gitSyncConfig?: Maybe<GitSyncConfig>;
};

export type UpdateApplicationInput = {
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /**
   * Beta: When this is set to true, all manual triggers will require API Key authorization.
   * Doc link: https://docs.harness.io/article/mc2lxsas4c-trigger-a-deployment-using-c-url#option_enforce_api_keys_for_manual_triggers
   */
  isManualTriggerAuthorized?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateApplicationPayload = {
  __typename?: 'UpdateApplicationPayload';
  application?: Maybe<Application>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateAwsCloudProviderInput = {
  credentialsType?: Maybe<AwsCredentialsType>;
  crossAccountAttributes?: Maybe<UpdateAwsCrossAccountAttributes>;
  defaultRegion?: Maybe<Scalars['String']>;
  ec2IamCredentials?: Maybe<UpdateEc2IamCredentials>;
  manualCredentials?: Maybe<UpdateAwsManualCredentials>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateAwsCrossAccountAttributes = {
  assumeCrossAccountRole?: Maybe<Scalars['Boolean']>;
  crossAccountRoleArn?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
};

export type UpdateAwsManualCredentials = {
  accessKey?: Maybe<Scalars['String']>;
  accessKeySecretId?: Maybe<Scalars['String']>;
  secretKeySecretId?: Maybe<Scalars['String']>;
};

export type UpdateAzureCloudProviderInput = {
  clientId?: Maybe<Scalars['String']>;
  keySecretId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
};

export type UpdateCloudProviderInput = {
  awsCloudProvider?: Maybe<UpdateAwsCloudProviderInput>;
  azureCloudProvider?: Maybe<UpdateAzureCloudProviderInput>;
  clientMutationId?: Maybe<Scalars['String']>;
  cloudProviderId: Scalars['String'];
  cloudProviderType: CloudProviderType;
  gcpCloudProvider?: Maybe<UpdateGcpCloudProviderInput>;
  k8sCloudProvider?: Maybe<UpdateK8sCloudProviderInput>;
  pcfCloudProvider?: Maybe<UpdatePcfCloudProviderInput>;
  physicalDataCenterCloudProvider?: Maybe<UpdatePhysicalDataCenterCloudProviderInput>;
  spotInstCloudProvider?: Maybe<UpdateSpotInstCloudProviderInput>;
};

export type UpdateCloudProviderPayload = {
  __typename?: 'UpdateCloudProviderPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  cloudProvider?: Maybe<CloudProvider>;
};

export type UpdateConnectorInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  connectorId: Scalars['String'];
  connectorType: ConnectorType;
  dockerConnector?: Maybe<DockerConnectorInput>;
  gitConnector?: Maybe<UpdateGitConnectorInput>;
  helmConnector?: Maybe<HelmConnectorInput>;
  nexusConnector?: Maybe<NexusConnectorInput>;
};

export type UpdateConnectorPayload = {
  __typename?: 'UpdateConnectorPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  connector?: Maybe<Connector>;
};

export type UpdateEc2IamCredentials = {
  delegateSelector?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScopeInput>;
};

export type UpdateEncryptedText = {
  inheritScopesFromSM?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  scopedToAccount?: Maybe<Scalars['Boolean']>;
  secretReference?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScopeInput>;
  value?: Maybe<Scalars['String']>;
};

export type UpdateGcpCloudProviderInput = {
  delegateSelector?: Maybe<Scalars['String']>;
  delegateSelectors?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  serviceAccountKeySecretId?: Maybe<Scalars['String']>;
  skipValidation?: Maybe<Scalars['Boolean']>;
  useDelegate?: Maybe<Scalars['Boolean']>;
  useDelegateSelectors?: Maybe<Scalars['Boolean']>;
};

export type UpdateGitConnectorInput = {
  URL?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  customCommitDetails?: Maybe<CustomCommitDetailsInput>;
  generateWebhookUrl?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  passwordSecretId?: Maybe<Scalars['String']>;
  sshSettingId?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScopeInput>;
  userName?: Maybe<Scalars['String']>;
};

export type UpdateHashicorpVaultInput = {
  authDetails?: Maybe<HashicorpVaultAuthDetails>;
  isDefault?: Maybe<Scalars['Boolean']>;
  isReadOnly?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  secretEngineRenewalInterval?: Maybe<Scalars['Long']>;
  usageScope?: Maybe<UsageScopeInput>;
};

export type UpdateInheritClusterDetails = {
  delegateName?: Maybe<Scalars['String']>;
  delegateSelectors?: Maybe<Array<Scalars['String']>>;
  usageScope?: Maybe<UsageScopeInput>;
};

export type UpdateK8sCloudProviderInput = {
  clusterDetailsType?: Maybe<ClusterDetailsType>;
  inheritClusterDetails?: Maybe<UpdateInheritClusterDetails>;
  manualClusterDetails?: Maybe<UpdateManualClusterDetails>;
  name?: Maybe<Scalars['String']>;
  skipValidation?: Maybe<Scalars['Boolean']>;
};

export type UpdateManualClusterDetails = {
  masterUrl?: Maybe<Scalars['String']>;
  none?: Maybe<UpdateNone>;
  oidcToken?: Maybe<UpdateOidcToken>;
  serviceAccountToken?: Maybe<UpdateServiceAccountToken>;
  type?: Maybe<ManualClusterDetailsAuthenticationType>;
  usernameAndPassword?: Maybe<UpdateUsernameAndPasswordAuthentication>;
};

export type UpdateNone = {
  caCertificateSecretId?: Maybe<Scalars['String']>;
  clientCertificateSecretId?: Maybe<Scalars['String']>;
  clientKeyAlgorithm?: Maybe<Scalars['String']>;
  clientKeyPassphraseSecretId?: Maybe<Scalars['String']>;
  clientKeySecretId?: Maybe<Scalars['String']>;
  passwordSecretId?: Maybe<Scalars['String']>;
  serviceAccountTokenSecretId?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScopeInput>;
  userName?: Maybe<Scalars['String']>;
};

export type UpdateOidcToken = {
  clientIdSecretId?: Maybe<Scalars['String']>;
  clientSecretSecretId?: Maybe<Scalars['String']>;
  identityProviderUrl?: Maybe<Scalars['String']>;
  passwordSecretId?: Maybe<Scalars['String']>;
  scopes?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type UpdatePcfCloudProviderInput = {
  endpointUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  passwordSecretId?: Maybe<Scalars['String']>;
  skipValidation?: Maybe<Scalars['Boolean']>;
  userName?: Maybe<Scalars['String']>;
  userNameSecretId?: Maybe<Scalars['String']>;
};

export type UpdatePhysicalDataCenterCloudProviderInput = {
  name?: Maybe<Scalars['String']>;
  usageScope?: Maybe<UsageScopeInput>;
};

export type UpdateSshCredential = {
  authenticationScheme?: Maybe<SshAuthenticationScheme>;
  kerberosAuthentication?: Maybe<KerberosAuthenticationInput>;
  name?: Maybe<Scalars['String']>;
  sshAuthentication?: Maybe<SshAuthenticationInput>;
  usageScope?: Maybe<UsageScopeInput>;
};

export type UpdateSecretInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  encryptedText?: Maybe<UpdateEncryptedText>;
  secretId: Scalars['String'];
  secretType: SecretType;
  sshCredential?: Maybe<UpdateSshCredential>;
  winRMCredential?: Maybe<UpdateWinRmCredential>;
};

export type UpdateSecretManagerInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  hashicorpVaultConfigInput?: Maybe<UpdateHashicorpVaultInput>;
  secretManagerId: Scalars['String'];
  secretManagerType: SecretManagerType;
};

export type UpdateSecretPayload = {
  __typename?: 'UpdateSecretPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  secret?: Maybe<Secret>;
};

export type UpdateServiceAccountToken = {
  serviceAccountTokenSecretId?: Maybe<Scalars['String']>;
};

export type UpdateSpotInstCloudProviderInput = {
  accountId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tokenSecretId?: Maybe<Scalars['String']>;
};

export type UpdateTriggerInput = {
  /** Action performed on trigger execute: Workflow/Pipeline execution */
  action: TriggerActionInput;
  /** Application Id */
  applicationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  /** Condition of which Trigger will execute */
  condition: TriggerConditionInput;
  /** Description of the Trigger */
  description?: Maybe<Scalars['String']>;
  /** Name of the Trigger */
  name: Scalars['String'];
  /** Id of Trigger to be updated */
  triggerId: Scalars['String'];
};

export type UpdateTriggerPayload = {
  __typename?: 'UpdateTriggerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  trigger?: Maybe<Trigger>;
};

export type UpdateUserGroupInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notificationSettings?: Maybe<NotificationSettingsInput>;
  permissions?: Maybe<Permissions>;
  ssoSetting?: Maybe<SsoSettingInput>;
  userGroupId: Scalars['String'];
  userIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateUserGroupPayload = {
  __typename?: 'UpdateUserGroupPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<UserGroup>;
};

export type UpdateUserGroupPermissionsInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  permissions: Permissions;
  userGroupId: Scalars['String'];
};

export type UpdateUserGroupPermissionsPayload = {
  __typename?: 'UpdateUserGroupPermissionsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  permissions?: Maybe<UserGroupPermissions>;
};

export type UpdateUserInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  userGroupIds?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UpdateUsernameAndPasswordAuthentication = {
  passwordSecretId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  userNameSecretId?: Maybe<Scalars['String']>;
};

export type UpdateWinRmCredential = {
  authenticationScheme?: Maybe<WinRmAuthenticationScheme>;
  domain?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  passwordSecretId?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  skipCertCheck?: Maybe<Scalars['Boolean']>;
  usageScope?: Maybe<UsageScopeInput>;
  useSSL?: Maybe<Scalars['Boolean']>;
  userName?: Maybe<Scalars['String']>;
};

export type UpsertSecretManagerPayload = {
  __typename?: 'UpsertSecretManagerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  secretManager?: Maybe<SecretManager>;
};

export enum UrlType {
  Account = 'ACCOUNT',
  Repo = 'REPO'
}

export type UsageScope = {
  __typename?: 'UsageScope';
  appEnvScopes?: Maybe<Array<Maybe<AppEnvScope>>>;
};

export type UsageScopeInput = {
  appEnvScopes?: Maybe<Array<AppEnvScopeInput>>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  isImportedFromIdentityProvider?: Maybe<Scalars['Boolean']>;
  isPasswordExpired?: Maybe<Scalars['Boolean']>;
  isTwoFactorAuthenticationEnabled?: Maybe<Scalars['Boolean']>;
  isUserLocked?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  userGroups?: Maybe<UserGroupConnection>;
};


export type UserUserGroupsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

/** If changeSet got triggered by User action */
export type UserChangeSet = ChangeSet & {
  __typename?: 'UserChangeSet';
  /** List of all changeDetails */
  changes?: Maybe<Array<Maybe<ChangeDetails>>>;
  /** Failure message */
  failureStatusMsg?: Maybe<Scalars['String']>;
  /** Unique ID of a changeSet */
  id?: Maybe<Scalars['String']>;
  /** HTTP request that triggered the changeSet */
  request?: Maybe<RequestInfo>;
  /** Timestamp when changeSet was triggered */
  triggeredAt?: Maybe<Scalars['DateTime']>;
  /** User who triggered the changeSet */
  triggeredBy?: Maybe<User>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  nodes?: Maybe<Array<Maybe<User>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  importedByScim?: Maybe<Scalars['Boolean']>;
  isSSOLinked?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  notificationSettings?: Maybe<NotificationSettings>;
  permissions?: Maybe<UserGroupPermissions>;
  ssoSetting?: Maybe<LinkedSsoSetting>;
  users?: Maybe<UserConnection>;
};


export type UserGroupUsersArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};

export type UserGroupConnection = {
  __typename?: 'UserGroupConnection';
  nodes?: Maybe<Array<Maybe<UserGroup>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserGroupPermissions = {
  __typename?: 'UserGroupPermissions';
  accountPermissions?: Maybe<AccountPermissions>;
  appPermissions?: Maybe<Array<Maybe<ApplicationPermission>>>;
};

export type UsernameAndPasswordAuthentication = {
  passwordSecretId: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
  userNameSecretId?: Maybe<Scalars['String']>;
};

export type Variable = {
  __typename?: 'Variable';
  /** True if a variable allows multiple values. You need to provide , separated list of values. */
  allowMultipleValues?: Maybe<Scalars['Boolean']>;
  /** allowed values. Only for text variables. */
  allowedValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Default value, Only for text variables */
  defaultValue?: Maybe<Scalars['String']>;
  /** If a variable id fixed variable. */
  fixed?: Maybe<Scalars['Boolean']>;
  /** name of the variable */
  name?: Maybe<Scalars['String']>;
  /** If the variable is a required variable */
  required?: Maybe<Scalars['Boolean']>;
  /** Type of the variable */
  type?: Maybe<Scalars['String']>;
};

export type VariableInput = {
  /** name of the variable */
  name: Scalars['String'];
  /** value of the variable */
  variableValue: VariableValue;
};

export type VariableValue = {
  /** type of the value: name or if */
  type: VariableValueType;
  /** value */
  value: Scalars['String'];
};

export enum VariableValueType {
  Expression = 'EXPRESSION',
  Id = 'ID',
  Name = 'NAME'
}

export type WebhookConditionInput = {
  /** Bitbucket  event, Required if webhookSourceType = BITBUCKET */
  bitbucketEvent?: Maybe<BitbucketEvent>;
  /** Branch in which the filePaths exist. */
  branchName?: Maybe<Scalars['String']>;
  /** Branch filter, can be used if using PullRequest or Push events. */
  branchRegex?: Maybe<Scalars['String']>;
  /**  Only for Native Helm and Helm-based Kubernetes deployments. Event type should be PUSH. */
  deployOnlyIfFilesChanged?: Maybe<Scalars['Boolean']>;
  /** The file names/paths when changed and Pushed, will execute this Trigger. */
  filePaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Source Repo Provider setup in Harness */
  gitConnectorId?: Maybe<Scalars['String']>;
  /** Github event, Required if webhookSourceType = GITHUB */
  githubEvent?: Maybe<GitHubEvent>;
  /** Gitlab  event, Required if webhookSourceType = GITLAB */
  gitlabEvent?: Maybe<GitlabEvent>;
  /** Git repository name in case when Account level Git connector is provided */
  repoName?: Maybe<Scalars['String']>;
  /** Source of the webhook: GITHUB/GITLAB/BITBUCKET/CUSTOM(curl based) */
  webhookSourceType: WebhookSource;
};

export type WebhookEvent = {
  __typename?: 'WebhookEvent';
  action?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['String']>;
};

export enum WebhookSource {
  Bitbucket = 'BITBUCKET',
  Custom = 'CUSTOM',
  Github = 'GITHUB',
  Gitlab = 'GITLAB'
}

export type WebhoookDetails = {
  __typename?: 'WebhoookDetails';
  header?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['String']>;
  webhookURL?: Maybe<Scalars['String']>;
};

export enum WinRmAuthenticationScheme {
  Ntlm = 'NTLM'
}

export type WinRmCredential = Secret & {
  __typename?: 'WinRMCredential';
  authenticationScheme?: Maybe<WinRmAuthenticationScheme>;
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  secretType?: Maybe<SecretType>;
  skipCertCheck?: Maybe<Scalars['Boolean']>;
  usageScope?: Maybe<UsageScope>;
  useSSL?: Maybe<Scalars['Boolean']>;
  userName?: Maybe<Scalars['String']>;
};

export type WinRmCredentialInput = {
  authenticationScheme?: Maybe<WinRmAuthenticationScheme>;
  domain?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  passwordSecretId: Scalars['String'];
  port?: Maybe<Scalars['Int']>;
  skipCertCheck?: Maybe<Scalars['Boolean']>;
  usageScope?: Maybe<UsageScopeInput>;
  useSSL?: Maybe<Scalars['Boolean']>;
  userName: Scalars['String'];
};

/**  Type Workflow */
export type Workflow = {
  __typename?: 'Workflow';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  /**  Description of the Workflow */
  description?: Maybe<Scalars['String']>;
  /**  Workflow ID */
  id?: Maybe<Scalars['String']>;
  /**  Name of the Workflow */
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  /** Available variables in the Workflow */
  workflowVariables?: Maybe<Array<Maybe<Variable>>>;
};

export type WorkflowAction = TriggerAction & {
  __typename?: 'WorkflowAction';
  artifactSelections?: Maybe<Array<Maybe<ArtifactSelection>>>;
  variables?: Maybe<Array<Maybe<TriggerVariableValue>>>;
  workflowId?: Maybe<Scalars['String']>;
  workflowName?: Maybe<Scalars['String']>;
};

export type WorkflowConnection = {
  __typename?: 'WorkflowConnection';
  nodes?: Maybe<Array<Maybe<Workflow>>>;
  pageInfo?: Maybe<PageInfo>;
};

/**  Type for workflow execution */
export type WorkflowExecution = Execution & {
  __typename?: 'WorkflowExecution';
  application?: Maybe<Application>;
  /**  Artifact used during deployment */
  artifacts?: Maybe<Array<Maybe<Artifact>>>;
  cause?: Maybe<Cause>;
  /**  DateTime when execution started */
  createdAt?: Maybe<Scalars['DateTime']>;
  /**  DateTime when execution ended */
  endedAt?: Maybe<Scalars['DateTime']>;
  failureDetails?: Maybe<Scalars['String']>;
  /**  Workflow Execution Id */
  id?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  outcomes?: Maybe<OutcomeConnection>;
  /**  Artifact used during rollback deployment */
  rollbackArtifacts?: Maybe<Array<Maybe<Artifact>>>;
  /**  DateTime when execution started */
  startedAt?: Maybe<Scalars['DateTime']>;
  /**  Status of the workflow */
  status?: Maybe<ExecutionStatus>;
  tags?: Maybe<Array<Maybe<DeploymentTag>>>;
  workflow?: Maybe<Workflow>;
};

export type WorkflowFilter = {
  application?: Maybe<IdFilter>;
  orchestrationWorkflowType?: Maybe<OrchestrationWorkflowTypeFilter>;
  tag?: Maybe<WorkflowTagFilter>;
  workflow?: Maybe<IdFilter>;
};

export enum WorkflowFilterType {
  Application = 'Application',
  Workflow = 'Workflow'
}

export type WorkflowPermissionFilter = {
  __typename?: 'WorkflowPermissionFilter';
  envIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  filterTypes?: Maybe<Array<Maybe<WorkflowPermissionFilterType>>>;
};

export type WorkflowPermissionFilterInput = {
  envIds?: Maybe<Array<Scalars['String']>>;
  filterTypes?: Maybe<Array<Maybe<WorkflowPermissionFilterType>>>;
};

export enum WorkflowPermissionFilterType {
  NonProductionWorkflows = 'NON_PRODUCTION_WORKFLOWS',
  ProductionWorkflows = 'PRODUCTION_WORKFLOWS',
  WorkflowTemplates = 'WORKFLOW_TEMPLATES'
}

export type WorkflowStageExecution = PipelineStageExecution & {
  __typename?: 'WorkflowStageExecution';
  /**  Pipeline stage element ID */
  pipelineStageElementId?: Maybe<Scalars['String']>;
  /**  Pipeline stage name */
  pipelineStageName?: Maybe<Scalars['String']>;
  /**  Pipeline step name */
  pipelineStepName?: Maybe<Scalars['String']>;
  /**  List of runtime variables */
  runtimeInputVariables?: Maybe<Array<Maybe<Variable>>>;
  /**  Stage execution status */
  status?: Maybe<ExecutionStatus>;
  /**  Workflow execution ID */
  workflowExecutionId?: Maybe<Scalars['String']>;
};

export type WorkflowTagFilter = {
  entityType?: Maybe<WorkflowTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum WorkflowTagType {
  Application = 'APPLICATION'
}

export type WorkloadFilter = {
  cluster?: Maybe<IdFilter>;
  namespace?: Maybe<IdFilter>;
  workloadName?: Maybe<IdFilter>;
  workloadType?: Maybe<IdFilter>;
};

export type WorkloadRecommendation = {
  __typename?: 'WorkloadRecommendation';
  clusterId?: Maybe<Scalars['String']>;
  clusterName?: Maybe<Scalars['String']>;
  containerRecommendations?: Maybe<Array<Maybe<ContainerRecommendation>>>;
  estimatedSavings?: Maybe<Scalars['Number']>;
  /** @deprecated Will be removed in few days. */
  lastDayCost?: Maybe<LastDayCost>;
  namespace?: Maybe<Scalars['String']>;
  numDays?: Maybe<Scalars['Int']>;
  /** @deprecated Will be removed in few days. */
  preset?: Maybe<K8sWorkloadRecommendationPreset>;
  workloadName?: Maybe<Scalars['String']>;
  workloadType?: Maybe<Scalars['String']>;
};

export type WorkloadRecommendationConnection = {
  __typename?: 'WorkloadRecommendationConnection';
  nodes?: Maybe<Array<Maybe<WorkloadRecommendation>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CeAggregation = {
  cost?: Maybe<CeCost>;
  function?: Maybe<CeAggregationFunction>;
  utilization?: Maybe<CeUtilization>;
};

export enum CeAggregationFunction {
  Avg = 'AVG',
  Sum = 'SUM'
}

export type CeClusterBillingData = {
  __typename?: 'ceClusterBillingData';
  data?: Maybe<Array<Maybe<BillingDataEntry>>>;
};

export enum CeCost {
  Idlecost = 'IDLECOST',
  Totalcost = 'TOTALCOST',
  Unallocatedcost = 'UNALLOCATEDCOST'
}

export type CeEcsEntity = {
  __typename?: 'ceEcsEntity';
  launchType?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
  taskId?: Maybe<Scalars['String']>;
};

export enum CeEntityGroupBy {
  Application = 'Application',
  Cluster = 'Cluster',
  EcsService = 'EcsService',
  Environment = 'Environment',
  LaunchType = 'LaunchType',
  Namespace = 'Namespace',
  Node = 'Node',
  Pod = 'Pod',
  Region = 'Region',
  Service = 'Service',
  Task = 'Task',
  Workload = 'Workload',
  WorkloadType = 'WorkloadType'
}

export type CeFilter = {
  application?: Maybe<IdFilter>;
  cluster?: Maybe<IdFilter>;
  ecsService?: Maybe<IdFilter>;
  endTime?: Maybe<TimeFilter>;
  environment?: Maybe<IdFilter>;
  instanceType?: Maybe<IdFilter>;
  label?: Maybe<CeLabelFilter>;
  launchType?: Maybe<IdFilter>;
  namespace?: Maybe<IdFilter>;
  node?: Maybe<IdFilter>;
  pod?: Maybe<IdFilter>;
  service?: Maybe<IdFilter>;
  startTime?: Maybe<TimeFilter>;
  tag?: Maybe<CeTagFilter>;
  task?: Maybe<IdFilter>;
  workload?: Maybe<IdFilter>;
};

export type CeGroupBy = {
  entity?: Maybe<CeEntityGroupBy>;
  labelAggregation?: Maybe<CeLabelAggregation>;
  tagAggregation?: Maybe<CeTagAggregation>;
  time?: Maybe<CeTimeAggregation>;
};

export type CeHarnessEntity = {
  __typename?: 'ceHarnessEntity';
  application?: Maybe<Scalars['String']>;
  environment?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
};

export type CeK8sEntity = {
  __typename?: 'ceK8sEntity';
  namespace?: Maybe<Scalars['String']>;
  node?: Maybe<Scalars['String']>;
  pod?: Maybe<Scalars['String']>;
  selectedLabels?: Maybe<Array<Maybe<CeK8sLabels>>>;
  workload?: Maybe<Scalars['String']>;
  workloadType?: Maybe<Scalars['String']>;
};

export type CeK8sLabels = {
  __typename?: 'ceK8sLabels';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CeLabelAggregation = {
  name?: Maybe<Scalars['String']>;
};

export type CeLabelFilter = {
  labels?: Maybe<Array<Maybe<K8sLabelInput>>>;
};

export type CeSelect = {
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CeSort = {
  order?: Maybe<SortOrder>;
  sortType?: Maybe<CeSortType>;
};

export enum CeSortType {
  Idlecost = 'IDLECOST',
  Time = 'TIME',
  Totalcost = 'TOTALCOST',
  Unallocatedcost = 'UNALLOCATEDCOST'
}

export type CeTagAggregation = {
  entityType?: Maybe<CeTagType>;
  tagName?: Maybe<Scalars['String']>;
};

export type CeTagFilter = {
  entityType?: Maybe<CeTagType>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
};

export enum CeTagType {
  Application = 'APPLICATION',
  Environment = 'ENVIRONMENT',
  Service = 'SERVICE'
}

export type CeTimeAggregation = {
  timePeriod?: Maybe<TimeGroupType>;
};

export enum CeUtilization {
  CpuLimit = 'CPU_LIMIT',
  CpuRequest = 'CPU_REQUEST',
  CpuUtilizationValue = 'CPU_UTILIZATION_VALUE',
  MemoryLimit = 'MEMORY_LIMIT',
  MemoryRequest = 'MEMORY_REQUEST',
  MemoryUtilizationValue = 'MEMORY_UTILIZATION_VALUE'
}

export type InfraDefConnectionData = {
  EnvironmentId?: Maybe<Scalars['String']>;
  InfrastructureId?: Maybe<Scalars['String']>;
};

export type InfrastructureDefinitionData = {
  EnvId?: Maybe<Scalars['String']>;
  InfrastructureId?: Maybe<Scalars['String']>;
  InfrastructureName?: Maybe<Scalars['String']>;
};

export type ApplicationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ApplicationQuery = (
  { __typename?: 'Query' }
  & { result?: Maybe<(
    { __typename?: 'Application' }
    & ApplicationFieldsFragment
  )> }
);

export type ApplicationByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ApplicationByNameQuery = (
  { __typename?: 'Query' }
  & { result?: Maybe<(
    { __typename?: 'Application' }
    & ApplicationFieldsFragment
  )> }
);

export type ApplicationsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type ApplicationsQuery = (
  { __typename?: 'Query' }
  & { result?: Maybe<(
    { __typename?: 'ApplicationConnection' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasMore'>
    )>, nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Application' }
      & ApplicationFieldsFragment
    )>>> }
  )> }
);

export type ApplicationFieldsFragment = (
  { __typename?: 'Application' }
  & Pick<Application, 'id' | 'name' | 'description'>
);

export const ApplicationFieldsFragmentDoc: DocumentNode<ApplicationFieldsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"applicationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Application"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]};
export const ApplicationDocument: DocumentNode<ApplicationQuery, ApplicationQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"application"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"application"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"applicationFields"}}]}}]}},...ApplicationFieldsFragmentDoc.definitions]};
export const ApplicationByNameDocument: DocumentNode<ApplicationByNameQuery, ApplicationByNameQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"applicationByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"applicationByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"applicationFields"}}]}}]}},...ApplicationFieldsFragmentDoc.definitions]};
export const ApplicationsDocument: DocumentNode<ApplicationsQuery, ApplicationsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"applications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"100"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"applications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"applicationFields"}}]}}]}}]}},...ApplicationFieldsFragmentDoc.definitions]};
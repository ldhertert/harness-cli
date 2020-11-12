/* eslint-disable */
// To parse this data:
//
//   import { Convert, Harness } from "./file";
//
//   const harness = Convert.toHarness(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface HarnessObject {
    Mutation?: Mutation;
    Query?:    Query;
}

export interface Mutation {
    addAccountPermission?: AddAccountPermission;
    addAppPermission?:     AddAppPermission;
    addUserToUserGroup?:   AddUserToUserGroup;
    /**
     * Creates a new Application and returns it
     */
    createApplication?: CreateApplication;
    /**
     * Beta
     */
    createCloudProvider?: CreateCloudProvider;
    /**
     * Beta: Create a secret.
     */
    createSecret?: CreateSecret;
    /**
     * Creates a new Trigger and returns it
     */
    createTrigger?:   CreateTrigger;
    createUser?:      CreateUser;
    createUserGroup?: CreateUserGroup;
    /**
     * Deletes an application.
     */
    deleteApplication?: DeleteApplication;
    /**
     * Beta
     */
    deleteCloudProvider?: DeleteCloudProvider;
    /**
     * Beta: Delete a secret.
     */
    deleteSecret?: DeleteSecret;
    /**
     * Deletes a Trigger.
     */
    deleteTrigger?:   DeleteTrigger;
    deleteUser?:      DeleteUser;
    deleteUserGroup?: DeleteUserGroup;
    /**
     * Beta: Start an export of executions/deployments.
     */
    exportExecutions?: ExportExecutions;
    /**
     * Removes Git Sync Configuration associated with an application. Returns updated
     * application.
     */
    removeApplicationGitSyncConfig?: RemoveApplicationGitSyncConfig;
    removeUserFromUserGroup?:        RemoveUserFromUserGroup;
    /**
     * Beta: Trigger a Workflow/Pipeline Execution.
     */
    startExecution?: StartExecution;
    /**
     * Updates an application and returns it.
     */
    updateApplication?: UpdateApplication;
    /**
     * Updates  Application Git Sync Configuration. Creates the configuration, in case it does
     * not exist. Returns updated git sync configuration.
     */
    updateApplicationGitSyncConfig?: UpdateApplicationGitSyncConfig;
    /**
     * Enable/disable Git Sync for an application. Returns updated application.
     */
    updateApplicationGitSyncConfigStatus?: UpdateApplicationGitSyncConfigStatus;
    /**
     * Beta
     */
    updateCloudProvider?: UpdateCloudProvider;
    /**
     * Beta: Update a secret.
     */
    updateSecret?: UpdateSecret;
    /**
     * Updates a Trigger and returns it.
     */
    updateTrigger?:              UpdateTrigger;
    updateUser?:                 UpdateUser;
    updateUserGroup?:            UpdateUserGroup;
    updateUserGroupPermissions?: UpdateUserGroupPermissions;
}

export interface AddAccountPermission {
    arguments?: AddAccountPermissionArguments;
    return?:    AddAccountPermissionPayload;
}

export interface AddAccountPermissionArguments {
    input: AddAccountPermissionInput;
}

export interface AddAccountPermissionInput {
    accountPermission?: AccountPermissionType;
    clientMutationId?:  string;
    userGroupId:        string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum AccountPermissionType {
    AdministerCe = "ADMINISTER_CE",
    AdministerOtherAccountFunctions = "ADMINISTER_OTHER_ACCOUNT_FUNCTIONS",
    CreateAndDeleteApplication = "CREATE_AND_DELETE_APPLICATION",
    ManageAPIKeys = "MANAGE_API_KEYS",
    ManageAlertNotificationRules = "MANAGE_ALERT_NOTIFICATION_RULES",
    ManageApplicationStacks = "MANAGE_APPLICATION_STACKS",
    ManageAuthenticationSettings = "MANAGE_AUTHENTICATION_SETTINGS",
    ManageCloudProviders = "MANAGE_CLOUD_PROVIDERS",
    ManageConfigAsCode = "MANAGE_CONFIG_AS_CODE",
    ManageConnectors = "MANAGE_CONNECTORS",
    ManageDelegateProfiles = "MANAGE_DELEGATE_PROFILES",
    ManageDelegates = "MANAGE_DELEGATES",
    ManageDeploymentFreezes = "MANAGE_DEPLOYMENT_FREEZES",
    ManageIPWhitelist = "MANAGE_IP_WHITELIST",
    ManagePipelineGovernanceStandards = "MANAGE_PIPELINE_GOVERNANCE_STANDARDS",
    ManageSecretManagers = "MANAGE_SECRET_MANAGERS",
    ManageSecrets = "MANAGE_SECRETS",
    ManageTags = "MANAGE_TAGS",
    ManageTemplateLibrary = "MANAGE_TEMPLATE_LIBRARY",
    ManageUserAndUserGroupsAndAPIKeys = "MANAGE_USER_AND_USER_GROUPS_AND_API_KEYS",
    ManageUsersAndGroups = "MANAGE_USERS_AND_GROUPS",
    ReadUsersAndGroups = "READ_USERS_AND_GROUPS",
    ViewAudits = "VIEW_AUDITS",
    ViewCe = "VIEW_CE",
    ViewUserAndUserGroupsAndAPIKeys = "VIEW_USER_AND_USER_GROUPS_AND_API_KEYS",
}

export interface AddAccountPermissionPayload {
    clientMutationId?: string;
    userGroup?:        UserGroup;
}

export interface UserGroupConnection {
    nodes?:    UserGroup[];
    pageInfo?: PageInfo;
}

export interface User {
    email?:                            string;
    id?:                               string;
    isEmailVerified?:                  boolean;
    isImportedFromIdentityProvider?:   boolean;
    isPasswordExpired?:                boolean;
    isTwoFactorAuthenticationEnabled?: boolean;
    isUserLocked?:                     boolean;
    name?:                             string;
    userGroups?:                       UserGroupConnection;
}

export interface UserConnection {
    nodes?:    User[];
    pageInfo?: PageInfo;
}

export interface UserGroup {
    description?:          string;
    id?:                   string;
    importedByScim?:       boolean;
    isSSOLinked?:          boolean;
    name?:                 string;
    notificationSettings?: NotificationSettings;
    permissions?:          UserGroupPermissions;
    ssoSetting?:           any;
    users?:                UserConnection;
}

export interface PageInfo {
    hasMore?: boolean;
    limit?:   number;
    offset?:  number;
    total?:   number;
}

export interface NotificationSettings {
    groupEmailAddresses?:       string[];
    microsoftTeamsWebhookUrl?:  string;
    sendMailToNewMembers?:      boolean;
    sendNotificationToMembers?: boolean;
    slackNotificationSetting?:  SlackNotificationSetting;
}

export interface SlackNotificationSetting {
    slackChannelName?: string;
    slackWebhookURL?:  string;
}

export interface UserGroupPermissions {
    accountPermissions?: AccountPermissions;
    appPermissions?:     ApplicationPermission[];
}

export interface AccountPermissions {
    accountPermissionTypes?: AccountPermissionType[];
}

export interface ApplicationPermission {
    actions?:        Actions[];
    applications?:   AppFilter;
    deployments?:    DeploymentPermissionFilter;
    environments?:   EnvPermissionFilter;
    permissionType?: AppPermissionType;
    pipelines?:      PipelinePermissionFilter;
    provisioners?:   ProvisionerPermissionFilter;
    services?:       ServicePermissionFilter;
    workflows?:      WorkflowPermissionFilter;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum Actions {
    Create = "CREATE",
    Delete = "DELETE",
    Execute = "EXECUTE",
    ExecutePipeline = "EXECUTE_PIPELINE",
    ExecuteWorkflow = "EXECUTE_WORKFLOW",
    Read = "READ",
    Update = "UPDATE",
}

export interface AppFilter {
    appIds?:     string[];
    filterType?: FilterType;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum FilterType {
    All = "ALL",
}

export interface DeploymentPermissionFilter {
    envIds?:      string[];
    filterTypes?: FilterTypeElement[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum FilterTypeElement {
    NonProductionEnvironments = "NON_PRODUCTION_ENVIRONMENTS",
    ProductionEnvironments = "PRODUCTION_ENVIRONMENTS",
}

export interface EnvPermissionFilter {
    envIds?:      string[];
    filterTypes?: FilterTypeElement[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum AppPermissionType {
    All = "ALL",
    Deployment = "DEPLOYMENT",
    Env = "ENV",
    Pipeline = "PIPELINE",
    Provisioner = "PROVISIONER",
    Service = "SERVICE",
    Workflow = "WORKFLOW",
}

export interface PipelinePermissionFilter {
    envIds?:      string[];
    filterTypes?: PipelinePermissionFilterType[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum PipelinePermissionFilterType {
    NonProductionPipelines = "NON_PRODUCTION_PIPELINES",
    ProductionPipelines = "PRODUCTION_PIPELINES",
}

export interface ProvisionerPermissionFilter {
    filterType?:     FilterType;
    provisionerIds?: string[];
}

export interface ServicePermissionFilter {
    filterType?: FilterType;
    serviceIds?: string[];
}

export interface WorkflowPermissionFilter {
    envIds?:      string[];
    filterTypes?: WorkflowPermissionFilterType[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum WorkflowPermissionFilterType {
    NonProductionWorkflows = "NON_PRODUCTION_WORKFLOWS",
    ProductionWorkflows = "PRODUCTION_WORKFLOWS",
    WorkflowTemplates = "WORKFLOW_TEMPLATES",
}

export interface AddAppPermission {
    arguments?: AddAppPermissionArguments;
    return?:    AddAppPermissionPayload;
}

export interface AddAppPermissionArguments {
    input: AddAppPermissionInput;
}

export interface AddAppPermissionInput {
    appPermission?:    ApplicationPermissionInput;
    clientMutationId?: string;
    userGroupId:       string;
}

export interface ApplicationPermissionInput {
    actions?:       Actions[];
    applications:   AppFilterInput;
    deployments?:   DeploymentPermissionFilterInput;
    environments?:  EnvPermissionFilterInput;
    permissionType: AppPermissionType;
    pipelines?:     PipelinePermissionFilterInput;
    provisioners?:  ProvisionerPermissionFilterInput;
    services?:      ServicePermissionFilterInput;
    workflows?:     WorkflowPermissionFilterInput;
}

export interface AppFilterInput {
    appIds?:     string[];
    filterType?: FilterType;
}

export interface DeploymentPermissionFilterInput {
    envIds?:      string[];
    filterTypes?: FilterTypeElement[];
}

export interface EnvPermissionFilterInput {
    envIds?:      string[];
    filterTypes?: FilterTypeElement[];
}

export interface PipelinePermissionFilterInput {
    envIds?:      string[];
    filterTypes?: PipelinePermissionFilterType[];
}

export interface ProvisionerPermissionFilterInput {
    filterType?:     FilterType;
    provisionerIds?: string[];
}

export interface ServicePermissionFilterInput {
    filterType?: FilterType;
    serviceIds?: string[];
}

export interface WorkflowPermissionFilterInput {
    envIds?:      string[];
    filterTypes?: WorkflowPermissionFilterType[];
}

export interface AddAppPermissionPayload {
    clientMutationId?: string;
    userGroup?:        UserGroup;
}

export interface AddUserToUserGroup {
    arguments?: AddUserToUserGroupArguments;
    return?:    AddUserToUserGroupPayload;
}

export interface AddUserToUserGroupArguments {
    input: AddUserToUserGroupInput;
}

export interface AddUserToUserGroupInput {
    clientMutationId?: string;
    userGroupId:       string;
    userId:            string;
}

export interface AddUserToUserGroupPayload {
    clientMutationId?: string;
    userGroup?:        UserGroup;
}

/**
 * Creates a new Application and returns it
 */
export interface CreateApplication {
    arguments?: CreateApplicationArguments;
    return?:    CreateApplicationPayload;
}

export interface CreateApplicationArguments {
    input: CreateApplicationInput;
}

export interface CreateApplicationInput {
    clientMutationId?: string;
    description?:      string;
    name:              string;
}

export interface CreateApplicationPayload {
    application?:      Application;
    clientMutationId?: string;
}

export interface Environment {
    application?: Application;
    createdAt?:   { [key: string]: any };
    createdBy?:   User;
    description?: string;
    id?:          string;
    name?:        string;
    type?:        EnvironmentType;
}

export interface EnvironmentConnection {
    nodes?:    Environment[];
    pageInfo?: PageInfo;
}

export interface Application {
    createdAt?:     { [key: string]: any };
    createdBy?:     User;
    description?:   string;
    environments?:  EnvironmentConnection;
    gitSyncConfig?: GitSyncConfig;
    id?:            string;
    name?:          string;
    pipelines?:     PipelineConnection;
    services?:      ServiceConnection;
    workflows?:     WorkflowConnection;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum EnvironmentType {
    NonProd = "NON_PROD",
    Prod = "PROD",
}

export interface GitSyncConfig {
    branch?:       string;
    gitConnector?: GitConnector;
    syncEnabled?:  boolean;
}

export interface GitConnector {
    branch?:              string;
    createdAt?:           { [key: string]: any };
    createdBy?:           User;
    customCommitDetails?: CustomCommitDetails;
    description?:         string;
    generateWebhookUrl?:  boolean;
    id?:                  string;
    name?:                string;
    passwordSecretId?:    string;
    sshSettingId?:        string;
    URL?:                 string;
    urlType?:             URLType;
    userName?:            string;
    webhookUrl?:          string;
}

export interface CustomCommitDetails {
    authorEmailId?: string;
    authorName?:    string;
    commitMessage?: string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum URLType {
    Account = "ACCOUNT",
    Repo = "REPO",
}

export interface PipelineConnection {
    nodes?:    Pipeline[];
    pageInfo?: PageInfo;
}

/**
 * Type for pipeline
 */
export interface Pipeline {
    createdAt?: { [key: string]: any };
    createdBy?: User;
    /**
     * Description of the Pipeline
     */
    description?: string;
    /**
     * Pipeline identifier
     */
    id?: string;
    /**
     * Name of the Pipeline
     */
    name?: string;
    /**
     * Variables in the Pipeline
     */
    pipelineVariables?: Variable[];
}

export interface Variable {
    /**
     * allowed values. Only for text variables.
     */
    allowedValues?: string[];
    /**
     * True if a variable allows multiple values. You need to provide , separated list of values.
     */
    allowMultipleValues?: boolean;
    /**
     * Default value, Only for text variables
     */
    defaultValue?: string;
    /**
     * If a variable id fixed variable.
     */
    fixed?: boolean;
    /**
     * name of the variable
     */
    name?: string;
    /**
     * If the variable is a required variable
     */
    required?: boolean;
    /**
     * Type of the variable
     */
    type?: string;
}

export interface ServiceConnection {
    nodes?:    Service[];
    pageInfo?: PageInfo;
}

/**
 * Service Type
 */
export interface Service {
    artifactSources?: any[];
    /**
     * Artifact type deployed by this Service
     */
    artifactType?: string;
    createdAt?:    { [key: string]: any };
    createdBy?:    User;
    /**
     * Deployment Type: SSH, Helm, or Kubernetes
     */
    deploymentType?: string;
    /**
     * Description of the Service
     */
    description?: string;
    /**
     * Service ID
     */
    id?: string;
    /**
     * Name of the Service
     */
    name?: string;
}

export interface WorkflowConnection {
    nodes?:    Workflow[];
    pageInfo?: PageInfo;
}

/**
 * Type Workflow
 */
export interface Workflow {
    createdAt?: { [key: string]: any };
    createdBy?: User;
    /**
     * Description of the Workflow
     */
    description?: string;
    /**
     * Workflow ID
     */
    id?: string;
    /**
     * Name of the Workflow
     */
    name?: string;
    /**
     * Available variables in the Workflow
     */
    workflowVariables?: Variable[];
}

/**
 * Beta
 */
export interface CreateCloudProvider {
    arguments?: CreateCloudProviderArguments;
    return?:    CreateCloudProviderPayload;
}

export interface CreateCloudProviderArguments {
    input: CreateCloudProviderInput;
}

export interface CreateCloudProviderInput {
    awsCloudProvider?:                AwsCloudProviderInput;
    azureCloudProvider?:              AzureCloudProviderInput;
    clientMutationId?:                string;
    cloudProviderType:                CloudProviderType;
    gcpCloudProvider?:                GcpCloudProviderInput;
    k8sCloudProvider?:                K8SCloudProviderInput;
    pcfCloudProvider?:                PcfCloudProviderInput;
    physicalDataCenterCloudProvider?: PhysicalDataCenterCloudProviderInput;
    spotInstCloudProvider?:           SpotInstCloudProviderInput;
}

export interface AwsCloudProviderInput {
    credentialsType?:        AwsCredentialsType;
    crossAccountAttributes?: AwsCrossAccountAttributes;
    ec2IamCredentials?:      Ec2IamCredentials;
    manualCredentials?:      AwsManualCredentials;
    name:                    string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum AwsCredentialsType {
    Ec2Iam = "EC2_IAM",
    Manual = "MANUAL",
}

export interface AwsCrossAccountAttributes {
    assumeCrossAccountRole?: boolean;
    crossAccountRoleArn:     string;
    externalId?:             string;
}

export interface Ec2IamCredentials {
    delegateSelector: string;
    usageScope?:      UsageScopeInput;
}

export interface UsageScopeInput {
    appEnvScopes?: AppEnvScopeInput[];
}

export interface AppEnvScopeInput {
    application: AppScopeFilterInput;
    environment: EnvScopeFilterInput;
}

export interface AppScopeFilterInput {
    appId?:      string;
    filterType?: FilterType;
}

export interface EnvScopeFilterInput {
    envId?:      string;
    filterType?: FilterTypeElement;
}

export interface AwsManualCredentials {
    accessKey:         string;
    secretKeySecretId: string;
}

export interface AzureCloudProviderInput {
    clientId:    string;
    keySecretId: string;
    name:        string;
    tenantId:    string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum CloudProviderType {
    Aws = "AWS",
    Azure = "AZURE",
    Gcp = "GCP",
    KubernetesCluster = "KUBERNETES_CLUSTER",
    Pcf = "PCF",
    PhysicalDataCenter = "PHYSICAL_DATA_CENTER",
    SpotInst = "SPOT_INST",
}

export interface GcpCloudProviderInput {
    name:                      string;
    serviceAccountKeySecretId: string;
}

export interface K8SCloudProviderInput {
    clusterDetailsType:     ClusterDetailsType;
    inheritClusterDetails?: InheritClusterDetails;
    manualClusterDetails?:  ManualClusterDetails;
    name:                   string;
    skipValidation?:        boolean;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ClusterDetailsType {
    InheritClusterDetails = "INHERIT_CLUSTER_DETAILS",
    ManualClusterDetails = "MANUAL_CLUSTER_DETAILS",
}

export interface InheritClusterDetails {
    delegateName: string;
    usageScope?:  UsageScopeInput;
}

export interface ManualClusterDetails {
    masterUrl:            string;
    none?:                None;
    oidcToken?:           OIDCToken;
    serviceAccountToken?: ServiceAccountToken;
    type:                 ManualClusterDetailsAuthenticationType;
    usernameAndPassword?: UsernameAndPasswordAuthentication;
}

export interface None {
    caCertificateSecretId:       string;
    clientCertificateSecretId:   string;
    clientKeyAlgorithm:          string;
    clientKeyPassphraseSecretId: string;
    clientKeySecretId:           string;
    passwordSecretId:            string;
    serviceAccountTokenSecretId: string;
    usageScope?:                 UsageScopeInput;
    userName:                    string;
}

export interface OIDCToken {
    clientIdSecretId:     string;
    clientSecretSecretId: string;
    identityProviderUrl:  string;
    passwordSecretId:     string;
    scopes:               string;
    userName:             string;
}

export interface ServiceAccountToken {
    serviceAccountTokenSecretId: string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ManualClusterDetailsAuthenticationType {
    ClientKeyAndCertificate = "CLIENT_KEY_AND_CERTIFICATE",
    Custom = "CUSTOM",
    OidcToken = "OIDC_TOKEN",
    ServiceAccountToken = "SERVICE_ACCOUNT_TOKEN",
    UsernameAndPassword = "USERNAME_AND_PASSWORD",
}

export interface UsernameAndPasswordAuthentication {
    passwordSecretId:  string;
    userName?:         string;
    userNameSecretId?: string;
}

export interface PcfCloudProviderInput {
    endpointUrl:       string;
    name:              string;
    passwordSecretId:  string;
    skipValidation?:   boolean;
    userName?:         string;
    userNameSecretId?: string;
}

export interface PhysicalDataCenterCloudProviderInput {
    name:        string;
    usageScope?: UsageScopeInput;
}

export interface SpotInstCloudProviderInput {
    accountId:     string;
    name:          string;
    tokenSecretId: string;
}

export interface CreateCloudProviderPayload {
    clientMutationId?: string;
    cloudProvider?:    any;
}

/**
 * Beta: Create a secret.
 */
export interface CreateSecret {
    arguments?: CreateSecretArguments;
    return?:    CreateSecretPayload;
}

export interface CreateSecretArguments {
    input: CreateSecretInput;
}

export interface CreateSecretInput {
    clientMutationId?: string;
    encryptedText?:    EncryptedTextInput;
    secretType:        SecretType;
    sshCredential?:    SSHCredentialInput;
    winRMCredential?:  WinRMCredentialInput;
}

export interface EncryptedTextInput {
    name:             string;
    scopedToAccount?: boolean;
    secretManagerId?: string;
    secretReference?: string;
    usageScope?:      UsageScopeInput;
    value?:           string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum SecretType {
    EncryptedFile = "ENCRYPTED_FILE",
    EncryptedText = "ENCRYPTED_TEXT",
    SSHCredential = "SSH_CREDENTIAL",
    WinrmCredential = "WINRM_CREDENTIAL",
}

export interface SSHCredentialInput {
    authenticationScheme:    SSHAuthenticationScheme;
    kerberosAuthentication?: KerberosAuthenticationInput;
    name:                    string;
    sshAuthentication?:      SSHAuthenticationInput;
    usageScope?:             UsageScopeInput;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum SSHAuthenticationScheme {
    Kerberos = "KERBEROS",
    SSH = "SSH",
}

export interface KerberosAuthenticationInput {
    port:                 number;
    principal:            string;
    realm:                string;
    tgtGenerationMethod?: TGTGenerationMethod;
}

export interface TGTGenerationMethod {
    kerberosPassword?:  KerberosPassword;
    keyTabFile?:        KeyTabFile;
    tgtGenerationUsing: TGTGenerationUsing;
}

export interface KerberosPassword {
    passwordSecretId: string;
}

export interface KeyTabFile {
    filePath: string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum TGTGenerationUsing {
    KeyTabFile = "KEY_TAB_FILE",
    Password = "PASSWORD",
}

export interface SSHAuthenticationInput {
    port:                    number;
    sshAuthenticationMethod: SSHAuthenticationMethod;
    userName:                string;
}

export interface SSHAuthenticationMethod {
    inlineSSHKey?:     InlineSSHKey;
    serverPassword?:   SSHPassword;
    sshCredentialType: SSHCredentialType;
    sshKeyFile?:       SSHKeyFile;
}

export interface InlineSSHKey {
    passphraseSecretId?: string;
    sshKeySecretFileId:  string;
}

export interface SSHPassword {
    passwordSecretId: string;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum SSHCredentialType {
    Password = "PASSWORD",
    SSHKey = "SSH_KEY",
    SSHKeyFilePath = "SSH_KEY_FILE_PATH",
}

export interface SSHKeyFile {
    passphraseSecretId?: string;
    path:                string;
}

export interface WinRMCredentialInput {
    authenticationScheme?: WinRMAuthenticationScheme;
    domain?:               string;
    name:                  string;
    passwordSecretId:      string;
    port?:                 number;
    skipCertCheck?:        boolean;
    usageScope?:           UsageScopeInput;
    userName:              string;
    useSSL?:               boolean;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum WinRMAuthenticationScheme {
    NTLM = "NTLM",
}

export interface CreateSecretPayload {
    clientMutationId?: string;
    secret?:           any;
}

/**
 * Creates a new Trigger and returns it
 */
export interface CreateTrigger {
    arguments?: CreateTriggerArguments;
    return?:    TriggerPayload;
}

export interface CreateTriggerArguments {
    input: CreateTriggerInput;
}

export interface CreateTriggerInput {
    /**
     * Action performed on trigger execute: Workflow/Pipeline execution
     */
    action: TriggerActionInput;
    /**
     * Application Id In which Trigger will be created
     */
    applicationId:     string;
    clientMutationId?: string;
    /**
     * Condition of which Trigger will execute
     */
    condition: TriggerConditionInput;
    /**
     * Description of the Trigger
     */
    description?: string;
    /**
     * Name of the Trigger
     */
    name: string;
}

/**
 * Action performed on trigger execute: Workflow/Pipeline execution
 */
export interface TriggerActionInput {
    /**
     * Artifact Selections required for the execution
     */
    artifactSelections?: ArtifactSelectionInput[];
    /**
     * Entity identifier of the Workflow or Pipeline
     */
    entityId: string;
    /**
     * Skip deployment on the host, if the same artifact is already deployed
     */
    excludeHostsWithSameArtifact?: boolean;
    /**
     * Execution type: Workflow/Pipeline
     */
    executionType: ExecutionType;
    /**
     * Variable inputs required for the execution
     */
    variables?: VariableInput[];
}

export interface ArtifactSelectionInput {
    /**
     * Artifact Build/Tag to filter artifacts when using LAST_COLLECTED
     */
    artifactFilter?: string;
    /**
     * Artifact Selection type
     */
    artifactSelectionType: ArtifactSelectionType;
    /**
     * Artifact source Id to select artifact from. Required for
     * LAST_COLLECTED,FROM_PAYLOAD_SOURCE
     */
    artifactSourceId?: string;
    /**
     * Pipeline Id to select artifact from, Required when using LAST_DEPLOYED_WORKFLOW
     */
    pipelineId?: string;
    /**
     * If Artifact Build/Tag Filter is regex match or not
     */
    regex?: boolean;
    /**
     * Id of the service providing artifact selection for
     */
    serviceId: string;
    /**
     * Workflow Id to select artifact from, Required when using LAST_DEPLOYED_WORKFLOW
     */
    workflowId?: string;
}

/**
 * Artifact Selection type
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ArtifactSelectionType {
    FromPayloadSource = "FROM_PAYLOAD_SOURCE",
    FromTriggeringArtifact = "FROM_TRIGGERING_ARTIFACT",
    FromTriggeringPipeline = "FROM_TRIGGERING_PIPELINE",
    LastCollected = "LAST_COLLECTED",
    LastDeployedPipeline = "LAST_DEPLOYED_PIPELINE",
    LastDeployedWorkflow = "LAST_DEPLOYED_WORKFLOW",
}

/**
 * Execution type: Workflow/Pipeline
 *
 * Workflow or Pipeline
 *
 * Execution type: workflow/ pipeline
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ExecutionType {
    Pipeline = "PIPELINE",
    Workflow = "WORKFLOW",
}

export interface VariableInput {
    /**
     * name of the variable
     */
    name: string;
    /**
     * value of the variable
     */
    variableValue: VariableValue;
}

/**
 * value of the variable
 */
export interface VariableValue {
    /**
     * type of the value: name or if
     */
    type: VariableValueType;
    /**
     * value
     */
    value: string;
}

/**
 * type of the value: name or if
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum VariableValueType {
    Expression = "EXPRESSION",
    ID = "ID",
    Name = "NAME",
}

/**
 * Condition of which Trigger will execute
 */
export interface TriggerConditionInput {
    /**
     * Should be provided when conditionType is ON_NEW_ARTIFACT.
     */
    artifactConditionInput?: ArtifactConditionInput;
    /**
     * Condition to execute Trigger: ON_NEW_ARTIFACT, ON_PIPELINE_COMPLETION, ON_SCHEDULE,
     * ON_WEBHOOK
     */
    conditionType: ConditionType;
    /**
     * Should be provided when conditionType is ON_PIPELINE_COMPLETION.
     */
    pipelineConditionInput?: PipelineConditionInput;
    /**
     * Should be provided when conditionType is ON_SCHEDULE.
     */
    scheduleConditionInput?: ScheduleConditionInput;
    /**
     * Should be provided when conditionType is ON_WEBHOOK.
     */
    webhookConditionInput?: WebhookConditionInput;
}

/**
 * Should be provided when conditionType is ON_NEW_ARTIFACT.
 */
export interface ArtifactConditionInput {
    /**
     * Build/Tag Filter: Artifacts matching this Filter only will execte the Trigger, Can be
     * Exact match or Regex
     */
    artifactFilter?: string;
    /**
     * Artifact Source Id: A new Artifact in this ArtifactSource matching the Artifact Filter
     * will execute the Trigger.
     */
    artifactSourceId: string;
    /**
     * Regex, True if the Artifact Filter String is provided as regex.
     */
    regex?: boolean;
}

/**
 * Condition to execute Trigger: ON_NEW_ARTIFACT, ON_PIPELINE_COMPLETION, ON_SCHEDULE,
 * ON_WEBHOOK
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ConditionType {
    OnNewArtifact = "ON_NEW_ARTIFACT",
    OnPipelineCompletion = "ON_PIPELINE_COMPLETION",
    OnSchedule = "ON_SCHEDULE",
    OnWebhook = "ON_WEBHOOK",
}

/**
 * Should be provided when conditionType is ON_PIPELINE_COMPLETION.
 */
export interface PipelineConditionInput {
    /**
     * PipelineId: The trigger will be executed on success of this pipeline.
     */
    pipelineId: string;
}

/**
 * Should be provided when conditionType is ON_SCHEDULE.
 */
export interface ScheduleConditionInput {
    /**
     * Cron Expression: The time format must be a cron quartz expression.
     */
    cronExpression:     string;
    onNewArtifactOnly?: boolean;
}

/**
 * Should be provided when conditionType is ON_WEBHOOK.
 */
export interface WebhookConditionInput {
    /**
     * Bitbucket  event, Required if webhookSourceType = BITBUCKET
     */
    bitbucketEvent?: BitbucketEvent;
    /**
     * Branch in which the filePaths exist.
     */
    branchName?: string;
    /**
     * Branch filter, can be used if using PullRequest or Push events.
     */
    branchRegex?: string;
    /**
     * Only for Native Helm and Helm-based Kubernetes deployments. Event type should be PUSH.
     */
    deployOnlyIfFilesChanged?: boolean;
    /**
     * The file names/paths when changed and Pushed, will execute this Trigger.
     */
    filePaths?: string[];
    /**
     * Source Repo Provider setup in Harness
     */
    gitConnectorId?: string;
    /**
     * Github event, Required if webhookSourceType = GITHUB
     */
    githubEvent?: GitHubEvent;
    /**
     * Gitlab  event, Required if webhookSourceType = GITLAB
     */
    gitlabEvent?: GitlabEvent;
    /**
     * Source of the webhook: GITHUB/GITLAB/BITBUCKET/CUSTOM(curl based)
     */
    webhookSourceType: WebhookSource;
}

/**
 * Bitbucket  event, Required if webhookSourceType = BITBUCKET
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum BitbucketEvent {
    Any = "ANY",
    BuildStatusCreated = "BUILD_STATUS_CREATED",
    BuildStatusUpdated = "BUILD_STATUS_UPDATED",
    CommitCommentCreated = "COMMIT_COMMENT_CREATED",
    DiagnosticsPing = "DIAGNOSTICS_PING",
    Fork = "FORK",
    IssueAny = "ISSUE_ANY",
    IssueCommentCreated = "ISSUE_COMMENT_CREATED",
    IssueCreated = "ISSUE_CREATED",
    IssueUpdated = "ISSUE_UPDATED",
    PullRequestAny = "PULL_REQUEST_ANY",
    PullRequestApprovalRemoved = "PULL_REQUEST_APPROVAL_REMOVED",
    PullRequestApproved = "PULL_REQUEST_APPROVED",
    PullRequestCommentCreated = "PULL_REQUEST_COMMENT_CREATED",
    PullRequestCommentDeleted = "PULL_REQUEST_COMMENT_DELETED",
    PullRequestCommentUpdated = "PULL_REQUEST_COMMENT_UPDATED",
    PullRequestCreated = "PULL_REQUEST_CREATED",
    PullRequestDeclined = "PULL_REQUEST_DECLINED",
    PullRequestMerged = "PULL_REQUEST_MERGED",
    PullRequestUpdated = "PULL_REQUEST_UPDATED",
    Push = "PUSH",
    RefsChanged = "REFS_CHANGED",
    Updated = "UPDATED",
}

/**
 * Github event, Required if webhookSourceType = GITHUB
 */
export interface GitHubEvent {
    /**
     * Github Action for the event type.
     */
    action?: GitHubAction;
    /**
     * Github event type like PUSH, PULL_REQUEST, etc
     */
    event?: GitHubEventType;
}

/**
 * Github Action for the event type.
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum GitHubAction {
    Assigned = "ASSIGNED",
    Closed = "CLOSED",
    Created = "CREATED",
    Deleted = "DELETED",
    Edited = "EDITED",
    Labeled = "LABELED",
    Opened = "OPENED",
    PackagePublished = "PACKAGE_PUBLISHED",
    PreReleased = "PRE_RELEASED",
    Published = "PUBLISHED",
    Released = "RELEASED",
    Reopened = "REOPENED",
    ReviewRequested = "REVIEW_REQUESTED",
    ReviewRequestedRemoved = "REVIEW_REQUESTED_REMOVED",
    Synchronized = "SYNCHRONIZED",
    Unassigned = "UNASSIGNED",
    Unlabeled = "UNLABELED",
    Unpublished = "UNPUBLISHED",
}

/**
 * Github event type like PUSH, PULL_REQUEST, etc
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum GitHubEventType {
    Any = "ANY",
    Delete = "DELETE",
    Package = "PACKAGE",
    PullRequest = "PULL_REQUEST",
    Push = "PUSH",
    Release = "RELEASE",
}

/**
 * Gitlab  event, Required if webhookSourceType = GITLAB
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum GitlabEvent {
    Any = "ANY",
    PullRequest = "PULL_REQUEST",
    Push = "PUSH",
}

/**
 * Source of the webhook: GITHUB/GITLAB/BITBUCKET/CUSTOM(curl based)
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum WebhookSource {
    Bitbucket = "BITBUCKET",
    Custom = "CUSTOM",
    Github = "GITHUB",
    Gitlab = "GITLAB",
}

export interface TriggerPayload {
    clientMutationId?: string;
    trigger?:          Trigger;
}

export interface Trigger {
    /**
     * Action performed by the trigger: Execute workflow/pipeline
     */
    action?: any;
    /**
     * The condition that will execute the Trigger: On new artifact, On pipeline completion, On
     * Cron schedule, On webhook
     */
    condition?: any;
    createdAt?: { [key: string]: any };
    createdBy?: User;
    /**
     * Description of the Trigger
     */
    description?:                  string;
    excludeHostsWithSameArtifact?: boolean;
    /**
     * Trigger ID
     */
    id?: string;
    /**
     * Name of the trigger
     */
    name?: string;
}

export interface CreateUser {
    arguments?: CreateUserArguments;
    return?:    CreateUserPayload;
}

export interface CreateUserArguments {
    input: CreateUserInput;
}

export interface CreateUserInput {
    clientMutationId?: string;
    email:             string;
    name:              string;
    userGroupIds?:     string[];
}

export interface CreateUserPayload {
    clientMutationId?: string;
    user?:             User;
}

export interface CreateUserGroup {
    arguments?: CreateUserGroupArguments;
    return?:    CreateUserGroupPayload;
}

export interface CreateUserGroupArguments {
    input: CreateUserGroupInput;
}

export interface CreateUserGroupInput {
    clientMutationId?:     string;
    description?:          string;
    name:                  string;
    notificationSettings?: NotificationSettingsInput;
    permissions?:          Permissions;
    ssoSetting?:           SSOSettingInput;
    userIds?:              string[];
}

export interface NotificationSettingsInput {
    groupEmailAddresses?:       string[];
    microsoftTeamsWebhookUrl?:  string;
    pagerDutyIntegrationKey?:   string;
    sendMailToNewMembers?:      boolean;
    sendNotificationToMembers?: boolean;
    slackNotificationSetting?:  SlackNotificationSettingInput;
}

export interface SlackNotificationSettingInput {
    slackChannelName?: string;
    slackWebhookURL?:  string;
}

export interface Permissions {
    accountPermissions?: AccountPermissionInput;
    appPermissions?:     ApplicationPermissionInput[];
}

export interface AccountPermissionInput {
    accountPermissionTypes?: AccountPermissionType[];
}

export interface SSOSettingInput {
    ldapSettings?: LDAPSettingsInput;
    samlSettings?: SAMLSettingsInput;
}

export interface LDAPSettingsInput {
    groupDN:       string;
    groupName:     string;
    ssoProviderId: string;
}

export interface SAMLSettingsInput {
    groupName:     string;
    ssoProviderId: string;
}

export interface CreateUserGroupPayload {
    clientMutationId?: string;
    userGroup?:        UserGroup;
}

/**
 * Deletes an application.
 */
export interface DeleteApplication {
    arguments?: DeleteApplicationArguments;
    return?:    DeleteApplicationPayload;
}

export interface DeleteApplicationArguments {
    input: DeleteApplicationInput;
}

export interface DeleteApplicationInput {
    applicationId:     string;
    clientMutationId?: string;
}

export interface DeleteApplicationPayload {
    clientMutationId?: string;
}

/**
 * Beta
 */
export interface DeleteCloudProvider {
    arguments?: DeleteCloudProviderArguments;
    return?:    DeleteCloudProviderPayload;
}

export interface DeleteCloudProviderArguments {
    input: DeleteCloudProviderInput;
}

export interface DeleteCloudProviderInput {
    clientMutationId?: string;
    cloudProviderId:   string;
}

export interface DeleteCloudProviderPayload {
    clientMutationId?: string;
}

/**
 * Beta: Delete a secret.
 */
export interface DeleteSecret {
    arguments?: DeleteSecretArguments;
    return?:    DeleteSecretPayload;
}

export interface DeleteSecretArguments {
    input: DeleteSecretInput;
}

export interface DeleteSecretInput {
    clientMutationId?: string;
    secretId:          string;
    secretType:        SecretType;
}

export interface DeleteSecretPayload {
    clientMutationId?: string;
}

/**
 * Deletes a Trigger.
 */
export interface DeleteTrigger {
    arguments?: DeleteTriggerArguments;
    return?:    DeleteTriggerPayload;
}

export interface DeleteTriggerArguments {
    input: DeleteTriggerInput;
}

export interface DeleteTriggerInput {
    /**
     * Application Id
     */
    applicationId:     string;
    clientMutationId?: string;
    /**
     * Id of Trigger to be deleted
     */
    triggerId: string;
}

export interface DeleteTriggerPayload {
    clientMutationId?: string;
}

export interface DeleteUser {
    arguments?: DeleteUserArguments;
    return?:    DeleteUserPayload;
}

export interface DeleteUserArguments {
    input: DeleteUserInput;
}

export interface DeleteUserInput {
    clientMutationId?: string;
    id:                string;
}

export interface DeleteUserPayload {
    clientMutationId?: string;
}

export interface DeleteUserGroup {
    arguments?: DeleteUserGroupArguments;
    return?:    DeleteUserGroupPayload;
}

export interface DeleteUserGroupArguments {
    input: DeleteUserGroupInput;
}

export interface DeleteUserGroupInput {
    clientMutationId?: string;
    userGroupId:       string;
}

export interface DeleteUserGroupPayload {
    clientMutationId?: string;
}

/**
 * Beta: Start an export of executions/deployments.
 */
export interface ExportExecutions {
    arguments?: ExportExecutionsArguments;
    return?:    ExportExecutionsPayload;
}

export interface ExportExecutionsArguments {
    input: ExportExecutionsInput;
}

export interface ExportExecutionsInput {
    clientMutationId?: string;
    /**
     * Execution filters
     */
    filters?: ExecutionFilter[];
    /**
     * Notify only the triggering user
     */
    notifyOnlyTriggeringUser?: boolean;
    /**
     * User group ids
     */
    userGroupIds?: string[];
}

export interface ExecutionFilter {
    application?:         IDFilter;
    cloudProvider?:       IDFilter;
    creationTime?:        TimeFilter;
    duration?:            NumberFilter;
    endTime?:             TimeFilter;
    environment?:         IDFilter;
    execution?:           IDFilter;
    pipeline?:            IDFilter;
    pipelineExecutionId?: IDFilter;
    service?:             IDFilter;
    startTime?:           TimeFilter;
    status?:              IDFilter;
    tag?:                 DeploymentTagFilter;
    trigger?:             IDFilter;
    triggeredBy?:         IDFilter;
    workflow?:            IDFilter;
}

export interface IDFilter {
    operator: IDOperator;
    values?:  string[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum IDOperator {
    Equals = "EQUALS",
    In = "IN",
    Like = "LIKE",
    NotIn = "NOT_IN",
    NotNull = "NOT_NULL",
}

export interface TimeFilter {
    operator: TimeOperator;
    value:    { [key: string]: any };
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum TimeOperator {
    After = "AFTER",
    Before = "BEFORE",
    Equals = "EQUALS",
}

export interface NumberFilter {
    operator: NumericOperator;
    values?:  { [key: string]: any }[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum NumericOperator {
    Equals = "EQUALS",
    GreaterThan = "GREATER_THAN",
    GreaterThanOrEquals = "GREATER_THAN_OR_EQUALS",
    In = "IN",
    LessThan = "LESS_THAN",
    LessThanOrEquals = "LESS_THAN_OR_EQUALS",
    NotEquals = "NOT_EQUALS",
}

export interface DeploymentTagFilter {
    entityType?: DeploymentTagType;
    tags?:       TagInput[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum DeploymentTagType {
    Application = "APPLICATION",
    Deployment = "DEPLOYMENT",
    Environment = "ENVIRONMENT",
    Service = "SERVICE",
}

export interface TagInput {
    name?:  string;
    value?: string;
}

export interface ExportExecutionsPayload {
    clientMutationId?: string;
    downloadLink?:     string;
    errorMessage?:     string;
    expiresAt?:        { [key: string]: any };
    requestId?:        string;
    status?:           ExportExecutionsStatus;
    statusLink?:       string;
    totalExecutions?:  { [key: string]: any };
    triggeredAt?:      { [key: string]: any };
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ExportExecutionsStatus {
    Expired = "EXPIRED",
    Failed = "FAILED",
    Queued = "QUEUED",
    Ready = "READY",
}

/**
 * Removes Git Sync Configuration associated with an application. Returns updated
 * application.
 */
export interface RemoveApplicationGitSyncConfig {
    arguments?: RemoveApplicationGitSyncConfigArguments;
    return?:    RemoveApplicationGitSyncConfigPayload;
}

export interface RemoveApplicationGitSyncConfigArguments {
    input: RemoveApplicationGitSyncConfigInput;
}

export interface RemoveApplicationGitSyncConfigInput {
    applicationId:     string;
    clientMutationId?: string;
}

export interface RemoveApplicationGitSyncConfigPayload {
    application?:      Application;
    clientMutationId?: string;
}

export interface RemoveUserFromUserGroup {
    arguments?: RemoveUserFromUserGroupArguments;
    return?:    RemoveUserFromUserGroupPayload;
}

export interface RemoveUserFromUserGroupArguments {
    input: RemoveUserFromUserGroupInput;
}

export interface RemoveUserFromUserGroupInput {
    clientMutationId?: string;
    userGroupId:       string;
    userId:            string;
}

export interface RemoveUserFromUserGroupPayload {
    clientMutationId?: string;
    userGroup?:        UserGroup;
}

/**
 * Beta: Trigger a Workflow/Pipeline Execution.
 */
export interface StartExecution {
    arguments?: StartExecutionArguments;
    return?:    StartExecutionPayload;
}

export interface StartExecutionArguments {
    input: StartExecutionInput;
}

export interface StartExecutionInput {
    /**
     * Application identifier of a Workflow or Pipeline
     */
    applicationId:     string;
    clientMutationId?: string;
    /**
     * Entity identifier of a Workflow or Pipeline
     */
    entityId: string;
    /**
     * Skip deployment on the host, if the same artifact is already deployed
     */
    excludeHostsWithSameArtifact?: boolean;
    /**
     * Workflow or Pipeline
     */
    executionType: ExecutionType;
    /**
     * Execution notes
     */
    notes?: string;
    /**
     * Service inputs required for the execution
     */
    serviceInputs?: ServiceInput[];
    /**
     * List of hostnames, if targeted to a specific host
     */
    specificHosts?: string[];
    /**
     * Set to true if the deployment target is specific hosts. Provide specificHosts field along
     * with this.
     */
    targetToSpecificHosts?: boolean;
    /**
     * Variable inputs required for the executio
     */
    variableInputs?: VariableInput[];
}

export interface ServiceInput {
    /**
     * artifact inputs fot the service
     */
    artifactValueInput?: ArtfifactValueInput;
    /**
     * name of the service providing input for
     */
    name: string;
}

/**
 * artifact inputs fot the service
 */
export interface ArtfifactValueInput {
    /**
     * artifact Id input if value type is ARTIFACT_ID
     */
    artifactId?: ArtifactIDInput;
    /**
     * Build number input if value type is BUILD_NUMBER
     */
    buildNumber?: BuildNumberInput;
    /**
     * type of the artifactValue: Build number or artifactId
     */
    valueType: ArtifactInputType;
}

/**
 * artifact Id input if value type is ARTIFACT_ID
 */
export interface ArtifactIDInput {
    /**
     * artifactId
     */
    artifactId: string;
}

/**
 * Build number input if value type is BUILD_NUMBER
 */
export interface BuildNumberInput {
    /**
     * name of the artifact source to which the specified build number comes from
     */
    artifactSourceName: string;
    /**
     * build number to deploy
     */
    buildNumber: string;
}

/**
 * type of the artifactValue: Build number or artifactId
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ArtifactInputType {
    ArtifactID = "ARTIFACT_ID",
    BuildNumber = "BUILD_NUMBER",
}

export interface StartExecutionPayload {
    clientMutationId?: string;
    execution?:        any;
    /**
     * Get This field to know if there are any Warnings/Messages but the execution can be
     * started successfully. For Example in case of user providing extra inputs.
     */
    warningMessage?: string;
}

/**
 * Updates an application and returns it.
 */
export interface UpdateApplication {
    arguments?: UpdateApplicationArguments;
    return?:    UpdateApplicationPayload;
}

export interface UpdateApplicationArguments {
    input: UpdateApplicationInput;
}

export interface UpdateApplicationInput {
    applicationId:     string;
    clientMutationId?: string;
    description?:      string;
    name?:             string;
}

export interface UpdateApplicationPayload {
    application?:      Application;
    clientMutationId?: string;
}

/**
 * Updates  Application Git Sync Configuration. Creates the configuration, in case it does
 * not exist. Returns updated git sync configuration.
 */
export interface UpdateApplicationGitSyncConfig {
    arguments?: UpdateApplicationGitSyncConfigArguments;
    return?:    UpdateApplicationGitSyncConfigPayload;
}

export interface UpdateApplicationGitSyncConfigArguments {
    input: UpdateApplicationGitSyncConfigInput;
}

export interface UpdateApplicationGitSyncConfigInput {
    applicationId:     string;
    branch:            string;
    clientMutationId?: string;
    gitConnectorId:    string;
    syncEnabled:       boolean;
}

export interface UpdateApplicationGitSyncConfigPayload {
    clientMutationId?: string;
    gitSyncConfig?:    GitSyncConfig;
}

/**
 * Enable/disable Git Sync for an application. Returns updated application.
 */
export interface UpdateApplicationGitSyncConfigStatus {
    arguments?: UpdateApplicationGitSyncConfigStatusArguments;
    return?:    UpdateApplicationGitSyncConfigStatusPayload;
}

export interface UpdateApplicationGitSyncConfigStatusArguments {
    input: UpdateApplicationGitSyncConfigStatusInput;
}

export interface UpdateApplicationGitSyncConfigStatusInput {
    applicationId:     string;
    clientMutationId?: string;
    syncEnabled:       boolean;
}

export interface UpdateApplicationGitSyncConfigStatusPayload {
    clientMutationId?: string;
    gitSyncConfig?:    GitSyncConfig;
}

/**
 * Beta
 */
export interface UpdateCloudProvider {
    arguments?: UpdateCloudProviderArguments;
    return?:    UpdateCloudProviderPayload;
}

export interface UpdateCloudProviderArguments {
    input: UpdateCloudProviderInput;
}

export interface UpdateCloudProviderInput {
    awsCloudProvider?:                UpdateAwsCloudProviderInput;
    azureCloudProvider?:              UpdateAzureCloudProviderInput;
    clientMutationId?:                string;
    cloudProviderId:                  string;
    cloudProviderType:                CloudProviderType;
    gcpCloudProvider?:                UpdateGcpCloudProviderInput;
    k8sCloudProvider?:                UpdateK8SCloudProviderInput;
    pcfCloudProvider?:                UpdatePcfCloudProviderInput;
    physicalDataCenterCloudProvider?: UpdatePhysicalDataCenterCloudProviderInput;
    spotInstCloudProvider?:           UpdateSpotInstCloudProviderInput;
}

export interface UpdateAwsCloudProviderInput {
    credentialsType?:        AwsCredentialsType;
    crossAccountAttributes?: UpdateAwsCrossAccountAttributes;
    ec2IamCredentials?:      UpdateEc2IamCredentials;
    manualCredentials?:      UpdateAwsManualCredentials;
    name?:                   string;
}

export interface UpdateAwsCrossAccountAttributes {
    assumeCrossAccountRole?: boolean;
    crossAccountRoleArn?:    string;
    externalId?:             string;
}

export interface UpdateEc2IamCredentials {
    delegateSelector?: string;
    usageScope?:       UsageScopeInput;
}

export interface UpdateAwsManualCredentials {
    accessKey?:         string;
    secretKeySecretId?: string;
}

export interface UpdateAzureCloudProviderInput {
    clientId?:    string;
    keySecretId?: string;
    name?:        string;
    tenantId?:    string;
}

export interface UpdateGcpCloudProviderInput {
    name?:                      string;
    serviceAccountKeySecretId?: string;
}

export interface UpdateK8SCloudProviderInput {
    clusterDetailsType?:    ClusterDetailsType;
    inheritClusterDetails?: UpdateInheritClusterDetails;
    manualClusterDetails?:  UpdateManualClusterDetails;
    name?:                  string;
    skipValidation?:        boolean;
}

export interface UpdateInheritClusterDetails {
    delegateName?: string;
    usageScope?:   UsageScopeInput;
}

export interface UpdateManualClusterDetails {
    masterUrl?:           string;
    none?:                UpdateNone;
    oidcToken?:           UpdateOIDCToken;
    serviceAccountToken?: UpdateServiceAccountToken;
    type?:                ManualClusterDetailsAuthenticationType;
    usernameAndPassword?: UpdateUsernameAndPasswordAuthentication;
}

export interface UpdateNone {
    caCertificateSecretId?:       string;
    clientCertificateSecretId?:   string;
    clientKeyAlgorithm?:          string;
    clientKeyPassphraseSecretId?: string;
    clientKeySecretId?:           string;
    passwordSecretId?:            string;
    serviceAccountTokenSecretId?: string;
    usageScope?:                  UsageScopeInput;
    userName?:                    string;
}

export interface UpdateOIDCToken {
    clientIdSecretId?:     string;
    clientSecretSecretId?: string;
    identityProviderUrl?:  string;
    passwordSecretId?:     string;
    scopes?:               string;
    userName?:             string;
}

export interface UpdateServiceAccountToken {
    serviceAccountTokenSecretId?: string;
}

export interface UpdateUsernameAndPasswordAuthentication {
    passwordSecretId?: string;
    userName?:         string;
    userNameSecretId?: string;
}

export interface UpdatePcfCloudProviderInput {
    endpointUrl?:      string;
    name?:             string;
    passwordSecretId?: string;
    skipValidation?:   boolean;
    userName?:         string;
    userNameSecretId?: string;
}

export interface UpdatePhysicalDataCenterCloudProviderInput {
    name?:       string;
    usageScope?: UsageScopeInput;
}

export interface UpdateSpotInstCloudProviderInput {
    accountId?:     string;
    name?:          string;
    tokenSecretId?: string;
}

export interface UpdateCloudProviderPayload {
    clientMutationId?: string;
    cloudProvider?:    any;
}

/**
 * Beta: Update a secret.
 */
export interface UpdateSecret {
    arguments?: UpdateSecretArguments;
    return?:    UpdateSecretPayload;
}

export interface UpdateSecretArguments {
    input: UpdateSecretInput;
}

export interface UpdateSecretInput {
    clientMutationId?: string;
    encryptedText?:    UpdateEncryptedText;
    secretId:          string;
    secretType:        SecretType;
    sshCredential?:    UpdateSSHCredential;
    winRMCredential?:  UpdateWinRMCredential;
}

export interface UpdateEncryptedText {
    name?:            string;
    scopedToAccount?: boolean;
    secretReference?: string;
    usageScope?:      UsageScopeInput;
    value?:           string;
}

export interface UpdateSSHCredential {
    authenticationScheme?:   SSHAuthenticationScheme;
    kerberosAuthentication?: KerberosAuthenticationInput;
    name?:                   string;
    sshAuthentication?:      SSHAuthenticationInput;
    usageScope?:             UsageScopeInput;
}

export interface UpdateWinRMCredential {
    authenticationScheme?: WinRMAuthenticationScheme;
    domain?:               string;
    name?:                 string;
    passwordSecretId?:     string;
    port?:                 number;
    skipCertCheck?:        boolean;
    usageScope?:           UsageScopeInput;
    userName?:             string;
    useSSL?:               boolean;
}

export interface UpdateSecretPayload {
    clientMutationId?: string;
    secret?:           any;
}

/**
 * Updates a Trigger and returns it.
 */
export interface UpdateTrigger {
    arguments?: UpdateTriggerArguments;
    return?:    UpdateTriggerPayload;
}

export interface UpdateTriggerArguments {
    input: UpdateTriggerInput;
}

export interface UpdateTriggerInput {
    /**
     * Action performed on trigger execute: Workflow/Pipeline execution
     */
    action: TriggerActionInput;
    /**
     * Application Id
     */
    applicationId:     string;
    clientMutationId?: string;
    /**
     * Condition of which Trigger will execute
     */
    condition: TriggerConditionInput;
    /**
     * Description of the Trigger
     */
    description?: string;
    /**
     * Name of the Trigger
     */
    name: string;
    /**
     * Id of Trigger to be updated
     */
    triggerId: string;
}

export interface UpdateTriggerPayload {
    clientMutationId?: string;
    trigger?:          Trigger;
}

export interface UpdateUser {
    arguments?: UpdateUserArguments;
    return?:    UpdateUserPayload;
}

export interface UpdateUserArguments {
    input: UpdateUserInput;
}

export interface UpdateUserInput {
    clientMutationId?: string;
    id:                string;
    name?:             string;
    userGroupIds?:     string[];
}

export interface UpdateUserPayload {
    clientMutationId?: string;
    user?:             User;
}

export interface UpdateUserGroup {
    arguments?: UpdateUserGroupArguments;
    return?:    UpdateUserGroupPayload;
}

export interface UpdateUserGroupArguments {
    input: UpdateUserGroupInput;
}

export interface UpdateUserGroupInput {
    clientMutationId?:     string;
    description?:          string;
    name?:                 string;
    notificationSettings?: NotificationSettingsInput;
    permissions?:          Permissions;
    ssoSetting?:           SSOSettingInput;
    userGroupId:           string;
    userIds?:              string[];
}

export interface UpdateUserGroupPayload {
    clientMutationId?: string;
    userGroup?:        UserGroup;
}

export interface UpdateUserGroupPermissions {
    arguments?: UpdateUserGroupPermissionsArguments;
    return?:    UpdateUserGroupPermissionsPayload;
}

export interface UpdateUserGroupPermissionsArguments {
    input?: UpdateUserGroupPermissionsInput;
}

export interface UpdateUserGroupPermissionsInput {
    clientMutationId?: string;
    permissions:       Permissions;
    userGroupId:       string;
}

export interface UpdateUserGroupPermissionsPayload {
    clientMutationId?: string;
    permissions?:      UserGroupPermissions;
}

export interface Query {
    /**
     * Get details about a Harness Application
     */
    application?: QueryApplication;
    /**
     * Fetch details about a Harness Application by it's name
     */
    applicationByName?: ApplicationByName;
    /**
     * Get details about Harness Applications.
     */
    applications?: Applications;
    /**
     * Get details about an artifact.
     */
    artifact?: Artifact;
    /**
     * Get details about one or multiple Artifacts.
     */
    artifacts?: Artifacts;
    /**
     * Get difference in terms of YAML for a changeSet
     * (and a specific resource within the changeSet).This returns paginated data.
     */
    auditChangeContent?: AuditChangeContent;
    /**
     * Get a list of changeSets.This returns paginated data.
     */
    audits?: Audits;
    /**
     * Beta: Continuous Efficiency export data apis
     */
    ceClusterBillingData?: CeClusterBillingDataObject;
    /**
     * Get details about a Cloud Provider.
     */
    cloudProvider?: CloudProvider;
    /**
     * Beta
     */
    cloudProviderByName?: CloudProviderByName;
    /**
     * Get details about Cloud Providers.
     */
    cloudProviders?: CloudProviders;
    /**
     * Get details about a Connector.
     */
    connector?: Connector;
    /**
     * Get details about Connectors.
     */
    connectors?: Connectors;
    /**
     * Get statistics about one or multiple deployments.
     */
    deploymentStats?: DeploymentStats;
    /**
     * Get details about a Harness Environment.
     */
    environment?: EnvironmentObject;
    /**
     * Get details about one or multiple Harness Environments.
     */
    environments?: Environments;
    /**
     * Get the execution status of a Workflow.
     */
    execution?: Execution;
    /**
     * Beta: Get required inputs to start an execution of a Workflow or Pipeline
     */
    executionInputs?: ExecutionInputs;
    /**
     * Get a list of executions, with filtering options.
     */
    executions?: Executions;
    /**
     * Get details about instances.
     */
    instances?: Instances;
    /**
     * Get details about K8s labels.
     */
    k8sLabels?: K8SLabels;
    /**
     * Get a Pipeline object by ID.
     */
    pipeline?: PipelineObject;
    /**
     * Get a Pipeline object by ID.
     */
    pipelineByName?: PipelineByName;
    /**
     * Get details about one or multiple Pipelines.
     */
    pipelines?: Pipelines;
    /**
     * Beta: Get details about secret.
     */
    secret?: Secret;
    /**
     * Beta: Get details about secret by name.
     */
    secretByName?: SecretByName;
    /**
     * Beta: Get details about a Secret Manager.
     */
    secretManager?: SecretManager;
    /**
     * Beta: Get Secret Manager by name.
     */
    secretManagerByName?: SecretManagerByName;
    /**
     * Beta: List Secret Manager.
     */
    secretManagers?: SecretManagers;
    /**
     * Get details about a Harness Service.
     */
    service?: ServiceObject;
    /**
     * Get a list of Harness Services, by applicationId. This returns paginated data.
     */
    services?:     Services;
    ssoProvider?:  SsoProvider;
    ssoProviders?: SsoProviders;
    /**
     * Get details about a Trigger.
     */
    trigger?: QueryTrigger;
    /**
     * Get details about a Trigger  by it's name
     */
    triggerByName?: TriggerByName;
    /**
     * Get a list of Harness Triggers, This returns paginated data.
     */
    triggers?: Triggers;
    /**
     * fetch a user by id
     */
    user?: QueryUser;
    /**
     * fetch a user by name
     */
    userByName?:      UserByName;
    userGroup?:       QueryUserGroup;
    userGroupByName?: UserGroupByName;
    userGroups?:      UserGroups;
    /**
     * fetch a list of users
     */
    users?: Users;
    /**
     * Get a Workflow object by ID.
     */
    workflow?: WorkflowObject;
    /**
     * Fetch details about a  Workflow by it's name
     */
    workflowByName?: WorkflowByName;
    /**
     * Get a list of Workflows, by applicationId. This returns paginated data.
     */
    workflows?: Workflows;
}

/**
 * Get details about a Harness Application
 */
export interface QueryApplication {
    arguments?: ApplicationArguments;
    return?:    Application;
}

export interface ApplicationArguments {
    applicationId: string;
}

/**
 * Fetch details about a Harness Application by it's name
 */
export interface ApplicationByName {
    arguments?: ApplicationByNameArguments;
    return?:    Application;
}

export interface ApplicationByNameArguments {
    name: string;
}

/**
 * Get details about Harness Applications.
 */
export interface Applications {
    arguments?: ApplicationsArguments;
    return?:    ApplicationConnection;
}

export interface ApplicationsArguments {
    filters?: ApplicationFilter[];
    limit:    number;
    offset?:  number;
}

export interface ApplicationFilter {
    application?: IDFilter;
    tag?:         ApplicationTagFilter;
}

export interface ApplicationTagFilter {
    entityType?: TagType;
    tags?:       TagInput[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum TagType {
    Application = "APPLICATION",
}

export interface ApplicationConnection {
    nodes?:    Application[];
    pageInfo?: PageInfo;
}

/**
 * Get details about an artifact.
 */
export interface Artifact {
    arguments?: ArtifactArguments;
    return?:    ReturnElement;
}

export interface ArtifactArguments {
    artifactId: string;
}

export interface ReturnElement {
    artifactSource?: any;
    /**
     * Build No
     */
    buildNo?: string;
    /**
     * Collected At
     */
    collectedAt?: { [key: string]: any };
    /**
     * Artifact ID
     */
    id?: string;
}

/**
 * Get details about one or multiple Artifacts.
 */
export interface Artifacts {
    arguments?: ArtifactsArguments;
    return?:    ArtifactConnection;
}

export interface ArtifactsArguments {
    filters?: ArtifactFilter[];
    limit:    number;
    offset?:  number;
}

export interface ArtifactFilter {
    artifact?:           IDFilter;
    artifactSource?:     IDFilter;
    artifactStreamType?: IDFilter;
}

export interface ArtifactConnection {
    nodes?:    ReturnElement[];
    pageInfo?: PageInfo;
}

/**
 * Get difference in terms of YAML for a changeSet
 * (and a specific resource within the changeSet).This returns paginated data.
 */
export interface AuditChangeContent {
    arguments?: AuditChangeContentArguments;
    return?:    ChangeContentConnection;
}

export interface AuditChangeContentArguments {
    filters?: ChangeContentFilter[];
    limit:    number;
    offset?:  number;
}

export interface ChangeContentFilter {
    /**
     * Unique ID of a changeSet
     */
    changeSetId: string;
    /**
     * Unique ID of dependent or child resource, e.g.Environment, Services, etc.
     */
    resourceId?: string;
}

export interface ChangeContentConnection {
    nodes?:    ChangeContent[];
    pageInfo?: PageInfo;
}

export interface ChangeContent {
    /**
     * Unique ID of a changeSet
     */
    changeSetId?: string;
    /**
     * New YAML content after the changeSet got triggered
     */
    newYaml?: string;
    /**
     * New YAML path after the changeSet got triggered
     */
    newYamlPath?: string;
    /**
     * Old YAML content before the changeSet got triggered
     */
    oldYaml?: string;
    /**
     * Old YAML path before the changeSet got triggered
     */
    oldYamlPath?: string;
    /**
     * Unique ID of a resource, e.g.Application, Environment
     */
    resourceId?: string;
}

/**
 * Get a list of changeSets.This returns paginated data.
 */
export interface Audits {
    arguments?: AuditsArguments;
    return?:    ChangeSetConnection;
}

export interface AuditsArguments {
    filters?: ChangeSetFilter[];
    limit:    number;
    offset?:  number;
}

export interface ChangeSetFilter {
    time?: TimeRangeFilter;
}

/**
 * Filter by time
 */
export interface TimeRangeFilter {
    /**
     * Filter for a relative time period
     */
    relative?: RelativeTimeRange;
    /**
     * Filter within a specific time range
     */
    specific?: TimeRange;
}

/**
 * Filter for a relative time period
 */
export interface RelativeTimeRange {
    noOfUnits: { [key: string]: any };
    timeUnit:  TimeUnit;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum TimeUnit {
    Days = "DAYS",
    Hours = "HOURS",
    Minutes = "MINUTES",
    Weeks = "WEEKS",
}

/**
 * Filter within a specific time range
 */
export interface TimeRange {
    from: { [key: string]: any };
    to?:  { [key: string]: any };
}

export interface ChangeSetConnection {
    nodes?:    any[];
    pageInfo?: PageInfo;
}

/**
 * Beta: Continuous Efficiency export data apis
 */
export interface CeClusterBillingDataObject {
    arguments?: CeClusterBillingDataArguments;
    return?:    ReturnObject;
}

export interface CeClusterBillingDataArguments {
    aggregateFunction?: CeAggregation[];
    filters?:           CeFilter[];
    groupBy?:           CeGroupBy[];
    limit?:             number;
    offset?:            number;
    sortCriteria?:      CeSort[];
}

export interface CeAggregation {
    cost?:     CeCost;
    function?: Tion;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum CeCost {
    Idlecost = "IDLECOST",
    Totalcost = "TOTALCOST",
    Unallocatedcost = "UNALLOCATEDCOST",
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum Tion {
    Sum = "SUM",
}

export interface CeFilter {
    application?:  IDFilter;
    cluster?:      IDFilter;
    ecsService?:   IDFilter;
    endTime?:      TimeFilter;
    environment?:  IDFilter;
    instanceType?: IDFilter;
    label?:        CeLabelFilter;
    launchType?:   IDFilter;
    namespace?:    IDFilter;
    node?:         IDFilter;
    pod?:          IDFilter;
    service?:      IDFilter;
    startTime?:    TimeFilter;
    tag?:          CeTagFilter;
    task?:         IDFilter;
    workload?:     IDFilter;
}

export interface CeLabelFilter {
    labels?: K8SLabelInput[];
}

export interface K8SLabelInput {
    name?:   string;
    values?: string[];
}

export interface CeTagFilter {
    entityType?: CeTagType;
    tags?:       TagInput[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum CeTagType {
    Application = "APPLICATION",
    Environment = "ENVIRONMENT",
    Service = "SERVICE",
}

export interface CeGroupBy {
    entity?:           CeEntityGroupBy;
    labelAggregation?: CeLabelAggregation;
    tagAggregation?:   CeTagAggregation;
    time?:             CeTimeAggregation;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum CeEntityGroupBy {
    Application = "Application",
    Cluster = "Cluster",
    EcsService = "EcsService",
    Environment = "Environment",
    LaunchType = "LaunchType",
    Namespace = "Namespace",
    Node = "Node",
    Pod = "Pod",
    Region = "Region",
    Service = "Service",
    Task = "Task",
    Workload = "Workload",
}

export interface CeLabelAggregation {
    name?: string;
}

export interface CeTagAggregation {
    entityType?: CeTagType;
    tagName?:    string;
}

export interface CeTimeAggregation {
    timePeriod?: TimeGroupType;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum TimeGroupType {
    Day = "DAY",
    Hour = "HOUR",
    Month = "MONTH",
    Week = "WEEK",
}

export interface CeSort {
    order?:    SortOrder;
    sortType?: CeSortType;
}

/**
 * This data structure will be useful for bar charts which are aggregated over a period of
 * time
 *
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum SortOrder {
    Ascending = "ASCENDING",
    Descending = "DESCENDING",
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum CeSortType {
    Idlecost = "IDLECOST",
    Time = "TIME",
    Totalcost = "TOTALCOST",
    Unallocatedcost = "UNALLOCATEDCOST",
}

export interface ReturnObject {
    data?: BillingDataEntry[];
}

export interface BillingDataEntry {
    avgCpuUtilization?:    { [key: string]: any };
    avgMemoryUtilization?: { [key: string]: any };
    cluster?:              string;
    clusterType?:          string;
    cpuLimit?:             { [key: string]: any };
    cpuRequest?:           { [key: string]: any };
    ecs?:                  CeEcsEntity;
    harness?:              CeHarnessEntity;
    idleCost?:             { [key: string]: any };
    instanceType?:         string;
    k8s?:                  CeK8SEntity;
    labelName?:            string;
    labelValue?:           string;
    maxCpuUtilization?:    { [key: string]: any };
    maxMemoryUtilization?: { [key: string]: any };
    memoryLimit?:          { [key: string]: any };
    memoryRequest?:        { [key: string]: any };
    region?:               string;
    startTime?:            { [key: string]: any };
    systemCost?:           { [key: string]: any };
    tagName?:              string;
    tagValue?:             string;
    totalCost?:            { [key: string]: any };
    unallocatedCost?:      { [key: string]: any };
}

export interface CeEcsEntity {
    launchType?: string;
    service?:    string;
    taskId?:     string;
}

export interface CeHarnessEntity {
    application?: string;
    environment?: string;
    service?:     string;
}

export interface CeK8SEntity {
    namespace?: string;
    node?:      string;
    pod?:       string;
    workload?:  string;
}

/**
 * Get details about a Cloud Provider.
 */
export interface CloudProvider {
    arguments?: CloudProviderArguments;
    return?:    any;
}

export interface CloudProviderArguments {
    cloudProviderId: string;
}

/**
 * Beta
 */
export interface CloudProviderByName {
    arguments?: CloudProviderByNameArguments;
    return?:    any;
}

export interface CloudProviderByNameArguments {
    name: string;
}

/**
 * Get details about Cloud Providers.
 */
export interface CloudProviders {
    arguments?: CloudProvidersArguments;
    return?:    CloudProviderConnection;
}

export interface CloudProvidersArguments {
    filters?: CloudProviderFilter[];
    limit:    number;
    offset?:  number;
}

export interface CloudProviderFilter {
    cloudProvider?:     IDFilter;
    cloudProviderType?: CloudProviderTypeFilter;
    createdAt?:         TimeFilter;
}

export interface CloudProviderTypeFilter {
    operator?: EnumOperator;
    values?:   CloudProviderType[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum EnumOperator {
    Equals = "EQUALS",
    In = "IN",
}

export interface CloudProviderConnection {
    nodes?:    any[];
    pageInfo?: PageInfo;
}

/**
 * Get details about a Connector.
 */
export interface Connector {
    arguments?: ConnectorArguments;
    return?:    any;
}

export interface ConnectorArguments {
    connectorId: string;
}

/**
 * Get details about Connectors.
 */
export interface Connectors {
    arguments?: ConnectorsArguments;
    return?:    ConnectorConnection;
}

export interface ConnectorsArguments {
    filters?: ConnectorFilter[];
    limit:    number;
    offset?:  number;
}

export interface ConnectorFilter {
    connector?:     IDFilter;
    connectorType?: ConnectorTypeFilter;
    createdAt?:     TimeFilter;
}

export interface ConnectorTypeFilter {
    operator?: EnumOperator;
    values?:   ConnectorType[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum ConnectorType {
    AmazonS3 = "AMAZON_S3",
    AmazonS3HelmRepo = "AMAZON_S3_HELM_REPO",
    ApmVerification = "APM_VERIFICATION",
    AppDynamics = "APP_DYNAMICS",
    Artifactory = "ARTIFACTORY",
    Bamboo = "BAMBOO",
    BugSnag = "BUG_SNAG",
    DataDog = "DATA_DOG",
    Docker = "DOCKER",
    DynaTrace = "DYNA_TRACE",
    Ecr = "ECR",
    Elb = "ELB",
    Elk = "ELK",
    GCR = "GCR",
    Gcs = "GCS",
    GcsHelmRepo = "GCS_HELM_REPO",
    Git = "GIT",
    HTTPHelmRepo = "HTTP_HELM_REPO",
    Jenkins = "JENKINS",
    Jira = "JIRA",
    Logz = "LOGZ",
    NewRelic = "NEW_RELIC",
    Nexus = "NEXUS",
    Prometheus = "PROMETHEUS",
    SFTP = "SFTP",
    SMB = "SMB",
    SMTP = "SMTP",
    Servicenow = "SERVICENOW",
    Slack = "SLACK",
    Splunk = "SPLUNK",
    Sumo = "SUMO",
}

export interface ConnectorConnection {
    nodes?:    any[];
    pageInfo?: PageInfo;
}

/**
 * Get statistics about one or multiple deployments.
 */
export interface DeploymentStats {
    arguments?: DeploymentStatsArguments;
    return?:    any;
}

export interface DeploymentStatsArguments {
    aggregateFunction?: DeploymentAggregationFunction;
    filters?:           DeploymentFilter[];
    groupBy?:           DeploymentAggregation[];
    sortCriteria?:      DeploymentSortCriteria[];
}

export interface DeploymentAggregationFunction {
    count?:             Tion;
    duration?:          DurationAggregateOperation;
    instancesDeployed?: Tion;
    rollbackDuration?:  DurationAggregateOperation;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum DurationAggregateOperation {
    Average = "AVERAGE",
    Max = "MAX",
    Min = "MIN",
}

export interface DeploymentFilter {
    application?:      IDFilter;
    cloudProvider?:    IDFilter;
    duration?:         NumberFilter;
    endTime?:          TimeFilter;
    environment?:      IDFilter;
    environmentType?:  EnvironmentTypeFilter;
    pipeline?:         IDFilter;
    rollbackDuration?: NumberFilter;
    service?:          IDFilter;
    startTime?:        TimeFilter;
    status?:           IDFilter;
    tag?:              DeploymentTagFilter;
    trigger?:          IDFilter;
    triggeredBy?:      IDFilter;
    workflow?:         IDFilter;
}

export interface EnvironmentTypeFilter {
    operator?: EnumOperator;
    values?:   EnvironmentType[];
}

export interface DeploymentAggregation {
    entityAggregation?: DeploymentEntityAggregation;
    tagAggregation?:    DeploymentTagAggregation;
    timeAggregation?:   TimeSeriesAggregation;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum DeploymentEntityAggregation {
    Application = "Application",
    CloudProvider = "CloudProvider",
    Environment = "Environment",
    EnvironmentType = "EnvironmentType",
    Pipeline = "Pipeline",
    Service = "Service",
    Status = "Status",
    Trigger = "Trigger",
    TriggeredBy = "TriggeredBy",
    Workflow = "Workflow",
}

export interface DeploymentTagAggregation {
    entityType?: DeploymentTagType;
    tagName?:    string;
}

export interface TimeSeriesAggregation {
    timeAggregationType?:  TimeAggregationType;
    timeAggregationValue?: number;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum TimeAggregationType {
    Day = "DAY",
    Hour = "HOUR",
    Month = "MONTH",
}

export interface DeploymentSortCriteria {
    sortOrder?: SortOrder;
    sortType?:  DeploymentSortType;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum DeploymentSortType {
    Count = "Count",
    Duration = "Duration",
}

/**
 * Get details about a Harness Environment.
 */
export interface EnvironmentObject {
    arguments?: EnvironmentArguments;
    return?:    Environment;
}

export interface EnvironmentArguments {
    environmentId: string;
}

/**
 * Get details about one or multiple Harness Environments.
 */
export interface Environments {
    arguments?: EnvironmentsArguments;
    return?:    EnvironmentConnection;
}

export interface EnvironmentsArguments {
    filters?: EnvironmentFilter[];
    limit:    number;
    offset?:  number;
}

export interface EnvironmentFilter {
    application?:     IDFilter;
    environment?:     IDFilter;
    environmentType?: EnvironmentTypeFilter;
    tag?:             EnvironmentTagFilter;
}

export interface EnvironmentTagFilter {
    entityType?: TagType;
    tags?:       TagInput[];
}

/**
 * Get the execution status of a Workflow.
 */
export interface Execution {
    arguments?: ExecutionArguments;
    return?:    any;
}

export interface ExecutionArguments {
    executionId: string;
}

/**
 * Beta: Get required inputs to start an execution of a Workflow or Pipeline
 */
export interface ExecutionInputs {
    arguments?: ExecutionInputsArguments;
    return?:    ExecutionInputsReturn;
}

export interface ExecutionInputsArguments {
    /**
     * Application identifier of a Workflow or Pipeline. Use applicationByName API to fetch this
     * information
     */
    applicationId: string;
    /**
     * Workflow or Pipeline identifier. Use WorkflowByName API to fetch this information
     */
    entityId: string;
    /**
     * Execution type: workflow/ pipeline
     */
    executionType: ExecutionType;
    /**
     * Variable inputs if the Workflow or Pipeline is templatized. Provide the required variable
     * values to know about the required inputs
     */
    variableInputs?: VariableInput[];
}

export interface ExecutionInputsReturn {
    /**
     * List of Services that need artifact input
     */
    serviceInputs?: Service[];
}

/**
 * Get a list of executions, with filtering options.
 */
export interface Executions {
    arguments?: ExecutionsArguments;
    return?:    ExecutionConnection;
}

export interface ExecutionsArguments {
    filters?: ExecutionFilter[];
    /**
     * Set this flag to true to include workflow executions along pipeline
     */
    includeIndirectExecutions?: boolean;
    limit:                      number;
    offset?:                    number;
}

export interface ExecutionConnection {
    nodes?:    any[];
    pageInfo?: PageInfo;
}

/**
 * Get details about instances.
 */
export interface Instances {
    arguments?: InstancesArguments;
    return?:    InstanceConnection;
}

export interface InstancesArguments {
    filters?: InstanceFilter[];
    limit:    number;
    offset?:  number;
}

export interface InstanceFilter {
    application?:   IDFilter;
    cloudProvider?: IDFilter;
    createdAt?:     TimeFilter;
    environment?:   IDFilter;
    instanceType?:  InstanceType;
    service?:       IDFilter;
    tag?:           InstanceTagFilter;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum InstanceType {
    AutoscalingGroupInstance = "AUTOSCALING_GROUP_INSTANCE",
    CodeDeployInstance = "CODE_DEPLOY_INSTANCE",
    Ec2Instance = "EC2_INSTANCE",
    EcsContainerInstance = "ECS_CONTAINER_INSTANCE",
    KubernetesContainerInstance = "KUBERNETES_CONTAINER_INSTANCE",
    PcfInstance = "PCF_INSTANCE",
    PhysicalHostInstance = "PHYSICAL_HOST_INSTANCE",
}

export interface InstanceTagFilter {
    entityType?: CeTagType;
    tags?:       TagInput[];
}

export interface InstanceConnection {
    nodes?:    any[];
    pageInfo?: PageInfo;
}

/**
 * Get details about K8s labels.
 */
export interface K8SLabels {
    arguments?: K8SLabelsArguments;
    return?:    K8SLabelConnection;
}

export interface K8SLabelsArguments {
    filters?: K8SLabelFilter[];
    limit:    number;
    offset?:  number;
}

export interface K8SLabelFilter {
    cluster?:      IDFilter;
    endTime?:      TimeFilter;
    namespace?:    IDFilter;
    startTime?:    TimeFilter;
    workloadName?: IDFilter;
}

export interface K8SLabelConnection {
    nodes?:    K8SLabel[];
    pageInfo?: PageInfo;
}

export interface K8SLabel {
    name?:   string;
    values?: string[];
}

/**
 * Get a Pipeline object by ID.
 */
export interface PipelineObject {
    arguments?: PipelineArguments;
    return?:    Pipeline;
}

export interface PipelineArguments {
    pipelineId: string;
}

/**
 * Get a Pipeline object by ID.
 */
export interface PipelineByName {
    arguments?: PipelineByNameArguments;
    return?:    Pipeline;
}

export interface PipelineByNameArguments {
    applicationId: string;
    pipelineName:  string;
}

/**
 * Get details about one or multiple Pipelines.
 */
export interface Pipelines {
    arguments?: PipelinesArguments;
    return?:    PipelineConnection;
}

export interface PipelinesArguments {
    filters?: PipelineFilter[];
    limit:    number;
    offset?:  number;
}

export interface PipelineFilter {
    application?: IDFilter;
    pipeline?:    IDFilter;
    tag?:         PipelineTagFilter;
}

export interface PipelineTagFilter {
    entityType?: TagType;
    tags?:       TagInput[];
}

/**
 * Beta: Get details about secret.
 */
export interface Secret {
    arguments?: SecretArguments;
    return?:    any;
}

export interface SecretArguments {
    secretId:   string;
    secretType: SecretType;
}

/**
 * Beta: Get details about secret by name.
 */
export interface SecretByName {
    arguments?: SecretByNameArguments;
    return?:    any;
}

export interface SecretByNameArguments {
    name:       string;
    secretType: SecretType;
}

/**
 * Beta: Get details about a Secret Manager.
 */
export interface SecretManager {
    arguments?: SecretManagerArguments;
    return?:    NodeElement;
}

export interface SecretManagerArguments {
    secretManagerId: string;
}

export interface NodeElement {
    id?:   string;
    name?: string;
}

/**
 * Beta: Get Secret Manager by name.
 */
export interface SecretManagerByName {
    arguments?: SecretManagerByNameArguments;
    return?:    NodeElement;
}

export interface SecretManagerByNameArguments {
    name: string;
}

/**
 * Beta: List Secret Manager.
 */
export interface SecretManagers {
    arguments?: SecretManagersArguments;
    return?:    SecretManagerConnection;
}

export interface SecretManagersArguments {
    filters?: SecretManagerFilter[];
    limit:    number;
    offset?:  number;
}

export interface SecretManagerFilter {
    secretManager?: IDFilter;
    type?:          SecretManagerTypeFilter;
}

export interface SecretManagerTypeFilter {
    operator?: EnumOperator;
    values?:   SecretManagerType[];
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum SecretManagerType {
    AwsKms = "AWS_KMS",
    AwsSecretManager = "AWS_SECRET_MANAGER",
    AzureKeyVault = "AZURE_KEY_VAULT",
    Cyberark = "CYBERARK",
    GoogleKms = "GOOGLE_KMS",
    HashicorpVault = "HASHICORP_VAULT",
}

export interface SecretManagerConnection {
    nodes?:    NodeElement[];
    pageInfo?: PageInfo;
}

/**
 * Get details about a Harness Service.
 */
export interface ServiceObject {
    arguments?: ServiceArguments;
    return?:    Service;
}

export interface ServiceArguments {
    serviceId: string;
}

/**
 * Get a list of Harness Services, by applicationId. This returns paginated data.
 */
export interface Services {
    arguments?: ServicesArguments;
    return?:    ServiceConnection;
}

export interface ServicesArguments {
    filters?: ServiceFilter[];
    limit:    number;
    offset?:  number;
}

export interface ServiceFilter {
    application?: IDFilter;
    service?:     IDFilter;
    tag?:         ServiceTagFilter;
}

export interface ServiceTagFilter {
    entityType?: TagType;
    tags?:       TagInput[];
}

export interface SsoProvider {
    arguments?: SsoProviderArguments;
    return?:    SSOProvider;
}

export interface SsoProviderArguments {
    ssoProviderId: string;
}

export interface SSOProvider {
    id?:      string;
    name?:    string;
    ssoType?: SSOType;
}

/**
 * The `String` scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.
 */
export enum SSOType {
    LDAP = "LDAP",
    Saml = "SAML",
}

export interface SsoProviders {
    arguments?: SsoProvidersArguments;
    return?:    SSOProviderConnection;
}

export interface SsoProvidersArguments {
    limit:   number;
    offset?: number;
}

export interface SSOProviderConnection {
    nodes?:    SSOProvider[];
    pageInfo?: PageInfo;
}

/**
 * Get details about a Trigger.
 */
export interface QueryTrigger {
    arguments?: TriggerArguments;
    return?:    Trigger;
}

export interface TriggerArguments {
    triggerId: string;
}

/**
 * Get details about a Trigger  by it's name
 */
export interface TriggerByName {
    arguments?: TriggerByNameArguments;
    return?:    Trigger;
}

export interface TriggerByNameArguments {
    applicationId: string;
    triggerName:   string;
}

/**
 * Get a list of Harness Triggers, This returns paginated data.
 */
export interface Triggers {
    arguments?: TriggersArguments;
    return?:    TriggerConnection;
}

export interface TriggersArguments {
    filters?: TriggerFilter[];
    limit:    number;
    offset?:  number;
}

export interface TriggerFilter {
    application?: IDFilter;
    tag?:         TriggerTagFilter;
    trigger?:     IDFilter;
}

export interface TriggerTagFilter {
    entityType?: TagType;
    tags?:       TagInput[];
}

export interface TriggerConnection {
    nodes?:    Trigger[];
    pageInfo?: PageInfo;
}

/**
 * fetch a user by id
 */
export interface QueryUser {
    arguments?: UserArguments;
    return?:    User;
}

export interface UserArguments {
    id: string;
}

/**
 * fetch a user by name
 */
export interface UserByName {
    arguments?: UserByNameArguments;
    return?:    User;
}

export interface UserByNameArguments {
    name: string;
}

export interface QueryUserGroup {
    arguments?: UserGroupArguments;
    return?:    UserGroup;
}

export interface UserGroupArguments {
    userGroupId: string;
}

export interface UserGroupByName {
    arguments?: UserGroupByNameArguments;
    return?:    UserGroup;
}

export interface UserGroupByNameArguments {
    name: string;
}

export interface UserGroups {
    arguments?: UserGroupsArguments;
    return?:    UserGroupConnection;
}

export interface UserGroupsArguments {
    limit:   number;
    offset?: number;
}

/**
 * fetch a list of users
 */
export interface Users {
    arguments?: UsersArguments;
    return?:    UserConnection;
}

export interface UsersArguments {
    limit:   number;
    offset?: number;
}

/**
 * Get a Workflow object by ID.
 */
export interface WorkflowObject {
    arguments?: WorkflowArguments;
    return?:    Workflow;
}

export interface WorkflowArguments {
    workflowId: string;
}

/**
 * Fetch details about a  Workflow by it's name
 */
export interface WorkflowByName {
    arguments?: WorkflowByNameArguments;
    return?:    Workflow;
}

export interface WorkflowByNameArguments {
    applicationId: string;
    workflowName:  string;
}

/**
 * Get a list of Workflows, by applicationId. This returns paginated data.
 */
export interface Workflows {
    arguments?: WorkflowsArguments;
    return?:    WorkflowConnection;
}

export interface WorkflowsArguments {
    filters?: WorkflowFilter[];
    limit:    number;
    offset?:  number;
}

export interface WorkflowFilter {
    application?: IDFilter;
    tag?:         WorkflowTagFilter;
    workflow?:    IDFilter;
}

export interface WorkflowTagFilter {
    entityType?: TagType;
    tags?:       TagInput[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toHarness(json: string): any[] | boolean | number | number | null | HarnessObject | string {
        return cast(JSON.parse(json), u(a("any"), true, 3.14, 0, null, r("HarnessObject"), ""));
    }

    public static harnessToJson(value: any[] | boolean | number | number | null | HarnessObject | string): string {
        return JSON.stringify(uncast(value, u(a("any"), true, 3.14, 0, null, r("HarnessObject"), "")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "HarnessObject": o([
        { json: "Mutation", js: "Mutation", typ: u(undefined, r("Mutation")) },
        { json: "Query", js: "Query", typ: u(undefined, r("Query")) },
    ], "any"),
    "Mutation": o([
        { json: "addAccountPermission", js: "addAccountPermission", typ: u(undefined, r("AddAccountPermission")) },
        { json: "addAppPermission", js: "addAppPermission", typ: u(undefined, r("AddAppPermission")) },
        { json: "addUserToUserGroup", js: "addUserToUserGroup", typ: u(undefined, r("AddUserToUserGroup")) },
        { json: "createApplication", js: "createApplication", typ: u(undefined, r("CreateApplication")) },
        { json: "createCloudProvider", js: "createCloudProvider", typ: u(undefined, r("CreateCloudProvider")) },
        { json: "createSecret", js: "createSecret", typ: u(undefined, r("CreateSecret")) },
        { json: "createTrigger", js: "createTrigger", typ: u(undefined, r("CreateTrigger")) },
        { json: "createUser", js: "createUser", typ: u(undefined, r("CreateUser")) },
        { json: "createUserGroup", js: "createUserGroup", typ: u(undefined, r("CreateUserGroup")) },
        { json: "deleteApplication", js: "deleteApplication", typ: u(undefined, r("DeleteApplication")) },
        { json: "deleteCloudProvider", js: "deleteCloudProvider", typ: u(undefined, r("DeleteCloudProvider")) },
        { json: "deleteSecret", js: "deleteSecret", typ: u(undefined, r("DeleteSecret")) },
        { json: "deleteTrigger", js: "deleteTrigger", typ: u(undefined, r("DeleteTrigger")) },
        { json: "deleteUser", js: "deleteUser", typ: u(undefined, r("DeleteUser")) },
        { json: "deleteUserGroup", js: "deleteUserGroup", typ: u(undefined, r("DeleteUserGroup")) },
        { json: "exportExecutions", js: "exportExecutions", typ: u(undefined, r("ExportExecutions")) },
        { json: "removeApplicationGitSyncConfig", js: "removeApplicationGitSyncConfig", typ: u(undefined, r("RemoveApplicationGitSyncConfig")) },
        { json: "removeUserFromUserGroup", js: "removeUserFromUserGroup", typ: u(undefined, r("RemoveUserFromUserGroup")) },
        { json: "startExecution", js: "startExecution", typ: u(undefined, r("StartExecution")) },
        { json: "updateApplication", js: "updateApplication", typ: u(undefined, r("UpdateApplication")) },
        { json: "updateApplicationGitSyncConfig", js: "updateApplicationGitSyncConfig", typ: u(undefined, r("UpdateApplicationGitSyncConfig")) },
        { json: "updateApplicationGitSyncConfigStatus", js: "updateApplicationGitSyncConfigStatus", typ: u(undefined, r("UpdateApplicationGitSyncConfigStatus")) },
        { json: "updateCloudProvider", js: "updateCloudProvider", typ: u(undefined, r("UpdateCloudProvider")) },
        { json: "updateSecret", js: "updateSecret", typ: u(undefined, r("UpdateSecret")) },
        { json: "updateTrigger", js: "updateTrigger", typ: u(undefined, r("UpdateTrigger")) },
        { json: "updateUser", js: "updateUser", typ: u(undefined, r("UpdateUser")) },
        { json: "updateUserGroup", js: "updateUserGroup", typ: u(undefined, r("UpdateUserGroup")) },
        { json: "updateUserGroupPermissions", js: "updateUserGroupPermissions", typ: u(undefined, r("UpdateUserGroupPermissions")) },
    ], "any"),
    "AddAccountPermission": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("AddAccountPermissionArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("AddAccountPermissionPayload")) },
    ], "any"),
    "AddAccountPermissionArguments": o([
        { json: "input", js: "input", typ: r("AddAccountPermissionInput") },
    ], "any"),
    "AddAccountPermissionInput": o([
        { json: "accountPermission", js: "accountPermission", typ: u(undefined, r("AccountPermissionType")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroupId", js: "userGroupId", typ: "" },
    ], "any"),
    "AddAccountPermissionPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "UserGroupConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("UserGroup"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "User": o([
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "isEmailVerified", js: "isEmailVerified", typ: u(undefined, true) },
        { json: "isImportedFromIdentityProvider", js: "isImportedFromIdentityProvider", typ: u(undefined, true) },
        { json: "isPasswordExpired", js: "isPasswordExpired", typ: u(undefined, true) },
        { json: "isTwoFactorAuthenticationEnabled", js: "isTwoFactorAuthenticationEnabled", typ: u(undefined, true) },
        { json: "isUserLocked", js: "isUserLocked", typ: u(undefined, true) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "userGroups", js: "userGroups", typ: u(undefined, r("UserGroupConnection")) },
    ], "any"),
    "UserConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("User"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "UserGroup": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "importedByScim", js: "importedByScim", typ: u(undefined, true) },
        { json: "isSSOLinked", js: "isSSOLinked", typ: u(undefined, true) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "notificationSettings", js: "notificationSettings", typ: u(undefined, r("NotificationSettings")) },
        { json: "permissions", js: "permissions", typ: u(undefined, r("UserGroupPermissions")) },
        { json: "ssoSetting", js: "ssoSetting", typ: u(undefined, "any") },
        { json: "users", js: "users", typ: u(undefined, r("UserConnection")) },
    ], "any"),
    "PageInfo": o([
        { json: "hasMore", js: "hasMore", typ: u(undefined, true) },
        { json: "limit", js: "limit", typ: u(undefined, 3.14) },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
        { json: "total", js: "total", typ: u(undefined, 3.14) },
    ], "any"),
    "NotificationSettings": o([
        { json: "groupEmailAddresses", js: "groupEmailAddresses", typ: u(undefined, a("")) },
        { json: "microsoftTeamsWebhookUrl", js: "microsoftTeamsWebhookUrl", typ: u(undefined, "") },
        { json: "sendMailToNewMembers", js: "sendMailToNewMembers", typ: u(undefined, true) },
        { json: "sendNotificationToMembers", js: "sendNotificationToMembers", typ: u(undefined, true) },
        { json: "slackNotificationSetting", js: "slackNotificationSetting", typ: u(undefined, r("SlackNotificationSetting")) },
    ], "any"),
    "SlackNotificationSetting": o([
        { json: "slackChannelName", js: "slackChannelName", typ: u(undefined, "") },
        { json: "slackWebhookURL", js: "slackWebhookURL", typ: u(undefined, "") },
    ], "any"),
    "UserGroupPermissions": o([
        { json: "accountPermissions", js: "accountPermissions", typ: u(undefined, r("AccountPermissions")) },
        { json: "appPermissions", js: "appPermissions", typ: u(undefined, a(r("ApplicationPermission"))) },
    ], "any"),
    "AccountPermissions": o([
        { json: "accountPermissionTypes", js: "accountPermissionTypes", typ: u(undefined, a(r("AccountPermissionType"))) },
    ], "any"),
    "ApplicationPermission": o([
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actions"))) },
        { json: "applications", js: "applications", typ: u(undefined, r("AppFilter")) },
        { json: "deployments", js: "deployments", typ: u(undefined, r("DeploymentPermissionFilter")) },
        { json: "environments", js: "environments", typ: u(undefined, r("EnvPermissionFilter")) },
        { json: "permissionType", js: "permissionType", typ: u(undefined, r("AppPermissionType")) },
        { json: "pipelines", js: "pipelines", typ: u(undefined, r("PipelinePermissionFilter")) },
        { json: "provisioners", js: "provisioners", typ: u(undefined, r("ProvisionerPermissionFilter")) },
        { json: "services", js: "services", typ: u(undefined, r("ServicePermissionFilter")) },
        { json: "workflows", js: "workflows", typ: u(undefined, r("WorkflowPermissionFilter")) },
    ], "any"),
    "AppFilter": o([
        { json: "appIds", js: "appIds", typ: u(undefined, a("")) },
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
    ], "any"),
    "DeploymentPermissionFilter": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("FilterTypeElement"))) },
    ], "any"),
    "EnvPermissionFilter": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("FilterTypeElement"))) },
    ], "any"),
    "PipelinePermissionFilter": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("PipelinePermissionFilterType"))) },
    ], "any"),
    "ProvisionerPermissionFilter": o([
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
        { json: "provisionerIds", js: "provisionerIds", typ: u(undefined, a("")) },
    ], "any"),
    "ServicePermissionFilter": o([
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
        { json: "serviceIds", js: "serviceIds", typ: u(undefined, a("")) },
    ], "any"),
    "WorkflowPermissionFilter": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("WorkflowPermissionFilterType"))) },
    ], "any"),
    "AddAppPermission": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("AddAppPermissionArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("AddAppPermissionPayload")) },
    ], "any"),
    "AddAppPermissionArguments": o([
        { json: "input", js: "input", typ: r("AddAppPermissionInput") },
    ], "any"),
    "AddAppPermissionInput": o([
        { json: "appPermission", js: "appPermission", typ: u(undefined, r("ApplicationPermissionInput")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroupId", js: "userGroupId", typ: "" },
    ], "any"),
    "ApplicationPermissionInput": o([
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actions"))) },
        { json: "applications", js: "applications", typ: r("AppFilterInput") },
        { json: "deployments", js: "deployments", typ: u(undefined, r("DeploymentPermissionFilterInput")) },
        { json: "environments", js: "environments", typ: u(undefined, r("EnvPermissionFilterInput")) },
        { json: "permissionType", js: "permissionType", typ: r("AppPermissionType") },
        { json: "pipelines", js: "pipelines", typ: u(undefined, r("PipelinePermissionFilterInput")) },
        { json: "provisioners", js: "provisioners", typ: u(undefined, r("ProvisionerPermissionFilterInput")) },
        { json: "services", js: "services", typ: u(undefined, r("ServicePermissionFilterInput")) },
        { json: "workflows", js: "workflows", typ: u(undefined, r("WorkflowPermissionFilterInput")) },
    ], "any"),
    "AppFilterInput": o([
        { json: "appIds", js: "appIds", typ: u(undefined, a("")) },
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
    ], "any"),
    "DeploymentPermissionFilterInput": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("FilterTypeElement"))) },
    ], "any"),
    "EnvPermissionFilterInput": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("FilterTypeElement"))) },
    ], "any"),
    "PipelinePermissionFilterInput": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("PipelinePermissionFilterType"))) },
    ], "any"),
    "ProvisionerPermissionFilterInput": o([
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
        { json: "provisionerIds", js: "provisionerIds", typ: u(undefined, a("")) },
    ], "any"),
    "ServicePermissionFilterInput": o([
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
        { json: "serviceIds", js: "serviceIds", typ: u(undefined, a("")) },
    ], "any"),
    "WorkflowPermissionFilterInput": o([
        { json: "envIds", js: "envIds", typ: u(undefined, a("")) },
        { json: "filterTypes", js: "filterTypes", typ: u(undefined, a(r("WorkflowPermissionFilterType"))) },
    ], "any"),
    "AddAppPermissionPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "AddUserToUserGroup": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("AddUserToUserGroupArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("AddUserToUserGroupPayload")) },
    ], "any"),
    "AddUserToUserGroupArguments": o([
        { json: "input", js: "input", typ: r("AddUserToUserGroupInput") },
    ], "any"),
    "AddUserToUserGroupInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroupId", js: "userGroupId", typ: "" },
        { json: "userId", js: "userId", typ: "" },
    ], "any"),
    "AddUserToUserGroupPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "CreateApplication": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CreateApplicationArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("CreateApplicationPayload")) },
    ], "any"),
    "CreateApplicationArguments": o([
        { json: "input", js: "input", typ: r("CreateApplicationInput") },
    ], "any"),
    "CreateApplicationInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "CreateApplicationPayload": o([
        { json: "application", js: "application", typ: u(undefined, r("Application")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "Environment": o([
        { json: "application", js: "application", typ: u(undefined, r("Application")) },
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: u(undefined, r("EnvironmentType")) },
    ], "any"),
    "EnvironmentConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("Environment"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Application": o([
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "environments", js: "environments", typ: u(undefined, r("EnvironmentConnection")) },
        { json: "gitSyncConfig", js: "gitSyncConfig", typ: u(undefined, r("GitSyncConfig")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "pipelines", js: "pipelines", typ: u(undefined, r("PipelineConnection")) },
        { json: "services", js: "services", typ: u(undefined, r("ServiceConnection")) },
        { json: "workflows", js: "workflows", typ: u(undefined, r("WorkflowConnection")) },
    ], "any"),
    "GitSyncConfig": o([
        { json: "branch", js: "branch", typ: u(undefined, "") },
        { json: "gitConnector", js: "gitConnector", typ: u(undefined, r("GitConnector")) },
        { json: "syncEnabled", js: "syncEnabled", typ: u(undefined, true) },
    ], "any"),
    "GitConnector": o([
        { json: "branch", js: "branch", typ: u(undefined, "") },
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "customCommitDetails", js: "customCommitDetails", typ: u(undefined, r("CustomCommitDetails")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "generateWebhookUrl", js: "generateWebhookUrl", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "passwordSecretId", js: "passwordSecretId", typ: u(undefined, "") },
        { json: "sshSettingId", js: "sshSettingId", typ: u(undefined, "") },
        { json: "URL", js: "URL", typ: u(undefined, "") },
        { json: "urlType", js: "urlType", typ: u(undefined, r("URLType")) },
        { json: "userName", js: "userName", typ: u(undefined, "") },
        { json: "webhookUrl", js: "webhookUrl", typ: u(undefined, "") },
    ], "any"),
    "CustomCommitDetails": o([
        { json: "authorEmailId", js: "authorEmailId", typ: u(undefined, "") },
        { json: "authorName", js: "authorName", typ: u(undefined, "") },
        { json: "commitMessage", js: "commitMessage", typ: u(undefined, "") },
    ], "any"),
    "PipelineConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("Pipeline"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Pipeline": o([
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "pipelineVariables", js: "pipelineVariables", typ: u(undefined, a(r("Variable"))) },
    ], "any"),
    "Variable": o([
        { json: "allowedValues", js: "allowedValues", typ: u(undefined, a("")) },
        { json: "allowMultipleValues", js: "allowMultipleValues", typ: u(undefined, true) },
        { json: "defaultValue", js: "defaultValue", typ: u(undefined, "") },
        { json: "fixed", js: "fixed", typ: u(undefined, true) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "required", js: "required", typ: u(undefined, true) },
        { json: "type", js: "type", typ: u(undefined, "") },
    ], "any"),
    "ServiceConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("Service"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Service": o([
        { json: "artifactSources", js: "artifactSources", typ: u(undefined, a("any")) },
        { json: "artifactType", js: "artifactType", typ: u(undefined, "") },
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "deploymentType", js: "deploymentType", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "WorkflowConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("Workflow"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Workflow": o([
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "workflowVariables", js: "workflowVariables", typ: u(undefined, a(r("Variable"))) },
    ], "any"),
    "CreateCloudProvider": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CreateCloudProviderArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("CreateCloudProviderPayload")) },
    ], "any"),
    "CreateCloudProviderArguments": o([
        { json: "input", js: "input", typ: r("CreateCloudProviderInput") },
    ], "any"),
    "CreateCloudProviderInput": o([
        { json: "awsCloudProvider", js: "awsCloudProvider", typ: u(undefined, r("AwsCloudProviderInput")) },
        { json: "azureCloudProvider", js: "azureCloudProvider", typ: u(undefined, r("AzureCloudProviderInput")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "cloudProviderType", js: "cloudProviderType", typ: r("CloudProviderType") },
        { json: "gcpCloudProvider", js: "gcpCloudProvider", typ: u(undefined, r("GcpCloudProviderInput")) },
        { json: "k8sCloudProvider", js: "k8sCloudProvider", typ: u(undefined, r("K8SCloudProviderInput")) },
        { json: "pcfCloudProvider", js: "pcfCloudProvider", typ: u(undefined, r("PcfCloudProviderInput")) },
        { json: "physicalDataCenterCloudProvider", js: "physicalDataCenterCloudProvider", typ: u(undefined, r("PhysicalDataCenterCloudProviderInput")) },
        { json: "spotInstCloudProvider", js: "spotInstCloudProvider", typ: u(undefined, r("SpotInstCloudProviderInput")) },
    ], "any"),
    "AwsCloudProviderInput": o([
        { json: "credentialsType", js: "credentialsType", typ: u(undefined, r("AwsCredentialsType")) },
        { json: "crossAccountAttributes", js: "crossAccountAttributes", typ: u(undefined, r("AwsCrossAccountAttributes")) },
        { json: "ec2IamCredentials", js: "ec2IamCredentials", typ: u(undefined, r("Ec2IamCredentials")) },
        { json: "manualCredentials", js: "manualCredentials", typ: u(undefined, r("AwsManualCredentials")) },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "AwsCrossAccountAttributes": o([
        { json: "assumeCrossAccountRole", js: "assumeCrossAccountRole", typ: u(undefined, true) },
        { json: "crossAccountRoleArn", js: "crossAccountRoleArn", typ: "" },
        { json: "externalId", js: "externalId", typ: u(undefined, "") },
    ], "any"),
    "Ec2IamCredentials": o([
        { json: "delegateSelector", js: "delegateSelector", typ: "" },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "UsageScopeInput": o([
        { json: "appEnvScopes", js: "appEnvScopes", typ: u(undefined, a(r("AppEnvScopeInput"))) },
    ], "any"),
    "AppEnvScopeInput": o([
        { json: "application", js: "application", typ: r("AppScopeFilterInput") },
        { json: "environment", js: "environment", typ: r("EnvScopeFilterInput") },
    ], "any"),
    "AppScopeFilterInput": o([
        { json: "appId", js: "appId", typ: u(undefined, "") },
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterType")) },
    ], "any"),
    "EnvScopeFilterInput": o([
        { json: "envId", js: "envId", typ: u(undefined, "") },
        { json: "filterType", js: "filterType", typ: u(undefined, r("FilterTypeElement")) },
    ], "any"),
    "AwsManualCredentials": o([
        { json: "accessKey", js: "accessKey", typ: "" },
        { json: "secretKeySecretId", js: "secretKeySecretId", typ: "" },
    ], "any"),
    "AzureCloudProviderInput": o([
        { json: "clientId", js: "clientId", typ: "" },
        { json: "keySecretId", js: "keySecretId", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "tenantId", js: "tenantId", typ: "" },
    ], "any"),
    "GcpCloudProviderInput": o([
        { json: "name", js: "name", typ: "" },
        { json: "serviceAccountKeySecretId", js: "serviceAccountKeySecretId", typ: "" },
    ], "any"),
    "K8SCloudProviderInput": o([
        { json: "clusterDetailsType", js: "clusterDetailsType", typ: r("ClusterDetailsType") },
        { json: "inheritClusterDetails", js: "inheritClusterDetails", typ: u(undefined, r("InheritClusterDetails")) },
        { json: "manualClusterDetails", js: "manualClusterDetails", typ: u(undefined, r("ManualClusterDetails")) },
        { json: "name", js: "name", typ: "" },
        { json: "skipValidation", js: "skipValidation", typ: u(undefined, true) },
    ], "any"),
    "InheritClusterDetails": o([
        { json: "delegateName", js: "delegateName", typ: "" },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "ManualClusterDetails": o([
        { json: "masterUrl", js: "masterUrl", typ: "" },
        { json: "none", js: "none", typ: u(undefined, r("None")) },
        { json: "oidcToken", js: "oidcToken", typ: u(undefined, r("OIDCToken")) },
        { json: "serviceAccountToken", js: "serviceAccountToken", typ: u(undefined, r("ServiceAccountToken")) },
        { json: "type", js: "type", typ: r("ManualClusterDetailsAuthenticationType") },
        { json: "usernameAndPassword", js: "usernameAndPassword", typ: u(undefined, r("UsernameAndPasswordAuthentication")) },
    ], "any"),
    "None": o([
        { json: "caCertificateSecretId", js: "caCertificateSecretId", typ: "" },
        { json: "clientCertificateSecretId", js: "clientCertificateSecretId", typ: "" },
        { json: "clientKeyAlgorithm", js: "clientKeyAlgorithm", typ: "" },
        { json: "clientKeyPassphraseSecretId", js: "clientKeyPassphraseSecretId", typ: "" },
        { json: "clientKeySecretId", js: "clientKeySecretId", typ: "" },
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
        { json: "serviceAccountTokenSecretId", js: "serviceAccountTokenSecretId", typ: "" },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
        { json: "userName", js: "userName", typ: "" },
    ], "any"),
    "OIDCToken": o([
        { json: "clientIdSecretId", js: "clientIdSecretId", typ: "" },
        { json: "clientSecretSecretId", js: "clientSecretSecretId", typ: "" },
        { json: "identityProviderUrl", js: "identityProviderUrl", typ: "" },
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
        { json: "scopes", js: "scopes", typ: "" },
        { json: "userName", js: "userName", typ: "" },
    ], "any"),
    "ServiceAccountToken": o([
        { json: "serviceAccountTokenSecretId", js: "serviceAccountTokenSecretId", typ: "" },
    ], "any"),
    "UsernameAndPasswordAuthentication": o([
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
        { json: "userName", js: "userName", typ: u(undefined, "") },
        { json: "userNameSecretId", js: "userNameSecretId", typ: u(undefined, "") },
    ], "any"),
    "PcfCloudProviderInput": o([
        { json: "endpointUrl", js: "endpointUrl", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
        { json: "skipValidation", js: "skipValidation", typ: u(undefined, true) },
        { json: "userName", js: "userName", typ: u(undefined, "") },
        { json: "userNameSecretId", js: "userNameSecretId", typ: u(undefined, "") },
    ], "any"),
    "PhysicalDataCenterCloudProviderInput": o([
        { json: "name", js: "name", typ: "" },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "SpotInstCloudProviderInput": o([
        { json: "accountId", js: "accountId", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "tokenSecretId", js: "tokenSecretId", typ: "" },
    ], "any"),
    "CreateCloudProviderPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, "any") },
    ], "any"),
    "CreateSecret": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CreateSecretArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("CreateSecretPayload")) },
    ], "any"),
    "CreateSecretArguments": o([
        { json: "input", js: "input", typ: r("CreateSecretInput") },
    ], "any"),
    "CreateSecretInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "encryptedText", js: "encryptedText", typ: u(undefined, r("EncryptedTextInput")) },
        { json: "secretType", js: "secretType", typ: r("SecretType") },
        { json: "sshCredential", js: "sshCredential", typ: u(undefined, r("SSHCredentialInput")) },
        { json: "winRMCredential", js: "winRMCredential", typ: u(undefined, r("WinRMCredentialInput")) },
    ], "any"),
    "EncryptedTextInput": o([
        { json: "name", js: "name", typ: "" },
        { json: "scopedToAccount", js: "scopedToAccount", typ: u(undefined, true) },
        { json: "secretManagerId", js: "secretManagerId", typ: u(undefined, "") },
        { json: "secretReference", js: "secretReference", typ: u(undefined, "") },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], "any"),
    "SSHCredentialInput": o([
        { json: "authenticationScheme", js: "authenticationScheme", typ: r("SSHAuthenticationScheme") },
        { json: "kerberosAuthentication", js: "kerberosAuthentication", typ: u(undefined, r("KerberosAuthenticationInput")) },
        { json: "name", js: "name", typ: "" },
        { json: "sshAuthentication", js: "sshAuthentication", typ: u(undefined, r("SSHAuthenticationInput")) },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "KerberosAuthenticationInput": o([
        { json: "port", js: "port", typ: 3.14 },
        { json: "principal", js: "principal", typ: "" },
        { json: "realm", js: "realm", typ: "" },
        { json: "tgtGenerationMethod", js: "tgtGenerationMethod", typ: u(undefined, r("TGTGenerationMethod")) },
    ], "any"),
    "TGTGenerationMethod": o([
        { json: "kerberosPassword", js: "kerberosPassword", typ: u(undefined, r("KerberosPassword")) },
        { json: "keyTabFile", js: "keyTabFile", typ: u(undefined, r("KeyTabFile")) },
        { json: "tgtGenerationUsing", js: "tgtGenerationUsing", typ: r("TGTGenerationUsing") },
    ], "any"),
    "KerberosPassword": o([
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
    ], "any"),
    "KeyTabFile": o([
        { json: "filePath", js: "filePath", typ: "" },
    ], "any"),
    "SSHAuthenticationInput": o([
        { json: "port", js: "port", typ: 3.14 },
        { json: "sshAuthenticationMethod", js: "sshAuthenticationMethod", typ: r("SSHAuthenticationMethod") },
        { json: "userName", js: "userName", typ: "" },
    ], "any"),
    "SSHAuthenticationMethod": o([
        { json: "inlineSSHKey", js: "inlineSSHKey", typ: u(undefined, r("InlineSSHKey")) },
        { json: "serverPassword", js: "serverPassword", typ: u(undefined, r("SSHPassword")) },
        { json: "sshCredentialType", js: "sshCredentialType", typ: r("SSHCredentialType") },
        { json: "sshKeyFile", js: "sshKeyFile", typ: u(undefined, r("SSHKeyFile")) },
    ], "any"),
    "InlineSSHKey": o([
        { json: "passphraseSecretId", js: "passphraseSecretId", typ: u(undefined, "") },
        { json: "sshKeySecretFileId", js: "sshKeySecretFileId", typ: "" },
    ], "any"),
    "SSHPassword": o([
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
    ], "any"),
    "SSHKeyFile": o([
        { json: "passphraseSecretId", js: "passphraseSecretId", typ: u(undefined, "") },
        { json: "path", js: "path", typ: "" },
    ], "any"),
    "WinRMCredentialInput": o([
        { json: "authenticationScheme", js: "authenticationScheme", typ: u(undefined, r("WinRMAuthenticationScheme")) },
        { json: "domain", js: "domain", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "passwordSecretId", js: "passwordSecretId", typ: "" },
        { json: "port", js: "port", typ: u(undefined, 3.14) },
        { json: "skipCertCheck", js: "skipCertCheck", typ: u(undefined, true) },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
        { json: "userName", js: "userName", typ: "" },
        { json: "useSSL", js: "useSSL", typ: u(undefined, true) },
    ], "any"),
    "CreateSecretPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "secret", js: "secret", typ: u(undefined, "any") },
    ], "any"),
    "CreateTrigger": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CreateTriggerArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("TriggerPayload")) },
    ], "any"),
    "CreateTriggerArguments": o([
        { json: "input", js: "input", typ: r("CreateTriggerInput") },
    ], "any"),
    "CreateTriggerInput": o([
        { json: "action", js: "action", typ: r("TriggerActionInput") },
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "condition", js: "condition", typ: r("TriggerConditionInput") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "TriggerActionInput": o([
        { json: "artifactSelections", js: "artifactSelections", typ: u(undefined, a(r("ArtifactSelectionInput"))) },
        { json: "entityId", js: "entityId", typ: "" },
        { json: "excludeHostsWithSameArtifact", js: "excludeHostsWithSameArtifact", typ: u(undefined, true) },
        { json: "executionType", js: "executionType", typ: r("ExecutionType") },
        { json: "variables", js: "variables", typ: u(undefined, a(r("VariableInput"))) },
    ], "any"),
    "ArtifactSelectionInput": o([
        { json: "artifactFilter", js: "artifactFilter", typ: u(undefined, "") },
        { json: "artifactSelectionType", js: "artifactSelectionType", typ: r("ArtifactSelectionType") },
        { json: "artifactSourceId", js: "artifactSourceId", typ: u(undefined, "") },
        { json: "pipelineId", js: "pipelineId", typ: u(undefined, "") },
        { json: "regex", js: "regex", typ: u(undefined, true) },
        { json: "serviceId", js: "serviceId", typ: "" },
        { json: "workflowId", js: "workflowId", typ: u(undefined, "") },
    ], "any"),
    "VariableInput": o([
        { json: "name", js: "name", typ: "" },
        { json: "variableValue", js: "variableValue", typ: r("VariableValue") },
    ], "any"),
    "VariableValue": o([
        { json: "type", js: "type", typ: r("VariableValueType") },
        { json: "value", js: "value", typ: "" },
    ], "any"),
    "TriggerConditionInput": o([
        { json: "artifactConditionInput", js: "artifactConditionInput", typ: u(undefined, r("ArtifactConditionInput")) },
        { json: "conditionType", js: "conditionType", typ: r("ConditionType") },
        { json: "pipelineConditionInput", js: "pipelineConditionInput", typ: u(undefined, r("PipelineConditionInput")) },
        { json: "scheduleConditionInput", js: "scheduleConditionInput", typ: u(undefined, r("ScheduleConditionInput")) },
        { json: "webhookConditionInput", js: "webhookConditionInput", typ: u(undefined, r("WebhookConditionInput")) },
    ], "any"),
    "ArtifactConditionInput": o([
        { json: "artifactFilter", js: "artifactFilter", typ: u(undefined, "") },
        { json: "artifactSourceId", js: "artifactSourceId", typ: "" },
        { json: "regex", js: "regex", typ: u(undefined, true) },
    ], "any"),
    "PipelineConditionInput": o([
        { json: "pipelineId", js: "pipelineId", typ: "" },
    ], "any"),
    "ScheduleConditionInput": o([
        { json: "cronExpression", js: "cronExpression", typ: "" },
        { json: "onNewArtifactOnly", js: "onNewArtifactOnly", typ: u(undefined, true) },
    ], "any"),
    "WebhookConditionInput": o([
        { json: "bitbucketEvent", js: "bitbucketEvent", typ: u(undefined, r("BitbucketEvent")) },
        { json: "branchName", js: "branchName", typ: u(undefined, "") },
        { json: "branchRegex", js: "branchRegex", typ: u(undefined, "") },
        { json: "deployOnlyIfFilesChanged", js: "deployOnlyIfFilesChanged", typ: u(undefined, true) },
        { json: "filePaths", js: "filePaths", typ: u(undefined, a("")) },
        { json: "gitConnectorId", js: "gitConnectorId", typ: u(undefined, "") },
        { json: "githubEvent", js: "githubEvent", typ: u(undefined, r("GitHubEvent")) },
        { json: "gitlabEvent", js: "gitlabEvent", typ: u(undefined, r("GitlabEvent")) },
        { json: "webhookSourceType", js: "webhookSourceType", typ: r("WebhookSource") },
    ], "any"),
    "GitHubEvent": o([
        { json: "action", js: "action", typ: u(undefined, r("GitHubAction")) },
        { json: "event", js: "event", typ: u(undefined, r("GitHubEventType")) },
    ], "any"),
    "TriggerPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "trigger", js: "trigger", typ: u(undefined, r("Trigger")) },
    ], "any"),
    "Trigger": o([
        { json: "action", js: "action", typ: u(undefined, "any") },
        { json: "condition", js: "condition", typ: u(undefined, "any") },
        { json: "createdAt", js: "createdAt", typ: u(undefined, m("any")) },
        { json: "createdBy", js: "createdBy", typ: u(undefined, r("User")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "excludeHostsWithSameArtifact", js: "excludeHostsWithSameArtifact", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "CreateUser": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CreateUserArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("CreateUserPayload")) },
    ], "any"),
    "CreateUserArguments": o([
        { json: "input", js: "input", typ: r("CreateUserInput") },
    ], "any"),
    "CreateUserInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "email", js: "email", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "userGroupIds", js: "userGroupIds", typ: u(undefined, a("")) },
    ], "any"),
    "CreateUserPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "user", js: "user", typ: u(undefined, r("User")) },
    ], "any"),
    "CreateUserGroup": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CreateUserGroupArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("CreateUserGroupPayload")) },
    ], "any"),
    "CreateUserGroupArguments": o([
        { json: "input", js: "input", typ: r("CreateUserGroupInput") },
    ], "any"),
    "CreateUserGroupInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "notificationSettings", js: "notificationSettings", typ: u(undefined, r("NotificationSettingsInput")) },
        { json: "permissions", js: "permissions", typ: u(undefined, r("Permissions")) },
        { json: "ssoSetting", js: "ssoSetting", typ: u(undefined, r("SSOSettingInput")) },
        { json: "userIds", js: "userIds", typ: u(undefined, a("")) },
    ], "any"),
    "NotificationSettingsInput": o([
        { json: "groupEmailAddresses", js: "groupEmailAddresses", typ: u(undefined, a("")) },
        { json: "microsoftTeamsWebhookUrl", js: "microsoftTeamsWebhookUrl", typ: u(undefined, "") },
        { json: "pagerDutyIntegrationKey", js: "pagerDutyIntegrationKey", typ: u(undefined, "") },
        { json: "sendMailToNewMembers", js: "sendMailToNewMembers", typ: u(undefined, true) },
        { json: "sendNotificationToMembers", js: "sendNotificationToMembers", typ: u(undefined, true) },
        { json: "slackNotificationSetting", js: "slackNotificationSetting", typ: u(undefined, r("SlackNotificationSettingInput")) },
    ], "any"),
    "SlackNotificationSettingInput": o([
        { json: "slackChannelName", js: "slackChannelName", typ: u(undefined, "") },
        { json: "slackWebhookURL", js: "slackWebhookURL", typ: u(undefined, "") },
    ], "any"),
    "Permissions": o([
        { json: "accountPermissions", js: "accountPermissions", typ: u(undefined, r("AccountPermissionInput")) },
        { json: "appPermissions", js: "appPermissions", typ: u(undefined, a(r("ApplicationPermissionInput"))) },
    ], "any"),
    "AccountPermissionInput": o([
        { json: "accountPermissionTypes", js: "accountPermissionTypes", typ: u(undefined, a(r("AccountPermissionType"))) },
    ], "any"),
    "SSOSettingInput": o([
        { json: "ldapSettings", js: "ldapSettings", typ: u(undefined, r("LDAPSettingsInput")) },
        { json: "samlSettings", js: "samlSettings", typ: u(undefined, r("SAMLSettingsInput")) },
    ], "any"),
    "LDAPSettingsInput": o([
        { json: "groupDN", js: "groupDN", typ: "" },
        { json: "groupName", js: "groupName", typ: "" },
        { json: "ssoProviderId", js: "ssoProviderId", typ: "" },
    ], "any"),
    "SAMLSettingsInput": o([
        { json: "groupName", js: "groupName", typ: "" },
        { json: "ssoProviderId", js: "ssoProviderId", typ: "" },
    ], "any"),
    "CreateUserGroupPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "DeleteApplication": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeleteApplicationArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("DeleteApplicationPayload")) },
    ], "any"),
    "DeleteApplicationArguments": o([
        { json: "input", js: "input", typ: r("DeleteApplicationInput") },
    ], "any"),
    "DeleteApplicationInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "DeleteApplicationPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "DeleteCloudProvider": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeleteCloudProviderArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("DeleteCloudProviderPayload")) },
    ], "any"),
    "DeleteCloudProviderArguments": o([
        { json: "input", js: "input", typ: r("DeleteCloudProviderInput") },
    ], "any"),
    "DeleteCloudProviderInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "cloudProviderId", js: "cloudProviderId", typ: "" },
    ], "any"),
    "DeleteCloudProviderPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "DeleteSecret": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeleteSecretArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("DeleteSecretPayload")) },
    ], "any"),
    "DeleteSecretArguments": o([
        { json: "input", js: "input", typ: r("DeleteSecretInput") },
    ], "any"),
    "DeleteSecretInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "secretId", js: "secretId", typ: "" },
        { json: "secretType", js: "secretType", typ: r("SecretType") },
    ], "any"),
    "DeleteSecretPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "DeleteTrigger": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeleteTriggerArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("DeleteTriggerPayload")) },
    ], "any"),
    "DeleteTriggerArguments": o([
        { json: "input", js: "input", typ: r("DeleteTriggerInput") },
    ], "any"),
    "DeleteTriggerInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "triggerId", js: "triggerId", typ: "" },
    ], "any"),
    "DeleteTriggerPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "DeleteUser": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeleteUserArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("DeleteUserPayload")) },
    ], "any"),
    "DeleteUserArguments": o([
        { json: "input", js: "input", typ: r("DeleteUserInput") },
    ], "any"),
    "DeleteUserInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "id", js: "id", typ: "" },
    ], "any"),
    "DeleteUserPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "DeleteUserGroup": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeleteUserGroupArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("DeleteUserGroupPayload")) },
    ], "any"),
    "DeleteUserGroupArguments": o([
        { json: "input", js: "input", typ: r("DeleteUserGroupInput") },
    ], "any"),
    "DeleteUserGroupInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroupId", js: "userGroupId", typ: "" },
    ], "any"),
    "DeleteUserGroupPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "ExportExecutions": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ExportExecutionsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ExportExecutionsPayload")) },
    ], "any"),
    "ExportExecutionsArguments": o([
        { json: "input", js: "input", typ: r("ExportExecutionsInput") },
    ], "any"),
    "ExportExecutionsInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "filters", js: "filters", typ: u(undefined, a(r("ExecutionFilter"))) },
        { json: "notifyOnlyTriggeringUser", js: "notifyOnlyTriggeringUser", typ: u(undefined, true) },
        { json: "userGroupIds", js: "userGroupIds", typ: u(undefined, a("")) },
    ], "any"),
    "ExecutionFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, r("IDFilter")) },
        { json: "creationTime", js: "creationTime", typ: u(undefined, r("TimeFilter")) },
        { json: "duration", js: "duration", typ: u(undefined, r("NumberFilter")) },
        { json: "endTime", js: "endTime", typ: u(undefined, r("TimeFilter")) },
        { json: "environment", js: "environment", typ: u(undefined, r("IDFilter")) },
        { json: "execution", js: "execution", typ: u(undefined, r("IDFilter")) },
        { json: "pipeline", js: "pipeline", typ: u(undefined, r("IDFilter")) },
        { json: "pipelineExecutionId", js: "pipelineExecutionId", typ: u(undefined, r("IDFilter")) },
        { json: "service", js: "service", typ: u(undefined, r("IDFilter")) },
        { json: "startTime", js: "startTime", typ: u(undefined, r("TimeFilter")) },
        { json: "status", js: "status", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("DeploymentTagFilter")) },
        { json: "trigger", js: "trigger", typ: u(undefined, r("IDFilter")) },
        { json: "triggeredBy", js: "triggeredBy", typ: u(undefined, r("IDFilter")) },
        { json: "workflow", js: "workflow", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "IDFilter": o([
        { json: "operator", js: "operator", typ: r("IDOperator") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], "any"),
    "TimeFilter": o([
        { json: "operator", js: "operator", typ: r("TimeOperator") },
        { json: "value", js: "value", typ: m("any") },
    ], "any"),
    "NumberFilter": o([
        { json: "operator", js: "operator", typ: r("NumericOperator") },
        { json: "values", js: "values", typ: u(undefined, a(m("any"))) },
    ], "any"),
    "DeploymentTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("DeploymentTagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "TagInput": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], "any"),
    "ExportExecutionsPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "downloadLink", js: "downloadLink", typ: u(undefined, "") },
        { json: "errorMessage", js: "errorMessage", typ: u(undefined, "") },
        { json: "expiresAt", js: "expiresAt", typ: u(undefined, m("any")) },
        { json: "requestId", js: "requestId", typ: u(undefined, "") },
        { json: "status", js: "status", typ: u(undefined, r("ExportExecutionsStatus")) },
        { json: "statusLink", js: "statusLink", typ: u(undefined, "") },
        { json: "totalExecutions", js: "totalExecutions", typ: u(undefined, m("any")) },
        { json: "triggeredAt", js: "triggeredAt", typ: u(undefined, m("any")) },
    ], "any"),
    "RemoveApplicationGitSyncConfig": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("RemoveApplicationGitSyncConfigArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("RemoveApplicationGitSyncConfigPayload")) },
    ], "any"),
    "RemoveApplicationGitSyncConfigArguments": o([
        { json: "input", js: "input", typ: r("RemoveApplicationGitSyncConfigInput") },
    ], "any"),
    "RemoveApplicationGitSyncConfigInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "RemoveApplicationGitSyncConfigPayload": o([
        { json: "application", js: "application", typ: u(undefined, r("Application")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "RemoveUserFromUserGroup": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("RemoveUserFromUserGroupArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("RemoveUserFromUserGroupPayload")) },
    ], "any"),
    "RemoveUserFromUserGroupArguments": o([
        { json: "input", js: "input", typ: r("RemoveUserFromUserGroupInput") },
    ], "any"),
    "RemoveUserFromUserGroupInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroupId", js: "userGroupId", typ: "" },
        { json: "userId", js: "userId", typ: "" },
    ], "any"),
    "RemoveUserFromUserGroupPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "StartExecution": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("StartExecutionArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("StartExecutionPayload")) },
    ], "any"),
    "StartExecutionArguments": o([
        { json: "input", js: "input", typ: r("StartExecutionInput") },
    ], "any"),
    "StartExecutionInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "entityId", js: "entityId", typ: "" },
        { json: "excludeHostsWithSameArtifact", js: "excludeHostsWithSameArtifact", typ: u(undefined, true) },
        { json: "executionType", js: "executionType", typ: r("ExecutionType") },
        { json: "notes", js: "notes", typ: u(undefined, "") },
        { json: "serviceInputs", js: "serviceInputs", typ: u(undefined, a(r("ServiceInput"))) },
        { json: "specificHosts", js: "specificHosts", typ: u(undefined, a("")) },
        { json: "targetToSpecificHosts", js: "targetToSpecificHosts", typ: u(undefined, true) },
        { json: "variableInputs", js: "variableInputs", typ: u(undefined, a(r("VariableInput"))) },
    ], "any"),
    "ServiceInput": o([
        { json: "artifactValueInput", js: "artifactValueInput", typ: u(undefined, r("ArtfifactValueInput")) },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "ArtfifactValueInput": o([
        { json: "artifactId", js: "artifactId", typ: u(undefined, r("ArtifactIDInput")) },
        { json: "buildNumber", js: "buildNumber", typ: u(undefined, r("BuildNumberInput")) },
        { json: "valueType", js: "valueType", typ: r("ArtifactInputType") },
    ], "any"),
    "ArtifactIDInput": o([
        { json: "artifactId", js: "artifactId", typ: "" },
    ], "any"),
    "BuildNumberInput": o([
        { json: "artifactSourceName", js: "artifactSourceName", typ: "" },
        { json: "buildNumber", js: "buildNumber", typ: "" },
    ], "any"),
    "StartExecutionPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "execution", js: "execution", typ: u(undefined, "any") },
        { json: "warningMessage", js: "warningMessage", typ: u(undefined, "") },
    ], "any"),
    "UpdateApplication": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateApplicationArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateApplicationPayload")) },
    ], "any"),
    "UpdateApplicationArguments": o([
        { json: "input", js: "input", typ: r("UpdateApplicationInput") },
    ], "any"),
    "UpdateApplicationInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "UpdateApplicationPayload": o([
        { json: "application", js: "application", typ: u(undefined, r("Application")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
    ], "any"),
    "UpdateApplicationGitSyncConfig": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateApplicationGitSyncConfigArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateApplicationGitSyncConfigPayload")) },
    ], "any"),
    "UpdateApplicationGitSyncConfigArguments": o([
        { json: "input", js: "input", typ: r("UpdateApplicationGitSyncConfigInput") },
    ], "any"),
    "UpdateApplicationGitSyncConfigInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "branch", js: "branch", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "gitConnectorId", js: "gitConnectorId", typ: "" },
        { json: "syncEnabled", js: "syncEnabled", typ: true },
    ], "any"),
    "UpdateApplicationGitSyncConfigPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "gitSyncConfig", js: "gitSyncConfig", typ: u(undefined, r("GitSyncConfig")) },
    ], "any"),
    "UpdateApplicationGitSyncConfigStatus": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateApplicationGitSyncConfigStatusArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateApplicationGitSyncConfigStatusPayload")) },
    ], "any"),
    "UpdateApplicationGitSyncConfigStatusArguments": o([
        { json: "input", js: "input", typ: r("UpdateApplicationGitSyncConfigStatusInput") },
    ], "any"),
    "UpdateApplicationGitSyncConfigStatusInput": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "syncEnabled", js: "syncEnabled", typ: true },
    ], "any"),
    "UpdateApplicationGitSyncConfigStatusPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "gitSyncConfig", js: "gitSyncConfig", typ: u(undefined, r("GitSyncConfig")) },
    ], "any"),
    "UpdateCloudProvider": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateCloudProviderArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateCloudProviderPayload")) },
    ], "any"),
    "UpdateCloudProviderArguments": o([
        { json: "input", js: "input", typ: r("UpdateCloudProviderInput") },
    ], "any"),
    "UpdateCloudProviderInput": o([
        { json: "awsCloudProvider", js: "awsCloudProvider", typ: u(undefined, r("UpdateAwsCloudProviderInput")) },
        { json: "azureCloudProvider", js: "azureCloudProvider", typ: u(undefined, r("UpdateAzureCloudProviderInput")) },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "cloudProviderId", js: "cloudProviderId", typ: "" },
        { json: "cloudProviderType", js: "cloudProviderType", typ: r("CloudProviderType") },
        { json: "gcpCloudProvider", js: "gcpCloudProvider", typ: u(undefined, r("UpdateGcpCloudProviderInput")) },
        { json: "k8sCloudProvider", js: "k8sCloudProvider", typ: u(undefined, r("UpdateK8SCloudProviderInput")) },
        { json: "pcfCloudProvider", js: "pcfCloudProvider", typ: u(undefined, r("UpdatePcfCloudProviderInput")) },
        { json: "physicalDataCenterCloudProvider", js: "physicalDataCenterCloudProvider", typ: u(undefined, r("UpdatePhysicalDataCenterCloudProviderInput")) },
        { json: "spotInstCloudProvider", js: "spotInstCloudProvider", typ: u(undefined, r("UpdateSpotInstCloudProviderInput")) },
    ], "any"),
    "UpdateAwsCloudProviderInput": o([
        { json: "credentialsType", js: "credentialsType", typ: u(undefined, r("AwsCredentialsType")) },
        { json: "crossAccountAttributes", js: "crossAccountAttributes", typ: u(undefined, r("UpdateAwsCrossAccountAttributes")) },
        { json: "ec2IamCredentials", js: "ec2IamCredentials", typ: u(undefined, r("UpdateEc2IamCredentials")) },
        { json: "manualCredentials", js: "manualCredentials", typ: u(undefined, r("UpdateAwsManualCredentials")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "UpdateAwsCrossAccountAttributes": o([
        { json: "assumeCrossAccountRole", js: "assumeCrossAccountRole", typ: u(undefined, true) },
        { json: "crossAccountRoleArn", js: "crossAccountRoleArn", typ: u(undefined, "") },
        { json: "externalId", js: "externalId", typ: u(undefined, "") },
    ], "any"),
    "UpdateEc2IamCredentials": o([
        { json: "delegateSelector", js: "delegateSelector", typ: u(undefined, "") },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "UpdateAwsManualCredentials": o([
        { json: "accessKey", js: "accessKey", typ: u(undefined, "") },
        { json: "secretKeySecretId", js: "secretKeySecretId", typ: u(undefined, "") },
    ], "any"),
    "UpdateAzureCloudProviderInput": o([
        { json: "clientId", js: "clientId", typ: u(undefined, "") },
        { json: "keySecretId", js: "keySecretId", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "tenantId", js: "tenantId", typ: u(undefined, "") },
    ], "any"),
    "UpdateGcpCloudProviderInput": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "serviceAccountKeySecretId", js: "serviceAccountKeySecretId", typ: u(undefined, "") },
    ], "any"),
    "UpdateK8SCloudProviderInput": o([
        { json: "clusterDetailsType", js: "clusterDetailsType", typ: u(undefined, r("ClusterDetailsType")) },
        { json: "inheritClusterDetails", js: "inheritClusterDetails", typ: u(undefined, r("UpdateInheritClusterDetails")) },
        { json: "manualClusterDetails", js: "manualClusterDetails", typ: u(undefined, r("UpdateManualClusterDetails")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "skipValidation", js: "skipValidation", typ: u(undefined, true) },
    ], "any"),
    "UpdateInheritClusterDetails": o([
        { json: "delegateName", js: "delegateName", typ: u(undefined, "") },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "UpdateManualClusterDetails": o([
        { json: "masterUrl", js: "masterUrl", typ: u(undefined, "") },
        { json: "none", js: "none", typ: u(undefined, r("UpdateNone")) },
        { json: "oidcToken", js: "oidcToken", typ: u(undefined, r("UpdateOIDCToken")) },
        { json: "serviceAccountToken", js: "serviceAccountToken", typ: u(undefined, r("UpdateServiceAccountToken")) },
        { json: "type", js: "type", typ: u(undefined, r("ManualClusterDetailsAuthenticationType")) },
        { json: "usernameAndPassword", js: "usernameAndPassword", typ: u(undefined, r("UpdateUsernameAndPasswordAuthentication")) },
    ], "any"),
    "UpdateNone": o([
        { json: "caCertificateSecretId", js: "caCertificateSecretId", typ: u(undefined, "") },
        { json: "clientCertificateSecretId", js: "clientCertificateSecretId", typ: u(undefined, "") },
        { json: "clientKeyAlgorithm", js: "clientKeyAlgorithm", typ: u(undefined, "") },
        { json: "clientKeyPassphraseSecretId", js: "clientKeyPassphraseSecretId", typ: u(undefined, "") },
        { json: "clientKeySecretId", js: "clientKeySecretId", typ: u(undefined, "") },
        { json: "passwordSecretId", js: "passwordSecretId", typ: u(undefined, "") },
        { json: "serviceAccountTokenSecretId", js: "serviceAccountTokenSecretId", typ: u(undefined, "") },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
        { json: "userName", js: "userName", typ: u(undefined, "") },
    ], "any"),
    "UpdateOIDCToken": o([
        { json: "clientIdSecretId", js: "clientIdSecretId", typ: u(undefined, "") },
        { json: "clientSecretSecretId", js: "clientSecretSecretId", typ: u(undefined, "") },
        { json: "identityProviderUrl", js: "identityProviderUrl", typ: u(undefined, "") },
        { json: "passwordSecretId", js: "passwordSecretId", typ: u(undefined, "") },
        { json: "scopes", js: "scopes", typ: u(undefined, "") },
        { json: "userName", js: "userName", typ: u(undefined, "") },
    ], "any"),
    "UpdateServiceAccountToken": o([
        { json: "serviceAccountTokenSecretId", js: "serviceAccountTokenSecretId", typ: u(undefined, "") },
    ], "any"),
    "UpdateUsernameAndPasswordAuthentication": o([
        { json: "passwordSecretId", js: "passwordSecretId", typ: u(undefined, "") },
        { json: "userName", js: "userName", typ: u(undefined, "") },
        { json: "userNameSecretId", js: "userNameSecretId", typ: u(undefined, "") },
    ], "any"),
    "UpdatePcfCloudProviderInput": o([
        { json: "endpointUrl", js: "endpointUrl", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "passwordSecretId", js: "passwordSecretId", typ: u(undefined, "") },
        { json: "skipValidation", js: "skipValidation", typ: u(undefined, true) },
        { json: "userName", js: "userName", typ: u(undefined, "") },
        { json: "userNameSecretId", js: "userNameSecretId", typ: u(undefined, "") },
    ], "any"),
    "UpdatePhysicalDataCenterCloudProviderInput": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "UpdateSpotInstCloudProviderInput": o([
        { json: "accountId", js: "accountId", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "tokenSecretId", js: "tokenSecretId", typ: u(undefined, "") },
    ], "any"),
    "UpdateCloudProviderPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, "any") },
    ], "any"),
    "UpdateSecret": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateSecretArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateSecretPayload")) },
    ], "any"),
    "UpdateSecretArguments": o([
        { json: "input", js: "input", typ: r("UpdateSecretInput") },
    ], "any"),
    "UpdateSecretInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "encryptedText", js: "encryptedText", typ: u(undefined, r("UpdateEncryptedText")) },
        { json: "secretId", js: "secretId", typ: "" },
        { json: "secretType", js: "secretType", typ: r("SecretType") },
        { json: "sshCredential", js: "sshCredential", typ: u(undefined, r("UpdateSSHCredential")) },
        { json: "winRMCredential", js: "winRMCredential", typ: u(undefined, r("UpdateWinRMCredential")) },
    ], "any"),
    "UpdateEncryptedText": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "scopedToAccount", js: "scopedToAccount", typ: u(undefined, true) },
        { json: "secretReference", js: "secretReference", typ: u(undefined, "") },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], "any"),
    "UpdateSSHCredential": o([
        { json: "authenticationScheme", js: "authenticationScheme", typ: u(undefined, r("SSHAuthenticationScheme")) },
        { json: "kerberosAuthentication", js: "kerberosAuthentication", typ: u(undefined, r("KerberosAuthenticationInput")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "sshAuthentication", js: "sshAuthentication", typ: u(undefined, r("SSHAuthenticationInput")) },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
    ], "any"),
    "UpdateWinRMCredential": o([
        { json: "authenticationScheme", js: "authenticationScheme", typ: u(undefined, r("WinRMAuthenticationScheme")) },
        { json: "domain", js: "domain", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "passwordSecretId", js: "passwordSecretId", typ: u(undefined, "") },
        { json: "port", js: "port", typ: u(undefined, 3.14) },
        { json: "skipCertCheck", js: "skipCertCheck", typ: u(undefined, true) },
        { json: "usageScope", js: "usageScope", typ: u(undefined, r("UsageScopeInput")) },
        { json: "userName", js: "userName", typ: u(undefined, "") },
        { json: "useSSL", js: "useSSL", typ: u(undefined, true) },
    ], "any"),
    "UpdateSecretPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "secret", js: "secret", typ: u(undefined, "any") },
    ], "any"),
    "UpdateTrigger": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateTriggerArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateTriggerPayload")) },
    ], "any"),
    "UpdateTriggerArguments": o([
        { json: "input", js: "input", typ: r("UpdateTriggerInput") },
    ], "any"),
    "UpdateTriggerInput": o([
        { json: "action", js: "action", typ: r("TriggerActionInput") },
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "condition", js: "condition", typ: r("TriggerConditionInput") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "triggerId", js: "triggerId", typ: "" },
    ], "any"),
    "UpdateTriggerPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "trigger", js: "trigger", typ: u(undefined, r("Trigger")) },
    ], "any"),
    "UpdateUser": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateUserArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateUserPayload")) },
    ], "any"),
    "UpdateUserArguments": o([
        { json: "input", js: "input", typ: r("UpdateUserInput") },
    ], "any"),
    "UpdateUserInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "userGroupIds", js: "userGroupIds", typ: u(undefined, a("")) },
    ], "any"),
    "UpdateUserPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "user", js: "user", typ: u(undefined, r("User")) },
    ], "any"),
    "UpdateUserGroup": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateUserGroupArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateUserGroupPayload")) },
    ], "any"),
    "UpdateUserGroupArguments": o([
        { json: "input", js: "input", typ: r("UpdateUserGroupInput") },
    ], "any"),
    "UpdateUserGroupInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "notificationSettings", js: "notificationSettings", typ: u(undefined, r("NotificationSettingsInput")) },
        { json: "permissions", js: "permissions", typ: u(undefined, r("Permissions")) },
        { json: "ssoSetting", js: "ssoSetting", typ: u(undefined, r("SSOSettingInput")) },
        { json: "userGroupId", js: "userGroupId", typ: "" },
        { json: "userIds", js: "userIds", typ: u(undefined, a("")) },
    ], "any"),
    "UpdateUserGroupPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "UpdateUserGroupPermissions": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UpdateUserGroupPermissionsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UpdateUserGroupPermissionsPayload")) },
    ], "any"),
    "UpdateUserGroupPermissionsArguments": o([
        { json: "input", js: "input", typ: u(undefined, r("UpdateUserGroupPermissionsInput")) },
    ], "any"),
    "UpdateUserGroupPermissionsInput": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "permissions", js: "permissions", typ: r("Permissions") },
        { json: "userGroupId", js: "userGroupId", typ: "" },
    ], "any"),
    "UpdateUserGroupPermissionsPayload": o([
        { json: "clientMutationId", js: "clientMutationId", typ: u(undefined, "") },
        { json: "permissions", js: "permissions", typ: u(undefined, r("UserGroupPermissions")) },
    ], "any"),
    "Query": o([
        { json: "application", js: "application", typ: u(undefined, r("QueryApplication")) },
        { json: "applicationByName", js: "applicationByName", typ: u(undefined, r("ApplicationByName")) },
        { json: "applications", js: "applications", typ: u(undefined, r("Applications")) },
        { json: "artifact", js: "artifact", typ: u(undefined, r("Artifact")) },
        { json: "artifacts", js: "artifacts", typ: u(undefined, r("Artifacts")) },
        { json: "auditChangeContent", js: "auditChangeContent", typ: u(undefined, r("AuditChangeContent")) },
        { json: "audits", js: "audits", typ: u(undefined, r("Audits")) },
        { json: "ceClusterBillingData", js: "ceClusterBillingData", typ: u(undefined, r("CeClusterBillingDataObject")) },
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, r("CloudProvider")) },
        { json: "cloudProviderByName", js: "cloudProviderByName", typ: u(undefined, r("CloudProviderByName")) },
        { json: "cloudProviders", js: "cloudProviders", typ: u(undefined, r("CloudProviders")) },
        { json: "connector", js: "connector", typ: u(undefined, r("Connector")) },
        { json: "connectors", js: "connectors", typ: u(undefined, r("Connectors")) },
        { json: "deploymentStats", js: "deploymentStats", typ: u(undefined, r("DeploymentStats")) },
        { json: "environment", js: "environment", typ: u(undefined, r("EnvironmentObject")) },
        { json: "environments", js: "environments", typ: u(undefined, r("Environments")) },
        { json: "execution", js: "execution", typ: u(undefined, r("Execution")) },
        { json: "executionInputs", js: "executionInputs", typ: u(undefined, r("ExecutionInputs")) },
        { json: "executions", js: "executions", typ: u(undefined, r("Executions")) },
        { json: "instances", js: "instances", typ: u(undefined, r("Instances")) },
        { json: "k8sLabels", js: "k8sLabels", typ: u(undefined, r("K8SLabels")) },
        { json: "pipeline", js: "pipeline", typ: u(undefined, r("PipelineObject")) },
        { json: "pipelineByName", js: "pipelineByName", typ: u(undefined, r("PipelineByName")) },
        { json: "pipelines", js: "pipelines", typ: u(undefined, r("Pipelines")) },
        { json: "secret", js: "secret", typ: u(undefined, r("Secret")) },
        { json: "secretByName", js: "secretByName", typ: u(undefined, r("SecretByName")) },
        { json: "secretManager", js: "secretManager", typ: u(undefined, r("SecretManager")) },
        { json: "secretManagerByName", js: "secretManagerByName", typ: u(undefined, r("SecretManagerByName")) },
        { json: "secretManagers", js: "secretManagers", typ: u(undefined, r("SecretManagers")) },
        { json: "service", js: "service", typ: u(undefined, r("ServiceObject")) },
        { json: "services", js: "services", typ: u(undefined, r("Services")) },
        { json: "ssoProvider", js: "ssoProvider", typ: u(undefined, r("SsoProvider")) },
        { json: "ssoProviders", js: "ssoProviders", typ: u(undefined, r("SsoProviders")) },
        { json: "trigger", js: "trigger", typ: u(undefined, r("QueryTrigger")) },
        { json: "triggerByName", js: "triggerByName", typ: u(undefined, r("TriggerByName")) },
        { json: "triggers", js: "triggers", typ: u(undefined, r("Triggers")) },
        { json: "user", js: "user", typ: u(undefined, r("QueryUser")) },
        { json: "userByName", js: "userByName", typ: u(undefined, r("UserByName")) },
        { json: "userGroup", js: "userGroup", typ: u(undefined, r("QueryUserGroup")) },
        { json: "userGroupByName", js: "userGroupByName", typ: u(undefined, r("UserGroupByName")) },
        { json: "userGroups", js: "userGroups", typ: u(undefined, r("UserGroups")) },
        { json: "users", js: "users", typ: u(undefined, r("Users")) },
        { json: "workflow", js: "workflow", typ: u(undefined, r("WorkflowObject")) },
        { json: "workflowByName", js: "workflowByName", typ: u(undefined, r("WorkflowByName")) },
        { json: "workflows", js: "workflows", typ: u(undefined, r("Workflows")) },
    ], "any"),
    "QueryApplication": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ApplicationArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Application")) },
    ], "any"),
    "ApplicationArguments": o([
        { json: "applicationId", js: "applicationId", typ: "" },
    ], "any"),
    "ApplicationByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ApplicationByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Application")) },
    ], "any"),
    "ApplicationByNameArguments": o([
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "Applications": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ApplicationsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ApplicationConnection")) },
    ], "any"),
    "ApplicationsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ApplicationFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ApplicationFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("ApplicationTagFilter")) },
    ], "any"),
    "ApplicationTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("TagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "ApplicationConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("Application"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Artifact": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ArtifactArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ReturnElement")) },
    ], "any"),
    "ArtifactArguments": o([
        { json: "artifactId", js: "artifactId", typ: "" },
    ], "any"),
    "ReturnElement": o([
        { json: "artifactSource", js: "artifactSource", typ: u(undefined, "any") },
        { json: "buildNo", js: "buildNo", typ: u(undefined, "") },
        { json: "collectedAt", js: "collectedAt", typ: u(undefined, m("any")) },
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "Artifacts": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ArtifactsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ArtifactConnection")) },
    ], "any"),
    "ArtifactsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ArtifactFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ArtifactFilter": o([
        { json: "artifact", js: "artifact", typ: u(undefined, r("IDFilter")) },
        { json: "artifactSource", js: "artifactSource", typ: u(undefined, r("IDFilter")) },
        { json: "artifactStreamType", js: "artifactStreamType", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "ArtifactConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("ReturnElement"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "AuditChangeContent": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("AuditChangeContentArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ChangeContentConnection")) },
    ], "any"),
    "AuditChangeContentArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ChangeContentFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ChangeContentFilter": o([
        { json: "changeSetId", js: "changeSetId", typ: "" },
        { json: "resourceId", js: "resourceId", typ: u(undefined, "") },
    ], "any"),
    "ChangeContentConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("ChangeContent"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "ChangeContent": o([
        { json: "changeSetId", js: "changeSetId", typ: u(undefined, "") },
        { json: "newYaml", js: "newYaml", typ: u(undefined, "") },
        { json: "newYamlPath", js: "newYamlPath", typ: u(undefined, "") },
        { json: "oldYaml", js: "oldYaml", typ: u(undefined, "") },
        { json: "oldYamlPath", js: "oldYamlPath", typ: u(undefined, "") },
        { json: "resourceId", js: "resourceId", typ: u(undefined, "") },
    ], "any"),
    "Audits": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("AuditsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ChangeSetConnection")) },
    ], "any"),
    "AuditsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ChangeSetFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ChangeSetFilter": o([
        { json: "time", js: "time", typ: u(undefined, r("TimeRangeFilter")) },
    ], "any"),
    "TimeRangeFilter": o([
        { json: "relative", js: "relative", typ: u(undefined, r("RelativeTimeRange")) },
        { json: "specific", js: "specific", typ: u(undefined, r("TimeRange")) },
    ], "any"),
    "RelativeTimeRange": o([
        { json: "noOfUnits", js: "noOfUnits", typ: m("any") },
        { json: "timeUnit", js: "timeUnit", typ: r("TimeUnit") },
    ], "any"),
    "TimeRange": o([
        { json: "from", js: "from", typ: m("any") },
        { json: "to", js: "to", typ: u(undefined, m("any")) },
    ], "any"),
    "ChangeSetConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a("any")) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "CeClusterBillingDataObject": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CeClusterBillingDataArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ReturnObject")) },
    ], "any"),
    "CeClusterBillingDataArguments": o([
        { json: "aggregateFunction", js: "aggregateFunction", typ: u(undefined, a(r("CeAggregation"))) },
        { json: "filters", js: "filters", typ: u(undefined, a(r("CeFilter"))) },
        { json: "groupBy", js: "groupBy", typ: u(undefined, a(r("CeGroupBy"))) },
        { json: "limit", js: "limit", typ: u(undefined, 3.14) },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
        { json: "sortCriteria", js: "sortCriteria", typ: u(undefined, a(r("CeSort"))) },
    ], "any"),
    "CeAggregation": o([
        { json: "cost", js: "cost", typ: u(undefined, r("CeCost")) },
        { json: "function", js: "function", typ: u(undefined, r("Tion")) },
    ], "any"),
    "CeFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "cluster", js: "cluster", typ: u(undefined, r("IDFilter")) },
        { json: "ecsService", js: "ecsService", typ: u(undefined, r("IDFilter")) },
        { json: "endTime", js: "endTime", typ: u(undefined, r("TimeFilter")) },
        { json: "environment", js: "environment", typ: u(undefined, r("IDFilter")) },
        { json: "instanceType", js: "instanceType", typ: u(undefined, r("IDFilter")) },
        { json: "label", js: "label", typ: u(undefined, r("CeLabelFilter")) },
        { json: "launchType", js: "launchType", typ: u(undefined, r("IDFilter")) },
        { json: "namespace", js: "namespace", typ: u(undefined, r("IDFilter")) },
        { json: "node", js: "node", typ: u(undefined, r("IDFilter")) },
        { json: "pod", js: "pod", typ: u(undefined, r("IDFilter")) },
        { json: "service", js: "service", typ: u(undefined, r("IDFilter")) },
        { json: "startTime", js: "startTime", typ: u(undefined, r("TimeFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("CeTagFilter")) },
        { json: "task", js: "task", typ: u(undefined, r("IDFilter")) },
        { json: "workload", js: "workload", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "CeLabelFilter": o([
        { json: "labels", js: "labels", typ: u(undefined, a(r("K8SLabelInput"))) },
    ], "any"),
    "K8SLabelInput": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], "any"),
    "CeTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("CeTagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "CeGroupBy": o([
        { json: "entity", js: "entity", typ: u(undefined, r("CeEntityGroupBy")) },
        { json: "labelAggregation", js: "labelAggregation", typ: u(undefined, r("CeLabelAggregation")) },
        { json: "tagAggregation", js: "tagAggregation", typ: u(undefined, r("CeTagAggregation")) },
        { json: "time", js: "time", typ: u(undefined, r("CeTimeAggregation")) },
    ], "any"),
    "CeLabelAggregation": o([
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "CeTagAggregation": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("CeTagType")) },
        { json: "tagName", js: "tagName", typ: u(undefined, "") },
    ], "any"),
    "CeTimeAggregation": o([
        { json: "timePeriod", js: "timePeriod", typ: u(undefined, r("TimeGroupType")) },
    ], "any"),
    "CeSort": o([
        { json: "order", js: "order", typ: u(undefined, r("SortOrder")) },
        { json: "sortType", js: "sortType", typ: u(undefined, r("CeSortType")) },
    ], "any"),
    "ReturnObject": o([
        { json: "data", js: "data", typ: u(undefined, a(r("BillingDataEntry"))) },
    ], "any"),
    "BillingDataEntry": o([
        { json: "avgCpuUtilization", js: "avgCpuUtilization", typ: u(undefined, m("any")) },
        { json: "avgMemoryUtilization", js: "avgMemoryUtilization", typ: u(undefined, m("any")) },
        { json: "cluster", js: "cluster", typ: u(undefined, "") },
        { json: "clusterType", js: "clusterType", typ: u(undefined, "") },
        { json: "cpuLimit", js: "cpuLimit", typ: u(undefined, m("any")) },
        { json: "cpuRequest", js: "cpuRequest", typ: u(undefined, m("any")) },
        { json: "ecs", js: "ecs", typ: u(undefined, r("CeEcsEntity")) },
        { json: "harness", js: "harness", typ: u(undefined, r("CeHarnessEntity")) },
        { json: "idleCost", js: "idleCost", typ: u(undefined, m("any")) },
        { json: "instanceType", js: "instanceType", typ: u(undefined, "") },
        { json: "k8s", js: "k8s", typ: u(undefined, r("CeK8SEntity")) },
        { json: "labelName", js: "labelName", typ: u(undefined, "") },
        { json: "labelValue", js: "labelValue", typ: u(undefined, "") },
        { json: "maxCpuUtilization", js: "maxCpuUtilization", typ: u(undefined, m("any")) },
        { json: "maxMemoryUtilization", js: "maxMemoryUtilization", typ: u(undefined, m("any")) },
        { json: "memoryLimit", js: "memoryLimit", typ: u(undefined, m("any")) },
        { json: "memoryRequest", js: "memoryRequest", typ: u(undefined, m("any")) },
        { json: "region", js: "region", typ: u(undefined, "") },
        { json: "startTime", js: "startTime", typ: u(undefined, m("any")) },
        { json: "systemCost", js: "systemCost", typ: u(undefined, m("any")) },
        { json: "tagName", js: "tagName", typ: u(undefined, "") },
        { json: "tagValue", js: "tagValue", typ: u(undefined, "") },
        { json: "totalCost", js: "totalCost", typ: u(undefined, m("any")) },
        { json: "unallocatedCost", js: "unallocatedCost", typ: u(undefined, m("any")) },
    ], "any"),
    "CeEcsEntity": o([
        { json: "launchType", js: "launchType", typ: u(undefined, "") },
        { json: "service", js: "service", typ: u(undefined, "") },
        { json: "taskId", js: "taskId", typ: u(undefined, "") },
    ], "any"),
    "CeHarnessEntity": o([
        { json: "application", js: "application", typ: u(undefined, "") },
        { json: "environment", js: "environment", typ: u(undefined, "") },
        { json: "service", js: "service", typ: u(undefined, "") },
    ], "any"),
    "CeK8SEntity": o([
        { json: "namespace", js: "namespace", typ: u(undefined, "") },
        { json: "node", js: "node", typ: u(undefined, "") },
        { json: "pod", js: "pod", typ: u(undefined, "") },
        { json: "workload", js: "workload", typ: u(undefined, "") },
    ], "any"),
    "CloudProvider": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CloudProviderArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "CloudProviderArguments": o([
        { json: "cloudProviderId", js: "cloudProviderId", typ: "" },
    ], "any"),
    "CloudProviderByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CloudProviderByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "CloudProviderByNameArguments": o([
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "CloudProviders": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("CloudProvidersArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("CloudProviderConnection")) },
    ], "any"),
    "CloudProvidersArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("CloudProviderFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "CloudProviderFilter": o([
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, r("IDFilter")) },
        { json: "cloudProviderType", js: "cloudProviderType", typ: u(undefined, r("CloudProviderTypeFilter")) },
        { json: "createdAt", js: "createdAt", typ: u(undefined, r("TimeFilter")) },
    ], "any"),
    "CloudProviderTypeFilter": o([
        { json: "operator", js: "operator", typ: u(undefined, r("EnumOperator")) },
        { json: "values", js: "values", typ: u(undefined, a(r("CloudProviderType"))) },
    ], "any"),
    "CloudProviderConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a("any")) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Connector": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ConnectorArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "ConnectorArguments": o([
        { json: "connectorId", js: "connectorId", typ: "" },
    ], "any"),
    "Connectors": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ConnectorsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ConnectorConnection")) },
    ], "any"),
    "ConnectorsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ConnectorFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ConnectorFilter": o([
        { json: "connector", js: "connector", typ: u(undefined, r("IDFilter")) },
        { json: "connectorType", js: "connectorType", typ: u(undefined, r("ConnectorTypeFilter")) },
        { json: "createdAt", js: "createdAt", typ: u(undefined, r("TimeFilter")) },
    ], "any"),
    "ConnectorTypeFilter": o([
        { json: "operator", js: "operator", typ: u(undefined, r("EnumOperator")) },
        { json: "values", js: "values", typ: u(undefined, a(r("ConnectorType"))) },
    ], "any"),
    "ConnectorConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a("any")) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "DeploymentStats": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("DeploymentStatsArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "DeploymentStatsArguments": o([
        { json: "aggregateFunction", js: "aggregateFunction", typ: u(undefined, r("DeploymentAggregationFunction")) },
        { json: "filters", js: "filters", typ: u(undefined, a(r("DeploymentFilter"))) },
        { json: "groupBy", js: "groupBy", typ: u(undefined, a(r("DeploymentAggregation"))) },
        { json: "sortCriteria", js: "sortCriteria", typ: u(undefined, a(r("DeploymentSortCriteria"))) },
    ], "any"),
    "DeploymentAggregationFunction": o([
        { json: "count", js: "count", typ: u(undefined, r("Tion")) },
        { json: "duration", js: "duration", typ: u(undefined, r("DurationAggregateOperation")) },
        { json: "instancesDeployed", js: "instancesDeployed", typ: u(undefined, r("Tion")) },
        { json: "rollbackDuration", js: "rollbackDuration", typ: u(undefined, r("DurationAggregateOperation")) },
    ], "any"),
    "DeploymentFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, r("IDFilter")) },
        { json: "duration", js: "duration", typ: u(undefined, r("NumberFilter")) },
        { json: "endTime", js: "endTime", typ: u(undefined, r("TimeFilter")) },
        { json: "environment", js: "environment", typ: u(undefined, r("IDFilter")) },
        { json: "environmentType", js: "environmentType", typ: u(undefined, r("EnvironmentTypeFilter")) },
        { json: "pipeline", js: "pipeline", typ: u(undefined, r("IDFilter")) },
        { json: "rollbackDuration", js: "rollbackDuration", typ: u(undefined, r("NumberFilter")) },
        { json: "service", js: "service", typ: u(undefined, r("IDFilter")) },
        { json: "startTime", js: "startTime", typ: u(undefined, r("TimeFilter")) },
        { json: "status", js: "status", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("DeploymentTagFilter")) },
        { json: "trigger", js: "trigger", typ: u(undefined, r("IDFilter")) },
        { json: "triggeredBy", js: "triggeredBy", typ: u(undefined, r("IDFilter")) },
        { json: "workflow", js: "workflow", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "EnvironmentTypeFilter": o([
        { json: "operator", js: "operator", typ: u(undefined, r("EnumOperator")) },
        { json: "values", js: "values", typ: u(undefined, a(r("EnvironmentType"))) },
    ], "any"),
    "DeploymentAggregation": o([
        { json: "entityAggregation", js: "entityAggregation", typ: u(undefined, r("DeploymentEntityAggregation")) },
        { json: "tagAggregation", js: "tagAggregation", typ: u(undefined, r("DeploymentTagAggregation")) },
        { json: "timeAggregation", js: "timeAggregation", typ: u(undefined, r("TimeSeriesAggregation")) },
    ], "any"),
    "DeploymentTagAggregation": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("DeploymentTagType")) },
        { json: "tagName", js: "tagName", typ: u(undefined, "") },
    ], "any"),
    "TimeSeriesAggregation": o([
        { json: "timeAggregationType", js: "timeAggregationType", typ: u(undefined, r("TimeAggregationType")) },
        { json: "timeAggregationValue", js: "timeAggregationValue", typ: u(undefined, 3.14) },
    ], "any"),
    "DeploymentSortCriteria": o([
        { json: "sortOrder", js: "sortOrder", typ: u(undefined, r("SortOrder")) },
        { json: "sortType", js: "sortType", typ: u(undefined, r("DeploymentSortType")) },
    ], "any"),
    "EnvironmentObject": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("EnvironmentArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Environment")) },
    ], "any"),
    "EnvironmentArguments": o([
        { json: "environmentId", js: "environmentId", typ: "" },
    ], "any"),
    "Environments": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("EnvironmentsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("EnvironmentConnection")) },
    ], "any"),
    "EnvironmentsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("EnvironmentFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "EnvironmentFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "environment", js: "environment", typ: u(undefined, r("IDFilter")) },
        { json: "environmentType", js: "environmentType", typ: u(undefined, r("EnvironmentTypeFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("EnvironmentTagFilter")) },
    ], "any"),
    "EnvironmentTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("TagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "Execution": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ExecutionArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "ExecutionArguments": o([
        { json: "executionId", js: "executionId", typ: "" },
    ], "any"),
    "ExecutionInputs": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ExecutionInputsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ExecutionInputsReturn")) },
    ], "any"),
    "ExecutionInputsArguments": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "entityId", js: "entityId", typ: "" },
        { json: "executionType", js: "executionType", typ: r("ExecutionType") },
        { json: "variableInputs", js: "variableInputs", typ: u(undefined, a(r("VariableInput"))) },
    ], "any"),
    "ExecutionInputsReturn": o([
        { json: "serviceInputs", js: "serviceInputs", typ: u(undefined, a(r("Service"))) },
    ], "any"),
    "Executions": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ExecutionsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ExecutionConnection")) },
    ], "any"),
    "ExecutionsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ExecutionFilter"))) },
        { json: "includeIndirectExecutions", js: "includeIndirectExecutions", typ: u(undefined, true) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ExecutionConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a("any")) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "Instances": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("InstancesArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("InstanceConnection")) },
    ], "any"),
    "InstancesArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("InstanceFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "InstanceFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "cloudProvider", js: "cloudProvider", typ: u(undefined, r("IDFilter")) },
        { json: "createdAt", js: "createdAt", typ: u(undefined, r("TimeFilter")) },
        { json: "environment", js: "environment", typ: u(undefined, r("IDFilter")) },
        { json: "instanceType", js: "instanceType", typ: u(undefined, r("InstanceType")) },
        { json: "service", js: "service", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("InstanceTagFilter")) },
    ], "any"),
    "InstanceTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("CeTagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "InstanceConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a("any")) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "K8SLabels": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("K8SLabelsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("K8SLabelConnection")) },
    ], "any"),
    "K8SLabelsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("K8SLabelFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "K8SLabelFilter": o([
        { json: "cluster", js: "cluster", typ: u(undefined, r("IDFilter")) },
        { json: "endTime", js: "endTime", typ: u(undefined, r("TimeFilter")) },
        { json: "namespace", js: "namespace", typ: u(undefined, r("IDFilter")) },
        { json: "startTime", js: "startTime", typ: u(undefined, r("TimeFilter")) },
        { json: "workloadName", js: "workloadName", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "K8SLabelConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("K8SLabel"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "K8SLabel": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], "any"),
    "PipelineObject": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("PipelineArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Pipeline")) },
    ], "any"),
    "PipelineArguments": o([
        { json: "pipelineId", js: "pipelineId", typ: "" },
    ], "any"),
    "PipelineByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("PipelineByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Pipeline")) },
    ], "any"),
    "PipelineByNameArguments": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "pipelineName", js: "pipelineName", typ: "" },
    ], "any"),
    "Pipelines": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("PipelinesArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("PipelineConnection")) },
    ], "any"),
    "PipelinesArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("PipelineFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "PipelineFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "pipeline", js: "pipeline", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("PipelineTagFilter")) },
    ], "any"),
    "PipelineTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("TagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "Secret": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SecretArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "SecretArguments": o([
        { json: "secretId", js: "secretId", typ: "" },
        { json: "secretType", js: "secretType", typ: r("SecretType") },
    ], "any"),
    "SecretByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SecretByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, "any") },
    ], "any"),
    "SecretByNameArguments": o([
        { json: "name", js: "name", typ: "" },
        { json: "secretType", js: "secretType", typ: r("SecretType") },
    ], "any"),
    "SecretManager": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SecretManagerArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("NodeElement")) },
    ], "any"),
    "SecretManagerArguments": o([
        { json: "secretManagerId", js: "secretManagerId", typ: "" },
    ], "any"),
    "NodeElement": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "SecretManagerByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SecretManagerByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("NodeElement")) },
    ], "any"),
    "SecretManagerByNameArguments": o([
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "SecretManagers": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SecretManagersArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("SecretManagerConnection")) },
    ], "any"),
    "SecretManagersArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("SecretManagerFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "SecretManagerFilter": o([
        { json: "secretManager", js: "secretManager", typ: u(undefined, r("IDFilter")) },
        { json: "type", js: "type", typ: u(undefined, r("SecretManagerTypeFilter")) },
    ], "any"),
    "SecretManagerTypeFilter": o([
        { json: "operator", js: "operator", typ: u(undefined, r("EnumOperator")) },
        { json: "values", js: "values", typ: u(undefined, a(r("SecretManagerType"))) },
    ], "any"),
    "SecretManagerConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("NodeElement"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "ServiceObject": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ServiceArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Service")) },
    ], "any"),
    "ServiceArguments": o([
        { json: "serviceId", js: "serviceId", typ: "" },
    ], "any"),
    "Services": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("ServicesArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("ServiceConnection")) },
    ], "any"),
    "ServicesArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("ServiceFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "ServiceFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "service", js: "service", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("ServiceTagFilter")) },
    ], "any"),
    "ServiceTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("TagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "SsoProvider": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SsoProviderArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("SSOProvider")) },
    ], "any"),
    "SsoProviderArguments": o([
        { json: "ssoProviderId", js: "ssoProviderId", typ: "" },
    ], "any"),
    "SSOProvider": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "ssoType", js: "ssoType", typ: u(undefined, r("SSOType")) },
    ], "any"),
    "SsoProviders": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("SsoProvidersArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("SSOProviderConnection")) },
    ], "any"),
    "SsoProvidersArguments": o([
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "SSOProviderConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("SSOProvider"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "QueryTrigger": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("TriggerArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Trigger")) },
    ], "any"),
    "TriggerArguments": o([
        { json: "triggerId", js: "triggerId", typ: "" },
    ], "any"),
    "TriggerByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("TriggerByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Trigger")) },
    ], "any"),
    "TriggerByNameArguments": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "triggerName", js: "triggerName", typ: "" },
    ], "any"),
    "Triggers": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("TriggersArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("TriggerConnection")) },
    ], "any"),
    "TriggersArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("TriggerFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "TriggerFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("TriggerTagFilter")) },
        { json: "trigger", js: "trigger", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "TriggerTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("TagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "TriggerConnection": o([
        { json: "nodes", js: "nodes", typ: u(undefined, a(r("Trigger"))) },
        { json: "pageInfo", js: "pageInfo", typ: u(undefined, r("PageInfo")) },
    ], "any"),
    "QueryUser": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UserArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("User")) },
    ], "any"),
    "UserArguments": o([
        { json: "id", js: "id", typ: "" },
    ], "any"),
    "UserByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UserByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("User")) },
    ], "any"),
    "UserByNameArguments": o([
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "QueryUserGroup": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UserGroupArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "UserGroupArguments": o([
        { json: "userGroupId", js: "userGroupId", typ: "" },
    ], "any"),
    "UserGroupByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UserGroupByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UserGroup")) },
    ], "any"),
    "UserGroupByNameArguments": o([
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "UserGroups": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UserGroupsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UserGroupConnection")) },
    ], "any"),
    "UserGroupsArguments": o([
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "Users": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("UsersArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("UserConnection")) },
    ], "any"),
    "UsersArguments": o([
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "WorkflowObject": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("WorkflowArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Workflow")) },
    ], "any"),
    "WorkflowArguments": o([
        { json: "workflowId", js: "workflowId", typ: "" },
    ], "any"),
    "WorkflowByName": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("WorkflowByNameArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("Workflow")) },
    ], "any"),
    "WorkflowByNameArguments": o([
        { json: "applicationId", js: "applicationId", typ: "" },
        { json: "workflowName", js: "workflowName", typ: "" },
    ], "any"),
    "Workflows": o([
        { json: "arguments", js: "arguments", typ: u(undefined, r("WorkflowsArguments")) },
        { json: "return", js: "return", typ: u(undefined, r("WorkflowConnection")) },
    ], "any"),
    "WorkflowsArguments": o([
        { json: "filters", js: "filters", typ: u(undefined, a(r("WorkflowFilter"))) },
        { json: "limit", js: "limit", typ: 3.14 },
        { json: "offset", js: "offset", typ: u(undefined, 3.14) },
    ], "any"),
    "WorkflowFilter": o([
        { json: "application", js: "application", typ: u(undefined, r("IDFilter")) },
        { json: "tag", js: "tag", typ: u(undefined, r("WorkflowTagFilter")) },
        { json: "workflow", js: "workflow", typ: u(undefined, r("IDFilter")) },
    ], "any"),
    "WorkflowTagFilter": o([
        { json: "entityType", js: "entityType", typ: u(undefined, r("TagType")) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TagInput"))) },
    ], "any"),
    "AccountPermissionType": [
        "ADMINISTER_CE",
        "ADMINISTER_OTHER_ACCOUNT_FUNCTIONS",
        "CREATE_AND_DELETE_APPLICATION",
        "MANAGE_API_KEYS",
        "MANAGE_ALERT_NOTIFICATION_RULES",
        "MANAGE_APPLICATION_STACKS",
        "MANAGE_AUTHENTICATION_SETTINGS",
        "MANAGE_CLOUD_PROVIDERS",
        "MANAGE_CONFIG_AS_CODE",
        "MANAGE_CONNECTORS",
        "MANAGE_DELEGATE_PROFILES",
        "MANAGE_DELEGATES",
        "MANAGE_DEPLOYMENT_FREEZES",
        "MANAGE_IP_WHITELIST",
        "MANAGE_PIPELINE_GOVERNANCE_STANDARDS",
        "MANAGE_SECRET_MANAGERS",
        "MANAGE_SECRETS",
        "MANAGE_TAGS",
        "MANAGE_TEMPLATE_LIBRARY",
        "MANAGE_USER_AND_USER_GROUPS_AND_API_KEYS",
        "MANAGE_USERS_AND_GROUPS",
        "READ_USERS_AND_GROUPS",
        "VIEW_AUDITS",
        "VIEW_CE",
        "VIEW_USER_AND_USER_GROUPS_AND_API_KEYS",
    ],
    "Actions": [
        "CREATE",
        "DELETE",
        "EXECUTE",
        "EXECUTE_PIPELINE",
        "EXECUTE_WORKFLOW",
        "READ",
        "UPDATE",
    ],
    "FilterType": [
        "ALL",
    ],
    "FilterTypeElement": [
        "NON_PRODUCTION_ENVIRONMENTS",
        "PRODUCTION_ENVIRONMENTS",
    ],
    "AppPermissionType": [
        "ALL",
        "DEPLOYMENT",
        "ENV",
        "PIPELINE",
        "PROVISIONER",
        "SERVICE",
        "WORKFLOW",
    ],
    "PipelinePermissionFilterType": [
        "NON_PRODUCTION_PIPELINES",
        "PRODUCTION_PIPELINES",
    ],
    "WorkflowPermissionFilterType": [
        "NON_PRODUCTION_WORKFLOWS",
        "PRODUCTION_WORKFLOWS",
        "WORKFLOW_TEMPLATES",
    ],
    "EnvironmentType": [
        "NON_PROD",
        "PROD",
    ],
    "URLType": [
        "ACCOUNT",
        "REPO",
    ],
    "AwsCredentialsType": [
        "EC2_IAM",
        "MANUAL",
    ],
    "CloudProviderType": [
        "AWS",
        "AZURE",
        "GCP",
        "KUBERNETES_CLUSTER",
        "PCF",
        "PHYSICAL_DATA_CENTER",
        "SPOT_INST",
    ],
    "ClusterDetailsType": [
        "INHERIT_CLUSTER_DETAILS",
        "MANUAL_CLUSTER_DETAILS",
    ],
    "ManualClusterDetailsAuthenticationType": [
        "CLIENT_KEY_AND_CERTIFICATE",
        "CUSTOM",
        "OIDC_TOKEN",
        "SERVICE_ACCOUNT_TOKEN",
        "USERNAME_AND_PASSWORD",
    ],
    "SecretType": [
        "ENCRYPTED_FILE",
        "ENCRYPTED_TEXT",
        "SSH_CREDENTIAL",
        "WINRM_CREDENTIAL",
    ],
    "SSHAuthenticationScheme": [
        "KERBEROS",
        "SSH",
    ],
    "TGTGenerationUsing": [
        "KEY_TAB_FILE",
        "PASSWORD",
    ],
    "SSHCredentialType": [
        "PASSWORD",
        "SSH_KEY",
        "SSH_KEY_FILE_PATH",
    ],
    "WinRMAuthenticationScheme": [
        "NTLM",
    ],
    "ArtifactSelectionType": [
        "FROM_PAYLOAD_SOURCE",
        "FROM_TRIGGERING_ARTIFACT",
        "FROM_TRIGGERING_PIPELINE",
        "LAST_COLLECTED",
        "LAST_DEPLOYED_PIPELINE",
        "LAST_DEPLOYED_WORKFLOW",
    ],
    "ExecutionType": [
        "PIPELINE",
        "WORKFLOW",
    ],
    "VariableValueType": [
        "EXPRESSION",
        "ID",
        "NAME",
    ],
    "ConditionType": [
        "ON_NEW_ARTIFACT",
        "ON_PIPELINE_COMPLETION",
        "ON_SCHEDULE",
        "ON_WEBHOOK",
    ],
    "BitbucketEvent": [
        "ANY",
        "BUILD_STATUS_CREATED",
        "BUILD_STATUS_UPDATED",
        "COMMIT_COMMENT_CREATED",
        "DIAGNOSTICS_PING",
        "FORK",
        "ISSUE_ANY",
        "ISSUE_COMMENT_CREATED",
        "ISSUE_CREATED",
        "ISSUE_UPDATED",
        "PULL_REQUEST_ANY",
        "PULL_REQUEST_APPROVAL_REMOVED",
        "PULL_REQUEST_APPROVED",
        "PULL_REQUEST_COMMENT_CREATED",
        "PULL_REQUEST_COMMENT_DELETED",
        "PULL_REQUEST_COMMENT_UPDATED",
        "PULL_REQUEST_CREATED",
        "PULL_REQUEST_DECLINED",
        "PULL_REQUEST_MERGED",
        "PULL_REQUEST_UPDATED",
        "PUSH",
        "REFS_CHANGED",
        "UPDATED",
    ],
    "GitHubAction": [
        "ASSIGNED",
        "CLOSED",
        "CREATED",
        "DELETED",
        "EDITED",
        "LABELED",
        "OPENED",
        "PACKAGE_PUBLISHED",
        "PRE_RELEASED",
        "PUBLISHED",
        "RELEASED",
        "REOPENED",
        "REVIEW_REQUESTED",
        "REVIEW_REQUESTED_REMOVED",
        "SYNCHRONIZED",
        "UNASSIGNED",
        "UNLABELED",
        "UNPUBLISHED",
    ],
    "GitHubEventType": [
        "ANY",
        "DELETE",
        "PACKAGE",
        "PULL_REQUEST",
        "PUSH",
        "RELEASE",
    ],
    "GitlabEvent": [
        "ANY",
        "PULL_REQUEST",
        "PUSH",
    ],
    "WebhookSource": [
        "BITBUCKET",
        "CUSTOM",
        "GITHUB",
        "GITLAB",
    ],
    "IDOperator": [
        "EQUALS",
        "IN",
        "LIKE",
        "NOT_IN",
        "NOT_NULL",
    ],
    "TimeOperator": [
        "AFTER",
        "BEFORE",
        "EQUALS",
    ],
    "NumericOperator": [
        "EQUALS",
        "GREATER_THAN",
        "GREATER_THAN_OR_EQUALS",
        "IN",
        "LESS_THAN",
        "LESS_THAN_OR_EQUALS",
        "NOT_EQUALS",
    ],
    "DeploymentTagType": [
        "APPLICATION",
        "DEPLOYMENT",
        "ENVIRONMENT",
        "SERVICE",
    ],
    "ExportExecutionsStatus": [
        "EXPIRED",
        "FAILED",
        "QUEUED",
        "READY",
    ],
    "ArtifactInputType": [
        "ARTIFACT_ID",
        "BUILD_NUMBER",
    ],
    "TagType": [
        "APPLICATION",
    ],
    "TimeUnit": [
        "DAYS",
        "HOURS",
        "MINUTES",
        "WEEKS",
    ],
    "CeCost": [
        "IDLECOST",
        "TOTALCOST",
        "UNALLOCATEDCOST",
    ],
    "Tion": [
        "SUM",
    ],
    "CeTagType": [
        "APPLICATION",
        "ENVIRONMENT",
        "SERVICE",
    ],
    "CeEntityGroupBy": [
        "Application",
        "Cluster",
        "EcsService",
        "Environment",
        "LaunchType",
        "Namespace",
        "Node",
        "Pod",
        "Region",
        "Service",
        "Task",
        "Workload",
    ],
    "TimeGroupType": [
        "DAY",
        "HOUR",
        "MONTH",
        "WEEK",
    ],
    "SortOrder": [
        "ASCENDING",
        "DESCENDING",
    ],
    "CeSortType": [
        "IDLECOST",
        "TIME",
        "TOTALCOST",
        "UNALLOCATEDCOST",
    ],
    "EnumOperator": [
        "EQUALS",
        "IN",
    ],
    "ConnectorType": [
        "AMAZON_S3",
        "AMAZON_S3_HELM_REPO",
        "APM_VERIFICATION",
        "APP_DYNAMICS",
        "ARTIFACTORY",
        "BAMBOO",
        "BUG_SNAG",
        "DATA_DOG",
        "DOCKER",
        "DYNA_TRACE",
        "ECR",
        "ELB",
        "ELK",
        "GCR",
        "GCS",
        "GCS_HELM_REPO",
        "GIT",
        "HTTP_HELM_REPO",
        "JENKINS",
        "JIRA",
        "LOGZ",
        "NEW_RELIC",
        "NEXUS",
        "PROMETHEUS",
        "SFTP",
        "SMB",
        "SMTP",
        "SERVICENOW",
        "SLACK",
        "SPLUNK",
        "SUMO",
    ],
    "DurationAggregateOperation": [
        "AVERAGE",
        "MAX",
        "MIN",
    ],
    "DeploymentEntityAggregation": [
        "Application",
        "CloudProvider",
        "Environment",
        "EnvironmentType",
        "Pipeline",
        "Service",
        "Status",
        "Trigger",
        "TriggeredBy",
        "Workflow",
    ],
    "TimeAggregationType": [
        "DAY",
        "HOUR",
        "MONTH",
    ],
    "DeploymentSortType": [
        "Count",
        "Duration",
    ],
    "InstanceType": [
        "AUTOSCALING_GROUP_INSTANCE",
        "CODE_DEPLOY_INSTANCE",
        "EC2_INSTANCE",
        "ECS_CONTAINER_INSTANCE",
        "KUBERNETES_CONTAINER_INSTANCE",
        "PCF_INSTANCE",
        "PHYSICAL_HOST_INSTANCE",
    ],
    "SecretManagerType": [
        "AWS_KMS",
        "AWS_SECRET_MANAGER",
        "AZURE_KEY_VAULT",
        "CYBERARK",
        "GOOGLE_KMS",
        "HASHICORP_VAULT",
    ],
    "SSOType": [
        "LDAP",
        "SAML",
    ],
};

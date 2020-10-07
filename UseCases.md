Onboarding New App Team
-----------------------

1. Create a new git repository - Github API
2. Create git connector - Harness GraphQL
3. Create application, enable git sync - Harness GraphQL
4. Create webhook in github - Github API
5. Create namespace in x clusters - kubectl (in harness workflow)
6. Create service account for each namespace - kubectl (in harness workflow)
7. Create secrets with service account tokens - kubectl (in harness workflow)
8. Create cloud providers and scope to application - Harness GraphQL
9. Create new user group, apply permissions - Harness GraphQL
10. Link Group to SSO group - Harness GraphQL
11. Invite users and add to group - Harness GraphQL
12. Populate initial application resources (ie services, environments, workflows, pipelines) - Harness YAML API
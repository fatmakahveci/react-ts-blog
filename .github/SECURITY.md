# Security Policy

## Supported Versions

Security updates are provided for the latest version on the default branch.
Older releases and unmaintained branches may not receive security fixes.

## Scope

This repository contains a client-side React and TypeScript routing demo built
with Vite. It does not provide a backend, authentication service, or database.
Reports about application code, dependencies, and repository workflows are
welcome when they describe a security impact on this project.

## Reporting a Vulnerability

Please do not disclose security vulnerabilities in public issues, discussions,
or pull requests.

Report a vulnerability through this repository's
[private vulnerability reporting](https://github.com/fatmakahveci/react-ts-blog/security/advisories/new).
If that option is unavailable, contact the repository owner through the
[GitHub profile](https://github.com/fatmakahveci) to arrange a private reporting
channel.

Include the following details where possible:

- Affected component, dependency, and commit or version.
- A description of the vulnerability and its potential impact.
- Reproduction steps or a minimal proof of concept.
- Any prerequisites needed to reproduce the issue.
- Suggested mitigations, if known.

Remove credentials, personal data, and other sensitive information from logs
and screenshots before sharing them. Test only in environments you own or have
permission to assess.

## Handling Reports

The maintainer will review the report, request additional details if needed,
and coordinate any applicable fix and disclosure with the reporter. Response
and resolution times depend on maintainer availability and issue complexity;
no fixed timeline is guaranteed.

Please allow time for investigation and a fix before publishing technical
details. Let the maintainer know whether you would like public credit.

## Safe Development and Deployment

- Never commit credentials or private keys. Client-side code and Vite-exposed
  environment variables are visible to users and must not contain secrets.
- Keep dependencies up to date and review `npm audit` findings for their impact
  on the application and build tooling.
- Run `npm run check` after dependency or code changes.
- Deploy the production output from `npm run build` using a suitable static
  host. Development and preview servers are intended for local use.

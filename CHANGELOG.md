0.9.11 (December 8, 2020)
------------------------
* Add support for custom Harness API root in Manager URL.
* Change API endpoint used to fetch YAML file contents.

0.9.10 (December 8, 2020)
------------------------
* Fix support for custom manager URL in base command

0.9.9 (December 8, 2020)
------------------------
* Add commands for common kubernetes administrative tasks
* Fix support for custom manager URL in most commands

0.9.8 (November 10, 2020)
------------------------
* Forgot to commit a couple file before releasing

0.9.7 (November 10, 2020)
------------------------

* Add template step for executing a Harness CLI command
* Added command for creating docker registry connector
* Added [full template file](test/template-manifests/cv-demo.yaml) to import sample application from https://github.com/wings-software/cv-demo
* Added default scoping for k8s cloud providers that inherit from delegate

0.9.6 (November 10, 2020)
------------------------

* Added documentation for `template:exec` command.  Tested/fixed a handful of template scenarios.

0.9.5 (November 9, 2020)
------------------------

* This release contains many breaking changes to the CLI command signatures.  Many parameters have been moved from positional arguments to flags, and some parameter names have changed. 
* Added new commands, including loading/updating/deleting config as code
* Improved documentation

0.9.4 (November 8, 2020)
------------------------

* Enhance `github:repo-create` command to set both `private` and `visibility` params for GitHub Enterprise customers
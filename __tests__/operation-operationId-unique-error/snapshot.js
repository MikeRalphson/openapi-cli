// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E operation-operationId-unique-error 1`] = `
[1] openapi.yaml:15:7 at #/paths/~1pong/get/getUserById

Every operation must have a unique \`operationId\`

13 | '/pong':
14 |   get:
15 |     operationId: getUserById
   |     ^^^^^^^^^^^^^^^^^^^^^^^^
16 |     responses:
   |     ^^^^^^^^^^
17 |       '200':
   |       ^^^^^^
18 |         description: example description
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

error was generated by operation-operationId-unique rule.



❌ Validation failed with 1 error and 0 warnings. 

run with \`--generate-exceptions\` to add all messages to exceptions file


`;

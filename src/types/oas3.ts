import { NodeType, listOf, mapOf } from '.';

const responseCodeRegexp = /^[0-9][0-9Xx]{2}$/;

const DefinitionRoot: NodeType = {
  properties: {
    openapi: null,
    info: 'Info',
    tags: listOf('Tag'),
    servers: listOf('Server'),
    security: listOf('SecurityRequirement'),
    externalDocs: 'ExternalDocs',
    paths: 'PathMap',
    components: 'Components',
  },
  required: ['openapi', 'paths', 'info'],
};

const Tag: NodeType = {
  properties: {
    name: { type: 'string' },
    description: { type: 'string', referenceable: true },
    externalDocs: 'ExternalDocs',
  },
  required: ['name'],
};

const ExternalDocs: NodeType = {
  properties: {
    description: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
  },
  required: ['url'],
};

const Server: NodeType = {
  properties: {
    url: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    variables: mapOf('ServerVariable'),
  },
  required: ['url'],
};

const ServerVariable: NodeType = {
  properties: {
    enum: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    default: {
      type: 'string',
    },
    description: null,
  },
  required: ['default'],
};

const SecurityRequirement: NodeType = {
  properties: {},
  additionalProperties() {
    return { type: 'array', items: { type: 'string' } };
  },
};

const Info: NodeType = {
  properties: {
    title: {
      type: 'string',
    },
    version: {
      type: 'string',
    },
    description: {
      referenceable: true,
      type: 'string',
    },
    termsOfService: {
      type: 'string',
    },
    contact: 'Contact',
    license: 'License',
  },
  required: ['title', 'version'],
};

const Contact: NodeType = {
  properties: {
    name: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
};

const License: NodeType = {
  properties: {
    name: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
  },
  required: ['name'],
};

const PathMap: NodeType = {
  properties: {},
  additionalProperties: (_value: any, key: string) => (key.startsWith('/') ? 'PathItem' : undefined),
};

const PathItem: NodeType = {
  properties: {
    $ref: 'PathItem', // TODO: verify special $ref handling for Path Item
    servers: listOf('Server'),
    parameters: listOf('Parameter'),
    summary: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    get: 'Operation',
    put: 'Operation',
    post: 'Operation',
    delete: 'Operation',
    options: 'Operation',
    head: 'Operation',
    patch: 'Operation',
    trace: 'Operation',
  },
};

const Parameter: NodeType = {
  properties: {
    name: {
      type: 'string',
    },
    in: {
      enum: ['query', 'header', 'path', 'cookie'],
    },
    description: {
      type: 'string',
    },
    required: {
      type: 'boolean',
    },
    deprecated: {
      type: 'boolean',
    },
    allowEmptyValue: {
      type: 'boolean',
    },
    style: {
      enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
    },
    explode: {
      type: 'boolean',
    },
    allowReserved: {
      type: 'boolean',
    },
    schema: 'Schema',
    example: null,
    examples: mapOf('Example'),
    content: 'MediaTypeMap',
  },
  required: ['name', 'in'],
};

const Operation: NodeType = {
  properties: {
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    summary: {
      type: 'string',
    },
    description: {
      referenceable: true,
      type: 'string',
    },
    externalDocs: 'ExternalDocs',
    operationId: {
      type: 'string',
    },
    parameters: listOf('Parameter'),
    security: listOf('SecurityRequirement'),
    servers: listOf('Server'),
    requestBody: 'RequestBody',
    responses: 'ResponsesMap',
    deprecated: {
      type: 'boolean',
    },
    callbacks: 'PathMap',
    // 'x-codeSamples'?: Oas3XCodeSample[]; // TODO: x-code-samples
    // 'x-code-samples'?: Oas3XCodeSample[]; // deprecated
  },
};

const RequestBody: NodeType = {
  properties: {
    description: {
      type: 'string',
    },
    required: {
      type: 'boolean',
    },
    content: 'MediaTypeMap',
  },
  required: ['content'],
};

const MediaTypeMap: NodeType = {
  properties: {},
  additionalProperties: () => 'MediaType',
};

const MediaType: NodeType = {
  properties: {
    schema: 'Schema',
    example: null,
    examples: mapOf('Example'),
    encoding: mapOf('Encoding'),
  },
};

const Example: NodeType = {
  properties: {
    value: null,
    summary: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    externalValue: {
      type: 'string',
    },
  },
};

const Encoding: NodeType = {
  properties: {
    contentType: {
      type: 'string',
    },
    headers: mapOf('Header'),
    style: {
      enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
    },
    explode: {
      type: 'boolean',
    },
    allowReserved: {
      type: 'boolean',
    },
  },
};

const Header: NodeType = {
  properties: {
    description: {
      type: 'string',
    },
    required: {
      type: 'boolean',
    },
    deprecated: {
      type: 'boolean',
    },
    allowEmptyValue: {
      type: 'boolean',
    },
    style: {
      enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
    },
    explode: {
      type: 'boolean',
    },
    allowReserved: {
      type: 'boolean',
    },
    schema: 'Schema',
    example: null,
    examples: mapOf('Example'),
    content: 'MediaTypeMap',
  },
};

const ResponsesMap: NodeType = {
  properties: {
    default: 'Response',
  },
  additionalProperties: (_v: any, key: string) =>
    responseCodeRegexp.test(key) ? 'Response' : null,
};

const Response: NodeType = {
  properties: {
    description: {
      type: 'string',
    },
    headers: mapOf('Header'),
    content: 'MediaTypeMap',
    links: mapOf('Link'),
  },
  required: ['description'],
};

const Link: NodeType = {
  properties: {
    operationRef: { type: 'string' },
    operationId: { type: 'string' },
    parameters: null, // TODO: figure out how to describe/validate this
    requestBody: null, // TODO: figure out how to describe/validate this
    description: { type: 'string' },
    server: 'Server',
  },
};

const Schema: NodeType = {
  properties: {
    externalDocs: 'ExternalDocs',
    discriminator: 'Discriminator',
    title: { type: 'string' },
    multipleOf: { type: 'number' },
    maximum: { type: 'number' },
    minimum: { type: 'number' },
    exclusiveMaximum: { type: 'boolean' },
    exclusiveMinimum: { type: 'boolean' },
    maxLength: { type: 'number' },
    minLength: { type: 'number' },
    pattern: { type: 'string' },
    maxItems: { type: 'number' },
    minItems: { type: 'number' },
    uniqueItems: { type: 'boolean' },
    maxProperties: { type: 'number' },
    minProperties: { type: 'number' },
    required: { type: 'array', items: { type: 'string' } },
    enum: { type: 'array' },
    type: {
      enum: ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'],
    },
    allOf: listOf('Schema'),
    anyOf: listOf('Schema'),
    oneOf: listOf('Schema'),
    not: 'Schema',
    properties: 'SchemaProperties',
    items: (value: any) => {
      if (Array.isArray(value)) {
        return listOf('Schema');
      } else {
        return 'Schema';
      }
    },
    additionalProperties: (value: any) => {
      if (typeof value === 'boolean') {
        return { type: 'boolean' };
      } else {
        return 'Schema';
      }
    },
    description: { type: 'string' },
    format: { type: 'string' },
    default: null,

    nullable: { type: 'boolean' },

    readOnly: { type: 'boolean' },
    writeOnly: { type: 'boolean' },
    xml: 'Xml',
    example: null,
    deprecated: { type: 'boolean' },
  },
};

const Xml: NodeType = {
  properties: {
    name: { type: 'string' },
    namespace: { type: 'string' },
    prefix: { type: 'string' },
    attribute: { type: 'boolean' },
    wrapped: { type: 'boolean' },
  },
};

const SchemaProperties: NodeType = {
  properties: {},
  additionalProperties: () => 'Schema',
};

const Discriminator: NodeType = {
  properties: {
    propertyName: { type: 'string' },
    mapping: { type: 'object' }, // TODO: validate mapping
  },
  required: ['propertyName'],
};

const Components: NodeType = {
  properties: {
    schemas: 'NamedSchemas',
    responses: 'NamedResponses',
    parameters: 'NamedParameters',
    examples: 'NamedExamples',
    requestBodies: 'NamedRequestBodies',
    headers: 'NamedHeaders',
    securitySchemes: 'NamedSecuritySchemes',
    links: 'NamedLinks',
    callbacks: 'NamedCallbacks',
  },
};

const ImplicitFlow: NodeType = {
  properties: {
    refreshUrl: { type: 'string' },
    scopes: { type: 'object' }, // TODO: validate scopes
    authorizationUrl: { type: 'string' },
  },
  required: ['authorizationUrl', 'scopes'],
};

const PasswordFlow: NodeType = {
  properties: {
    refreshUrl: { type: 'string' },
    scopes: { type: 'object' }, // TODO: validate scopes
    tokenUrl: { type: 'string' },
  },
  required: ['tokenUrl', 'scopes'],
};

const ClientCredentials: NodeType = {
  properties: {
    refreshUrl: { type: 'string' },
    scopes: { type: 'object' }, // TODO: validate scopes
    tokenUrl: { type: 'string' },
  },
  required: ['tokenUrl', 'scopes'],
};

const AuthorizationCode: NodeType = {
  properties: {
    refreshUrl: { type: 'string' },
    authorizationUrl: { type: 'string' },
    scopes: { type: 'object' }, // TODO: validate scopes
    tokenUrl: { type: 'string' },
  },
  required: ['authorizationUrl', 'tokenUrl', 'scopes'],
};

const SecuritySchemeFlows: NodeType = {
  properties: {
    implicit: 'ImplicitFlow',
    password: 'PasswordFlow',
    clientCredentials: 'ClientCredentials',
    authorizationCode: 'AuthorizationCode',
  },
};

const SecurityScheme: NodeType = {
  properties: {
    type: { enum: ['apiKey', 'http', 'oauth2', 'openIdConnect'] },
    description: { type: 'string' },
    name: { type: 'string' },
    in: { type: 'string' },
    scheme: { type: 'string' },
    bearerFormat: { type: 'string' },
    flows: 'SecuritySchemeFlows',
    openIdConnectUrl: { type: 'string' },
  },
  required(value) {
    if (value.type === 'apiKey') {
      return ['type', 'name', 'in'];
    } else if (value.type === 'http') {
      return ['type', 'scheme'];
    } else if (value.type === 'oauth2') {
      return ['type', 'flows'];
    } else if (value.type === 'openIdConnect') {
      return ['type', 'openIdConnect'];
    }

    return ['type'];
  },
};

export const Oas3Types: Record<string, NodeType> = {
  DefinitionRoot,
  Tag,
  ExternalDocs,
  Server,
  ServerVariable,
  SecurityRequirement,
  Info,
  Contact,
  License,
  PathMap,
  PathItem,
  Parameter,
  Operation,
  RequestBody,
  MediaTypeMap,
  MediaType,
  Example,
  Encoding,
  Header,
  ResponsesMap,
  Response,
  Link,
  Schema,
  Xml,
  SchemaProperties,
  Discriminator,
  Components,
  NamedSchemas: mapOf('Schema'),
  NamedResponses: mapOf('Response'),
  NamedParameters: mapOf('Parameter'),
  NamedExamples: mapOf('Example'),
  NamedRequestBodies: mapOf('RequestBody'),
  NamedHeaders: mapOf('Header'),
  NamedSecuritySchemes: mapOf('SecurityScheme'),
  NamedLinks: mapOf('Link'),
  NamedCallbacks: mapOf('PathItem'),
  ImplicitFlow,
  PasswordFlow,
  ClientCredentials,
  AuthorizationCode,
  SecuritySchemeFlows,
  SecurityScheme,
};

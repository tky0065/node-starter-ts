import schema from "./json-schema.json";

interface JSONSchema {
  type: string;
  properties: Record<string, any>;
  required?: string[];
  [key: string]: any;
}

interface GeneratedSchema {
  $schema: string;
  definitions: Record<string, JSONSchema>;
}

function replaceReferences(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(replaceReferences);
  }
  const newObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "$ref" && typeof value === "string") {
      newObj[key] = value.replace("#/definitions/", "#/components/schemas/");
    } else {
      newObj[key] = replaceReferences(value);
    }
  }
  return newObj;
}

const typedSchema = schema as GeneratedSchema;

export function getSchema(
  modelName: keyof typeof typedSchema.definitions
): JSONSchema {
  if (modelName in typedSchema.definitions) {
    return replaceReferences(typedSchema.definitions[modelName]);
  }
  throw new Error(`Schéma pour ${modelName} non trouvé`);
}

export const allSchemas = {
  components: {
    schemas: replaceReferences(typedSchema.definitions),
  },
};

console.log(JSON.stringify(allSchemas, null, 2));
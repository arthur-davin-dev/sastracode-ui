import prettier from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginPostcss from "prettier/plugins/postcss";

export async function formatCode(
  code: string,
  language: string,
): Promise<string> {
  try {
    switch (language.toLowerCase()) {
      case "javascript":
      case "js":
        return await prettier.format(code, {
          parser: "babel",
          plugins: [prettierPluginBabel, prettierPluginEstree],
          tabWidth: 4,
        });

      case "typescript":
      case "ts":
        return await prettier.format(code, {
          parser: "typescript",
          plugins: [prettierPluginTypescript, prettierPluginEstree],
          tabWidth: 4,
        });

      case "html":
        return await prettier.format(code, {
          parser: "html",
          plugins: [prettierPluginHtml],
          tabWidth: 4,
        });

      case "css":
        return await prettier.format(code, {
          parser: "css",
          plugins: [prettierPluginPostcss],
          tabWidth: 4,
        });

      case "json":
        return await prettier.format(code, {
          parser: "json",
          plugins: [prettierPluginBabel, prettierPluginEstree],
          tabWidth: 4,
        });

      default:
        return code;
    }
  } catch (error) {
    console.error(`Failed to format ${language}:`, error);
    return code;
  }
}

import { readFile } from "fs/promises";
import { join } from "path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(createProvider());
  context.subscriptions.push(createCommand());
}

function createProvider() {
  return vscode.languages.registerCompletionItemProvider(
    {
      language: "typescriptreact",
      scheme: "file",
    },
    {
      provideCompletionItems(document) {
        const documentText = document.getText();
        if (documentText.length > 10) {
          return [];
        }

        const trimmedText = documentText.trim();

        const completion = new vscode.CompletionItem(
          trimmedText.startsWith("e")
            ? "Export New Component"
            : trimmedText.startsWith("f")
            ? "New Function Component"
            : "New Component",
          vscode.CompletionItemKind.Snippet
        );

        completion.insertText = new vscode.SnippetString("");

        completion.detail = "Insert a new TSX Component";

        completion.command = {
          title: "newComponent",
          command: "tommy-vscode-extension.reacts.newComponent",
        };

        return [completion];
      },
    }
  );
}

function createCommand() {
  return vscode.commands.registerCommand(
    "tommy-vscode-extension.reacts.newComponent",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const text = await createSnippet(editor.document.fileName);
        editor.insertSnippet(new vscode.SnippetString(text));
      }
    }
  );
}

async function createSnippet(filePath: string) {
  const pathParts = await getPathParts(filePath);

  const componentName = pathParts[pathParts.length - 1];

  const classText = pathParts.join("-");

  return `export function ${componentName}() {
  return <div className="${classText}"></div>;
}`;
}

async function getPathParts(filePath: string) {
  const allParts = filePath.split(/[\\/]/);

  const startIndex = allParts.indexOf("src");
  const localParts = allParts.slice(startIndex >= 0 ? startIndex + 1 : -1);

  const fileName = localParts[localParts.length - 1];
  const componentName = fileName.replace(".tsx", "");

  const innerParts = [...localParts.slice(0, -1), componentName];

  if (startIndex <= 2) {
    return innerParts;
  }

  const workspacePath = join(
    filePath,
    ...localParts.map(() => ".."),
    "../../package.json"
  );

  let workspaceText;
  try {
    workspaceText = await readFile(workspacePath, "utf8");
  } catch {
    return innerParts;
  }

  if (!workspaceText.includes('"workspaces":')) {
    return innerParts;
  }

  const projectName = allParts[startIndex - 1];

  return [projectName, ...innerParts];
}

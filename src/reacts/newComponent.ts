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

        const completion = new vscode.CompletionItem(
          "New Component",
          vscode.CompletionItemKind.Snippet
        );

        completion.insertText = new vscode.SnippetString("");

        completion.detail = "Create a new TSX Component";

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
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const text = createSnippet(editor.document.fileName);
        editor.insertSnippet(new vscode.SnippetString(text));
      }
    }
  );
}

function createSnippet(filePath: string): string {
  const pathParts = getPathParts(filePath);

  const componentName = pathParts[pathParts.length - 1];

  const classText = pathParts.join("-");

  return `export function ${componentName}() {
  return <div className="${classText}"></div>;
}`;
}

export function getPathParts(filePath: string) {
  const allParts = filePath.split(/[\\/]/);

  const startIndex = allParts.indexOf("src");
  const validParts = allParts.slice(startIndex >= 0 ? startIndex + 1 : -1);

  const fileName = validParts[validParts.length - 1];
  const componentName = fileName.replace(".tsx", "");

  const pathParts = validParts.slice(0, -1);
  return [...pathParts, componentName];
}

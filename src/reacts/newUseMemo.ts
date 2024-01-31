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
        if (documentText.length < 10) {
          return [];
        }

        const completion = new vscode.CompletionItem(
          "useMemo",
          vscode.CompletionItemKind.Snippet
        );

        completion.insertText = new vscode.SnippetString("");

        completion.detail = "Insert useMemo code";

        completion.command = {
          title: "useMemo",
          command: "tommy-vscode-extension.reacts.newUseMemo",
        };

        return [completion];
      },
    }
  );
}

function createCommand() {
  return vscode.commands.registerCommand(
    "tommy-vscode-extension.reacts.newUseMemo",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const text = await createSnippet();
        editor.insertSnippet(new vscode.SnippetString(text));
      }
    }
  );
}

async function createSnippet() {
  return `const x = useMemo(
    () =>
      
    []
  );`;
}

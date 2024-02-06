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
          "useCallback",
          vscode.CompletionItemKind.Snippet
        );

        completion.insertText = new vscode.SnippetString("");

        completion.detail = "Insert useCallback code";

        completion.command = {
          title: "useCallback",
          command: "tommy-vscode-extension.reacts.newUseCallback",
        };

        return [completion];
      },
    }
  );
}

function createCommand() {
  return vscode.commands.registerCommand(
    "tommy-vscode-extension.reacts.newUseCallback",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = editor.selection.active;
        const text = await createSnippet();
        editor.insertSnippet(new vscode.SnippetString(text));

        var newPosition = position.with(position.line + 2, 6);
        var newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
      }
    }
  );
}

async function createSnippet() {
  return `const x = useCallback(
    () =>
      
    []
  );`;
}

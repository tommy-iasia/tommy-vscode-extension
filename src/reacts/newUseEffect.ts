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
          "useEffect",
          vscode.CompletionItemKind.Snippet
        );

        completion.insertText = new vscode.SnippetString("");

        completion.detail = "Insert useEffect code";

        completion.command = {
          title: "useEffect",
          command: "tommy-vscode-extension.reacts.newUseEffect",
        };

        return [completion];
      },
    }
  );
}

function createCommand() {
  return vscode.commands.registerCommand(
    "tommy-vscode-extension.reacts.newUseEffect",
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
  return `useEffect(() => {
        //move cursor here is better
        // import useEffect
        // case no react, react without useEffect, whole react
      }, []);`;
}

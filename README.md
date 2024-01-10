# tommy-vscode-extension

This is an extension shared to our colleagues for a bit faster and easier coding.

However, please be noticed that this extension is designed according to coding styles and conventions Tommy following.

## 1. Checkout the Project

Checkout this project in your VS code extension folder.

Make sure `(user)\.vscode\extensions\tommy-vscode-extension\package.json` is in place.

## 2. Install and Compile

Run `npm install` and `npm run compile`

## 3. Open Visual Studio Code

By default, VS Code searches your `extensions` folder on startup. You will see the extension in extension tab.

However, the extension may not be working, if folder is not trusted or VS Code is not updated.

## 4. Trust the Project

In VS code, open the project folder `(user)\.vscode\extensions\tommy-vscode-extension` and add it to trusted paths

## 5. Update Visual Studio Code

This project requires VS Code 1.84. Update your VS Code if needed.

Afterwards, restart your VS Code and you should see the extension up and running.

## 6. Update the Extensions JSON

In case your VS code still does not install the extension automatically.

You can manually add the follow to `(user)\.vscode\extensions\extensions.json`

```json
{
  "identifier": { "id": "tommyiasia.tommy-vscode-extension" },
  "version": "0.0.1",
  "location": {
    "$mid": 1,
    "fsPath": "c:\\Users\\tommy\\.vscode\\extensions\\tommy-vscode-extension",
    "_sep": 1,
    "path": "/c:/Users/tommy/.vscode/extensions/tommy-vscode-extension",
    "scheme": "file"
  },
  "relativeLocation": "tommy-vscode-extension"
}
```

Remember to replace the folder path with the path in your machine.

## 7. Develop

You can help develop the project and commit it, like any of our normal projects.

If you find any troubles, feel free to contact me. You may find help from Horus and Frank as well.

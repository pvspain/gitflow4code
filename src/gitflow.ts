'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as initCommands from './commands/init';
import * as featureCommands from './commands/features';
import * as releaseCommands from './commands/releases';
import * as hotfixCommands from './commands/hotfixes';
import * as gitCommands from './commands/gitCommands';
import * as ConfigSettings from './settings/configSettings';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "gitflow4code" is now active!');

    const workspace = vscode.workspace;
    // launch.json configuration
    const config = workspace.getConfiguration(); 

    // retrieve values for gitflow4code
    const configValues = config.get('gitflow4code') as ConfigSettings.ConfigSettings;

    let featureFinisher = new FeatureStatusItem();
    featureFinisher.showFeatureStatus();

    var outChannel;
    outChannel = vscode.window.createOutputChannel('Git');

    //first we'll check to see if repo is initialized
    let developExists = initCommands.checkForInit(outChannel, configValues.develop);
    let masterExists = initCommands.checkForInit(outChannel, configValues.master);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('gitflow.GitFlow', () => {
        
        // The code you place here will be executed every time your command is executed
        var itemPickList = [
            {
                label: "Initialize",
                description: "Command to initialize the git repository for feature branch flow"
            },
            { 
                label: "Features",
                description: "Commands for managing git-flow features"
            },
            {
                label: "Releases",
                description: "Commands for managing git-flow releases"
            },
            {
                label: "Hotfixes",
                description: "Commands for managing git-flow hotfixes"
            },
            {
                label: "Get Status",
                description: "Runs git status on command line"
            }
        ];
        vscode.window.showQuickPick(itemPickList).then(function(item) {
            if(!item) return;
            
            outChannel.clear();
            switch (item.label) {
                case itemPickList[0].label:
                    initCommands.run(outChannel);
                    break;
                case itemPickList[1].label:
                    featureCommands.run(outChannel);
                    break;
                case itemPickList[2].label:
                    releaseCommands.run(outChannel);
                    break;
                case itemPickList[3].label:
                    hotfixCommands.run(outChannel);
                    break;
                default:
                    gitCommands.run(outChannel);
                    break;
            }
        });
        
    });

    context.subscriptions.push(featureFinisher);
    context.subscriptions.push(disposable);
    
}

class FeatureStatusItem {
    private _statusBarItem: vscode.StatusBarItem;

    public showFeatureStatus() {
        if(!this._statusBarItem)
            this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

        this._statusBarItem.text = 'feature test';
        this._statusBarItem.command = 'hello';
        this._statusBarItem.show();
    }

    dispose() {
        this._statusBarItem.dispose();
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}
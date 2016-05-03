# StartUp
#### A Google Chrome extension designed to customize your start up experience with Chrome.

[![Join the chat at https://gitter.im/sgalizia/StartUp](https://badges.gitter.im/sgalizia/StartUp.svg)](https://gitter.im/sgalizia/StartUp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Welcome to the StartUp repository! I designed this extension to help solve a problem that was bugging me about Chrome. I kept finding myself opening the same groups of tabs for specific tasks and it was getting old and repetitive. Making this extension was a large learning process for me and I am hoping that other who want to contribute can also learn something from it! There was some interest shown in the project and contributing and that is why I chose to make this project Open Source!

## Upcoming Features
 These are upcoming features that are already planned on being added in!

- Redesigned UI for popup and options page
- Designate groups to open in specific windows
- Support for multiple groups and choosing your active group
- Choose which groups open in which windows
- Multi-monitor support for creating windows and opening groups
- Open a group at any time from the popup

## Contributing to StartUp
If you would like to contribute and work on one of the features, check the issues section for what currently needs to be worked on. Issues assigned to users are already being developed. If you don't find a feature or enhancement and you want to add it to the project, fork off the repository and make your changes and then make a pull request. If you have suggestions I am always open to hearing how we can improve StartUp!

## Steps for Setting Up the Extension Files for Testing
If you would like to contribute to the project, the first step is to make sure you have a github account and fork the current repository. Once you have the repository forked, you should clone the repository onto your computer so you have a local working copy. To test the local working copy of the extension, follow these steps:
- Open Chrome and enter chrome://extensions into the omnibar
- Check the box that says 'Developer mode'
- Click the button that says 'Load unpacked extension...'
- Navigate to the working directory where the extension files are located and click load

You should now see the extension show up in your extension list with a path to a local directory. Make sure that if you are working on a local copy to disable StartUp if you have it downloaded from the web store. If you are running the latest production version downloaded from the webstore and a local development version, you may run into issues. They have different extension names, but I have found that when you reload the development extension, it reloads all extensions and the two versions will override each other when creating tabs. It is best to disable the production version if you have it installed so you can tell what the development version is doing.

Once you have edited the files and you think you are ready to submit your changes to the main repository, create a pull request and I will review the changes that have been made. Once the changes are deemed acceptable and ready they will be brought into the production branch and pushed out with the next version!

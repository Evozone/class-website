# Contributing

Before moving ahead with making contributions please make sure that you have read the code of conduct mentioned in the [CODE_OF_CONDUCT.md](https://github.com/Evozone/ClassBWebSite/blob/master/CODE_OF_CONDUCT.md) file.

## Prerequisites

Make sure you have git installed on your machine.<br>
If you haven't then [this article](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) will help you in the installation of git.

If you are going to be using a shell (and Not a GUI based application that directly connects to Github), we recommend you also learn about [git commands](https://www.atlassian.com/git/tutorials/setting-up-a-repository).

## Forking a project

You will, of course, never work directly on the main branch of a project. Github allows you to 'fork' a repository (i.e. making a copy of the repository on yor own profile/account), which you can modify at will.

Fork this repository by clicking on the fork button on the top of this page, this will create a copy of this repository in your account.
It will look like ```YOUR_GitHub_USERNAME/ClassBWebSite``` in your Repositories section. 

## Making Changes in your fork

- There are multiple ways in which you may make changes to your fork. You could write your files in notepad and manually drop them via Github, adding a commit message each time, or you may use a text editor and the git command line to make things easier.
- If you make changes to your code, try to stick to the [Google Style Guides](https://google.github.io/styleguide/) for [HTML, CSS](https://google.github.io/styleguide/htmlcssguide.html) and [Javascript](https://google.github.io/styleguide/jsguide.html).
- Bonus points if you follow [idiomatic.js](https://github.com/rwaldron/idiomatic.js/).

### ⌨️ Using a shell

1. Clone your forked version by entering  ```git clone "https://github.com/YOUR_GITHUB_UserName/ClassBWebSite"``` __in the directory you want to put the project folder__.
    - Learn more about cloning repositories at [About remote repositories](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories).
2. Change the directory from current to the project directory by entering ``` cd ClassBWebSite/```.
3. Run the command ```start index.html``` to view the Homepage.
    - One could also simple double-click the file in a GUI based interface for file viewing.
   
#### Branching 
1. Open a new window of your terminal and change the directory into the project folder.
2. Now create a new branch using `git checkout -b <add-your-new-branch-name>` <br>For example `git checkout-b checklist-system`
3. Now make the required changes in the project which will resolve or add a feature as per mentioned in the respective issue.

#### Commiting changes
1. Add the changes to the branch you just created using the `git add .` command.
2. Now commit those changes using `git commit -m <"a short description about changes u made">`. <br>For example `git commit -m "Removed unnatural borders around checkboxes"`
3. Push the changes using `git push origin <add-your-branch-name>`. <br>For example `git push origin checklist-system`

### ⚛️ Using Atom

1. Download [Atom](https://atom.io/), a text editor with built in support for git and Github, and [learn how to use it](https://flight-manual.atom.io/).
    - [This is a useful guide](https://www.hongkiat.com/blog/manage-git-github-atom/) for learning how to use Git and Github on Atom.
2. Since you'll be the only one pushing to your fork, you don't have to worry about conflicts. 

## Making a Pull Request

- Submit your changes for review by creating a pull request, if you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button. 
- Provide a description of what was changed, and how it ties into the existing codebase.
- A maintainer will then approve and merge all your changes into the master branch of this project. You will get a notification email once the changes have been merged.

#### 🌟 Congrats! You just completed the standard _fork -> clone -> branch -> edit -> PR_  workflow that you'll encounter often as a contributor!

<hr>

### Addendum : Adding new architectures

Currently the project is built using HTML, CSS and Javascript. If you wish to incorporate additional Web developing architectures or frameworks, you need to message the maintainers and get the idea approved.

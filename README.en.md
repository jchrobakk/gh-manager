Choose README version:\
[PL](https://github.com/jchrobakk/task-js-testing/blob/master/README.md)\
[EN](https://github.com/jchrobakk/task-js-testing/blob/master/README.en.md)

# Github Manager

A simple tool made as an assignment within mentoring with devmentor.pl. The main goal of creating it was to use test writing skills in practice. The tool uses [Github API](https://docs.github.com/en/rest) to get data about users, repositories and allows to edit own profile.

## Installation and configuration

If you want to use GHM in your project just add [this file](https://github.com/jchrobakk/task-js-testing/blob/master/src/githubManager.js) to your project. After adding it, you just need to import the class into the file where you want to use it. For example:

    import  GHManager  from  "./githubManager";

Next you need to create an instance of the class, providing as argument your personal Github account token. If you don't know how to create it - take a look [here]https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token. For example:

    const  ghm  =  new  GHManager("ghp_mypersonaltoken");

Now you can verify your token:

    ghm.verifyToken();

If your token is correct then no errors should appear. You can now start using the GHM features.

_If you want to download and use the entire project, just download the entire repository, use the npm i command in the terminal, create an .env file, and put a line in it:
SECRET=yourtokenhere
And in place of yourtokenhere just put your personal token._

## Using

### Getting information from API

Methods that are used to retrieve data from the Github API. These methods return a promise, so you need to handle them with `.then()` or with `async/await`.

#### .getUserInfo()

Returns information about the user whose nickname we pass in the parameter. For example:

    const info = await ghm.getUserInfo('jchrobakk')

#### .getUserRepos()

Returns a list (array) of all the repositories of the user whose nickname we pass as an argument. For example:

    const reposList = await ghm.getUserRepos('jchrobakk')

#### .getRepoinfo()

Returns information about the repository whose name we pass in the second argument. The first argument must be the name of the user to whom the repository belongs. For example:

    const repoInfo = await ghm.getRepoInfo('jchrobakk', 'task-js-testing')

#### .getRepoIssues()

Returns a list of errors, of the given repository. The same arguments must be given as for `.getRepoInfo()`. For example:

    const repoIssues = await ghm.getRepoInfo('jchrobakk', 'task-js-testing')

### Editing profile

Methods that allow you to edit your profile.

### .toggleHireableStatus()

Toggles the 'hireable' status. For example:

    ghm.toggleHireableStatus()

#### .setBio()

Changes the profile description to the one specified in the argument. For example:

    ghm.setBio('Hello world!'

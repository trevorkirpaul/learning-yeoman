# Learning Yeoman & Creating a Generator

[Yeoman](https://yeoman.io/authoring/index.html) is a tool/library which allows us to create a CLI interface/task runner which can do many things.

My goal is to use Yeoman to create a CLI tool which scaffolds out a CRA that has the exact codebase structure I use. This repo will be an example/cheat sheet for creating generators.

## ToDo

- [ ] finalize an example generator

> The example should contain a majority of the features which a generator can provide and should have detailed comments

- [ ] create generator which scaffolds out a CRA
  - [x] scaffolding for constants and actions
  - [x] created template file

> This will not be the final product. That will be its own repo which will also be published to npm as a package

## Testing Locally

In order to test this generator locally, you can leverage Yarn's [`link`](https://yarnpkg.com/en/docs/cli/link) command. NPM also has `link` but I greatly prefer Yarn's documentation. The functionality is the same.

### Install `yo` globally

Before starting, please ensure you have `yo` installed globally using `npm`. `Yarn` has always given me issues with **global** packages.

```
npm i -g yo
```

### Using `link` within the Generator root

Within this repo's root directory (root directory of the generator, should contain the `package.json`), run the following:

```
yarn link
```

> You can use NPM if you prefer

This will allow us to link to the project in other projects, creating a sym-link, emulating installing the generator as a package.

### Linking the Generator to another project

Create a new directory separate from this project **not** within this project. In this example, we have a "Projects" directory but you can create it anywhere. Run the following commands in your terminal:

```
cd ~/Projects

mkdir test-generator && cd test-generator

yarn init -y
```

> `yarn init -y` creates a template package.json. The `-y` flag answers yes and uses the default option for all of the questions which are normally asked that fill out the `package.json` file.

Now we can `link` to the generator by running the following command:

```
yarn link generator-trevor
```

> "generator-trevor" is the name from the Generator's `package.json`. Just as if we had installed this package using Yarn, we refer to the project by the name in `package.json`

Now we have a sym-link to our Generator project which will act as if we had it installed as node package. You can now run the generator using:

```
yo trevor
```

> "generator" is not required when running any generator but it is required when creating one

Any updates made to the Generator project will take immediate effect in the project which has the sym-link to it, since it literally uses the current state of the files.

This is a great way to test any package without having to install it.

## Troubleshooting

If you have any issues, ensure you have named everything correctly. This should already be the case since the Generator is already made but if you've renamed any files or changed any fields then you should ensure you are still using the correct values. A lot of names/fields require the word "generator" and if it's missing than the Generator will fail to run.

If you have any issues that aren't easily reconciled by reading the docs then feel free to contact my on twitter: [@trevorkirpaul](https://twitter.com/trevorkirpaul).
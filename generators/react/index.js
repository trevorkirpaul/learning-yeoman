const Generator = require('yeoman-generator')

/**
 * This generator is ran by using:
 * 
 * `yo trevor:react`
 * 
 * This is an example of a generator which can scaffold out parts of a React app.
 * 
 * When using the flag `--createActions` or `--ca` then we'll run
 * `_private_actionPrompt` which prompts the user for a "feature name" value
 * and an "action types" value. The former is a simple string and the second
 * is a string which gets mapped into an array with each value being separated
 * by a comma.
 * 
 * These values are then stored in the class' `STATE` property which gets used
 * in the next two methods which run:
 * 
 * 1. _private_createAction
 * 2. _private_createConstants
 * 
 * Each of these use a template file to create redux boilerplate based on
 * the values collected from the prompt.
 */
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // @FEATURE and @ACTIONS are used when scaffolding redux boilerplate
    // they are set by `_private_actionPrompt()`
    this.STATE = {
      FEATURE: '',
      ACTIONS: []
    }

    // flag which created redux boilerplate for actions & constants
    this.option('createActions', {
      description: 'scaffolds actions',
      alias: 'ca'
    })
  }

  // PROMPTS
  async _private_actionPrompt() {
    const actionConfig = await this.prompt([
      {
        type: 'input',
        name: 'featureName',
        message: 'Enter the associated feature name',
        default: '',
      },
      {
        type: 'input',
        name: 'actionTypes',
        message: 'Enter a name for each set of actions, separated by a comma',
        default: 'ACTION_ONE, ACTION_TWO, ACTION_THREE'
      }
    ])

    const mappedActions = actionConfig.actionTypes.replace(/ /gi, '').split(",")

    this.STATE.FEATURE = actionConfig.featureName
    this.STATE.ACTIONS = mappedActions
    
    this._private_createAction()
    this._private_createConstants()
  }

  /**
   * **_private_createAction** uses the actions template file and answers
   * from the prompt to create `dist/actions.js`
   */
  _private_createAction() {
    const template = this.templatePath('../../../src/templates/reactRedux/actionTemplate.js')

    const destination = this.destinationPath('dist/actions.js')

    this.fs.copyTpl(
      template,
      destination,
      {
        FEATURE: this.STATE.FEATURE,
        ACTIONS: this.STATE.ACTIONS
      }
    )
  }

  /**
   * **_private_createConstants** uses the constants template file and
   * answers from the prompt to create `dist/constants.js`
   */
  _private_createConstants() {
    const template = this.templatePath('../../../src/templates/reactRedux/constantsTemplate.js')

    const destination = this.destinationPath('dist/constants.js')
    
    this.fs.copyTpl(
      template,
      destination,
      {
        FEATURE: this.STATE.FEATURE,
        ACTIONS: this.STATE.ACTIONS
      }
    )
  }

  /**
   * **main** is the only method which we'll be invoking when the generator
   * is ran. All other actions will only be invoked when the associated flag is used.
   */
  main() {
    if(this.options.createAction) {
      this._private_actionPrompt()
    }
  }
}
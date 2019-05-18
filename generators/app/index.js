const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    /**
     * **SETTING A FLAG**
     * `this.option` sets a flag. The first arg is the flag and
     * the second arg is an object containing options.
     * 
     * @description: description for help flag
     * @alias: short name
     * 
     */
    this.option('about', {
      description: 'information about the generator',
      alias: 'a'
    })

    this.option('new', {
      description: 'triggers the prompt code',
      alias: 'n'
    })

    /**
     * **SETTING AN ARGUMENT**
     * 
     * Similar to setting an option
     */
    this.argument("appname", {
      type: String,
      required: false,
      description: "this is an argument"
    })
  }

  /**
     * **SETTING AN PRIVATE METHOD**
     * 
     * Here we set a private method which we can invoke
     * at a later time. This is also an example of a method which
     * prompts the user for answers then logs the answers
     */
    async _private_namePrompt() {
      const answers = await this.prompt([
        {
          type: 'input',
          name: "firstName",
          message: "enter your first name",
          default: "John"
        },
        {
          type: 'input',
          name: "lastName",
          message: "enter your last name",
          default: "Smith"
        },
        {
          type: 'confirm',
          name: 'confirmName',
          message: 'Is the above information correct?'
        }
      ])

      if (!answers.confirmName) {
        return this.log(':( ok, please try again some other time...')
      }
  
      return this.log(`Thank you ${answers.firstName} ${answers.lastName}`)
    }

  /**
   * **main**
   * 
   * This is an example of a method which is invoked when the generator is ran.
   *  Though we named this method `main`, it could be named anything
   * and there can be other methods as well.
   */

  main() {
    if(this.options.new) {
      // we're calling the private method we set above
      return this._private_namePrompt()
    }

    if (this.options.a) {
      this.log(`
      .########.########..########.##.....##..#######..########.
      ....##....##.....##.##.......##.....##.##.....##.##.....##
      ....##....##.....##.##.......##.....##.##.....##.##.....##
      ....##....########..######...##.....##.##.....##.########.
      ....##....##...##...##........##...##..##.....##.##...##..
      ....##....##....##..##.........##.##...##.....##.##....##.
      ....##....##.....##.########....###.....#######..##.....## 
      `)
      return this.log('This is a generator I made as a resource whiles learning how to use yeoman')
    }

    if (this.options.appname) {
      return this.log(`Your app name is ${this.options.appname}`)
    }

    this.log('Error: Please use a command')
  }
};
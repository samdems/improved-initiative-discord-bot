import cliui from 'cliui' 
const ui = cliui()

ui.div('Usage: $0 [command] [oddptions]')

ui.div({
  text: 'Options:',
  padding: [2, 0, 1, 0],
  border:true
})

ui.div(
  {
    text: "-f, --file",
    width: 20,
    padding: [0, 4, 0, 4]
  },
  {
    text: "the file to load." +
      "(if this description is long it wraps)."
    ,
    width: 20
  },
  {
    text: "[required]",
    align: 'right'
  }
)

console.log(ui.toString())
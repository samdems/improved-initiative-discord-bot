import ui from './ui.js'
export default (data) => {
    ui.setSize(10,10)
    ui.addBox(1,1,5,5)
    ui.addText(2,2,':)')
    return '```' + ui.render()+'```'
};
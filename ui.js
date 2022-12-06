// export default  {
const ui = {
    lines:[],
    setSize(x,y){
        this.lines = new Array(y).fill('_')
        this.lines = this.lines.map(el=> new Array(x+1).fill('_'))
    },
    addText(x,y,text){
        text.split('').forEach((t,i) => {
            this.addChar(x+i,y,t)
        });
    },
    addDownText(x,y,text){
        text.split('').forEach((t,i) => {
            this.addChar(x,y+i,t)
        });
    },
    addBox(x,y,sizeX,sizeY){
        this.addText(x,y,'─'.repeat(sizeX+1))
        this.addDownText(x,y,'│'.repeat(sizeY+1))
        this.addText(x,y+sizeY+1,'─'.repeat(sizeX+1))
        this.addDownText(x+sizeX+1,y,'│'.repeat(sizeY+1))
        
        this.addChar(x,y,'┌')
        this.addChar(x+sizeX+1,y,'┐')
        this.addChar(x,y+sizeY+1,'└')
        this.addChar(x+sizeX+1,y+sizeY+1,'┘')

    },
    addChar(x,y,char){
        if(char.length !== 1) throw 'not one character'
        this.lines[y-1][x-1] = char 
    },
    render(){
        const output = this.lines.map(el=>el.join('')).join('\n');
        return output
    }
}

ui.setSize(10,10);
ui.addBox(2,2,3,2)
console.log(ui.render());
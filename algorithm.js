
// * *
// * *
// * x


let Grid = function(gridBorders, tilesMap){
    
    this.gridBorders = gridBorders;
    this.tilesMap = tilesMap;
    this.gridBordersStartX = 0;
    this.gridBordersStartY = 0;
    this.colorMap = [];
    this.color = 0;

    
    
    for(let i = 0; i < tilesMap.length; i++) {  // creates 2d array
        this.colorMap.push(new Array(tilesMap[0].length));
    }

    


    loop2:
    for (let y = 0; y < tilesMap.length; y++){
        for (let x = 0; x < tilesMap[0].length; x++){
            if (!(tilesMap[y][x])){
                this.gridBordersStartX = x;
                this.gridBordersStartY = y;
                break loop2;
                
            }
        }
    }
   
 


    this.xgridBorders = [gridBorders.length*3]; // array that contains gridBordders 3 times
    for(let x = 0; x < 3; x++){

        for(let i = 0; i < gridBorders.length; i++){
            this.xgridBorders[i + x*gridBorders.length] = gridBorders[i]
        }
    
    }

    this.checkAnglesSum=function(blocks){

        let anglesSum = 0;
        for(let i = 1; i < this.gridBorders.length;i+=2){
            if(this.gridBorders[i] == 90){
                anglesSum++;
            }
            else if(this.gridBorders[i] == 270){
                anglesSum += 3;
            }
            
        }

        for(let i = 0; i < this.blocks.length;i++){
            for(let j = 1; j < blocks[i].length;j += 2){

                if(this.blocks[i][j] == 90){
                    anglesSum++;
                }
                else if(this.blocks[i][j] == 270){
                    anglesSum += 3;
                }
            }
            
            
        }

        return (anglesSum%4 == 0);
        

    }

    

    

    
    this.placeBlock=function(block){
       
       let fitness = 0;
       let biggestFitness = 0;
        /* 
       let sharpness = 0;
       let sharpest = 0;
       let smallest = 0;
       let xthinStartIndex = 0;
       let thinStartIndex = 0;
       let thinEndIndex = 0;
        for(let i = 1; i < borders.length; i+=2){
        
            if(borders[i] == 90){
                sharpness++;
                xThinStartIndex = i;
                smallest += borders[i+1];
                
            }else if(angles[i] == 270){
                if (sharpness > sparpest)
                {
                    sharpest = sharpness;
                    thinEndIndex = i-2;
                    thinStartIndex = xThinStartIndex;
                }
                sharpness = 0;
                
            }
            
        }
        */
      
        let rememberI = 1;
        let rememberJ = 1;
        let rememberPosun = 0;
        //select point of block
        for(let i = 1; i < block.length; i+=2){
            
            if(block[i] == 90){  // calculate fitness only for corners of a block

                //select point of grid
                nextPlaceInGrid:
                for(let j = this.gridBorders.length+1; j < this.gridBorders.length*2; j+=2){  // from start of 2nd part to end of 2nd part of the extended array 
                    
                    if(this.xgridBorders[j] == 90){ // calculate fitness only for corners of a grid
                        fitness++;
                      
                        for(let posun = 1; posun < this.gridBorders.length; posun++){

                            if(block[i+posun] == this.xgridBorders[j+posun]){ // does it continue fitting?
                                fitness++;
                            
                            }else{    
                                
                                if(fitness > biggestFitness){
                                     /*
                                    if(doesItFit(block, i,j,i+posun,j+posun)){
                                    
                                        rememberI = i;
                                        rememberJ = j;
                                        rememberPosun = posun;
                                    }
                                    */
                                    let direction = 64; // 0  // left
                                    let startX = this.gridBordersStartX;
                                    let startY = this.gridBordersStartY;
                                    let switchSideAngle = true
                                    


                                    // DOES IT FIT IN?

                                    //checking where we are (by coordinates) in 2d bool array
                                    for(let k = 0; k < j+posun; k++){
                                        if(switchSideAngle){  //sides
                                            
                                            if (direction%4 == 0){
                                                startX += this.gridBorders[k];   //left
                                            }else if (direction%4 == 1){  
                                                startY += this.gridBorders[k]; //donw
                                            }else if (direction%4 == 2){  
                                                startX -= this.gridBorders[k]; //right
                                            }else{
                                                startY -= this.gridBorders[k]; //up
                                            }
                                            switchSideAngle = false;
                            
                                        }else{  // angles
                            
                                            if(this.gridBorders[k] == 90){
                                                direction++;
                                            }else if(this.gridBorders[k] == 270){
                                                direction--;
                                            }
                            
                                            switchSideAngle = true;
                                            
                                        }
                                    }     
                                    //now we know

                                    switchSideAngle = true;
                                    let x = 0;
                                    for (let k = i+posun; x < block.length; k++){  // optimalization: x< block.length - posun
                                        x++;
                                        if (k == block.length){
                                            k = 0;
                                        }
                            
                                        if(switchSideAngle){  //sides
                                            
                                            if (direction%4 == 0){
                                                for(let l = 0; l < this.gridBorders[k]; l++){
                            
                                                
                                                    startX += 1;
                                                    if((this.tilesMap[startX][startY]) || (this.tilesMap[startX][startY-1]) || (this.tilesMap[startX+1][startY-1])){  // zero = false = the space is empty
                                                        continue nextPlaceInGrid;
                                                    }
                                                }
                                            }else if (direction%4 == 1){
                                                for(let l = 0; l < this.gridBorders[k]; l++){
                                                
                                                    startY += 1;
                                                    if((this.tilesMap[startX][startY]) || (this.tilesMap[startX+1][startY]) || (this.tilesMap[startX+1][startY+1])){
                                                        continue nextPlaceInGrid;
                                                    }
                                                }
                                            }else if (direction%4 == 2){
                                                for(let l = 0; l < this.gridBorders[k]; l++){
                                                    startX -= 1;
                                                    if((this.tilesMap[startX][startY]) || (this.tilesMap[startX][startY+1]) || (this.tilesMap[startX-1][startY+1])){
                                                        continue nextPlaceInGrid;
                                                    }
                                                }
                                            }else{
                                                for(let l = 0; l < this.gridBorders[k]; l++){
                                                    startY -= 1;
                                                    if((this.tilesMap[startX][startY]) || (this.tilesMap[startX-1][startY]) || (this.tilesMap[startX-1][startY-1])){
                                                        continue nextPlaceInGrid;
                                                    }

                                                }
                                            }
                                            switchSideAngle = false;
                            
                                            
                            
                            
                                        }else{  // angles
                            
                                            if(this.gridBorders[k] == 90){
                                                direction++;
                                            }else if(this.gridBorders[k] == 270){
                                                direction--;
                                            }
                            
                                            switchSideAngle = true;
                                            
                                        }
                                    }
                                    
                                    // block succesfully fits to specific place in gird, so he is candidate to be placed there
                                    biggestFitness = fitness;
                                    rememberI = i;
                                    rememberJ = j;
                                    rememberPosun = posun;
                                    break; // bigeset fitnes = fitness
                                }
                            }   
                            
                        }
                        // didnt fit that much
                    }
                
                }
            }
            
        }

        //PLACE BLOCK:

        let direction = 64; // 0  // left
        let startX = this.gridBordersStartX;
        let startY = 0;
        let switchSideAngle = true
        this.color += 1;
        
        for(let k = 0; k < rememberJ+rememberPosun; k++){
            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    startX += this.gridBorders[k];
                }else if (direction%4 == 1){
                    startY += this.gridBorders[k];
                }else if (direction%4 == 2){
                    startX -= this.gridBorders[k];
                }else{
                    startY -= this.gridBorders[k];
                }
                switchSideAngle = false;

            }else{  // angles

                if(this.gridBorders[k] == 90){
                    direction++;
                }else if(this.gridBorders[k] == 270){
                    direction--;
                }

                switchSideAngle = true;
                
            }
        }     
        //now we know
        
        switchSideAngle = true;
        let x = 0;
        for (let k = rememberI+rememberPosun; x < block.length; k++){
            x++;
            if (k == block.length){
                k = 0;
            }

            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    for(let l = 0; l < this.gridBorders[k]; l++){

                    
                        startX += 1;
                        this.tilesMap[startX][startY] = color;
                        this.colorMap[startX][startY] = color;
                        
                    }
                }else if (direction%4 == 1){
                    for(let l = 0; l < this.borders[k]; l++){
                    
                        startY += 1;
                        this.tilesMap[startX][startY] = color;
                        this.colorMap[startX][startY] = color;
                    }
                }else if (direction%4 == 2){
                    for(let l = 0; l < this.borders[k]; l++){
                        startX -= 1;
                        this.tilesMap[startX][startY] = color;
                        this.colorMap[startX][startY] = color;
                    }
                }else{
                    for(let l = 0; l < this.borders[k]; l++){
                        startY -= 1;
                        this.tilesMap[startX][startY] = color;
                        this.colorMap[startX][startY] = color;

                    }
                }
                switchSideAngle = false;

                


            }else{  // angles

                if(this.borders[k] == 90){
                    direction++;
                }else if(this.borders[k] == 270){
                    direction--;
                }

                switchSideAngle = true;
                
            }
        }
        /*
        //FILL BLOCK OUTLINE WITH TRUE: !! not necessary !!
        let dontFill = true;
        
        for(let y = 0; y < this.tilesMap.length;y++){
            
            for(let x = 0; x < this.tilesMap[0].length;x++){

                if(!(this.tilesMap[y][x])){
                    
                    dontFill = !dontFill;
                    
                }else{
                    this.tilesMap[y][x] = dontFill;
                }
            }
        }
        */


        //UPDATE BORDERS:

                                                                                 ///////////////////////////////////////////////
      
        let tilesMapGConvert = [];
        for(let y = 0; y < this.tilesMap.length ;y++){

            for(let x = 0; x < this.tilesMap[0].length;x++){

                if( !(this.tilesMap[y][x])){
                    tilesMapGConvert.push([[x,y],[x+1,y],[x,y+1],[x+1,y+1]]);
                }
            
            }
            
        }
        //this.borders = _conversionToDegrees(tilesMapGConvert);

        this._conversionToDegrees = (inputField) =>{
            enumSidesBetterVersion={
            left: [-1,0],
            right: [1,0],
            up: [0,-1],
            down:[0,1]  

            };
            enumCor = {
                X:0,
                Y:1
            };

            degresformat = [];
            this.numberNeiberOfBlocks =(blockX,blockY) =>{
            console.log();
            console.log("/t searching for neighbors");
            console.log("/t pozice block X: " + blockX + " Y: " + blockY);
            let rowL = inputField.length;
            let numberOfSides = 0;
            for (let row = 0 ; row < rowL ; row++)
            {
                //console.log();
                for (let nextL =0 ; nextL < inputField[row].length; nextL++){
                    
                    // console.log("/t     pozice noveho block X: " + inputField[row][nextL][enumCor.X]  + " Y: " + inputField[row][nextL][enumCor.Y] );
                    if ( (inputField[row][nextL][enumCor.X] == blockX) && (inputField[row][nextL][enumCor.Y])==blockY   ){
                    numberOfSides++; 
                }
                // console.log();

            }
            } 
            
            return numberOfSides;   
            }
        
            console.log("vypis hodnot")
            console.log(inputField)
            let directionNub = 0
            let clockWiseDirection = [enumSidesBetterVersion.right,enumSidesBetterVersion.down
            ,enumSidesBetterVersion.left, enumSidesBetterVersion.up];
            
            this.changeOfDirection = (number)=>{

            if (number < 0){ 
                return clockWiseDirection.length+ number; 
            
            }
            if (number > clockWiseDirection.length-1){
                return clockWiseDirection.length-number;
            }
            return number;
            };

            
            let originalBlockX,originalBlockY;  
                
            
            clockWiseDirection[directionNub][enumCor.X]

            originalBlockX = inputField[0][0][enumCor.X];//coordinates where searching have begun
            originalBlockY = inputField[0][0][enumCor.Y ];//
            
            console.log("originalX " + originalBlockX);
            console.log("originalY " +originalBlockY);
            console.log("block direc: " + clockWiseDirection[directionNub][enumCor.X])
            console.log("block direc: " + clockWiseDirection[directionNub][enumCor.Y])

            newBlockX = originalBlockX + 1;
            newBlockY = originalBlockY + 0;
            
            let firstRun = false;;
            let numb;
            let firstNeighbor = true;
            let numberOfNeighborBlocks= 0;
            let terminator = 0;
            let Numberof90dAngles = 0;
            console.log(( newBlockX)  + " "+( newBlockY))

            console.log((originalBlockX !=  newBlockX)  + " "+(originalBlockY !=  newBlockY))
        
            while((originalBlockX != newBlockX) ||(originalBlockY != newBlockY)){
            terminator++;
            
            if (!firstRun){
                numb =this.numberNeiberOfBlocks(newBlockX , newBlockY );              
                
                firstRun  = false;              
            }else{
                console.log();
                console.log("#########################################");
                console.log("next run");
                
                numb =this.numberNeiberOfBlocks(newBlockX +clockWiseDirection[directionNub][enumCor.X], newBlockY + clockWiseDirection[directionNub][enumCor.Y]);              
            }          
            
            console.log("pocet sousednich " + numb);  
            
            if(numb == 2){ //180
            
                /* if(firstNeighbor){
                firstNeighbor = false;
                numberOfNeighborBlocks +=2;
                }else{
                numberOfNeighborBlocks++;
                }*/
                if(numberOfNeighborBlocks ==0){
                numberOfNeighborBlocks+=2;
                }else{
                numberOfNeighborBlocks++;
                }
                

                console.log("direction number is: " + directionNub );

            }else if(numb == 1  ){
                Numberof90dAngles ++;
                console.log("zmena smeru skrrra" );              
                
                if(numberOfNeighborBlocks == 0){
                //probadly something wrong
                numberOfNeighborBlocks++;

                }

                degresformat.push(numberOfNeighborBlocks);
                degresformat.push(90);

                directionNub = this.changeOfDirection(directionNub+1)
                console.log("actual direction is: " + directionNub);
                numberOfNeighborBlocks = 0;
                // firstNeighbor = false;            
            
            }else if(numb == 3){//270
                console.log(" number: " + numberOfNeighborBlocks)

                if(numberOfNeighborBlocks == 0){
                //probadly something wrong
                numberOfNeighborBlocks+=1;

                }

                
                console.log(" number: " + numberOfNeighborBlocks)

                degresformat.push(numberOfNeighborBlocks);
                degresformat.push(270);
                
                directionNub = this.changeOfDirection(directionNub-1);
                console.log("actual direction is: " + directionNub);
                numberOfNeighborBlocks = 0;
            //  firstNeighbor = false;
            }

            console.log(" direction X: " + newBlockX);
            console.log(" direction Y: " + newBlockY);
            console.log("direction numb: "+ directionNub)
            console.log("original block X:" + originalBlockX + " Y: " +  originalBlockY);
            newBlockX = newBlockX + clockWiseDirection[directionNub][enumCor.X];
            newBlockY = newBlockY + clockWiseDirection[directionNub][enumCor.Y];
            console.log("direction for next run X: " + newBlockX);
            console.log("direction for next run Y: " + newBlockY);
            
            console.log("directions: " + degresformat);
            //infinite loop
            /*  if (terminator == 100) {
                console.log("terminator pif paf")
                break;
            }*/
            }
            console.log("push hodnoty: " + numberOfNeighborBlocks );
            if(numberOfNeighborBlocks == 0){
            numberOfNeighborBlocks++;
            }
            degresformat.push(numberOfNeighborBlocks);
            degresformat.push(90);
            console.log()
            console.log(""+degresformat)
            console.log("end of conversion ?????");
            
            return degresformat;

        }
                                                                                                ///////////////////////////////////////////////
        this.borders = this._conversionToDegrees(tilesMapGConvert);
        console.log(this.borders);


        


        
    }

    this.createFullColorMap = function(colorMap){
        let fullColorMap = [[]];
        for(let y = 0; y < this.colorMap.length;y++)
        {
            for(let x = 0; x < this.colorMap[0].length-1;x++)
            {
                for(let i = 0; i < this.colorMap[x].length-1;i++)
                {
                    if(colorMap[y][x][i] != 0){
                        if((colorMap[y][x][i] in colorMap[y+1][x]) && (colorMap[y][x][i] in colorMap[y][x+1]) &&(colorMap[y][x][i] in colorMap[y+1][x]+1)){
                            fullColorMap[y][x].push(colorMap[y][x][i]);
                        }
                    }

                } 
               

            }   
        }
        return fullColorMap;
    }
        
       
    
   
}

let Block = function(){
    this.borders = borders


}




/*
tiles = [[4,2] , [4,1] , [3,2], [2, 2]]; // => [[0;0],[0;-1]],[-1;0], [-2;0]  
blocks.push( new Block(tiles));
tiles = [[2,2] , [2,1] , [2,0]];
blocks.push(block(tiles));*/
//tiles = [[4,2] , [4,1] , [3,1], [3, 2][2,2] , [2,1] , [1,1], [1, 2]];
document.write("hej");

sortBlocks=function(blocks){
        
    let BlocklengthSum = 0;
    let BlocklengthSumIndex = 0;
    let blo = [];
    for(let i = 0; i< blocks.length;i++){
        blo.push(0);
       
    }
   
    for(let k = 0; k < blocks.length; k++){
        let small = 0;
        for(let i = 0; i < blocks.length; i++){
           
            let BlocklengthSum = 0;
            for(let j = 0; j < blocks[i].length; j+=2){
            
                BlocklengthSum += blocks[i][j];
            }
            let xBlocklengthSum = 0;
            for(let j = 0; j < blocks[k].length; j+=2){
            
                xBlocklengthSum += blocks[k][j];
            }
            if(BlocklengthSum > xBlocklengthSum){
                small++;
            }           
            //blocks[i].borders.length
        }
      
        blo[k] = small;
    }
    console.log(blo);
    sortedBlocks = [];
    for(let i = 0; i< blocks.length;i++){
        sortedBlocks.push([]);
       
    }
    for(let i = 0; i< blo.length;i++){
        sortedBlocks[blo[i]] = blocks[i];
       
    }
    return sortedBlocks;
}

let gridBroders = [3,90,2,90,3,90,2,90];
let tilesMapG = [
    [-1,-1,-1,-1,-1],
    [-1,0,0,0,-1],
    [-1,0,0,0,-1],
    [-1,-1,-1,-1,-1],
    

]

let grid = new Grid(gridBroders, tilesMapG);

let blocks = [];
let block1Borders = [2,90,1,90,2,90,1,90];
let block2Borders = [1,90,1,270,2,90,1,90,3,90,2,90];
//let block3Borders = [5,90,10,90,5,90,10,90];

blocks.push(block1Borders);
blocks.push(block2Borders);
//blocks.push(block3Borders);

sortedBlocks = sortBlocks(blocks);
console.log(sortedBlocks);
//console.log(blocks);
console.log("delka", blocks.length);
document.write(!(0));




//program:

for(let i = 0; i < blocks.length;i++){
    console.log("nejdelsi",grid.selectBlock(blocks));
    grid.placeBlock(blocks[grid.selectBlock(blocks)]);
}
//
//console.log(this.createFullColorMap(grid.colorMap));




document.write("F");
 







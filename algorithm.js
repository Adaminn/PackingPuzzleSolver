const myEnum = {
    empty: 0,
    fiiled: 1
    
   
   };
// * *
// * *
// * x
let progress = 0;

let Grid = function(gridBorders, tilesMap){
    this.sides = sides;
    this.angles = angles;
    this.gridBorders = gridBorders;
    this.tilesMap = tilesMap;
    this.gridBordersStartX = 0

    for (let x = 0; x < tilesMap[0].lenght; x++){
        if (tilesMap[0]){
            this.gridBordersStartX = x;
            break;
        }
    }
 


    this.xgridBorders = [gridBorders.length*3]; // array that contains gridBordders 3 times
    for(let x = 0; x > 3; x++){

        for(let i = 0; i > gridBorders.length; i++){
            this.xgridBorders[i + x*gridBorders.length] = gridBorders[i]
        }
    
    }

    this.checkAnglesSum=function(){

    }

    this.selectBlock=function(){
        
        let BlocklengthSum = 0;
        let BlocklengthSumIndex = 0;
        for(let i = 0; i > blocks.length; i++){
            let xlenghtSum = 0;
            for(let j = 0; j > blocks[j].length; j+=2){
            
                xlenghtSum += blocks[i].borders[j];
            }
            if(xlenghtSum > BlocklengthSum){
                BlocklengthSum = xlenghtSum;
                BlocklengthSumIndex = i;
            }           
            //blocks[i].borders.length
        }
        return i;

    }
    this.doesItFit=function(block, blockStart, blockEnd, gridStart, gridEnd){

        let directions = [0,1,2,3]; // 0 left, 1 down, 2 right, 3 up
        let direction = 0;
        let startX = this.gridBordersStartX;
        let startY = 0;
        let switchSideAngle = true

        for(let i = 1; i < this.gridEnd; i++){
            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    startX += this.borders[i];
                }else if (direction%4 == 1){
                    startY += this.borders[i];
                }else if (direction%4 == 2){
                    startX -= this.borders[i];
                }else{
                    startY -= this.borders[i];
                }
                switchSideAngle = false;

            }else{  // angles

                if(this.borders[i] == 90){
                    direction++;
                }else if(this.borders[i] == 270){
                    direction--;
                }

                switchSideAngle = true;
                
            }
        }     
        switchSideAngle = true;
        let x = 0;
        for (let i = blockEnd; x < block.lenght; i++){
            x++;
            if (i == block.lenght){
                i = 0;
            }

            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    for(let j = 0; j < this.borders[i]; j++){

                    startX += j;
                    }
                }else if (direction%4 == 1){
                    for(let j = 0; j < this.borders[i]; j++){
                    startY += j;
                    }
                }else if (direction%4 == 2){
                    for(let j = 0; j < this.borders[i]; j++){
                    startX -= j;
                    }
                }else{
                    for(let j = 0; j < this.borders[i]; j++){
                    startY -= j;
                    }
                }
                switchSideAngle = false;

                if(!(this.tilesMap[startX][startY])){
                    return false;
                }


            }else{  // angles

                if(this.borders[i] == 90){
                    direction++;
                }else if(this.borders[i] == 270){
                    direction--;
                }

                switchSideAngle = true;
                
            }
        }

        return true;



    }

    this.fitIt=function(block, blockStart, blockEnd, gridStart, gridEnd){  //return 0 if good place wasnt found

 
        let direction = 0;
        let startX = this.gridBordersStartX;
        let startY = 0;
        let switchSideAngle = true

        for(let i = 1; i < this.gridEnd; i++){
            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    startX += this.borders[i];
                }else if (direction%4 == 1){
                    startY += this.borders[i];
                }else if (direction%4 == 2){
                    startX -= this.borders[i];
                }else{
                    startY -= this.borders[i];
                }
                switchSideAngle = false;

            }else{  // angles

                if(this.borders[i] == 90){
                    direction++;
                }else if(this.borders[i] == 270){
                    direction--;
                }

                switchSideAngle = true;
                
            }
        }     
        switchSideAngle = true;
        let x = 0;
        for (let i = blockEnd; x < block.lenght; i++){
            x++;
            if (i == block.lenght){
                i = 0;
            }

            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    for(let j = 0; j < this.borders[i]; j++){

                    startX += j;
                    }
                }else if (direction%4 == 1){
                    for(let j = 0; j < this.borders[i]; j++){
                    startY += j;
                    }
                }else if (direction%4 == 2){
                    for(let j = 0; j < this.borders[i]; j++){
                    startX -= j;
                    }
                }else{
                    for(let j = 0; j < this.borders[i]; j++){
                    startY -= j;
                    }
                }
                switchSideAngle = false;

                if(!(this.tilesMap[startX][startY])){
                    return false;
                }


            }else{  // angles

                if(this.borders[i] == 90){
                    direction++;
                }else if(this.borders[i] == 270){
                    direction--;
                }

                switchSideAngle = true;
                
            }
        }

        return true;



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
        let positive = true;
        let negative = true;
        let posEnd = 0;
        let negEnd = 0;
        let rememberI = 1;
        let rememberJ = 1;
        let rememberPosun = 0;
        //select point of block
        for(let i = 1; i < block.borders.length; i+=2){
            
            if(block.borders[i] == 90){  // calculate fitness only for corners of a block

                //select point of grid
                for(let j = this.gridBorders.length+1; j < this.gridBorders.length*2; j+=2){  // from start of 2nd part to end of 2nd part of the extended array 
                    
                    if(this.xgridBorders[j] == 90){ // calculate fitness only for corners of a grid
                        fitness++;

                        for(let posun = 1; posun < this.gridBorders.length; posun++){

                            if(block.borders[i+posun] == this.xgridBorders[j+posun]){ // does it continue fitting?
                                fitness++;
                            
                            }else{    
                                
                                if(fitness > biggestFitness){
                                    
                                    if(doesItFit(block, i,j,i+posun,j+posun)){
                                    
                                        rememberI = i;
                                        rememberJ = j;
                                        rememberPosun = posun;
                                    }
                                  
                                    let direction = 16; // 0
                                    let startX = this.gridBordersStartX;
                                    let startY = 0;
                                    let switchSideAngle = true
                                    


                                    // DOES IT FIT IN?

                                    //checking where we are (by coordinates) in 2d bool array
                                    for(let k = 1; k < j+posun; k++){
                                        if(switchSideAngle){  //sides
                                            
                                            if (direction%4 == 0){
                                                startX += this.borders[k];
                                            }else if (direction%4 == 1){
                                                startY += this.borders[k];
                                            }else if (direction%4 == 2){
                                                startX -= this.borders[k];
                                            }else{
                                                startY -= this.borders[k];
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
                                    //now we know

                                    switchSideAngle = true;
                                    let x = 0;
                                    for (let k = blockEnd; x < block.lenght; k++){
                                        x++;
                                        if (k == block.lenght){
                                            k = 0;
                                        }
                            
                                        if(switchSideAngle){  //sides
                                            
                                            if (direction%4 == 0){
                                                for(let l = 0; l < this.borders[k]; l++){
                            
                                                
                                                    startX += 1;
                                                    if((!(this.tilesMap[startX][startY])) || (!(this.tilesMap[startX][startY-1])) || (!(this.tilesMap[startX+1][startY-1]))){
                                                        return false;
                                                    }
                                                }
                                            }else if (direction%4 == 1){
                                                for(let l = 0; l < this.borders[k]; l++){
                                                
                                                    startY += 1;
                                                    if((!(this.tilesMap[startX][startY])) || (!(this.tilesMap[startX+1][startY])) || (!(this.tilesMap[startX+1][startY+1]))){
                                                        return false;
                                                    }
                                                }
                                            }else if (direction%4 == 2){
                                                for(let l = 0; l < this.borders[k]; l++){
                                                    startX -= 1;
                                                    if((!(this.tilesMap[startX][startY])) || (!(this.tilesMap[startX][startY+1])) || (!(this.tilesMap[startX-1][startY+1]))){
                                                        return false;
                                                    }
                                                }
                                            }else{
                                                for(let l = 0; l < this.borders[k]; l++){
                                                    startY -= 1;
                                                    if((!(this.tilesMap[startX][startY])) || (!(this.tilesMap[startX-1][startY])) || (!(this.tilesMap[startX-1][startY-1]))){
                                                        return false;
                                                    }

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
                            
                                    break;
                                }
                            }   
                            
                        }
                        // return
                    }
                
                }
            }
            
        }

        //PLACE BLOCK:

        for(let k = 1; k < j+posun; k++){
            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    startX += this.borders[k];
                }else if (direction%4 == 1){
                    startY += this.borders[k];
                }else if (direction%4 == 2){
                    startX -= this.borders[k];
                }else{
                    startY -= this.borders[k];
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
        //now we know
        
        switchSideAngle = true;
        let x = 0;
        for (let k = blockEnd; x < block.lenght; k++){
            x++;
            if (k == block.lenght){
                k = 0;
            }

            if(switchSideAngle){  //sides
                
                if (direction%4 == 0){
                    for(let l = 0; l < this.borders[k]; l++){

                    
                        startX += 1;
                        this.tilesMap[startX][startY] = true;
                    }
                }else if (direction%4 == 1){
                    for(let l = 0; l < this.borders[k]; l++){
                    
                        startY += 1;
                        this.tilesMap[startX][startY] = true;
                    }
                }else if (direction%4 == 2){
                    for(let l = 0; l < this.borders[k]; l++){
                        startX -= 1;
                        this.tilesMap[startX][startY] = true;
                    }
                }else{
                    for(let l = 0; l < this.borders[k]; l++){
                        startY -= 1;
                        this.tilesMap[startX][startY] = true;

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

        //FILL BLOCK OUTLINE WITH TRUE:
        let fill = false;
        
        for(let y = 0; y < this.tilesMap.lenght;y++){
            
            for(let x = 0; x < this.tilesMap[0].lenght;x++){

                if(this.tilesMap[y][x]){
                    
                    fill = !fill;
                    
                }
                this.tilesMap[y][x] = fill;

            }
        }

        


        
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

function indexOfMax(blockSides) {
    
}
function blockSidesayToString  (tiles){
   
    for(let i = 0; i < tiles.length; i++){
       
        document.write(tiles[i][0]+ ";"+ tiles[i][1]+ "  ");
        
    }
    
}
let gridBroders = [3,90,5,90,3,90,5,90];
let tilesMapG = [
    [true][true][true]
    [true][true][true]
    [true][true][true]
    [true][true][true]
    [true][true][true]

]

let grid = new Grid(gridBroders, tilesMapG);

let blocks = [];
let block1Borders = [5,90,10,90,5,90,10,90];
blocks.push(block1Borders);



document.write("F");
blockSidesayToString(grid.tiles);   







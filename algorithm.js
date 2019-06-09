

let Grid = function(gridBorders, tilesMap){
    
    this.gridBorders = gridBorders;
    this.tilesMap = tilesMap;
    this.gridBordersStartX = 0;
    this.gridBordersStartY = 0;
    this.colorMap = [];
    this.color = 0;
    this.gridStates = [];

    this.gridStates.push(this.tilesMap);
    
    
    for(let i = 0; i < tilesMap.length; i++) {  // creates 2d array
        this.colorMap.push(new Array(tilesMap[0].length));
    }

    

    this.updateStartXY= function(){
       
        for (let y = 0; y < tilesMap.length; y++){
            for (let x = 0; x < tilesMap[0].length; x++){
                if (!(tilesMap[y][x])){
                    this.gridBordersStartX = x;
                    this.gridBordersStartY = y;
                    return;
                    
                }
            }
        }
    }
   
    this.isInArray = function(array, item){
        for(let i = 0; i < array.length; i++){
            if(array[i] == item){
                return true;
            }
        }
        return false;
    }

    this.loadState = function(depth){
        this.tilesMap = this.gridStates[depth];
        
        for (let y = 0; y < tilesMap.length; y++){
            for (let x = 0; x < tilesMap[0].length; x++){
                this.tilesMap[y][x] = this.gridStates[depth][y][x];
            }
        }

        let tilesMapGConvert = [];
            for(let y = 0; y < this.tilesMap.length ;y++){

                for(let x = 0; x < this.tilesMap[0].length;x++){

                    if( !(this.tilesMap[y][x])){
                        tilesMapGConvert.push([[x,y],[x+1,y],[x,y+1],[x+1,y+1]]);
                    }
                
                }
                
            }
        this.borders = this._conversionToDegrees(tilesMapGConvert);

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

        return (anglesSum%360 == 0);
        

    }

    

    

    
    this.placeBlock=function(block, depth){
       
       
       
        let fitness = 0;
        let biggestFitness = 0;
        let rememberI = 1;
        let rememberJ = 1;
        let rememberPosun = 0;
        let blockPlaced = false;
        let fullyFits= false;
        let a = 0;
        //select point of block
        for(let i = 1; i < block.length; i+=2){
            
            if(block[i] == 90){  // calculate fitness only for corners of a block

                //select point of grid
                nextPlaceInGrid:
                for(let j = 1; a < this.gridBorders.length; j+=2){  // from start of 2nd part to end of 2nd part of the extended array 
                    a++;
                    if(j > this.gridBorders){
                        j = 1;
                    }
                    if(this.xgridBorders[j] == 90){ // calculate fitness only for corners of a grid
                        fitness++;
                      
                        for(let posun = 1; ; posun++){

                            if((block[i+posun] !== this.xgridBorders[j+posun]) || fullyFits){ // does it continue fitting?
                                  
                                posun--;
                                if(fitness > biggestFitness){
                                  
                                    let direction = 64; // 0  // left
                                    let startX = this.gridBordersStartX;
                                    let startY = this.gridBordersStartY;
                                    let switchSideAngle = true;
                                    console.log("STARTx" ,startX);
                                    console.log("STARTy" ,startY);
                                    console.log("j" ,j);
                                    console.log("posum" , posun);console.log("gridBorders" , this.gridBorders);
                                   
                                    // DOES IT FIT IN?

                                    //checking where we are (by coordinates) in 2d bool array
                                    for(let k = 0; k < j+posun; k++){
                                        if(switchSideAngle){  //sides
                                            console.log("k" ,k);
                                            if (direction%4 == 0){
                                               
                                                startX += this.gridBorders[k];   //left
                                                console.log("STARTx" ,startX);
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
                                        console.log("STARTx" ,startX);
                                    }     
                                    //now we know
                                    console.log("STARTx" ,startX);
                                    console.log("STARTy" ,startY);
                                    switchSideAngle = false;
                                    let x = 1;
                                    console.log("tiles map" ,this.tilesMap);
                                    console.log("x" ,this.startX);
                                    console.log("y" ,this.startY);
                                    console.log("!(this.isInArray(this.tilesMap[StartY][StartX],0)" ,this.tilesMap[StartY][StartX]);
                                    for (let k = i+posun;;){ // do once 
                                        let stoppedTouching = false;
                                            
                                        if (direction%4 == 0){
                                            for(let l = 0; l < this.gridBorders[k]; l++){
                        
                                            
                                                startX += 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) && stoppedTouching ){  // if space is occupied...  
                                                    a = 0;   
                                                    continue nextPlaceInGrid;
                                                }else if(this.isInArray(this.tilesMap[StartY][StartX],0)){
                                                    stoppedTouching = true;
                                                }
                                                                                                
                                            }
                                        }else if (direction%4 == 1){
                                            for(let l = 0; l < this.gridBorders[k]; l++){
                                            
                                                startY += 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) && stoppedTouching ){  
                                                    a = 0; 
                                                    continue nextPlaceInGrid;
                                                }else{
                                                    stoppedTouching = true;
                                                }
                                            }
                                        }else if (direction%4 == 2){
                                            for(let l = 0; l < this.gridBorders[k]; l++){

                                                startX -= 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0))&& stoppedTouching  ){  
                                                    a = 0; 
                                                    continue nextPlaceInGrid;;
                                                }else{
                                                    stoppedTouching = true;
                                                }
                                            }
                                        }else{
                                            for(let l = 0; l < this.gridBorders[k]; l++){

                                                startY -= 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) && stoppedTouching ){  
                                                    a = 0; 
                                                    continue nextPlaceInGrid;
                                                }else{
                                                    stoppedTouching = true;
                                                }

                                            }
                                        }
                                        
                                        switchSideAngle = false;
                                        break;
                                    }
                                    for (let k = i+posun+1; x < block.length - posun -2; k++){  // optimalization: x< block.length - posun
                                        x++;
                                        if (k == block.length){
                                            k = 0;
                                        }
                            
                                        if(switchSideAngle){  //sides
                                            
                                            if (direction%4 == 0){
                                                for(let l = 0; l < this.gridBorders[k]; l++){
                            
                                                
                                                    startX += 1;
                                                    if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) ){  // zero = false = the space is empty
                                                        a = 0; 
                                                        continue nextPlaceInGrid;
                                                    }
                                                }
                                            }else if (direction%4 == 1){
                                                for(let l = 0; l < this.gridBorders[k]; l++){
                                                
                                                    startY += 1;
                                                    if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) ){  
                                                        a = 0; 
                                                        continue nextPlaceInGrid;
                                                    }
                                                }
                                            }else if (direction%4 == 2){
                                                for(let l = 0; l < this.gridBorders[k]; l++){

                                                    startX -= 1;
                                                    if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) ){  
                                                        a = 0; 
                                                        continue nextPlaceInGrid;
                                                    }
                                                }
                                            }else{
                                                for(let l = 0; l < this.gridBorders[k]; l++){

                                                    startY -= 1;
                                                    if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) ){  
                                                        a = 0; 
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

                                    x= 0;
                                    for (let k = i+posun; x < 2; k++){  // check the las angle and side
                                        x++;
                                        if (k == block.length){
                                            k = 0;
                                        }
                            
                                        if(this.gridBorders[k] == 90){
                                            direction++;
                                        }else if(this.gridBorders[k] == 270){
                                            direction--;
                                        }
                        
                                        let stoppedTouching = true;
                                            
                                        if (direction%4 == 0){
                                            for(let l = 0; l < this.gridBorders[k]; l++){
                        
                                            
                                                startX += 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) && stoppedTouching ){  // if space is occupied...     
                                                    stoppedTouching = false;
                                                }else if(stoppedTouching == false){
                                                    a = 0; 
                                                    continue nextPlaceInGrid;
                                                }
                                                                                                
                                            }
                                        }else if (direction%4 == 1){
                                            for(let l = 0; l < this.gridBorders[k]; l++){
                                            
                                                startY += 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) && stoppedTouching ){  
                                                    stoppedTouching = false;
                                                }else if(stoppedTouching == false){
                                                    a = 0; 
                                                    continue nextPlaceInGrid;
                                                }
                                            }
                                        }else if (direction%4 == 2){
                                            for(let l = 0; l < this.gridBorders[k]; l++){

                                                startX -= 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0))&& stoppedTouching  ){  
                                                    stoppedTouching = false;
                                                }else if(stoppedTouching == false){
                                                    a = 0; 
                                                    continue nextPlaceInGrid;
                                                }
                                            }
                                        }else{
                                            for(let l = 0; l < this.gridBorders[k]; l++){

                                                startY -= 1;
                                                if( !(this.isInArray(this.tilesMap[StartY][StartX],0)) && stoppedTouching ){  
                                                    stoppedTouching = false;
                                                }else if(stoppedTouching == false){
                                                    a = 0; 
                                                    continue nextPlaceInGrid;
                                                }

                                            }
                                        }
                            
                                            
                            
                            
                                       
                            
                                           
                                            
                                        
                                    }
                                    
                                    // block succesfully fits to specific place in gird, so he is candidate to be placed there
                                    biggestFitness = fitness;
                                    rememberI = i;
                                    rememberJ = j;
                                    rememberPosun = posun;
                                    blockPlaced = true;
                                    a = 0; 
                                    continue nextPlaceInGrid;
                                }
                                 // didnt fit that much
                                 a = 0; 
                                continue nextPlaceInGrid;
                            
                            }else {
                                fitness++;
                                if(posun == this.gridBorders.length){
                                    fullyFits = true;
                                }
                            }  
                            
                            
                        }
                       
                    }
                
                }
            }
            
        }

        //PLACE BLOCK:

        this.updateStartXY();

        if(blockPlaced){
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
                            if(this.isInArray(this.tilesMap[StartY][StartX],0)){
                                tilesMap[StartY][StartX].pop();
                            }
                            this.tilesMap[StartY][StartX].push(color);
                           
                            
                        }
                    }else if (direction%4 == 1){
                        for(let l = 0; l < this.borders[k]; l++){
                        
                            startY += 1;
                            if(this.isInArray(this.tilesMap[StartY][StartX],0)){
                                tilesMap[StartY][StartX].pop();
                            }
                            this.tilesMap[StartY][StartX].push(color);
                           
                        }
                    }else if (direction%4 == 2){
                        for(let l = 0; l < this.borders[k]; l++){
                            startX -= 1;
                            if(this.isInArray(this.tilesMap[StartY][StartX],0)){
                                tilesMap[StartY][StartX].pop();
                            }
                            this.tilesMap[StartY][StartX].push(color);
                            
                        }
                    }else{
                        for(let l = 0; l < this.borders[k]; l++){
                            startY -= 1;
                            if(this.isInArray(this.tilesMap[StartY][StartX],0)){
                                tilesMap[StartY][StartX].pop();
                            }
                            this.tilesMap[StartY][StartX].push(color);
                            

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
            for(let d = depth; d < this.gridStates.length-1;d++)
            {
                this.gridStates.pop()
            }
            this.gridStates.push(this.tilesMap);

            


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
            return true;
    }else{
        return false;
    }


        


        
    }

    this.createFullColorMap = function(colorMap){
        let fullColorMap = [[]];
        for(let y = 0; y < this.colorMap.length;y++)
        {
            for(let x = 0; x < this.colorMap[0].length-1;x++)
            {
                for(let i = 0; i < this.colorMap[x].length-1;i++)
                {
                    
                    if((this.isInArray(colorMap[y+1][x],colorMap[y][x][i]) ) && (this.isInArray(colorMap[y][x+1],colorMap[y][x][i]))&&(this.isInArray(colorMap[y+1][x+1],colorMap[y][x][i]))){
                        fullColorMap[y][x].push(colorMap[y][x][i]);
                    }
                    

                } 
               

            }   
        }
        return fullColorMap;
    }
        
       
    
   
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
smallestNmb = function(array, howMuchSmall){
    let smallest = 0;
    let x =-1;
    for(let j = 0; j < array.length;j++){
        for(let i = 0; i < array.length;i++){
            if (smallest == array[i]){
                smallest++;
                break;
            }else{
                x++;
                if(x == howMuchSmall){
                    return smallest;
                }
               
            }
        }
    }
    if (smallest == 0){
        return 0;
    }
    return -1;
}
let gridBorders = [3,90,2,90,3,90,2,90];
let tilesMapG = [
    [[-1,0],[-1,0],[-1,0],[-1,0]],
    [[-1,0],[0],[0],[-1,0]],
    [[-1,0],[-1,0],[-1,0],[-1,0]]

    

]


let grid = new Grid(gridBorders, tilesMapG);

let blocks = [];
let block1Borders = [2,90,1,90,2,90,1,90];
let block2Borders = [1,90,1,270,2,90,1,90,3,90,2,90];
//let block3Borders = [5,90,10,90,5,90,10,90];

blocks.push(block1Borders);
blocks.push(block2Borders);
//blocks.push(block3Borders);

sortedBlocks = sortBlocks(blocks);
console.log("sorted blocks: " + sortedBlocks);
//console.log(blocks);

document.write(!(0));




//program:
let placedBlocks = [];
let depth = 0;
let howMuchSmaller = [sortedBlocks.length];
let pick = 0;
for(let i = 0; i< howMuchSmaller.length;i++){
    howMuchSmaller[i] = 0;
}



while(depth != -1){
    if(depth == sortBlocks.length + 1){ // grid sucessfully filled
        break;
    }
    pick = smallestNmb(placedBlocks, howMuchSmaller[depth]);
    console.log("pick: " + pick);
    if(!(grid.placeBlock(sortedBlocks[pick], depth))){ // if there isnt place for that block
        if(smallestNmb(howMuchSmaller[depth] + 1)==-1){ // f, go back
            for(let c = depth; c < howMuchSmaller.depth;c++){
                howMuchSmaller[c] = 0;
            }
            depth--;
            grid.loadState(depth);
        }else{
            howMuchSmaller[depth]++;
        }
    }else{
        placedBlocks.push(pick);
        depth++
      

    }
}
if(depth == sortBlocks.length + 1){
    //vzkrestli
    console.log(grid.createFullColorMap());
}else{
    document.write("nema reseni");
}


//
//console.log(this.createFullColorMap(grid.colorMap));




document.write("F");
 







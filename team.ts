export class Team{
    public orderedScores: number[] = [];
    public avg: number = 0;
    public scores: number[];
    public displayScores: string = '';
    public displayAverage: string = '';

    constructor(public name: string, public num: number, scores?: number[]){
        if(scores){
            this.scores = scores;
            this.genOrderScores()
            return;
        }
        this.scores = [];
        this.orderedScores = [];
        this.avg = 0;
    }
    
    private genOrderScores(top: number = 0): void{
        if(this.scores.length > 0){
            this.orderedScores = [...this.scores].sort((a,b) => b-a);
            this.genAverage(top);
        } else {
            this.orderedScores = [];
            this.avg = 0
        }
        this.genDisplays();
    }

    private genDisplays(){
        this.displayScores = [...this.scores].toString();
        if(this.displayScores.length > 10){
            this.displayScores = this.displayScores.slice(0, 10) + '...';
        }
        this.displayAverage = Math.floor(this.avg).toString();
    }

    genAverage(top: number): void{
        switch(top){
            case 0: this.avg = this.orderedScores.reduce((a,b) => a+b) / this.orderedScores.length; break;
            case -1: this.avg = this.orderedScores[0]; break;
            default:
                if(this.orderedScores.length > top){
                    this.avg = this.orderedScores.splice(0, top).reduce((a,b) => a+b) / top
                }
                else{
                    this.avg = this.orderedScores.reduce((a,b) => a+b) / this.orderedScores.length;
                }  
        }
                
    }

    public addScore(score: number, top: number = 0){
        this.scores.push(score)
        this.genOrderScores(top);
        
    }


}
export class Team{
    public orderedScores: number[] = [];
    public avg: number = 0;
    public scores: number[];

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
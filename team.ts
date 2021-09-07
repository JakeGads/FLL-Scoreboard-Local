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
        this.orderedScores = [...this.scores].sort((a,b) => b-a);
        this.genAverage(top);
    }

    private genAverage(top: number): void{
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

export class Teams{
    public teams: Team[];

    constructor(teams: Team[]){
        if(teams){
            this.teams = teams;
            this.sortTeams();
        }
        else{
            this.teams = [];
        }
    }
    
    private sortTeams() {
        this.teams = this.teams.sort(
            function(a: Team, b: Team){
                if(a.avg == b.avg){
                    if(a.orderedScores[0] == b.orderedScores[0]){
                        return b.num - a.num
                    }
                    return b.orderedScores[0] - a.orderedScores[0]
                }   
                return b.avg - a.avg;  
            }
        )
    }

    public addScore(teamNumber: number, score: number, top: number = 0){
        this.teams.forEach(
            function(a:Team){
                if(a.num == teamNumber){
                    a.addScore(score, top);
                    return;
                }
            }
        )
    }
}
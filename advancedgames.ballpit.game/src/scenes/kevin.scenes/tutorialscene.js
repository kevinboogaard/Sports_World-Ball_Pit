var scene = scene || {};

var __GLOBAL__HACK_SCORE_HOLDER = null;

scene.Tutorialscene = (function () {

    /**
     * 'Entityscene'
     */
    function Tutorialscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Tutorialscene");


        //var halfWidth = Config.Core.Dimensions.width / 2;
        this.background = new ADCore.Interface(new Vector2(0, 0),"tutorialbackground");
        this.addChild(this.background);    
/*
        this.header = new ADCore.Text().value("Tutorial").position(new Vector2(halfWidth, 50)).anchor(new Vector2(0.5, 0.5)).font("comfortaa").size(30).weight("bold").finish();
        this.addChild(this.header);

        this.tutorialscreen1 = new ADCore.Interface(new Vector2(0, 0),"tutorialscreen1");
        this.tutorialscreen1.x = halfWidth - this.tutorialscreen1.width * 1.25;
        this.tutorialscreen1.y = 100;
        this.addChild(this.tutorialscreen1);

        this.tutorialscreen2 = new ADCore.Interface(new Vector2(0, 0),"tutorialscreen2");
        this.tutorialscreen2.x = halfWidth + this.tutorialscreen2.width * 0.25;        
        this.tutorialscreen2.y = 100;        
        this.addChild(this.tutorialscreen2);

        this.tutorialscreen3 = new ADCore.Interface(new Vector2(0, 0),"tutorialscreen3");
        this.tutorialscreen3.x = halfWidth - this.tutorialscreen3.width * 1.25;
        this.tutorialscreen3.y = 275;
        this.addChild(this.tutorialscreen3); 

        this.tutorialscreen4 = new ADCore.Interface(new Vector2(0, 0),"tutorialscreen4");
        this.tutorialscreen4.x = halfWidth + this.tutorialscreen4.width * 0.25;
        this.tutorialscreen4.y = 275;
        this.addChild(this.tutorialscreen4);

        this.description = new ADCore.Text().value("Swipe om naast elkaar gelegen ballen van plek te verwisselen en zo 3 of meer van dezelfde ballen op 1 rij te krijgen.")
            .position(new Vector2(halfWidth, 500)).anchor(new Vector2(0.5, 0.5)).font("comfortaa").size(20).weight("bold").wrap(325).finish();
        this.addChild(this.description);

        this.startButton = new ADCore.Button(new Vector2(halfWidth, 580),"startbutton-inactive");
        this.startButton.onInputUp = this._onStartButtonInputUp.bind(this);
        this.addChild(this.startButton);*/

        this.testscore = new ballpit.ScoreHolder();
        __GLOBAL__HACK_SCORE_HOLDER = this.testscore;

        this.testscoretext = new ballpit.ScoreView(this.testscore,new Vector2(0, 0),"startbutton-inactive");
        this.addChild(this.testscoretext);

    }
    Tutorialscene.prototype = Object.create(Phaser.Group.prototype);
    Tutorialscene.prototype.constructor = Tutorialscene; 
    var p = Tutorialscene.prototype;

    p.Update = function () {
        this.testscoretext.Update();
    };

    p._onStartButtonInputUp = function () {
        Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this);
    };

    p.Dispose = function () {
        this.removeChild(this.background);  
        this.background.Dispose();  
 
       this.removeChild(this.header);

        this.removeChild(this.tutorialscreen1);  
        this.tutorialscreen1.Dispose();
        this.removeChild(this.tutorialscreen2);
        this.tutorialscreen2.Dispose();
        this.removeChild(this.tutorialscreen3); 
        this.tutorialscreen3.Dispose();
        this.removeChild(this.tutorialscreen4);
        this.tutorialscreen4.Dispose();

        this.removeChild(this.description);

        this.removeChild(this.startButton);
        this.startButton.Dispose();
    };

    return Tutorialscene;
}());
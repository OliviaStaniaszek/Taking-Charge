class Question {
    constructor() {
        this.questions = [
            {
                // Battery = 6[V], Resistor = 3[Ohm] --> V/R=I --> 6/3=2[A]
                question: "QUESTION: \n \n build a series circuit with a battery, light bulb, switch and resistors. use the resistors to create circuit current of 1A",
                hint: "Hint: remember that based on Ohm's law, in a series circuit V/R=I",
                level: 1,
                answerAmpere: 1,
                answerComponents: ["BATTERY", "RESISTOR_4K", "RESISTOR_2K", "LIGHTBULB", "SWITCH"]
            },
            {
                question: "build a series circuit with a battery, light bulb, and switch. use the resistors and the ampere meter so that the circuit current is X.",
                hint: "",
                level: 2,
                answerAmpere: 20,
                answerComponents: ["BATTERY", "RESISTOR_7K", "SWITCH"]
            }
        ];
    }

    getQuestion(level) {
        return this.questions[level - 1].question;
    }
    getHint(level) {
        return this.questions[level - 1].hint;
    }
    getAnswerAmpere(level) {
        return this.questions[level - 1].answerAmpere;
    }
    getAnswerComponents(level) {
        return this.questions[level - 1].answerComponents;
    }
}

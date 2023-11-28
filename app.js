    const quizSelector= document.getElementById("quiz-selector");
    const quizContainer=document.getElementById("quiz-container");
    const  questionContainer=document.getElementById("question-container");
    const answerButtonsContainer = document.getElementById(
        "answer-buttons-container"
      );
      const resultsContainer=document.getElementById("results-container");
    class Quiz{
        constructor(questions){
            this.questions=Quiz.shuffleArray(questions);
            this.currentQuestionIndex=0;
            this.score=0;
        }
        displayQuestions(){
            answerButtonsContainer.innerHTML="";
            const currentQuestion=this.questions[this.currentQuestionIndex];
            questionContainer.textContent=currentQuestion.question;
            const answers=Quiz.shuffleArray(currentQuestion.answers);
            answers.forEach(answer =>{
                const answerbtn=document.createElement("button");
                answerbtn.classList=["answer-button"];
                answerbtn.textContent=answer;
                answerbtn.addEventListener("click",this.checkAnswer.bind(this));
                answerButtonsContainer.appendChild(answerbtn);


            })
           
            

            
        }
        // checkAnswer(event){
        //     const selectedAnswer=event.target.textContent;
        //     const currentQuestion=this.questions[this.currentQuestionIndex];

         
        //     if(selectedAnswer===currentQuestion.correctAnswer){

        //         this.score++;
        //     }
            
        //         this.currentQuestionIndex++;
            
        //     if(this.currentQuestionIndex<this.questions.length){
        //         this.displayQuestions();
        //     }
        //     else{
        //         this.showResult();
        //     }
        // }
        checkAnswer(event) {
            const selectedAnswer = event.target.textContent;
            const currentQuestion = this.questions[this.currentQuestionIndex];
        
            if (selectedAnswer === currentQuestion.correctAnswer) {
              this.score++;
            }
        
            this.currentQuestionIndex++;
        
        
            if (this.currentQuestionIndex <this.questions.length) {
                this.displayQuestions();
              } else {
                this.showResult();
              }
          }
         showResult(){
            quizContainer.style.display="none";
            resultsContainer.style.display="block";
           
            resultsContainer.innerHTML=`
            <h1>QUiz Result</h2>
            <p>You scored ${this.score} out of ${this.questions.length} questions</p>
            <button id="reload-quiz">Rload All Qiuz</button>
            
            `;

      document.getElementById("reload-quiz").addEventListener("click", () => {
        quizContainer.style.display = "none";
        resultsContainer.style.display = "none";
        quizSelector.style.display = "flex";
      })
           
        }
        static shuffleArray(arr){
            return[...arr].sort(()=>Math.random()-0.5);
        }
        
    }
    const loadQuiz=(questions)=>{
        const quiz= new Quiz(questions);
        quiz.displayQuestions();
        quizContainer.style.display="block";
        quizSelector.style.display = "none";
        


    }





const loadAllQuiz=async()=>{
    const response=await fetch("./quizzes.json");
    const quizes=await response.json();
    quizes.forEach((quiz,index)=>{
        const quizCard=document.createElement("div");
        quizCard.classList=["quiz-card"];
        quizCard.innerHTML="MCQS" + (index + 1);
        quizCard.addEventListener("click", () => loadQuiz(quiz));
        quizSelector.appendChild(quizCard);
        
        




    })
};
loadAllQuiz();







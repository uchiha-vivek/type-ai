
import { faker } from "@faker-js/faker"
import Restart from "./components/Restart"
import Output from "./components/Output"

const random_words = faker.random.words(10)

function App(){
  // RandomWords
  
  return (
    <>
     <CountDownTimer timeLeft={30} />
     <RandomWords random_words={random_words} />
     <Restart className={"mx-auto mt-10 text-slate-500"} onRestart={() => null } />
      <Output className="mt-10" errors={10} accuracyPercentage={100} total={200}  />
    </>
  )
}

// component for generating word
const RandomWords = ({random_words}:{random_words:string})=>{
  return <div className="text-4xl text-center text-slate-500" > {random_words} </div>
}

// timer component

const CountDownTimer = ({timeLeft} :{timeLeft:number} ) => {
   return <h2 className="text-primary-400 font-medium" > Time : {timeLeft}  </h2>
}




export default App
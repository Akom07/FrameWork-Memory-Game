import { useEffect } from "react"
import { useState } from "react"

const cardimg = [
  { "isChacked": false, "name": 1, "src": "/img/net.png", "ismatching": false },
  { "isChacked": false, "name": 2, "src": "/img/js.png", "ismatching": false },
  { "isChacked": false, "name": 3, "src": "/img/next.png", "ismatching": false },
  { "isChacked": false, "name": 4, "src": "/img/react.png", "ismatching": false },
  { "isChacked": false, "name": 5, "src": "/img/vite.png", "ismatching": false },
  { "isChacked": false, "name": 6, "src": "/img/angular.png", "ismatching": false },
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [c1, setC1] = useState(null)
  const [c2, setC2] = useState(null)
  const shuffleCards = () => {
    const shuffledCards = [...cardimg, ...cardimg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }
  const chois = (card) => {
    const chacking = cards.map((e) => {
      if (e.id == card.target.name) {
        return ({ ...e, isChacked: true })
      } else {
        return (e)
      }
    })
    setCards(chacking)
    c1 ? setC2(card.target.nextSibling) : setC1(card.target.nextSibling)
  }

  useEffect(() => { shuffleCards() }, [])
  useEffect(() => {

    if (c1 != null && c2 != null) {
      if (c1.src === c2.src) {
        const foundCard = cards.map((e) => {
          if (e.name == c1.name) {
            return ({ ...e, ismatching: true })
          } else {
            return (e)
          }
        })
        setCards(foundCard)
        reseter()
      } else {
        setTimeout(() => {
          const chacking2 = cards.map((e) => {
            if (e.name == c1.name) {
              return ({ ...e, isChacked: false })
            } else if (e.name == c2.name) {
              return ({ ...e, isChacked: false })
            } else {
              return (e)
            }

          })

          setCards(chacking2)
          reseter()
        }, 750)
      }

    }
  }, [c1, c2])
  const reseter = () => {
    setC1(null)
    setC2(null)
    setTurns(oldTerns => oldTerns + 1)

  }

  return (
    <div className="w-screen h-screen flex flex-col items-center max-sm:pt-0 max-sm:gap-8 pt-4 gap-10">
      <div className="flex flex-col justify-center items-center gap-4 ">
        <h1 className="text-3xl max-sm:text-2xl"> FrameWork Memory Game</h1>
        <button onClick={shuffleCards} className="border w-32 border-l-neutral-400">new game</button>
      </div>
      <div className="grid max-sm:grid-cols-3 max-sm:grid-rows-4  grid-cols-4 grid-rows-3 gap-2 place-items-center max-lg:w-2/3 max-md:w-2/3 max-sm:w-full w-1/2 ">
        {cards.map((card) => (
          <div key={card.id} className="swap swap-flip text-9xl">
            <input name={card.id} type="checkbox" checked={card.isChacked} onClick={chois} disabled={card.ismatching} />
            <img name={card.name} className="-z-10 w-44 swap-on" src={card.src} alt="" />
            <img className=" -z-10 w-44 swap-off " src="/img/preston.jpg" alt="" />
          </div>
        ))}
      </div>

    </div >
  )
}

export default App

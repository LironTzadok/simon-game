import { useState } from "react";
import GameBtn from "../GameBtn/GameBtn";
import "./SimonGame.css";
import { useEffect } from "react";
import { useRef } from "react";

const colors = ["green", "red", "yellow", "blue"];

function SimonGame() {
    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [moveIndex, setMoveIndex] = useState(0);
    const [showingSequence, setShowingSequence] = useState(false);

    const greenRef = useRef(null);
    const redRef = useRef(null);
    const blueRef = useRef(null);
    const yellowRef = useRef(null);

    const resetGame = () => {
        setSequence([]);
        setPlaying(false);
        setMoveIndex(0);
    }

    const onColorClick = (e) => {
        if(playing && !showingSequence){
            e.target.classList.add("pressed");
            setTimeout(() => {
                e.target.classList.remove("pressed");
                const clickColor = e.target.getAttribute("color");
                if(clickColor === sequence[moveIndex]) {
                    if(moveIndex === sequence.length - 1){
                        setTimeout(() => {
                            setMoveIndex(0);
                            addNewColor();
                        }, 250)
                    }
                    else {
                        setMoveIndex(moveIndex + 1);
                    }
                }
                else {
                    resetGame();
                }
            }, 100)
        }
    }

    const addNewColor = () => {
        // get indext between 0 to 3
        const color = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence, color];
        setSequence(newSequence);
    }

    const handlePlayClick = () => {
        if(!playing){
            setPlaying(true);
            addNewColor();
        }
    };

    useEffect(() => {
        if(sequence.length > 0){
            const showSequence = (i = 0) => {
                let ref = null;
                if(sequence[i] === "green") {
                    ref = greenRef;
                }
                if(sequence[i] === "red") {
                    ref = redRef;
                }
                if(sequence[i] === "blue") {
                    ref = blueRef;
                }  
                if(sequence[i] === "yellow") {
                    ref = yellowRef;
                }
                setTimeout(() => {
                    ref.current.classList.add("bright");
                    setTimeout(() => {
                        ref.current.classList.remove("bright"); 
                    }, 250)
                    if(i < sequence.length - 1) {
                        showSequence(i + 1);
                    }
                    else {
                        setShowingSequence(false);
                    }
                }, 500)           
            }
            setShowingSequence(true);
            showSequence();
        }
    }, [sequence])

    return (
    <div className="main-container">
        <div className="game-container">
            <div className="green-red-conatiner">
                <GameBtn color={'green'} ref={greenRef} onClick={onColorClick}/>
                <GameBtn color={'red'} ref={redRef} onClick={onColorClick}/>
            </div>
            <div className="yellow-blue-conatiner">
                <GameBtn color={'yellow'} ref={yellowRef} onClick={onColorClick}/>
                <GameBtn color={'blue'} ref={blueRef} onClick={onColorClick}/>
            </div>
            <button className="play-button" onClick={handlePlayClick}>
                {sequence.length > 0 && <StageSpan/>}
                {sequence.length === 0 ? "Start": sequence.length}
                </button>
        </div>
    </div>
  )
}

function StageSpan() {
    return <span className="stage-span">Stage</span>;
}

export default SimonGame
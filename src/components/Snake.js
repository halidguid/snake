import React, { useEffect, useState, useRef, useCallback } from "react";
import Piece from "./Piece";
import Points from "./Points";

const Snake = (props) => {
  const [dimension, setDimension] = useState(0);
  const [chunk, setChunk] = useState(0);
  const [direction, setDirection] = useState("right");
  const [fruit, setFruit] = useState(300);
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const speedRef = useRef(100);
  const [snake, setSnake] = useState([
    {
      direction: "right",
      part: [186, 185, 184, 183],
    },
  ]);
  let width;
  const reset = () => {
    speedRef.current = 100;
    setPoints(0);
    setDirection("right");
    setSnake([
      {
        direction: "right",
        part: [186, 185, 184, 183],
      },
    ]);
    setGameOver(false);
  };

  const pieces = () => {
    let arr = [];

    for (let i = 0; i < 400; i++) {
      let addToArr = false;
      let j = 0;
      while (j < snake.length) {
        if (snake[j].part.indexOf(i) >= 0) {
          addToArr = true;
          break;
        } else {
          addToArr = false;
        }
        j++;
      }
      addToArr
        ? arr.push("bang")
        : i === fruit
        ? arr.push("fruit")
        : arr.push("");
    }
    return arr;
  };

  const turn = useCallback(
    (dir, opp) => {
      let tempSnake = [...snake];

      if (snake[0].part.length > 0 && direction !== opp && direction !== dir) {
        setDirection(dir);
        tempSnake.unshift({
          direction: dir,
          part: [],
        });
        setSnake(tempSnake);
      }
    },
    [snake, direction]
  );

  useEffect(() => {
    width = window.innerWidth;
    if (width >= 800) {
      setDimension(width * 0.35);
    } else if (width < 800) {
      setDimension(width * 0.9);
    }
    setChunk(dimension / 20);

    if (snake[0].part[0] === fruit) {
      setPoints(points + 1);
      let sneak = [...snake];
      let firstSection = sneak[0];
      console.log(firstSection);
      if (firstSection.direction === "up") {
        let y = firstSection.part[0] - 20;
        if (y < 0) {
          firstSection.part.unshift(y + 400);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === "right") {
        let y = firstSection.part[0] + 1;
        if (y % 20 === 0) {
          firstSection.part.unshift(y + -20);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === "down") {
        let y = firstSection.part[0] + 20;
        if (y >= 400) {
          firstSection.part.unshift(y - 400);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === "left") {
        let y = firstSection.part[0] - 1;
        if (y % 20 === 19) {
          firstSection.part.unshift(y + 20);
        } else {
          firstSection.part.unshift(y);
        }
      }
      speedRef.current = speedRef.current - 2;
      setSnake(sneak);
      setFruit(Math.floor(Math.random() * Math.floor(400)));
    }
    let totalArr = [];
    for (let k = 0; k < snake.length; k++) {
      totalArr = [...totalArr, ...snake[k].part];
    }

    let head = snake[0].part[0];
    totalArr.filter((item) => item === head).length >= 2 && setGameOver(true);
    let specificArr = [0, 1];
    specificArr.filter((item) => item === head) >= 2 && setGameOver(true);
    if (!gameOver) {
      const handleKeydown = (e) => {
        switch (e.code) {
          case "ArrowUp":
            e.preventDefault();
            turn("up", "down");
            break;
          case "ArrowRight":
            e.preventDefault();
            turn("right", "left");
            break;
          case "ArrowDown":
            e.preventDefault();
            turn("down", "up");
            break;
          case "ArrowLeft":
            e.preventDefault();
            turn("left", "right");
            break;
          default:
        }
      };
      document.addEventListener("keydown", handleKeydown);
      const interval = setInterval(() => {
        let dupSneak = [...snake];
        for (let i = snake.length - 1; i > 0; i--) {
          if (dupSneak[i].part.length !== 0) {
            let next = dupSneak[i - 1];
            let chunk = dupSneak[i].part.shift();
            next.part.push(chunk);
          } else {
            dupSneak.pop();
          }
        }
        let sneak = dupSneak;
        sneak.map((section) => {
          if (section.direction === "right") {
            section.part.map((x, i) => {
              let y = x + 1;
              if (y % 20 === 0) {
                return setGameOver(true);
              } else {
                return (section.part[i] = y);
              }
            });
          } else if (section.direction === "up") {
            section.part.map((x, i) => {
              let y = x - 20;
              if (y < 0) {
                return setGameOver(true);
              } else {
                return (section.part[i] = y);
              }
            });
          } else if (section.direction === "left") {
            section.part.map((x, i) => {
              let y = x - 1;
              if (y % 20 === 19 || y == -1) {
                return setGameOver(true);
              } else {
                return (section.part[i] = y);
              }
            });
          } else if (section.direction === "down") {
            section.part.map((x, i) => {
              let y = x + 20;
              if (y >= 400) {
                return setGameOver(true);
              } else {
                return (section.part[i] = y);
              }
            });
          }
          return "";
        });
        setSnake(sneak);
      }, speedRef.current);
      return () => {
        clearInterval(interval);
        document.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [
    turn,
    width,
    dimension,
    chunk,
    snake,
    direction,
    points,
    fruit,
    gameOver,
  ]);

  return (
    <div className="snake-container" id="snake-container">
<div>
      <h2 className="snake-title">SNAKE</h2>
      </div>
      <div
        className="game-border"
        style={{
          width: dimension,
          height: dimension,
          backgroundColor: props.backgroundColor,
        }}
      >
        {pieces().map((piece, i) => {
          return (
            <Piece
              piece={piece}
              chunk={chunk}
              colorSnake={props.colorSnake}
              colorFood={props.colorFood}
              i={i}
            />
          );
        })}
        {gameOver && (
          <div className="game-splash" style={{ height: dimension }}>
            <div>GAME OVER!</div>
            <button onClick={() => reset()}>Play Again</button>
          </div>
        )}
      </div>
      <Points dimension={dimension} points={points} color={props.color1} />
      {width <= 1024 && (
        <div
          className="snake-mobile-buttons"
          style={{ width: dimension, margin: "auto" }}
        >
          <div>
            <button onClick={() => turn("up", "down")}>&#8593;</button>
          </div>
          <div>
            <button onClick={() => turn("left", "right")}>&#8592;</button>
            <button onClick={() => turn("right", "left")}>&#8594;</button>
          </div>
          <div>
            <button onClick={() => turn("down", "up")}>&#8595;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snake;

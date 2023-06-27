import React, { useEffect, useRef } from "react";
import classes from "./background.module.css";
const CanvasC: React.FC<{ src: string }> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;

    if (canvas) {
      let context: CanvasRenderingContext2D | null = canvas.getContext("2d");

      let hero = new Image();
      hero.src = props.src;
      let cellwidth = 260;

      hero.onload = function () {
        let heroTrue = true;
        let movement = 15;
        let movX = -12;
        let count = 0;
        let start: Date = new Date();

        const animationLoop = () => {

          let now: Date = new Date();

          if (now.getTime() - start.getTime() > 200) {
            start = now;
            context = canvas.getContext("2d");

            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height);

              if (heroTrue) {
                context?.drawImage(
                  hero,
                  count * cellwidth,
                  0,
                  260,
                  250,
                  movX,
                  400,
                  120,
                  120
                );
              }

              count += 1;
              count %= 6;

              if (movX >= canvas.width) {
                movX = 0;
              } else {
                movX += movement;
              }
            }
          }
          animationFrameId = window.requestAnimationFrame(animationLoop);
        };

        
        animationFrameId = window.requestAnimationFrame(animationLoop);
      };

      hero.onerror = (error) => {
        console.error("Failed to load hero image.", error);
      };
    }

    return () => {

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

    };
  }, [props.src]);

  return (
    <div className={classes.container}> 
      <canvas
        ref={canvasRef}
        id="myCanvas"
        className={classes.canvas}
        width="900"
        height="600"
      ></canvas>

    </div>
  );
};

export default CanvasC;

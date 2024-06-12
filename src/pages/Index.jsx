import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, VStack, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"]; // Mondrian color palette

const Index = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, [color, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <Flex>
      <Box position="fixed" left={0} top={0} bottom={0} width="80px" bg="gray.200" p={2}>
        <VStack spacing={4}>
          {colors.map((col) => (
            <IconButton
              key={col}
              aria-label={col}
              icon={<FaCircle color={col} />}
              size="lg"
              onClick={() => setColor(col)}
              isRound
            />
          ))}
          <Slider
            aria-label="slider-ex-1"
            defaultValue={5}
            min={1}
            max={50}
            orientation="vertical"
            height="200px"
            onChange={(val) => setBrushSize(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Box>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ cursor: "crosshair" }}
      />
    </Flex>
  );
};

export default Index;
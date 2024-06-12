import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, VStack, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';

const colors = ['#FF0000', '#FFFF00', '#0000FF', '#FFFFFF', '#000000']; // Mondrian color palette

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const startDrawing = ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = nativeEvent;
      context.lineTo(offsetX, offsetY);
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
      context.lineCap = 'round';
      context.stroke();
    };

    const stopDrawing = () => {
      context.closePath();
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing, brushColor, brushSize]);

  return (
    <Flex>
      <Box position="fixed" left={0} top={0} bottom={0} width="60px" bg="gray.200" p={2}>
        <VStack spacing={4}>
          {colors.map((color) => (
            <IconButton
              key={color}
              aria-label={color}
              icon={<FaCircle color={color} />}
              size="lg"
              onClick={() => setBrushColor(color)}
            />
          ))}
          <Slider
            orientation="vertical"
            min={1}
            max={50}
            value={brushSize}
            onChange={(val) => setBrushSize(val)}
            height="200px"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Box>
      <canvas ref={canvasRef} style={{ flex: 1 }} />
    </Flex>
  );
};

export default Index;
// src/App.js
import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Partition component
const Partition = ({ id, color, onSplit, onRemove }) => {
  return (
    <ResizableBox
      width={200}
      height={200}
      minConstraints={[50, 50]}
      maxConstraints={[Infinity, Infinity]}
      resizeHandles={['se']}
    >
      <div className="partition" style={{ backgroundColor: color }}>
        <div className="controls">
          <button onClick={() => onSplit(id, 'V')}>V</button>
          <button onClick={() => onSplit(id, 'H')}>H</button>
          <button onClick={() => onRemove(id)}>-</button>
        </div>
      </div>
    </ResizableBox>
  );
};

function App() {
  const [partitions, setPartitions] = useState([
    { id: uuidv4(), color: getRandomColor(), width: 200, height: 200 },
  ]);

  const handleSplit = (id, direction) => {
    setPartitions((prevPartitions) => {
      const index = prevPartitions.findIndex((p) => p.id === id);
      if (index === -1) return prevPartitions;

      const newPartition = { id: uuidv4(), color: getRandomColor(), width: prevPartitions[index].width, height: prevPartitions[index].height };
      const updatedPartitions = [...prevPartitions];

      if (direction === 'V') {
        updatedPartitions[index].width /= 2;
        newPartition.width /= 2;
      } else {
        updatedPartitions[index].height /= 2;
        newPartition.height /= 2;
      }

      updatedPartitions.splice(index + 1, 0, newPartition);
      return updatedPartitions;
    });
  };

  const handleRemove = (id) => {
    setPartitions((prevPartitions) => prevPartitions.filter((p) => p.id !== id));
  };

  return (
    <div className="App">
      {partitions.map((partition) => (
        <Partition
          key={partition.id}
          id={partition.id}
          color={partition.color}
          onSplit={handleSplit}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default App;


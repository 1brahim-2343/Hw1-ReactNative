import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TabLayout() {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  let winner = "";
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (grid[a] !== "" && grid[a] === grid[b] && grid[a] === grid[c]) {
      winner = grid[a];
    }
  }

  const isDraw = winner === "" && !grid.includes("");

  let status = `Turn: ${isXTurn ? "X" : "O"}`;
  if (winner) status = `Winner: ${winner}`;
  else if (isDraw) status = "Draw";

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {grid.map((cell, i) => (
          <View key={i} style={styles.cell}>
            <Button
              title={cell ?? " "}
              onPress={() => {
                if (cell || winner) return;
                const newGrid = [...grid];
                newGrid[i] = isXTurn ? "X" : "O";
                setGrid(newGrid);
                setIsXTurn(!isXTurn);
              }}
            />
            <Text> </Text>
          </View>
        ))}
      </View>
      <Button
        title="Reset"
        onPress={() => {
          setGrid(Array(9).fill(''));
          setIsXTurn(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  status: { fontSize: 24, marginBottom: 20 },
  board: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: { fontSize: 40 },
});
